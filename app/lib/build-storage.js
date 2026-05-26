import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Map internal style IDs to URL-friendly capitalized strings.
const STYLE_URL_NAME = {
  grip: "Grip",
  balanced: "Balanced",
  drift: "Drift",
  drag: "Drag",
  rally: "Rally",
};

// Generate a random 3-character suffix (lowercase letters + digits).
function randomSuffix() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < 3; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

// Generate a semantic build ID like "DriftA-k9p".
// styleId: one of grip/balanced/drift/drag/rally
// targetClass: D/C/B/A/S1/S2/R
export function generateBuildId(styleId, targetClass) {
  const stylePart = STYLE_URL_NAME[styleId] || "Build";
  const classPart = targetClass || "X";
  return `${stylePart}${classPart}-${randomSuffix()}`;
}

// Compute the per-style+class index key for a build.
// Used to fetch random/recent builds matching specific filters later.
function styleClassIndexKey(styleId, targetClass) {
  // Use lowercase style for consistency, raw class string (D/C/B/A/S1/S2/R)
  return `builds:style:${styleId || "unknown"}:class:${targetClass || "X"}`;
}

// Add a build ID to all relevant indexes. Timestamps as scores enable
// recency sorting and random sampling later.
async function addToIndexes(id, styleId, targetClass, timestamp) {
  // ALL builds index — newest first when read in reverse
  await redis.zadd("builds:all", { score: timestamp, member: id });

  // Per-style+class index for filtered random/recent queries
  if (styleId && targetClass) {
    const key = styleClassIndexKey(styleId, targetClass);
    await redis.zadd(key, { score: timestamp, member: id });
  }
}

// Save a build to Redis with collision retry. Returns the final ID used.
export async function saveBuild({ buildData, inputs }) {
  const styleId = inputs.style;
  const targetClass = inputs.targetClass;
  const timestamp = Date.now();

  // Retry up to 5 times to find a non-colliding ID.
  for (let attempt = 0; attempt < 5; attempt++) {
    const id = generateBuildId(styleId, targetClass);
    const exists = await redis.exists(`build:${id}`);
    if (!exists) {
      const payload = {
        build: buildData,
        inputs,
        createdAt: timestamp,
      };
      await redis.set(`build:${id}`, JSON.stringify(payload));
      await addToIndexes(id, styleId, targetClass, timestamp);
      return id;
    }
  }

  // After 5 collisions, fall back to a longer suffix.
  const fallbackId = generateBuildId(styleId, targetClass) + randomSuffix();
  const payload = {
    build: buildData,
    inputs,
    createdAt: timestamp,
  };
  await redis.set(`build:${fallbackId}`, JSON.stringify(payload));
  await addToIndexes(fallbackId, styleId, targetClass, timestamp);
  return fallbackId;
}

// Load a build by ID. Returns null if not found.
export async function loadBuild(id) {
  if (!id || typeof id !== "string") return null;
  // Basic sanity check: only alphanumeric and hyphen allowed
  if (!/^[a-zA-Z0-9-]+$/.test(id)) return null;
  // Cap length
  if (id.length > 50) return null;

  const raw = await redis.get(`build:${id}`);
  if (!raw) return null;
  // Upstash auto-parses JSON; handle both cases
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw;
}

// Update the Forza share code on an existing build. Returns true on success, false if build not found.
export async function updateForzaCode(id, forzaCode) {
  if (!id || typeof id !== "string") return false;
  if (!/^[a-zA-Z0-9-]+$/.test(id)) return false;
  if (id.length > 50) return false;

  const raw = await redis.get(`build:${id}`);
  if (!raw) return false;

  let payload;
  if (typeof raw === "string") {
    try { payload = JSON.parse(raw); } catch { return false; }
  } else {
    payload = raw;
  }

  // forzaCode can be null/empty (clearing) or a validated string
  payload.forzaCode = forzaCode || null;
  payload.forzaCodeUpdatedAt = Date.now();

  await redis.set(`build:${id}`, JSON.stringify(payload));
  return true;
}

// === Query helpers (foundation for future random/discovery features) ===

// Get the most recent N build IDs across the whole dataset.
// Returns array of IDs sorted newest-first.
export async function getRecentBuildIds(limit = 20) {
  const safeLimit = Math.max(1, Math.min(100, limit));
  // ZREVRANGE = highest score first = newest first
  return await redis.zrange("builds:all", 0, safeLimit - 1, { rev: true });
}

// Get a single random build ID, optionally filtered by style+class.
// Returns null if no builds match.
export async function getRandomBuildId({ styleId = null, targetClass = null } = {}) {
  const key = (styleId && targetClass)
    ? styleClassIndexKey(styleId, targetClass)
    : "builds:all";

  const count = await redis.zcard(key);
  if (!count || count === 0) return null;

  const randomIndex = Math.floor(Math.random() * count);
  const results = await redis.zrange(key, randomIndex, randomIndex);
  return results && results.length > 0 ? results[0] : null;
}

// Get total build count (useful for stats / "X builds in cache" display).
export async function getBuildCount() {
  return await redis.zcard("builds:all");
}

// List builds with optional style/class filters, ordered newest first.
// Returns hydrated objects: [{ id, carName, drivetrain, style, targetClass, hasForzaCode, createdAt }]
// Limits to 100 entries by default; caller can request fewer.
export async function listBuilds({ styleId = null, targetClass = null, limit = 100 } = {}) {
  const safeLimit = Math.max(1, Math.min(100, limit));

  // Pick the right index based on filters
  const key = (styleId && targetClass)
    ? `builds:style:${styleId}:class:${targetClass}`
    : "builds:all";

  // Get IDs newest-first
  const ids = await redis.zrange(key, 0, safeLimit - 1, { rev: true });
  if (!ids || ids.length === 0) return [];

  // Hydrate each ID with its metadata.
  // Use Promise.all to parallelize the lookups.
  const hydrated = await Promise.all(ids.map(async (id) => {
    try {
      const raw = await redis.get(`build:${id}`);
      if (!raw) return null;
      const payload = typeof raw === "string" ? JSON.parse(raw) : raw;
      const inputs = payload.inputs || {};
      return {
        id,
        carName: inputs.carName || "Unknown Car",
        drivetrain: inputs.drivetrain || "",
        style: inputs.style || "",
        targetClass: inputs.targetClass || "",
        hasForzaCode: Boolean(payload.forzaCode),
        createdAt: payload.createdAt || 0,
      };
    } catch {
      return null;
    }
  }));

  // Filter out any that failed to hydrate (deleted builds in the index, etc.)
  // If we filter by style/class but the index used was builds:all, apply post-filter.
  let results = hydrated.filter(Boolean);

  // Defense-in-depth: when filtering, also filter the results in case index is stale.
  if (styleId) results = results.filter((b) => b.style === styleId);
  if (targetClass) results = results.filter((b) => b.targetClass === targetClass);

  return results;
}
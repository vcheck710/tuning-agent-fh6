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

// Save a build to Redis with collision retry. Returns the final ID used.
export async function saveBuild({ buildData, inputs }) {
  const styleId = inputs.style;
  const targetClass = inputs.targetClass;

  // Retry up to 5 times to find a non-colliding ID.
  for (let attempt = 0; attempt < 5; attempt++) {
    const id = generateBuildId(styleId, targetClass);
    const exists = await redis.exists(`build:${id}`);
    if (!exists) {
      const payload = {
        build: buildData,
        inputs,
        createdAt: Date.now(),
      };
      await redis.set(`build:${id}`, JSON.stringify(payload));
      return id;
    }
  }

  // After 5 collisions, fall back to a longer suffix.
  const fallbackId = generateBuildId(styleId, targetClass) + randomSuffix();
  const payload = {
    build: buildData,
    inputs,
    createdAt: Date.now(),
  };
  await redis.set(`build:${fallbackId}`, JSON.stringify(payload));
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
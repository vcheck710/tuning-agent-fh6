import { updateForzaCode } from "../../lib/build-storage";

// Validate a Forza share code. Accepts:
//   "123 456 789" (with spaces)
//   "123456789" (without spaces)
// Always normalizes to "123 456 789" for storage.
// Returns the normalized code or null if invalid.
function normalizeForzaCode(input) {
  if (input === null || input === undefined) return null;
  if (typeof input !== "string") return null;

  // Allow empty string as a way to clear the code
  const trimmed = input.trim();
  if (trimmed === "") return "";

  // Remove all whitespace
  const stripped = trimmed.replace(/\s+/g, "");

  // Must be exactly 9 digits
  if (!/^\d{9}$/.test(stripped)) return null;

  // Format as "XXX XXX XXX"
  return `${stripped.slice(0, 3)} ${stripped.slice(3, 6)} ${stripped.slice(6, 9)}`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, forzaCode } = body;

    if (!id) {
      return Response.json({ error: "Missing build id" }, { status: 400 });
    }

    // Validate / normalize the code
    const normalized = normalizeForzaCode(forzaCode);
    if (normalized === null) {
      return Response.json(
        { error: "Invalid Forza code. Expected 9 digits like 123 456 789." },
        { status: 400 }
      );
    }

    // Empty string means "clear the code"
    const codeToStore = normalized === "" ? null : normalized;
    const success = await updateForzaCode(id, codeToStore);
    if (!success) {
      return Response.json({ error: "Build not found" }, { status: 404 });
    }

    return Response.json({ forzaCode: codeToStore });
  } catch (err) {
    console.error("update-forza-code error:", err);
    return Response.json(
      { error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
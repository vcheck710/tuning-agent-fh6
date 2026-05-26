import { saveBuild } from "../../lib/build-storage";

export async function POST(request) {
  try {
    // Password check — saving requires the friends-only password
    const provided = (request.headers.get("x-app-password") || "").trim();
    const expected = (process.env.APP_PASSWORD || "").trim();
    if (!expected) {
      return Response.json(
        { error: "Server misconfigured: APP_PASSWORD not set" },
        { status: 500 }
      );
    }
    if (provided !== expected) {
      return Response.json({ error: "Wrong password" }, { status: 401 });
    }

    const body = await request.json();
    const { buildData, inputs } = body;
    if (!buildData || !inputs) {
      return Response.json(
        { error: "Missing buildData or inputs" },
        { status: 400 }
      );
    }

    const id = await saveBuild({ buildData, inputs });
    return Response.json({ id });
  } catch (err) {
    console.error("save-build error:", err);
    return Response.json(
      { error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
import { loadBuild } from "../../../lib/build-storage";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const data = await loadBuild(id);
    if (!data) {
      return Response.json({ error: "Build not found" }, { status: 404 });
    }
    return Response.json(data);
  } catch (err) {
    console.error("get-build error:", err);
    return Response.json(
      { error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
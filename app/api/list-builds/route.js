import { listBuilds } from "../../lib/build-storage";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const styleId = url.searchParams.get("style") || null;
    const targetClass = url.searchParams.get("class") || null;
    const limitRaw = url.searchParams.get("limit");
    const limit = limitRaw ? parseInt(limitRaw, 10) : 100;

    // Treat "all" or empty as no filter
    const safeStyle = styleId && styleId !== "all" ? styleId : null;
    const safeClass = targetClass && targetClass !== "all" ? targetClass : null;

    const builds = await listBuilds({
      styleId: safeStyle,
      targetClass: safeClass,
      limit: isNaN(limit) ? 100 : limit,
    });

    return Response.json({ builds });
  } catch (err) {
    console.error("list-builds error:", err);
    return Response.json(
      { error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
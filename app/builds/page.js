"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FONT = "Rajdhani, Arial Narrow, Arial, sans-serif";

const STYLES = [
  { id: "all", label: "All Styles" },
  { id: "grip", label: "Grip / Circuit" },
  { id: "balanced", label: "Balanced" },
  { id: "drift", label: "Drift / Oversteer" },
  { id: "drag", label: "Drag / Straight-line" },
  { id: "rally", label: "Off-road / Rally" },
];

const CLASSES = [
  { id: "all", label: "All Classes" },
  { id: "D", label: "D" },
  { id: "C", label: "C" },
  { id: "B", label: "B" },
  { id: "A", label: "A" },
  { id: "S1", label: "S1" },
  { id: "S2", label: "S2" },
  { id: "R", label: "R" },
];

const STYLE_LABEL = {
  grip: "Grip",
  balanced: "Balanced",
  drift: "Drift",
  drag: "Drag",
  rally: "Rally",
};

const CLASS_COLOR = {
  D: "#9B7BB3",
  C: "#5BB3D1",
  B: "#5BD18E",
  A: "#D1B85B",
  S1: "#D17A5B",
  S2: "#D15B6F",
  R: "#FF5E8C",
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function timeAgo(timestamp) {
  if (!timestamp) return "";
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

export default function BrowseBuilds() {
  const isMobile = useIsMobile();
  const [styleFilter, setStyleFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (styleFilter !== "all") params.set("style", styleFilter);
    if (classFilter !== "all") params.set("class", classFilter);

    fetch(`/api/list-builds?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setError(data.error);
          setBuilds([]);
        } else {
          setBuilds(data.builds || []);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Failed to load builds");
        setBuilds([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [styleFilter, classFilter]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #050B16 0%, #080F1E 100%)", color: "#E8F2FF", fontFamily: FONT }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#04091A 0%,#071228 60%,#0A0E24 100%)", borderBottom: "2px solid #00B4FF", padding: isMobile ? "12px 14px" : "16px 32px", display: "flex", alignItems: "center", gap: isMobile ? "10px" : "16px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: isMobile ? "10px" : "16px", textDecoration: "none", color: "inherit" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg,#00B4FF22,#00B4FF44)", border: "1px solid #00B4FF55", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🏎</div>
          <div>
            <div style={{ fontSize: "13px", color: "#00B4FF", letterSpacing: "0.2em", fontWeight: "700" }}>FORZA HORIZON 6</div>
            <div style={{ fontSize: "20px", fontWeight: "700", color: "#E8F2FF", letterSpacing: "0.1em" }}>BROWSE ALL BUILDS</div>
          </div>
        </Link>
        <div style={{ marginLeft: "auto" }}>
          <Link href="/" style={{ display: "inline-block", padding: "10px 16px", background: "transparent", border: "1px solid #152840", color: "#7AAAC8", fontFamily: FONT, fontSize: "13px", fontWeight: "700", letterSpacing: "0.15em", textDecoration: "none", borderRadius: "2px" }}>
            ← BACK
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "16px 12px" : "28px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "240px 240px", gap: "12px", marginBottom: "24px" }}>
          <div>
            <div style={{ fontSize: "11px", color: "#486882", letterSpacing: "0.15em", marginBottom: "6px", fontWeight: "700" }}>STYLE</div>
            <select
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", background: "#080F1E", border: "1px solid #1A3050", color: "#E8F2FF", fontFamily: FONT, fontSize: "14px", borderRadius: "2px", outline: "none", cursor: "pointer" }}
            >
              {STYLES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "#486882", letterSpacing: "0.15em", marginBottom: "6px", fontWeight: "700" }}>CLASS</div>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", background: "#080F1E", border: "1px solid #1A3050", color: "#E8F2FF", fontFamily: FONT, fontSize: "14px", borderRadius: "2px", outline: "none", cursor: "pointer" }}
            >
              {CLASSES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status row: count on left, legend on right (only shown when builds visible) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", color: "#486882", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {loading ? "Loading builds..." : `${builds.length} build${builds.length === 1 ? "" : "s"} found`}
          </div>
          {!loading && builds.length > 0 && builds.some((b) => b.hasForzaCode) && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#7AAAC8", letterSpacing: "0.05em" }}>
              <span style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00FF88",
                boxShadow: "0 0 6px rgba(0, 255, 136, 0.6)",
                flexShrink: 0,
              }} />
              <span>= Forza tune code available</span>
            </div>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div style={{ padding: "16px 20px", background: "#0D0814", border: "1px solid #3A1A2E", borderLeft: "3px solid #FF5E8C", color: "#FF5E8C", fontSize: "14px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        {/* Empty state — no builds at all */}
        {!loading && !error && builds.length === 0 && styleFilter === "all" && classFilter === "all" && (
          <div style={{ padding: "40px 24px", background: "#080F1E", border: "1px solid #1A3050", textAlign: "center" }}>
            <div style={{ fontSize: "20px", color: "#E8F2FF", fontWeight: "700", marginBottom: "8px" }}>No builds yet</div>
            <div style={{ fontSize: "14px", color: "#88A8C0", marginBottom: "20px" }}>Be the first to create one.</div>
            <Link href="/" style={{ display: "inline-block", padding: "12px 24px", background: "#00B4FF", color: "#050B16", fontSize: "13px", fontWeight: "700", letterSpacing: "0.15em", textDecoration: "none", borderRadius: "2px", textTransform: "uppercase" }}>
              Create a Build →
            </Link>
          </div>
        )}

        {/* Empty state — no matches for current filter */}
        {!loading && !error && builds.length === 0 && (styleFilter !== "all" || classFilter !== "all") && (
          <div style={{ padding: "40px 24px", background: "#080F1E", border: "1px solid #1A3050", textAlign: "center" }}>
            <div style={{ fontSize: "16px", color: "#E8F2FF", fontWeight: "700", marginBottom: "8px" }}>No builds match this filter</div>
            <div style={{ fontSize: "13px", color: "#88A8C0", marginBottom: "20px" }}>Try a different combination, or create one yourself.</div>
            <Link href="/" style={{ display: "inline-block", padding: "12px 24px", background: "#00B4FF", color: "#050B16", fontSize: "13px", fontWeight: "700", letterSpacing: "0.15em", textDecoration: "none", borderRadius: "2px", textTransform: "uppercase" }}>
              Create a Build →
            </Link>
          </div>
        )}

        {/* Builds grid */}
        {!loading && builds.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: "12px" }}>
            {builds.map((b) => (
              <Link
                key={b.id}
                href={`/builds/${b.id}`}
                style={{
                  display: "block",
                  padding: "16px 18px",
                  background: "#080F1E",
                  border: "1px solid #1A3050",
                  borderLeft: `3px solid ${CLASS_COLOR[b.targetClass] || "#00B4FF"}`,
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: "2px",
                  transition: "background 0.12s, border-color 0.12s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#0A1426"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#080F1E"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  {b.hasForzaCode && (
                    <span
                      title="Has Forza tune code"
                      aria-label="Has Forza tune code"
                      style={{
                        flexShrink: 0,
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#00FF88",
                        boxShadow: "0 0 8px rgba(0, 255, 136, 0.7)",
                        animation: "pulse-dot 2.2s ease-in-out infinite",
                      }}
                    />
                  )}
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#E8F2FF", lineHeight: 1.3, flex: 1, minWidth: 0 }}>{b.carName}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <span style={{ padding: "3px 8px", background: `${CLASS_COLOR[b.targetClass] || "#00B4FF"}22`, color: CLASS_COLOR[b.targetClass] || "#00B4FF", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", borderRadius: "2px" }}>
                      {b.targetClass}
                    </span>
                    <span style={{ fontSize: "12px", color: "#7AAAC8", letterSpacing: "0.05em" }}>
                      {STYLE_LABEL[b.style] || b.style}
                    </span>
                    {b.drivetrain && (
                      <span style={{ fontSize: "11px", color: "#486882", letterSpacing: "0.1em" }}>· {b.drivetrain}</span>
                    )}
                  </div>
                  <div style={{ fontSize: "11px", color: "#486882" }}>{timeAgo(b.createdAt)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
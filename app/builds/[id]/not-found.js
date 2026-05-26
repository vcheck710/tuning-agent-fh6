import Link from "next/link";

export default function BuildNotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #050B16 0%, #080F1E 100%)",
      color: "#E8F2FF",
      fontFamily: "Rajdhani, Arial Narrow, Arial, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        padding: "40px 32px",
        background: "#080F1E",
        border: "1px solid #1A3050",
        borderTop: "2px solid #FF5E8C",
        borderRadius: "2px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "13px", color: "#FF5E8C", letterSpacing: "0.2em", fontWeight: "700", marginBottom: "12px" }}>
          404 - BUILD NOT FOUND
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 12px 0", color: "#E8F2FF" }}>
          This build link is invalid
        </h1>
        <p style={{ fontSize: "15px", color: "#88A8C0", margin: "0 0 28px 0", lineHeight: 1.6 }}>
          The build you are looking for does not exist or the link is wrong. Want to create your own build instead?
        </p>
        <Link href="/" style={{
          display: "inline-block",
          padding: "14px 28px",
          background: "#00B4FF",
          color: "#050B16",
          fontSize: "14px",
          fontWeight: "700",
          letterSpacing: "0.15em",
          textDecoration: "none",
          borderRadius: "2px",
          textTransform: "uppercase",
        }}>
          Create Your Own Build →
        </Link>
      </div>
    </div>
  );
}
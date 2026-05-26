import { loadBuild } from "../../lib/build-storage";
import { notFound } from "next/navigation";
import FH6Tuner from "../../FH6Tuner";

// Style ID -> human-readable label for metadata
const STYLE_LABEL = {
  grip: "Grip / Circuit",
  balanced: "Balanced",
  drift: "Drift / Oversteer",
  drag: "Drag / Straight-line",
  rally: "Off-road / Rally",
};

// generateMetadata: server-rendered <title> and OpenGraph tags so shared links
// preview nicely in iMessage, Discord, Twitter, Slack, etc.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await loadBuild(id);

  if (!data) {
    return {
      title: "Build Not Found | FH6 Tuning Agent",
      description: "This build link is invalid or has expired.",
    };
  }

  const inputs = data.inputs || {};
  const carName = inputs.carName || "Unknown Car";
  const styleLabel = STYLE_LABEL[inputs.style] || inputs.style || "Build";
  const targetClass = inputs.targetClass || "?";
  const drivetrain = inputs.drivetrain || "";

  const title = `${carName} - ${styleLabel} (${targetClass}) | FH6 Tuning Agent`;
  const description = `${drivetrain} ${styleLabel.toLowerCase()} build targeting Class ${targetClass}. View the full upgrade list and tuning sliders.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function BuildPage({ params }) {
  const { id } = await params;
  const data = await loadBuild(id);

  if (!data) {
    notFound();
  }

  return (
    <FH6Tuner
      initialBuildId={id}
      initialBuild={data.build}
      initialInputs={data.inputs}
      initialForzaCode={data.forzaCode || null}
    />
  );
}
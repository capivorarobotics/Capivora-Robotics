import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Capivora Robotics Vision Systems for Machines";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const Y = "#f4c20d";
const corner = (pos: Record<string, number>, sides: [string, string]) => (
  <div
    style={{
      position: "absolute",
      width: 64,
      height: 64,
      ...pos,
      [`border${sides[0]}`]: `6px solid ${Y}`,
      [`border${sides[1]}`]: `6px solid ${Y}`,
    }}
  />
);

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/capivora-logo-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1a22",
          color: "#edf1f3",
          padding: "88px 96px",
        }}
      >
        {corner({ top: 36, left: 36 }, ["Top", "Left"])}
        {corner({ top: 36, right: 36 }, ["Top", "Right"])}
        {corner({ bottom: 36, left: 36 }, ["Bottom", "Left"])}
        {corner({ bottom: 36, right: 36 }, ["Bottom", "Right"])}
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by ImageResponse */}
        <img src={logoSrc} width={236} height={70} alt="" />
        <div style={{ fontSize: 84, lineHeight: 1.0, letterSpacing: -3, fontWeight: 700, maxWidth: 940 }}>
          Everything changes when machines can see.
        </div>
        <div style={{ fontSize: 26, color: "#93a3ad" }}>Vision systems for machines operating in the physical world.</div>
      </div>
    ),
    size,
  );
}

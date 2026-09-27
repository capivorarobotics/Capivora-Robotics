import type { CSSProperties } from "react";

// The Capivora logo, drawn as a CSS mask so it takes the current text colour and
// follows the light/dark theme and the always-dark sections without extra files.
// Source artwork: /public/brand (transparent PNGs cropped from "capivora logo.png";
// capivora-mark.png is the symbol alone, also used for the app icons).
const LOGO = { src: "/brand/capivora-logo.png", ratio: 1120 / 332 };

function Masked({ src, ratio, height, label }: { src: string; ratio: number; height: number; label?: string }) {
  const style: CSSProperties = {
    height,
    width: height * ratio,
    backgroundColor: "currentColor",
    mask: `url(${src}) center / contain no-repeat`,
    WebkitMask: `url(${src}) center / contain no-repeat`,
  };
  return label ? (
    <span role="img" aria-label={label} className="block shrink-0" style={style} />
  ) : (
    <span aria-hidden="true" className="block shrink-0" style={style} />
  );
}

/** Symbol + "Capivora Robotics" wordmark. */
export default function Logo({ height = 30 }: { height?: number }) {
  return <Masked {...LOGO} height={height} label="Capivora Robotics" />;
}



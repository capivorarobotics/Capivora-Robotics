// All page copy lives here so it can be edited without touching components.

export const nav = [
  { label: "Vision", href: "#vision" },
  { label: "How it works", href: "#how" },
  { label: "Applications", href: "#applications" },
  { label: "About", href: "#about" },
] as const;

export const linkedin = "https://www.linkedin.com/company/capivora-robotics/";

// From the company LinkedIn page.
export const facts = [
  { label: "Founded", value: "2026" },
  { label: "Based in", value: "Chennai, India" },
  { label: "Pre-incubated at", value: "Nirmaan, IIT Madras" },
] as const;

export const capabilities = [
  { title: "Detection", description: "Finds what matters." },
  { title: "Tracking", description: "Follows movement in real time." },
  { title: "Depth", description: "Understands space." },
  { title: "Context", description: "Enables better decisions." },
] as const;

export type Capability = (typeof capabilities)[number]["title"];

export const steps = [
  {
    title: "See",
    description: "High-resolution cameras and sensors capture the environment.",
  },
  {
    title: "Understand",
    description: "AI models interpret objects, movement, depth and context.",
  },
  {
    title: "Act",
    description: "Machines use that understanding to make informed decisions.",
  },
] as const;

// Typical smart-manufacturing problems that machine vision addresses. These are
// examples of fit, not case studies. Each title is also a topic in the inquiry form.
export const applications: { title: string; description: string; uses: Capability[] }[] = [
  {
    title: "Quality inspection",
    description: "Spot defects, missing parts and misalignment as products move down the line.",
    uses: ["Detection", "Context"],
  },
  {
    title: "Robotic picking",
    description: "Give robot arms the position and depth they need to pick parts reliably.",
    uses: ["Depth", "Context"],
  },
  {
    title: "Line monitoring",
    description: "Follow parts across a conveyor to catch jams, gaps and slowdowns early.",
    uses: ["Tracking", "Detection"],
  },
  {
    title: "People and machines",
    description: "Understand where people and objects are around automated equipment.",
    uses: ["Tracking", "Depth"],
  },
];

export const otherTopic = "Something else";
export const topics = [...applications.map((a) => a.title), otherTopic];

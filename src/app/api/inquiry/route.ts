import { appendFile, mkdir } from "node:fs/promises";
import { validateInquiry, type Inquiry } from "@/lib/inquiry";

const MAX = { name: 120, email: 200, company: 200, building: 300, message: 5000 };
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

// Read a setting, ignoring surrounding quotes/whitespace (hosting dashboards store
// quotes literally, unlike .env files). Empty counts as not set.
const env = (name: string) => process.env[name]?.trim().replace(/^(["'])(.*)\1$/, "$2").trim() || undefined;

// Sender for inquiry emails. Must be on a domain verified in Resend; Resend's own
// onboarding@resend.dev can only deliver to the Resend account owner.
const DEFAULT_FROM = "Capivora Website <inquiries@capivorarobotics.com>";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Hidden "website" field: humans never fill it, bots do. Pretend success and drop it.
  if (typeof body.website === "string" && body.website) return Response.json({ ok: true });

  const str = (k: keyof Inquiry) => String(body[k] ?? "").slice(0, MAX[k]);
  const data: Inquiry = {
    name: str("name"),
    email: str("email"),
    company: str("company"),
    building: str("building"),
    message: str("message"),
  };
  if (Object.keys(validateInquiry(data)).length) {
    return Response.json({ error: "Invalid fields" }, { status: 400 });
  }

  const key = env("RESEND_API_KEY");
  const to = env("INQUIRY_TO_EMAIL");

  if (key && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env("INQUIRY_FROM_EMAIL") ?? DEFAULT_FROM,
        to: to.split(",").map((s) => s.trim()),
        reply_to: oneLine(data.email),
        subject: `New inquiry: ${oneLine(data.name)}${data.company ? ` (${oneLine(data.company)})` : ""}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company || "-"}`,
          `Building: ${data.building || "-"}`,
          "",
          data.message,
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("Resend failed", res.status, await res.text());
      return Response.json({ error: "Could not send" }, { status: 502 });
    }
    return Response.json({ ok: true });
  }

  // Local development only: with no email configured, keep submissions in a file so the
  // form can be tested end to end. In production a missing config must fail loudly,
  // otherwise visitors would see "Thanks" and the inquiry would be lost.
  if (process.env.NODE_ENV !== "production") {
    await mkdir(".data", { recursive: true });
    await appendFile(".data/inquiries.jsonl", JSON.stringify({ at: new Date().toISOString(), ...data }) + "\n");
    console.warn("[inquiry] Email not configured: saved to .data/inquiries.jsonl. Set RESEND_API_KEY and INQUIRY_TO_EMAIL in .env.local to get emails.");
    return Response.json({ ok: true, savedLocally: true });
  }

  console.error("Inquiry dropped: RESEND_API_KEY / INQUIRY_TO_EMAIL not set");
  return Response.json({ error: "Not configured" }, { status: 503 });
}

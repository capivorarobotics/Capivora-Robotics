import type { Inquiry } from "./inquiry";

// Resolves to { savedLocally: true } when the server has no email configured and kept
// the inquiry in .data/inquiries.jsonl instead (development only).
export async function submitInquiry(data: Inquiry, honeypot = ""): Promise<{ savedLocally: boolean }> {
  const res = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, website: honeypot }),
  });
  if (!res.ok) throw new Error(`Inquiry failed: ${res.status}`);
  const body = await res.json().catch(() => ({}));
  return { savedLocally: body?.savedLocally === true };
}

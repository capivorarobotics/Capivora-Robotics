"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { linkedin, topics } from "@/content/site";
import { validateInquiry, type Inquiry, type InquiryErrors } from "@/lib/inquiry";
import { submitInquiry } from "@/lib/submitInquiry";
import { onTopicRequest } from "@/lib/topic";

// maxLength values mirror the limits enforced in the API route.
const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", required: true, maxLength: 120 },
  { name: "email", label: "Work email", type: "email", autoComplete: "email", required: true, maxLength: 200 },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", maxLength: 200, optional: true },
] as const;

const MESSAGE_MAX = 5000;

const control =
  "w-full rounded-[12px] border border-line-dark bg-day/[0.035] px-4 text-[16px] text-day placeholder:text-day/35 transition-[border-color,background-color,box-shadow] hover:border-day/25 focus:border-signal focus:bg-day/[0.06] focus:shadow-[0_0_0_4px_rgb(244_194_13/0.14)] focus:outline-none aria-[invalid=true]:border-danger aria-[invalid=true]:shadow-[0_0_0_4px_rgb(255_148_134/0.12)]";

// Numbered heading for each part of the form (details first, then the project).
function Group({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="wide flex h-7 w-7 items-center justify-center rounded-full bg-day/10 text-[13px] font-semibold text-day">
          {n}
        </span>
        <span className="text-[17px] font-semibold text-day">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

const Check = ({ className }: { className: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5 10 17l9-10" />
  </svg>
);

function read(form: HTMLFormElement, topicsPicked: string[]): Inquiry {
  const fd = new FormData(form);
  const get = (k: string) => String(fd.get(k) ?? "");
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    building: topicsPicked.join(", "),
    message: get("message"),
  };
}

export default function InquiryForm() {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [messageLength, setMessageLength] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [sentTo, setSentTo] = useState({ name: "", email: "", savedLocally: false });
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // "Discuss …" buttons elsewhere on the page preselect a topic here.
  useEffect(
    () => onTopicRequest((t) => setPicked((p) => (p.includes(t) ? p : [...p, t]))),
    [],
  );

  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  // Check one field when it loses focus (only once it has content, or after a submit
  // attempt) and re-check while typing if it is currently flagged.
  const check = (name: keyof Inquiry, force: boolean) => {
    const form = formRef.current;
    if (!form) return;
    const data = read(form, picked);
    if (!force && !data[name].trim() && !submitted) return;
    const msg = validateInquiry(data)[name];
    setErrors((e) => ({ ...e, [name]: msg }));
  };

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = read(form, picked);
    setSubmitted(true);

    const found = validateInquiry(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const { savedLocally } = await submitInquiry(data, String(new FormData(form).get("website") ?? ""));
      setSentTo({ name: data.name.trim(), email: data.email.trim(), savedLocally });
      setStatus("sent");
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setStatus("failed");
    }
  }

  const reset = () => {
    setErrors({});
    setSubmitted(false);
    setPicked([]);
    setMessageLength(0);
    setStatus("idle");
  };

  const card =
    "overflow-hidden rounded-[28px] bg-night-2 shadow-[0_50px_100px_-50px_rgb(0_0_0/0.8)] ring-1 ring-line-dark";
  const label = "meta mb-2 flex justify-between text-soft";
  const error = "mt-2 text-[14px] text-danger";

  if (status === "sent") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className={`${card} p-8 text-center focus:outline-none sm:p-14`}>
        <span aria-hidden="true" className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-signal text-night shadow-[0_0_0_8px_rgb(244_194_13/0.12)]">
          <Check className="h-7 w-7" />
        </span>
        <p className="h-section mt-8 text-[clamp(30px,3vw,44px)]">Inquiry sent.</p>
        <p className="lede mx-auto mt-4">
          Thanks{sentTo.name ? `, ${sentTo.name}` : ""}. We’ll reply to <span className="text-day">{sentTo.email}</span>.
        </p>
        {sentTo.savedLocally && (
          <p className="mx-auto mt-8 max-w-[34em] rounded-[14px] border border-signal/40 bg-signal/10 px-4 py-3 text-left text-[14px] leading-relaxed text-day">
            <strong className="font-semibold">Development only:</strong> email is not set up, so this inquiry was saved to{" "}
            <code className="rounded bg-day/10 px-1">.data/inquiries.jsonl</code> and not emailed. Add{" "}
            <code className="rounded bg-day/10 px-1">RESEND_API_KEY</code> and <code className="rounded bg-day/10 px-1">INQUIRY_TO_EMAIL</code> to{" "}
            <code className="rounded bg-day/10 px-1">.env.local</code>, then restart the server.
          </p>
        )}
        <button type="button" onClick={reset} className="btn btn-sm mt-10 border border-line-dark text-day hover:border-day">
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={card}>
      {/* honeypot: hidden from people and assistive tech, bots fill it */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className="space-y-10 p-6 sm:p-10">
        <Group n={1} title="Your details">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fields.map((f) => (
              <div key={f.name} className={f.name === "company" ? "sm:col-span-2 lg:col-span-1" : ""}>
                <label htmlFor={f.name} className={label}>
                  <span>
                    {f.label}
                    {"required" in f && <span aria-hidden="true" className="text-signal"> *</span>}
                  </span>
                  {"optional" in f && <span className="font-normal text-day/40">Optional</span>}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  maxLength={f.maxLength}
                  required={"required" in f}
                  aria-invalid={!!errors[f.name]}
                  aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                  onBlur={() => "required" in f && check(f.name, false)}
                  onChange={() => errors[f.name] && check(f.name, true)}
                  className={`${control} h-12`}
                />
                {errors[f.name] && (
                  <p id={`${f.name}-error`} className={error}>
                    {errors[f.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Group>

        <div aria-hidden="true" className="h-px bg-line-dark" />

        <Group n={2} title="Your project">
          <fieldset>
            <legend className={`${label} w-full`}>
              <span>What are you working on?</span>
              <span className="font-normal text-day/40">Pick any</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => {
                const on = picked.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(t)}
                    className={`inline-flex h-10 items-center gap-2.5 rounded-full border pl-2.5 pr-4 text-[14px] font-medium transition-colors ${
                      on ? "border-signal bg-signal text-night" : "border-line-dark bg-day/[0.02] text-soft hover:border-day/35 hover:text-day"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${on ? "bg-night text-signal" : "border border-day/25"}`}
                    >
                      {on && <Check className="h-3 w-3" />}
                    </span>
                    {t}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-7">
            <label htmlFor="message" className={label}>
              <span>
                Tell us about your project <span aria-hidden="true" className="text-signal">*</span>
              </span>
              {messageLength > MESSAGE_MAX * 0.8 && (
                <span className="font-normal tabular-nums text-day/50">
                  {messageLength} / {MESSAGE_MAX}
                </span>
              )}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={MESSAGE_MAX}
              placeholder="What should the machine see, and what should it do with it?"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              onBlur={() => check("message", false)}
              onChange={(e) => {
                setMessageLength(e.target.value.length);
                if (errors.message) check("message", true);
              }}
              className={`${control} min-h-[140px] resize-y py-3.5 leading-relaxed`}
            />
            {errors.message && (
              <p id="message-error" className={error}>
                {errors.message}
              </p>
            )}
          </div>
        </Group>
      </div>

      {/* footer bar: status on the left, the action on the right */}
      <div className="flex flex-col gap-4 border-t border-line-dark bg-night/40 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div role="alert" className="text-[14px]">
          {status === "failed" ? (
            <span className="text-danger">
              Your inquiry wasn’t sent. Check your connection and try again, or message us on{" "}
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                LinkedIn
              </a>
              .
            </span>
          ) : (
            <span className="text-day/45">
              Fields marked <span className="text-signal">*</span> are required.
            </span>
          )}
        </div>
        <button type="submit" disabled={status === "sending"} className="btn btn-signal w-full shrink-0 px-8 disabled:opacity-60 sm:w-auto">
          {status === "sending" ? (
            <>
              <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-night/30 border-t-night" />
              Sending…
            </>
          ) : (
            <>
              Send inquiry
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5 21 3Z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

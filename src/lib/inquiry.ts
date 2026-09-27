export type Inquiry = {
  name: string;
  email: string;
  company: string;
  building: string;
  message: string;
};

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

// Shared by the form (instant feedback) and the API route (the real trust boundary).
export function validateInquiry(d: Inquiry): InquiryErrors {
  const e: InquiryErrors = {};
  if (!d.name.trim()) e.name = "Please enter your name.";
  if (!d.email.trim()) e.email = "Please enter your work email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "That email doesn’t look right.";
  if (!d.message.trim()) e.message = "Tell us a little about the project.";
  return e;
}

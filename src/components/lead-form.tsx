"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
      setMessage("Something interrupted the signal. Please try again.");
    }
  }

  if (status === "sent") return <div className="form-success"><CheckCircle2 size={25} /><div><strong>Signal received.</strong><span>We will be in touch within two business days.</span></div></div>;
  return <form className="lead-form" onSubmit={handleSubmit}><div className="form-grid"><label>Name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Company<input required name="company" placeholder="Company or project" /></label><label>What do you need?<select required name="service" defaultValue=""><option value="" disabled>Select a capability</option><option>Attention Architecture</option><option>Story & Brand Worlds</option><option>Amplification Systems</option><option>Conversion Experience</option><option>Growth Intelligence</option><option>Creative Studio</option></select></label></div><label className="full-field">Tell us where you are going<textarea required name="message" rows={4} placeholder="A little context goes a long way…" /></label><input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><button className="button button-primary form-submit" disabled={status === "sending"} type="submit">{status === "sending" ? "Sending…" : "Send the signal"} <Send size={16} /></button>{status === "error" && <p className="form-error" role="alert">{message}</p>}</form>;
}

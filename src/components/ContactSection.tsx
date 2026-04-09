"use client";

import { useState } from "react";
import { sendContactMessage } from "@/lib/supabase";

const PHONE = "9769793452";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setStatus("sending");
    const result = await sendContactMessage(form);
    if (result.success) {
      setStatus("sent");
      setForm({ name: "", phone: "", message: "" });
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="bg-surface py-16 px-5">
      <div className="max-w-md mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary mb-2">
            Place Your Order
          </p>
          <h2 className="font-display text-3xl font-bold text-on-surface mb-3">
            Ready to Taste
            <span className="text-primary block">Tradition?</span>
          </h2>
          <p className="font-sans text-on-surface-variant text-sm leading-relaxed">
            Place your order via phone or send us a message for an unforgettable
            dining experience.
          </p>
        </div>

        {/* Phone card */}
        <div className="card-surface p-5 mb-8 flex items-center justify-between">
          <div>
            <p className="font-sans text-xs text-on-surface-variant mb-1 uppercase tracking-wide">
              Order Hotline
            </p>
            <p className="font-display text-2xl font-bold text-on-surface">
              {PHONE}
            </p>
          </div>
          <a
            href={`tel:${PHONE}`}
            id="contact-call-btn"
            className="btn-cta px-5 py-3 text-sm flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            Call Now
          </a>
        </div>

        {/* Divider with label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-surface-container-highest" />
          <span className="font-sans text-xs text-on-surface-variant">
            or send a message
          </span>
          <div className="flex-1 h-px bg-surface-container-highest" />
        </div>

        {/* Contact form */}
        {status === "sent" ? (
          <div className="card-surface p-6 text-center">
            <span className="text-4xl block mb-3">🎉</span>
            <h3 className="font-display text-xl font-bold text-on-surface mb-2">
              Message Received!
            </h3>
            <p className="font-sans text-on-surface-variant text-sm">
              We&apos;ll call you back shortly to confirm your order.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="btn-ghost mt-5 px-5 py-2 text-sm"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="card-surface p-5 flex flex-col gap-4"
            noValidate
          >
            <div>
              <label
                htmlFor="contact-name"
                className="font-sans text-xs text-on-surface-variant mb-1.5 block"
              >
                Your Name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                className="input-field"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="font-sans text-xs text-on-surface-variant mb-1.5 block"
              >
                Phone Number
              </label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="e.g. 98765 43210"
                className="input-field"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="font-sans text-xs text-on-surface-variant mb-1.5 block"
              >
                Your Order / Message *
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="e.g. 2 portions of Chicken Biryani and 1 Fish Fry for delivery..."
                className="input-field resize-none"
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
              />
            </div>

            {status === "error" && (
              <p className="font-sans text-xs text-error bg-error-container/40 rounded-xl px-3 py-2">
                Something went wrong. Please call us directly at {PHONE}.
              </p>
            )}

            <button
              type="submit"
              id="contact-submit"
              disabled={status === "sending"}
              className="btn-cta px-6 py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <svg
                    className="animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending…
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

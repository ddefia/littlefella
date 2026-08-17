"use client";

import { FormEvent, useState } from "react";
import { SITE } from "@/lib/site";

type Status = "idle" | "empty" | "ready";

export function NoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();

    if (!name || !email || !note) {
      setStatus("empty");
      return;
    }

    const body = [
      `name: ${name}`,
      `email: ${email}`,
      company ? `company: ${company}` : null,
      "",
      note,
    ]
      .filter(Boolean)
      .join("\n");

    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `note from ${name}`,
    )}&body=${encodeURIComponent(body)}`;

    setStatus("ready");
    window.location.href = href;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" noValidate>
      <Field id="name" label="name" autoComplete="name" />
      <Field id="email" label="email" type="email" autoComplete="email" />
      <Field id="company" label="company" autoComplete="organization" />
      <label className="grid gap-2">
        <span className="text-[13px] font-medium lowercase tracking-[-0.02em]">
          note
        </span>
        <textarea
          id="note"
          name="note"
          rows={4}
          className="resize-y border border-lf-cream/40 bg-transparent px-3 py-3 text-[0.98rem] text-lf-cream placeholder:text-lf-cream/40 focus-visible:outline-offset-[-1px]"
        />
      </label>
      {status === "empty" ? (
        <p className="text-[13px] text-lf-cream" role="alert">
          name, email, and a note. then send.
        </p>
      ) : null}
      <button
        type="submit"
        className="w-fit bg-lf-cream px-5 py-3 text-[0.95rem] font-medium lowercase tracking-[-0.02em] text-lf-blue transition-opacity hover:opacity-80 active:translate-y-px"
      >
        send a note
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[13px] font-medium lowercase tracking-[-0.02em]">
        {label}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        className="border border-lf-cream/40 bg-transparent px-3 py-3 text-[0.98rem] text-lf-cream placeholder:text-lf-cream/40"
      />
    </label>
  );
}

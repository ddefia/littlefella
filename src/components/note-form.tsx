"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "empty" | "sending" | "sent" | "error";

export function NoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();

    if (!name || !email || !note) {
      setStatus("empty");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, company, note, website }),
      });
      const payload = (await response.json()) as { ok?: boolean };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      action="/api/note"
      method="post"
      onSubmit={onSubmit}
      className="relative grid gap-3"
      noValidate
    >
      <p className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
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
      {status === "error" ? (
        <p className="text-[13px] text-lf-cream" role="alert">
          didn&apos;t go through. try again.
        </p>
      ) : null}
      {status === "sent" ? (
        <p className="text-[13px] text-lf-cream" role="status">
          sent. we&apos;ll read it.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-fit bg-lf-cream px-5 py-3 text-[0.95rem] font-medium lowercase tracking-[-0.02em] text-lf-blue transition-opacity hover:opacity-80 enabled:active:translate-y-px disabled:opacity-60"
      >
        {status === "sending" ? "sending" : status === "sent" ? "sent" : "send a note"}
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

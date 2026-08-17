import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const inbox = process.env.NOTE_INBOX?.trim();
  const contentType = request.headers.get("content-type") ?? "";
  const formPost = !contentType.includes("application/json");

  function reply(ok: boolean, status = ok ? 200 : 502) {
    if (formPost) {
      const url = new URL(ok ? "/?note=sent#note" : "/?note=error#note", request.url);
      return NextResponse.redirect(url, 303);
    }
    return NextResponse.json({ ok }, { status });
  }

  if (!inbox) {
    return reply(false, 500);
  }

  let name = "";
  let email = "";
  let company = "";
  let note = "";
  let website = "";

  try {
    if (formPost) {
      const data = await request.formData();
      name = readString(data.get("name"));
      email = readString(data.get("email"));
      company = readString(data.get("company"));
      note = readString(data.get("note"));
      website = readString(data.get("website"));
    } else {
      const data = (await request.json()) as Record<string, unknown>;
      name = readString(data.name);
      email = readString(data.email);
      company = readString(data.company);
      note = readString(data.note);
      website = readString(data.website);
    }
  } catch {
    return reply(false, 400);
  }

  if (website) {
    return reply(true);
  }

  if (!name || !email || !note || !EMAIL.test(email)) {
    return reply(false, 400);
  }

  if (name.length > 200 || email.length > 200 || company.length > 200 || note.length > 8000) {
    return reply(false, 400);
  }

  const submitted = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://littlefella.vc",
        Referer: "https://littlefella.vc/",
      },
      body: JSON.stringify({
        name,
        email,
        company,
        note,
        _replyto: email,
        _subject: `little fella note from ${name}`,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  const payload = (await submitted.json().catch(() => null)) as
    | { success?: boolean | string; message?: string }
    | null;

  const accepted =
    submitted.ok &&
    payload != null &&
    (payload.success === true || payload.success === "true");

  if (!accepted) {
    return reply(false, 502);
  }

  return reply(true);
}

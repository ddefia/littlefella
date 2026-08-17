import { SITE } from "@/lib/site";

const links = [
  { href: "#companies", label: "companies" },
  { href: "#note", label: "send a note" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 bg-lf-blue">
      <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 md:px-8">
        <a
          href="#top"
          className="text-[15px] font-black lowercase tracking-[-0.04em] text-lf-cream"
        >
          {SITE.name}
        </a>
        <ul className="flex items-center gap-7 text-[13px] font-medium lowercase tracking-[-0.02em] text-lf-cream">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="decoration-lf-cream/0 underline-offset-[0.22em] transition-colors hover:underline hover:decoration-lf-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

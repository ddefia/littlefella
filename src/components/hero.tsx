"use client";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "motion/react";
import { useSectorFilter } from "@/components/sector-filter";
import { SECTORS, SITE, type SectorName } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { sector: active, setSector } = useSectorFilter();

  function onSector(name: SectorName) {
    setSector(active === name ? null : name);
    document.getElementById("companies")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col bg-lf-blue px-5 pb-0 pt-16 text-lf-cream md:px-8"
    >
      <div className="pointer-events-none absolute left-5 top-[4.5rem] h-10 w-10 border-l border-t border-lf-cream/80 md:left-8" />
      <div className="pointer-events-none absolute right-5 top-[4.5rem] h-10 w-10 border-r border-t border-lf-cream/80 md:right-8" />

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 content-center gap-10 py-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-stretch md:gap-16 md:py-8">
        <div className="flex flex-col justify-center">
          <motion.h1
            className="whitespace-nowrap font-black lowercase leading-[0.8] tracking-[-0.055em]"
            style={{ fontSize: "clamp(2.6rem, 7.2vw, 6.4rem)" }}
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, ease }}
          >
            {SITE.name}
          </motion.h1>
          <p className="mt-3 text-[1.15rem] font-medium lowercase tracking-[-0.03em] text-lf-cream/80 md:text-[1.35rem]">
            ventures
          </p>
          <p className="mt-8 max-w-[32ch] text-[1.02rem] font-medium leading-[1.4] tracking-[-0.02em] text-lf-cream/85">
            we get in early with strong founders, on work that will matter.
          </p>
          <a
            href="#note"
            className="mt-8 inline-block w-fit text-[0.95rem] font-medium lowercase underline decoration-lf-cream/70 underline-offset-[0.28em] transition-opacity hover:opacity-70"
          >
            send a note
          </a>
        </div>

        <ul className="flex h-full flex-col justify-between border-t border-lf-cream/35 md:border-t-0 md:border-l md:pl-12">
          {SECTORS.map((sector) => {
            const selected = active === sector.name;
            return (
              <li
                key={sector.name}
                className="border-b border-lf-cream/25 last:border-b-0"
              >
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-controls="companies"
                  onClick={() => onSector(sector.name)}
                  className="group flex w-full items-baseline justify-between gap-4 py-4 text-left md:py-5"
                >
                  <span>
                    <span
                      className="block font-black lowercase leading-[0.95] tracking-[-0.04em] underline-offset-[0.18em] transition-opacity group-hover:underline"
                      style={{ fontSize: "clamp(1.55rem, 2.6vw, 2.35rem)" }}
                    >
                      {sector.name}
                    </span>
                    <span className="mt-1 block max-w-[28ch] text-[13px] font-medium leading-snug tracking-[-0.015em] text-lf-cream/75">
                      {sector.line}
                    </span>
                  </span>
                  <ArrowRight
                    weight="bold"
                    size={18}
                    className={`mt-2 shrink-0 transition-opacity ${
                      selected
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Reveal, easeOut } from "@/components/reveal";
import { useSectorFilter } from "@/components/sector-filter";
import { COMPANIES } from "@/lib/site";

const duration = 0.22;

export function Companies() {
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const inView = useInView(listRef, { once: true, margin: "-80px" });
  const visible = Boolean(reduce || inView);
  const { sector, setSector } = useSectorFilter();
  const listed = sector
    ? COMPANIES.filter((company) => company.sector === sector)
    : COMPANIES;
  const hidden = {
    opacity: 0,
    transform: reduce ? "translateY(0px)" : "translateY(12px)",
  };
  const shown = { opacity: 1, transform: "translateY(0px)" };

  return (
    <section
      id="companies"
      className="scroll-mt-16 bg-lf-char px-5 py-16 text-lf-cream md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal kind="wipe">
          <h2
            className="max-w-[22ch] font-black lowercase leading-[1.02] tracking-[-0.045em]"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.8rem)" }}
          >
            some companies we&apos;ve recently invested in.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-[52ch] text-[0.95rem] font-medium leading-[1.4] tracking-[-0.015em] text-lf-mute">
            seed through early growth. no forced exit. some of these we bought on
            someone else&apos;s round. we are not the lead.
            {sector ? (
              <>
                {" "}
                {sector} only.{" "}
                <button
                  type="button"
                  onClick={() => setSector(null)}
                  className="underline decoration-lf-cream/40 underline-offset-[0.18em] transition-opacity hover:opacity-70"
                >
                  show all
                </button>
              </>
            ) : null}
          </p>
        </Reveal>
        <ul ref={listRef} className="relative mt-10">
          <AnimatePresence mode="popLayout">
            {listed.length === 0 ? (
              <motion.li
                key="empty"
                initial={hidden}
                animate={visible ? shown : hidden}
                exit={hidden}
                transition={{ duration: visible ? 0.45 : duration, ease: easeOut }}
                className="border-t border-lf-cream/15"
              >
                <p className="max-w-[46ch] py-6 text-[1.05rem] font-medium leading-[1.45] tracking-[-0.015em] text-lf-mute">
                  no company named here yet.{" "}
                  <a
                    href="#note"
                    className="text-lf-cream underline decoration-lf-cream/40"
                  >
                    send a note
                  </a>
                </p>
              </motion.li>
            ) : (
              listed.map((company, i) => (
                <motion.li
                  key={company.name}
                  layout={!reduce ? "position" : false}
                  initial={hidden}
                  animate={
                    visible
                      ? {
                          ...shown,
                          transition: {
                            duration: 0.45,
                            ease: easeOut,
                            delay: reduce ? 0 : i * 0.05,
                          },
                        }
                      : hidden
                  }
                  exit={{
                    ...hidden,
                    transition: { duration, ease: easeOut, delay: 0 },
                  }}
                  transition={{ duration, ease: easeOut }}
                  className="border-t border-lf-cream/15 last:border-b"
                >
                  <a
                    href={company.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 py-5 md:grid-cols-[7rem_minmax(0,0.38fr)_minmax(0,1fr)_auto] md:gap-8 md:py-6"
                  >
                    <span className="flex h-10 items-center">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className={`max-h-8 w-full object-contain object-left ${
                          company.invert ? "brightness-0 invert" : ""
                        }`}
                      />
                    </span>
                    <span
                      className="font-black leading-[1.05] tracking-[-0.04em] transition-colors group-hover:text-lf-blue"
                      style={{ fontSize: "clamp(1.35rem, 2.4vw, 2rem)" }}
                    >
                      {company.name}
                    </span>
                    <span className="col-span-2 text-[0.95rem] font-medium leading-[1.4] tracking-[-0.015em] text-lf-mute md:col-span-1 md:pt-1">
                      {company.line}
                    </span>
                    <ArrowUpRight
                      weight="bold"
                      size={20}
                      className="hidden text-lf-cream/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lf-blue md:block md:self-center"
                    />
                  </a>
                </motion.li>
              ))
            )}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}

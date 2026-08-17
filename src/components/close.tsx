import { SITE } from "@/lib/site";
import { NoteForm } from "@/components/note-form";
import { Reveal } from "@/components/reveal";

export function Close() {
  return (
    <section
      id="note"
      className="scroll-mt-16 bg-lf-blue px-5 py-16 text-lf-cream md:px-8 md:py-20"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start lg:gap-20">
        <div>
          <Reveal kind="wipe">
            <h2
              className="max-w-[12ch] font-black lowercase leading-[0.9] tracking-[-0.05em]"
              style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}
            >
              have a company?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[36ch] text-[1.08rem] font-medium leading-[1.45] tracking-[-0.015em] text-lf-cream/90">
              if you are raising, or you already run one, tell us what you are
              building.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-[0.95rem] font-medium tracking-[-0.02em] text-lf-cream/80">
              or mail{" "}
              <a href={`mailto:${SITE.email}`} className="underline decoration-lf-cream/50">
                {SITE.email}
              </a>
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <NoteForm />
        </Reveal>
      </div>
      <Reveal delay={0.08}>
        <footer className="mx-auto mt-16 flex max-w-[1400px] flex-col gap-2 border-t border-lf-cream/25 pt-6 text-[13px] font-medium lowercase tracking-[-0.02em] text-lf-cream/80 md:flex-row md:items-center md:justify-between">
          <p>{SITE.legal}</p>
          <a href={`mailto:${SITE.email}`} className="underline decoration-lf-cream/40">
            {SITE.email}
          </a>
        </footer>
      </Reveal>
    </section>
  );
}

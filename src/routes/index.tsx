import { createFileRoute } from "@tanstack/react-router";

import bride from "@/assets/bride.png";
import groom from "@/assets/groom.png";
import floralCorner from "@/assets/floral-corner.png";
import mandala from "@/assets/mandala.png";
import { Countdown } from "@/components/countdown";
import { Reveal } from "@/components/reveal";
import { ScratchCard } from "@/components/scratch-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarav & Meera — Wedding Invitation" },
      {
        name: "description",
        content:
          "You are warmly invited to the wedding of Aarav & Meera — 13 February 2027, Jaipur. Scratch the golden card to reveal the date and venue, and explore every celebration.",
      },
      { property: "og:title", content: "Aarav & Meera — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "A royal invitation — scratch the golden card, meet the couple and celebrate with us on 13 February 2027 in Jaipur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WEDDING_ISO = "2027-02-13T19:00:00+05:30";

const EVENTS = [
  {
    name: "Mehendi",
    letter: "M",
    day: "Thursday",
    date: "11 February 2027",
    time: "4:00 PM onwards",
    venue: "Garden Courtyard · Royal Orchid Palace",
    note: "Henna, folk music and evening chai",
  },
  {
    name: "Haldi",
    letter: "H",
    day: "Friday",
    date: "12 February 2027",
    time: "10:00 AM",
    venue: "Sharma House · Civil Lines",
    note: "Dress in yellow & white",
  },
  {
    name: "Sangeet",
    letter: "S",
    day: "Friday",
    date: "12 February 2027",
    time: "7:30 PM",
    venue: "Grand Ballroom · Royal Orchid Palace",
    note: "An evening of dance and performance",
  },
  {
    name: "Baraat & Varmala",
    letter: "B",
    day: "Saturday",
    date: "13 February 2027",
    time: "6:00 PM",
    venue: "Palace Forecourt · Royal Orchid Palace",
    note: "The groom's procession arrives",
  },
  {
    name: "Wedding Ceremony",
    letter: "W",
    day: "Saturday",
    date: "13 February 2027",
    time: "7:30 PM",
    venue: "Durbar Hall · Royal Orchid Palace",
    note: "Pheras under the starlit mandap",
  },
  {
    name: "Reception",
    letter: "R",
    day: "Sunday",
    date: "14 February 2027",
    time: "7:00 PM",
    venue: "Palace Lawns · Royal Orchid Palace",
    note: "Dinner, dancing and celebrations",
  },
];

function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-deep/60" />
      <svg width="14" height="14" viewBox="0 0 14 14" className="text-gold-deep">
        <rect x="3.5" y="3.5" width="7" height="7" transform="rotate(45 7 7)" fill="currentColor" />
      </svg>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-deep/60" />
    </div>
  );
}

function PersonCard({
  img,
  name,
  role,
  quote,
}: {
  img: string;
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <div className="group text-center">
      <div className="relative mx-auto w-64 md:w-72">
        <div className="frame-arch border border-gold/60 bg-card p-3 shadow-[0_24px_50px_-24px_oklch(0.45_0.06_50/0.45)]">
          <div className="frame-arch overflow-hidden">
            <img
              src={img}
              alt={`Portrait of ${name}`}
              width={768}
              height={1024}
              loading="lazy"
              className="kenburns aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
          </div>
        </div>
        <img
          src={floralCorner}
          alt=""
          width={1024}
          height={1024}
          loading="lazy"
          className="drift pointer-events-none absolute -bottom-8 -right-10 w-28 opacity-90"
        />
      </div>
      <h3 className="mt-8 font-display text-3xl text-foreground md:text-4xl">{name}</h3>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
        {role}
      </p>
      <p className="mx-auto mt-3 max-w-xs font-sans text-sm italic leading-relaxed text-muted-foreground">
        {quote}
      </p>
    </div>
  );
}

function EventCard({ event, index }: { event: (typeof EVENTS)[number]; index: number }) {
  return (
    <Reveal delay={(index % 2) * 120}>
      <article className="flex gap-6 rounded-3xl border border-gold/40 bg-card/90 p-6 shadow-[0_18px_40px_-26px_oklch(0.45_0.06_50/0.4)] md:p-8">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/70 bg-secondary/25">
          <span className="font-display text-2xl text-clay">{event.letter}</span>
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-2xl text-foreground md:text-3xl">{event.name}</h3>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            {event.day} · {event.date}
          </p>
          <p className="mt-3 font-sans text-sm font-medium text-foreground">{event.time}</p>
          <p className="mt-1 font-sans text-sm text-muted-foreground">{event.venue}</p>
          <p className="mt-2 font-sans text-sm italic text-muted-foreground">{event.note}</p>
        </div>
      </article>
    </Reveal>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-clip">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        <img
          src={mandala}
          alt=""
          width={1024}
          height={1024}
          className="spin-slower pointer-events-none absolute left-1/2 top-1/2 w-[88vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
        />
        <img
          src={floralCorner}
          alt=""
          width={1024}
          height={1024}
          className="float-slow pointer-events-none absolute -left-8 -top-8 w-52 opacity-95 md:w-80"
        />
        <img
          src={floralCorner}
          alt=""
          width={1024}
          height={1024}
          className="float-slow pointer-events-none absolute -bottom-8 -right-8 w-52 rotate-180 opacity-95 [animation-delay:-3.5s] md:w-80"
        />

        <div className="relative">
          <p
            className="anim-rise font-sans text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground md:text-sm"
            style={{ animationDelay: "120ms" }}
          >
            Together with their families
          </p>
          <h1 className="mt-8 font-display text-6xl leading-[1.04] text-foreground md:text-8xl">
            <span className="anim-rise block" style={{ animationDelay: "300ms" }}>
              Aarav
            </span>
            <span
              className="anim-rise gold-text my-2 block font-display text-4xl italic md:text-6xl"
              style={{ animationDelay: "480ms" }}
            >
              &
            </span>
            <span className="anim-rise block" style={{ animationDelay: "660ms" }}>
              Meera
            </span>
          </h1>
          <OrnamentDivider className="anim-rise mt-10" />
          <p
            className="anim-rise mt-6 font-sans text-sm font-medium tracking-[0.18em] text-muted-foreground md:text-base"
            style={{ animationDelay: "1000ms" }}
          >
            SATURDAY · 13 FEBRUARY 2027 · JAIPUR
          </p>
          <div className="anim-rise mt-14" style={{ animationDelay: "1300ms" }}>
            <span className="inline-flex h-11 w-11 animate-bounce items-center justify-center rounded-full border border-gold/60 text-gold-deep">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 6l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </section>

      {/* ── Greeting ─────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              With heartfelt joy
            </p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
              Two souls, one story —
              <br />
              <span className="gold-text italic">and a lifetime to tell it</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-8 font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
              With the blessings of our families, we joyfully invite you to share
              in our wedding celebrations. Your presence and good wishes would
              mean the world to us as we begin this beautiful journey together.
            </p>
            <OrnamentDivider className="mt-10" />
          </Reveal>
        </div>
      </section>

      {/* ── The couple ───────────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <img
          src={mandala}
          alt=""
          width={1024}
          height={1024}
          className="spin-slower pointer-events-none absolute -left-[30vmin] top-1/3 w-[60vmin] opacity-[0.05]"
        />
        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              The happy couple
            </p>
            <h2 className="mt-4 text-center font-display text-4xl text-foreground md:text-5xl">
              Meet Aarav & Meera
            </h2>
          </Reveal>
          <div className="mt-16 grid items-start gap-16 md:grid-cols-2 md:gap-10">
            <Reveal>
              <PersonCard
                img={bride}
                name="Meera Kapoor"
                role="The Bride"
                quote="An artist who paints the world in warmer colours."
              />
            </Reveal>
            <Reveal delay={180}>
              <PersonCard
                img={groom}
                name="Aarav Sharma"
                role="The Groom"
                quote="A dreamer with a heart full of poetry and songs."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Scratch card ─────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              A little secret awaits
            </p>
            <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
              Scratch to unveil the big day
            </h2>
            <p className="mt-4 font-sans text-sm text-muted-foreground md:text-base">
              Beneath the golden foil lies our wedding date and venue —
              gently scratch with your finger or mouse to reveal it.
            </p>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <ScratchCard className="mx-auto mt-12 aspect-[16/10] max-w-xl overflow-hidden rounded-3xl border border-gold/60 shadow-[0_30px_60px_-30px_oklch(0.4_0.06_50/0.55)]">
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-secondary/25 via-card to-accent/15 px-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
                Save the date
              </p>
              <p className="gold-text mt-3 font-display text-5xl md:text-6xl">13 · 02 · 2027</p>
              <p className="mt-3 font-display text-xl italic text-foreground md:text-2xl">
                Saturday, half past six in the evening
              </p>
              <OrnamentDivider className="my-5" />
              <p className="font-sans text-base font-semibold text-foreground">
                The Royal Orchid Palace
              </p>
              <p className="mt-1 font-sans text-sm text-muted-foreground">
                Jal Mahal Road, Jaipur, Rajasthan
              </p>
            </div>
          </ScratchCard>
        </Reveal>
      </section>

      {/* ── Countdown ────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Counting every moment
              </p>
              <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
                Until we say “I do”
              </h2>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <Countdown targetISO={WEDDING_ISO} className="mt-12" />
          </Reveal>
        </div>
      </section>

      {/* ── Functions & timings ──────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <img
          src={mandala}
          alt=""
          width={1024}
          height={1024}
          className="spin-slower pointer-events-none absolute -right-[30vmin] top-1/4 w-[60vmin] opacity-[0.05]"
        />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                The celebrations
              </p>
              <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
                Functions, dates & timings
              </h2>
              <OrnamentDivider className="mt-8" />
            </div>
          </Reveal>
          <div className="mt-12 space-y-5">
            {EVENTS.map((event, i) => (
              <EventCard key={event.name} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Blessings & RSVP ─────────────────────────────────── */}
      <footer className="relative overflow-hidden px-6 pb-24 pt-16 text-center md:pt-24">
        <img
          src={mandala}
          alt=""
          width={1024}
          height={1024}
          className="spin-slower pointer-events-none absolute left-1/2 top-1/2 w-[70vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        />
        <img
          src={floralCorner}
          alt=""
          width={1024}
          height={1024}
          className="float-slow pointer-events-none absolute -left-6 -top-6 w-40 opacity-90 md:w-56"
        />
        <img
          src={floralCorner}
          alt=""
          width={1024}
          height={1024}
          className="float-slow pointer-events-none absolute -bottom-6 -right-6 w-40 rotate-180 opacity-90 [animation-delay:-3.5s] md:w-56"
        />
        <div className="relative mx-auto max-w-xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              With love & blessings
            </p>
            <p className="mt-5 font-display text-3xl text-foreground md:text-4xl">
              The Sharma & Kapoor Families
            </p>
            <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground">
              We cannot wait to celebrate with you. Kindly RSVP by
              20 January 2027.
            </p>
            <OrnamentDivider className="mt-8" />
            <p className="mt-6 font-sans text-sm font-medium tracking-[0.12em] text-foreground">
              +91 98765 43210 · aarav.meera@wedding.example
            </p>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}

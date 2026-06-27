import { RainbowFooter } from "./components/RainbowFooter";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function ContentSection({
  id,
  title,
  subtitle,
  index,
}: {
  id: string;
  title: string;
  subtitle: string;
  index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <section
      id={id}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <span className="mb-4 block text-[11px] font-medium tracking-[0.12em] text-neutral-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div
          className={`grid gap-12 ${
            isEven ? "md:grid-cols-[1fr_1.5fr]" : "md:grid-cols-[1.5fr_1fr]"
          }`}
        >
          <div className={isEven ? "md:order-1" : "md:order-2"}>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] text-neutral-900">
              {title}
            </h2>
          </div>
          <div className={isEven ? "md:order-2" : "md:order-1"}>
            <p className="text-[15px] leading-relaxed text-neutral-500">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const SECTIONS = [
  {
    id: "start",
    title: "Start your day two steps ahead",
    subtitle:
      "Before the day kicks in, Dia's Morning Brief lays it all out \u2014 calendar, inbox, key links \u2014 so you know exactly what you're walking into.",
  },
  {
    id: "synthesis",
    title: "Synthesis you'll actually use",
    subtitle:
      "Instead of bouncing between tools, just ask Dia. It gathers what's scattered across Slack, Notion, Calendar, and turns it into a report worth sharing.",
  },
  {
    id: "answers",
    title: "Find the answer without hunting it down",
    subtitle:
      "Ask once. Dia digs into your full context, across GSuite, Slack, tabs, and more, and answers like someone who's seen every thread.",
  },
  {
    id: "built",
    title: "Built for how you actually work",
    subtitle:
      "Decks, Live Work, Better Meetings, Profiles, Splits, Organized Tabs \u2014 Dia is designed for the way modern work flows.",
  },
  {
    id: "privacy",
    title: "Privacy first with you in control",
    subtitle:
      "You control whether Dia remembers your preferences and which tools connect to your workflow. Your data is never sold or used to build ad profiles.",
  },
];

export default function App() {
  useSmoothScroll();

  return (
    <div className="relative bg-white">
      <main className="relative z-10 bg-white">
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-6 block text-[11px] font-medium tracking-[0.15em] text-neutral-400">
              SCROLL
            </span>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.03em] text-neutral-900">
              Rainbow
              <br />
              <span className="bg-gradient-to-r from-rainbow-1 via-rainbow-4 to-rainbow-5 bg-clip-text text-transparent">
                Stretching
              </span>
              <br />
              Footer
            </h1>
            <p className="mx-auto mt-6 max-w-md text-[14px] leading-relaxed text-neutral-500">
              A scroll-driven 3D animation that reveals a vibrant rainbow footer
              as you reach the bottom of the page.
            </p>
          </div>
        </section>

        {SECTIONS.map((section, i) => (
          <ContentSection
            key={section.id}
            id={section.id}
            title={section.title}
            subtitle={section.subtitle}
            index={i}
          />
        ))}

        <div className="h-[200vh] bg-white" aria-hidden="true" />
      </main>

      <RainbowFooter />
    </div>
  );
}

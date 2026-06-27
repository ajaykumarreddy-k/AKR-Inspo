import { type MotionValue, motion, useTransform } from "framer-motion";

interface FooterContentProps {
  textProgress: MotionValue<number>;
}

const LINK_GROUPS = [
  [
    { label: "BY FRAMER UNIVERSITY", href: "#" },
    { label: "X", href: "#" },
    { label: "INSTAGRAM", href: "#" },
    { label: "LINKEDIN", href: "#" },
  ],
  [
    { label: "PRIVACY POLICY", href: "#" },
    { label: "CURRENT STATUS:", href: "#" },
    { label: "CAREERS", href: "#" },
    { label: "BETA", href: "#" },
  ],
] as const;

function LinkRow({
  links,
  index,
  progress,
}: {
  links: readonly { readonly label: string; readonly href: string }[];
  index: number;
  progress: MotionValue<number>;
}) {
  const delay = index * 0.08;
  const y = useTransform(progress, [delay, 1], [36, 0]);
  const opacity = useTransform(progress, [delay, delay + 0.12], [0, 1]);

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-x-8 gap-y-2"
      style={{ y, opacity, willChange: "transform, opacity" }}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="whitespace-nowrap text-[11px] font-mono font-medium tracking-[0.1em] text-neutral-900 transition-colors duration-300 hover:text-neutral-600"
        >
          {link.label}
        </a>
      ))}
    </motion.div>
  );
}

export function FooterContent({ textProgress }: FooterContentProps) {
  const headingY = useTransform(textProgress, [0, 1], [44, 0]);
  const headingOpacity = useTransform(
    textProgress,
    [0, 0.12],
    [0, 1]
  );

  const subtitleY = useTransform(textProgress, [0.04, 1], [32, 0]);
  const subtitleOpacity = useTransform(
    textProgress,
    [0.04, 0.16],
    [0, 1]
  );

  const scrollY = useTransform(textProgress, [0, 1], [28, 0]);
  const scrollOpacity = useTransform(textProgress, [0, 0.1], [0, 1]);

  return (
    <motion.div
      className="absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center px-6"
      style={{
        bottom: "55%",
        willChange: "transform",
      }}
    >

      <motion.h2
        className="max-w-3xl text-center text-[11px] font-mono font-medium tracking-[0.1em] text-neutral-900 uppercase"
        style={{ y: headingY, opacity: headingOpacity }}
      >
        DESIGNED BY DIA, REBUILT IN FRAMER
      </motion.h2>

      <div className="mt-8 space-y-3">
        {LINK_GROUPS.map((group, i) => (
          <LinkRow
            key={i}
            links={group}
            index={i}
            progress={textProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}

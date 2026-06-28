import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const BackgroundColorChange = () => {
  const { scrollYProgress } = useScroll();

  // Map scroll progress to background colors based on the sections:
  // Black -> Pink -> Green
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgb(0, 0, 0)", "rgb(252, 82, 255)", "rgb(179, 255, 153)"]
  );

  return (
    <>
      {/* Fixed background that smoothly interpolates color based on scroll */}
      <motion.div
        className="fixed inset-0 -z-10 h-full w-full"
        style={{ backgroundColor }}
      />
      
      {/* The scrolling content container */}
      <main className="relative w-full">
        {/* SECTION 1: Black Background Content */}
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <div className="flex flex-col items-center justify-center pt-[10vh]">
            <h1 className="text-[4.5rem] font-medium leading-[1.05] tracking-[-0.04em] text-white md:text-[6.5rem]">
              One scroll.<br />Infinite vibes.
            </h1>
            <p className="mx-auto mt-8 max-w-[600px] text-lg font-medium leading-relaxed text-[#e0e0e0] md:text-xl">
              Background Changer changes your site's background color<br className="hidden sm:block" />
              as visitors scroll, creating a seamless, cinematic atmosphere
            </p>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm font-bold tracking-[0.25em] text-white">
            SCROLL
          </div>
        </section>

        {/* SECTION 2: Pink Background Content */}
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center text-[#490909]">
          <h2 className="text-[5rem] font-medium leading-[1.05] tracking-[-0.04em] md:text-[7.5rem]">
            Oh.
          </h2>
          <p className="mt-4 text-lg font-bold leading-[1.4] md:text-xl">
            it's already working. you didn't do anything.<br />
            just scrolled. that's the whole point.
          </p>
        </section>

        {/* SECTION 3: Green Background Content */}
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center text-[#530753]">
          <h2 className="text-[5rem] font-medium leading-[1.05] tracking-[-0.04em] md:text-[7.5rem]">
            Again?
          </h2>
          <p className="mt-4 text-lg font-bold leading-[1.4] md:text-xl">
            yes again, every section<br />
            gets its own mood.
          </p>
        </section>
      </main>
    </>
  );
};

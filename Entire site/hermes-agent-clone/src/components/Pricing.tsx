export default function Pricing() {
  return (
    <section className="px-8 py-24 bg-brand-blue text-white flex flex-col items-center text-center gap-y-12">
      <div className="space-y-6 max-w-3xl">
        <p className="text-[11px] md:text-sm font-mono uppercase tracking-[0.3em] opacity-80 flex justify-center gap-4">
          <span>Free</span> <span>•</span> <span>Plus</span> <span>•</span> <span>Super</span> <span>•</span> <span>Ultra</span>
        </p>
        <h2 className="font-serif text-5xl md:text-6xl mt-4">Nous Portal</h2>
        <p className="mx-auto text-xs md:text-sm font-mono leading-relaxed mt-6">
          ALL PAID TIERS INCLUDE MONTHLY CREDITS FOR USE IN HERMES AGENT, ACCESS TO 300+ CUTTING-EDGE MODELS AND BUILT-IN TOOL USE
        </p>
      </div>
      <button className="bg-white text-brand-blue px-8 py-3 text-sm font-sans font-semibold uppercase hover:bg-opacity-90 transition-all cursor-pointer rounded-none">
        View All Our Plans
      </button>
    </section>
  );
}

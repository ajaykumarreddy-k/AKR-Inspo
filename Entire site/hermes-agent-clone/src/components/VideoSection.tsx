export default function VideoSection() {
  return (
    <section className="px-8 md:px-24 mb-32">
      <div className="relative w-full aspect-[21/9] bg-brand-blue overflow-hidden flex items-center justify-center border-y border-white/10">
        {/* Background artwork */}
        <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=2000" alt="Background" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40" />
        
        {/* Terminal Window */}
        <div className="relative z-10 w-full max-w-2xl bg-black rounded-lg shadow-2xl overflow-hidden border border-white/10">
          <div className="flex items-center px-4 py-3 bg-[#2D2D2D]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="flex-1 text-center text-xs font-mono text-white/60">Terminal — zsh</div>
          </div>
          <div className="p-6 font-mono text-sm md:text-base h-64 text-left">
            <span className="text-[#27C93F]">~ %</span> <span className="text-white">hermes deskt</span><span className="animate-pulse bg-white text-black inline-block w-2.5 h-5 align-middle ml-0.5"></span>
          </div>
        </div>
      </div>
    </section>
  );
}

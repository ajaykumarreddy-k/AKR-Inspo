import { FlaskConical, Copy } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative px-8 md:px-24 mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" id="hero">
      <div className="space-y-12 z-10 relative">
        <div className="space-y-4">
          <p className="text-[10px] font-mono tracking-widest uppercase opacity-80">Open Source • MIT License</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
            THE AGENT<br />THAT GROWS<br />WITH YOU
          </h1>
        </div>
        {/* Download Buttons */}
        <div className="space-y-6 max-w-md">
          <div>
            <p className="text-[10px] font-mono uppercase mb-3 opacity-60 tracking-widest">Install Desktop App</p>
            <a className="inline-flex items-center gap-2 bg-white text-brand-blue px-4 py-3 text-[10px] font-mono font-bold uppercase transition-transform active:scale-95 cursor-pointer" href="#">
              <FlaskConical className="h-4 w-4" />
              INSTALL VIA TERMINAL
            </a>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase mb-3 opacity-60 tracking-widest">Install via Terminal</p>
            <div className="flex text-[10px] font-mono uppercase">
              <span className="bg-white text-brand-blue px-4 py-2 font-bold">macOS / Linux</span>
              <span className="px-4 py-2 opacity-60 border border-transparent">Windows</span>
            </div>
            <div className="bg-white text-brand-blue p-4 flex justify-between items-center font-mono text-[11px] group border border-white">
              <code className="break-all font-medium opacity-90">curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash</code>
              <button className="ml-4 opacity-40 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Artwork */}
      <div className="relative mt-8 lg:mt-0">
        <img alt="Hermes Hero Artwork" className="w-full mix-blend-screen opacity-90" src="https://lh3.googleusercontent.com/aida/AP1WRLshu2axp4yBvM7cmPey8p1vTQT2ZrtqkNVuXrnum0AL8zN8fdHFgR9-q87Ab7SwbiUU-_bEGJ9TKsOJtf6r7bwji6TPHSy8RbmUEbV29zkN8F9XGx2xeZZg_wL453_qDnKSqQtzssK-z-RPLq7ED9fMNWln7mfgZXLYJnO6Vn5weEtNJutmqHPKRE8VebIyEiemHkelyHnTf29_--BNsDw-7-c_hOxRfYyJ8lzwyq5GgMyRiZm3mhZdt-w" />
      </div>
    </section>
  );
}

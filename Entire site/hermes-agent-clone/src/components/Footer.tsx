export default function Footer() {
  return (
    <footer className="px-8 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono uppercase tracking-widest opacity-60 bg-brand-blue text-white">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <span>NousPortal</span>
        <span>Hermes Agent v0.17.0</span>
      </div>
      <div className="font-serif text-xl tracking-normal normal-case opacity-100">Nous Research</div>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <span>MIT License</span>
        <span>2026</span>
      </div>
    </footer>
  );
}

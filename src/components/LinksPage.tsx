import { ArrowLeft, ArrowUpRight, Sparkles, Bookmark } from "lucide-react";

interface LinksPageProps {
  onNavigate: (path: string) => void;
}

export function LinksPage({ onNavigate }: LinksPageProps) {
  const links = [
    {
      title: "Bookmark Portal",
      subtitle: "Secure decryption game to unlock premium bookmark link",
      url: "sub1.html",
      icon: <Bookmark className="w-6 h-6" />,
      username: "sub1.html",
      color: "hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white hover:border-indigo-600",
      isExternalPage: true
    },
    {
      title: "Inspiration Board",
      subtitle: "Curated design layouts, typography & art",
      url: "/inspiration",
      icon: <Sparkles className="w-6 h-6" />,
      username: "/inspiration",
      color: "hover:bg-[#FF4200] hover:text-black hover:border-[#FF4200]",
      isInspiration: true
    }
  ];

  return (
    <div className="w-full max-w-[760px] mx-auto px-5 py-12 md:py-20 z-10 flex-grow flex flex-col justify-center animate-fade-in">
      {/* Back Navigation */}
      <button
        onClick={() => onNavigate("/")}
        className="group mb-12 flex items-center gap-2.5 text-sm font-semibold tracking-tight text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer w-fit"
      >
        <span className="p-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-all">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </span>
        Back to Showcase
      </button>

      {/* Profile Header */}
      <header className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center gap-6 md:gap-8 border-b border-neutral-100 dark:border-neutral-900 pb-12">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-[#FF4200] border-2 border-black/10 dark:border-white/15 shadow-md flex items-center justify-center select-none">
          <img 
            src="/me.png" 
            alt="Ajay Kumar Reddy Profile" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const textNode = document.createElement('span');
                textNode.className = 'text-black text-3xl font-black tracking-tighter';
                textNode.innerText = 'AK';
                parent.appendChild(textNode);
              }
            }}
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 mb-2">
            Ajay Kumar Reddy
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400 font-medium max-w-md">
            Developer & Designer • Design Lead at SLUGnPLUG • B.Tech CSE at SRM IST
          </p>
        </div>
      </header>

      {/* Directory Section */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-6 pl-2">
          Most Used Connections
        </h2>

        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            onClick={(e) => {
              if (link.isInspiration) {
                e.preventDefault();
                onNavigate("/inspiration");
              }
            }}
            className={`group flex items-center justify-between p-5 md:p-6 rounded-[24px] border border-black/10 dark:border-white/10 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-md transition-all duration-300 ${link.color} shadow-sm`}
          >
            <div className="flex items-center gap-5 min-w-0">
              <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] text-neutral-700 dark:text-neutral-300 group-hover:bg-white/20 group-hover:text-inherit transition-all">
                {link.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold tracking-tight mb-0.5">{link.title}</h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-inherit opacity-90 truncate max-w-[250px] sm:max-w-xs md:max-w-md">
                  {link.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs font-mono font-semibold tracking-tight opacity-50 group-hover:opacity-80 transition-opacity">
                {link.username}
              </span>

              <div className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-neutral-700 dark:text-neutral-300 group-hover:bg-white/20 group-hover:text-inherit transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Subtle Footer Quote */}
      <footer className="mt-16 text-center text-xs font-mono font-medium text-neutral-400 dark:text-neutral-500 tracking-wider">
        DESIGNED FOR CONVENIENT CONNECTIONS
      </footer>
    </div>
  );
}

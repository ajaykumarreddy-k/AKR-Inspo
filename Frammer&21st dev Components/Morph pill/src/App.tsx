import React, { useState } from "react";
import { MorphImagePill } from "./MorphImagePill";
import { HoverAnnotation } from "./HoverAnnotation";
import { Check, Copy, Sparkles, Sliders, RefreshCw, UserCheck } from "lucide-react";

const PRESETS = [
  {
    name: "John Doe",
    role: "Senior Product Designer",
    company: "Ramp · San Francisco",
    email: "john.doe@example.com",
    phone: "+1 (123) 456 7890",
    bio: "Leads product design across onboarding, workflow automation, and internal tools while maintaining the company's shared design system.",
    image: "https://framerusercontent.com/images/g0nFuMFtxtjvLrcYFrB9GZaA.png?width=482&height=640",
    buttonText: "Send Message",
  },
  {
    name: "Sarah Chen",
    role: "Staff AI Engineer",
    company: "Anthropic · San Francisco",
    email: "sarah.chen@example.com",
    phone: "+1 (415) 890 1234",
    bio: "Pioneering next-gen neural architectures and reasoning models. Passionate about user-centric AI interfaces and safety frameworks.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop",
    buttonText: "View Portfolio",
  },
  {
    name: "Alex Rivera",
    role: "Head of Growth",
    company: "Vercel · New York",
    email: "alex.rivera@example.com",
    phone: "+1 (212) 345 6789",
    bio: "Driving developer adoption and ecosystem growth across frontend infrastructure tools and global serverless platforms.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
    buttonText: "Schedule Call",
  },
];

export function App() {
  const [activePreset, setActivePreset] = useState(0);
  const [customProps, setCustomProps] = useState(PRESETS[0]);
  const [showControls, setShowControls] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectPreset = (index: number) => {
    setActivePreset(index);
    setCustomProps(PRESETS[index]);
  };

  const handleCopyCode = () => {
    const snippet = `<MorphImagePill
  title="${customProps.name}"
  subtext1="${customProps.role}"
  subtext2="${customProps.company}"
  iconText1="${customProps.email}"
  iconText2="${customProps.phone}"
  descriptionText="${customProps.bio}"
  buttonLabel="${customProps.buttonText}"
  image="${customProps.image}"
/>`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    triggerToast("Component code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-between font-sans relative overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header / Bar */}
      <header className="w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
            M
          </div>
          <span className="font-semibold text-sm tracking-tight text-gray-900">
            Morph Image Pill
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
            Framer Interactive Component
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowControls(!showControls)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
              showControls
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            <Sliders size={13} />
            <span>{showControls ? "Hide Controls" : "Customize Props"}</span>
          </button>
          <button
            onClick={handleCopyCode}
            className="px-3.5 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-medium shadow-sm transition-all flex items-center gap-1.5"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? "Copied!" : "Copy Code"}</span>
          </button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-6 relative">
        {/* Component Display (Matching reference screenshots perfectly) */}
        <div className="flex flex-col items-center justify-center py-16 w-full">
          <HoverAnnotation />
          <div className="mt-1 flex items-center justify-center">
            <MorphImagePill
              title={customProps.name}
              subtext1={customProps.role}
              subtext2={customProps.company}
              iconText1={customProps.email}
              iconText2={customProps.phone}
              descriptionText={customProps.bio}
              buttonLabel={customProps.buttonText}
              image={customProps.image}
              onButtonClick={() => triggerToast(`Clicked "${customProps.buttonText}"!`)}
            />
          </div>
        </div>

        {/* Customization Drawer / Control Panel */}
        {showControls && (
          <div className="w-full max-w-xl bg-gray-50/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-5 mb-8 shadow-sm transition-all animate-fadeIn">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200/60">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Preset Profiles
              </h4>
              <div className="flex items-center gap-1.5">
                {PRESETS.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => handleSelectPreset(i)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      activePreset === i
                        ? "bg-white text-gray-900 shadow-xs border border-gray-200"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {p.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-500 font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={customProps.name}
                  onChange={(e) => setCustomProps({ ...customProps, name: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-500 font-medium mb-1">Role / Subtext 1</label>
                <input
                  type="text"
                  value={customProps.role}
                  onChange={(e) => setCustomProps({ ...customProps, role: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-500 font-medium mb-1">Company & Location</label>
                <input
                  type="text"
                  value={customProps.company}
                  onChange={(e) => setCustomProps({ ...customProps, company: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-500 font-medium mb-1">Button Label</label>
                <input
                  type="text"
                  value={customProps.buttonText}
                  onChange={(e) => setCustomProps({ ...customProps, buttonText: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-500 font-medium mb-1">Email</label>
                <input
                  type="text"
                  value={customProps.email}
                  onChange={(e) => setCustomProps({ ...customProps, email: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-500 font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={customProps.phone}
                  onChange={(e) => setCustomProps({ ...customProps, phone: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 focus:outline-none focus:border-gray-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-500 font-medium mb-1">Bio / Description</label>
                <textarea
                  rows={2}
                  value={customProps.bio}
                  onChange={(e) => setCustomProps({ ...customProps, bio: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 focus:outline-none focus:border-gray-400 resize-none"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-gray-400 border-t border-gray-100">
        Morph Image Pill Component · Built with Bun, React 19 & Framer Motion
      </footer>
    </div>
  );
}

export default App;

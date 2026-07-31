import React, { useState } from "react";
import {
  Sun,
  Moon,
  MousePointer,
  Hand,
  Play,
  Pause,
  Code2,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { TabsCard } from "./TabsCard";
import { PRESETS } from "../data/presets";
import { TabItem, TriggerMode } from "../types";

export const TabsCardShowcase: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("architecture");
  const [triggerMode, setTriggerMode] = useState<TriggerMode>("hover");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [customItems, setCustomItems] = useState<TabItem[]>(PRESETS[0].items);
  const [activeTabLog, setActiveTabLog] = useState<string>(PRESETS[0].items[0].title);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [showEditor, setShowEditor] = useState<boolean>(false);

  // Handle Preset Change
  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setCustomItems(preset.items);
      setActiveTabLog(preset.items[0].title);
    }
  };

  const handleTabItemChange = (index: number, field: keyof TabItem, value: string) => {
    const updated = [...customItems];
    updated[index] = { ...updated[index], [field]: value };
    setCustomItems(updated);
  };

  const handleAddTab = () => {
    const newId = `custom-${Date.now()}`;
    setCustomItems([
      ...customItems,
      {
        id: newId,
        title: `New Feature ${customItems.length + 1}`,
        description: "Add custom description for your brand component showcase here.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
        badge: "New",
        iconName: "Sparkles",
      },
    ]);
  };

  const handleRemoveTab = (index: number) => {
    if (customItems.length <= 1) return;
    const updated = customItems.filter((_, i) => i !== index);
    setCustomItems(updated);
  };

  const generatedCode = `<TabsCard
  triggerMode="${triggerMode}"
  isDarkMode={${isDarkMode}}
  autoPlay={${autoPlay}}
  items={[
${customItems
  .map(
    (item) => `    {
      id: "${item.id}",
      title: "${item.title}",
      description: "${item.description}",
      image: "${item.image}",
      badge: "${item.badge || ""}"
    }`
  )
  .join(",\n")}
  ]}
/>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 font-sans ${
        isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"
      } py-10 px-4 md:px-8 flex flex-col items-center justify-start gap-8`}
    >
      {/* Header Banner */}
      <header className="max-w-4xl w-full text-center flex flex-col items-center gap-3">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Tabs Card Switchover
        </h1>
        <p className={`text-base md:text-lg max-w-2xl ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
          Smooth hover & click interactive tab cards with inverted concave corners, fluid spring physics, and responsive preview image transitions.
        </p>
      </header>

      {/* Interactive Control Panel Toolbar */}
      <div
        className={`w-full max-w-[1104px] p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 transition-colors ${
          isDarkMode
            ? "bg-slate-950/80 border-slate-800 backdrop-blur-md shadow-xl"
            : "bg-white/80 border-slate-200 backdrop-blur-md shadow-lg"
        }`}
      >
        {/* Preset Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold uppercase text-slate-400 mr-1">
            Presets:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id)}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                selectedPresetId === preset.id
                  ? isDarkMode
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-900 text-white shadow-md"
                  : isDarkMode
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Trigger Mode */}
          <div
            className={`flex items-center p-1 rounded-xl border ${
              isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}
          >
            <button
              onClick={() => setTriggerMode("hover")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                triggerMode === "hover"
                  ? isDarkMode
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Switch tab on Mouse Hover"
            >
              <MousePointer className="w-3.5 h-3.5" /> Hover
            </button>
            <button
              onClick={() => setTriggerMode("click")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                triggerMode === "click"
                  ? isDarkMode
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Switch tab on Mouse Click"
            >
              <Hand className="w-3.5 h-3.5" /> Click
            </button>
          </div>

          {/* AutoPlay Toggle */}
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              autoPlay
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 font-semibold"
                : isDarkMode
                ? "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900"
            }`}
          >
            {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            Auto-Play {autoPlay && "ON"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border transition-all ${
              isDarkMode
                ? "bg-slate-900 text-amber-400 border-slate-800 hover:bg-slate-800"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
            title="Toggle Light / Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Customize Data Editor */}
          <button
            onClick={() => setShowEditor(!showEditor)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              showEditor
                ? "bg-indigo-600 text-white border-indigo-600"
                : isDarkMode
                ? "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> Edit Items
          </button>

          {/* Code Viewer */}
          <button
            onClick={() => setShowCodeModal(!showCodeModal)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              showCodeModal
                ? "bg-indigo-600 text-white border-indigo-600"
                : isDarkMode
                ? "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> JSX Code
          </button>
        </div>
      </div>

      {/* Main Showcase Component Frame */}
      <main className="w-full max-w-[1104px] flex flex-col items-center gap-4">
        <TabsCard
          items={customItems}
          triggerMode={triggerMode}
          isDarkMode={isDarkMode}
          autoPlay={autoPlay}
          onChange={(id, item) => setActiveTabLog(item.title)}
        />

        {/* Live Active Status Bar */}
        <div className="flex items-center justify-between w-full text-xs text-slate-400 px-2">
          <span>Active Selection: <strong className="text-indigo-500 font-semibold">{activeTabLog}</strong></span>
          <span>Trigger: <strong className="capitalize">{triggerMode}</strong> | Mode: <strong>{isDarkMode ? "Dark" : "Light"}</strong></span>
        </div>
      </main>

      {/* Custom Item Content Editor Panel */}
      {showEditor && (
        <div
          className={`w-full max-w-[1104px] p-6 rounded-2xl border transition-colors ${
            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-lg"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-500" /> Customize Tab Items
            </h3>
            <button
              onClick={handleAddTab}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Tab Item
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className={`p-4 rounded-xl border flex flex-col gap-2 relative ${
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-400">
                    Tab #{idx + 1}
                  </span>
                  {customItems.length > 1 && (
                    <button
                      onClick={() => handleRemoveTab(idx)}
                      className="text-red-400 hover:text-red-500 p-1 rounded hover:bg-red-500/10 transition-colors"
                      title="Remove tab"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleTabItemChange(idx, "title", e.target.value)}
                  placeholder="Title"
                  className={`px-3 py-1.5 rounded-lg text-sm border font-medium ${
                    isDarkMode
                      ? "bg-slate-950 border-slate-800 text-white"
                      : "bg-white border-slate-200 text-slate-900"
                  }`}
                />

                <textarea
                  value={item.description}
                  onChange={(e) => handleTabItemChange(idx, "description", e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className={`px-3 py-1.5 rounded-lg text-xs border ${
                    isDarkMode
                      ? "bg-slate-950 border-slate-800 text-slate-300"
                      : "bg-white border-slate-200 text-slate-700"
                  }`}
                />

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.image}
                    onChange={(e) => handleTabItemChange(idx, "image", e.target.value)}
                    placeholder="Image URL"
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs border ${
                      isDarkMode
                        ? "bg-slate-950 border-slate-800 text-slate-300"
                        : "bg-white border-slate-200 text-slate-700"
                    }`}
                  />
                  <input
                    type="text"
                    value={item.badge || ""}
                    onChange={(e) => handleTabItemChange(idx, "badge", e.target.value)}
                    placeholder="Badge (optional)"
                    className={`w-28 px-3 py-1.5 rounded-lg text-xs border ${
                      isDarkMode
                        ? "bg-slate-950 border-slate-800 text-slate-300"
                        : "bg-white border-slate-200 text-slate-700"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Snippet Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-2xl p-6 rounded-2xl border shadow-2xl flex flex-col gap-4 ${
              isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-500" /> React Component Usage
              </h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? "Copied!" : "Copy Code"}
              </button>
            </div>

            <pre
              className={`p-4 rounded-xl text-xs font-mono overflow-x-auto border ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-indigo-300"
                  : "bg-slate-950 text-emerald-400 border-slate-900"
              }`}
            >
              <code>{generatedCode}</code>
            </pre>

            <div className="flex justify-end">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

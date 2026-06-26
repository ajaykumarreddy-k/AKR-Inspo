import React, { useState, useRef, useEffect } from 'react';
import { 
  Eye, 
  Code2, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Copy, 
  RotateCw, 
  ChevronDown, 
  Layout,
  Check,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';

interface ComponentPreviewProps {
  title?: string;
  description?: string;
  code: string;
  children?: React.ReactNode;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ 
  title = "Component", 
  description = "A responsive and interactive component preview.", 
  code, 
  children 
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [localCode, setLocalCode] = useState(code);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isPageCopied, setIsPageCopied] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(localCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = localCode;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (e) {
        console.error("Copy failed", e);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleCopyPage = () => {
    setIsPageCopied(true);
    setTimeout(() => setIsPageCopied(false), 2000);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getPreviewWidth = () => {
    switch (device) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      default: return 'w-full';
    }
  };

  // Centralized theme variables for easy toggling
  const t = {
    mainBg: theme === 'dark' ? 'bg-[#020202]' : 'bg-[#f8f9fa]',
    mainText: theme === 'dark' ? 'text-white' : 'text-gray-900',
    ambient: theme === 'dark' ? 'bg-white/[0.03]' : 'bg-black/[0.03]',
    grid: theme === 'dark' 
      ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')]" 
      : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')]",
    cardBg: theme === 'dark' ? 'bg-white/[0.03]' : 'bg-white',
    cardBorder: theme === 'dark' ? 'border-white/[0.08]' : 'border-black/[0.08]',
    cardRing: theme === 'dark' ? 'ring-white/[0.02]' : 'ring-black/[0.02]',
    iconWrapBg: theme === 'dark' ? 'bg-gradient-to-br from-white/[0.1] to-white/[0.02]' : 'bg-gradient-to-br from-black/[0.05] to-transparent',
    iconWrapRing: theme === 'dark' ? 'ring-white/[0.05]' : 'ring-black/[0.05]',
    iconText: theme === 'dark' ? 'text-white' : 'text-gray-900',
    heading: theme === 'dark' ? 'text-white/95' : 'text-gray-900',
    badgeBg: theme === 'dark' ? 'bg-white/[0.05]' : 'bg-black/[0.05]',
    badgeBorder: theme === 'dark' ? 'border-white/[0.1]' : 'border-black/[0.1]',
    descText: theme === 'dark' ? 'text-white/50' : 'text-gray-500',
    btnBg: theme === 'dark' ? 'bg-white/[0.05]' : 'bg-black/[0.03]',
    btnHover: theme === 'dark' ? 'hover:bg-white/[0.1]' : 'hover:bg-black/[0.08]',
    btnText: theme === 'dark' ? 'text-white/70' : 'text-gray-600',
    btnTextHover: theme === 'dark' ? 'group-hover:text-white hover:text-white' : 'group-hover:text-black hover:text-black',
    editorCardBg: theme === 'dark' ? 'bg-[#0a0a0a]/80' : 'bg-white/80',
    toolbarBg: theme === 'dark' ? 'bg-white/[0.02]' : 'bg-gray-50/80',
    toolbarBorder: theme === 'dark' ? 'border-white/[0.08]' : 'border-black/[0.08]',
    segmentBg: theme === 'dark' ? 'bg-black/50' : 'bg-gray-200/50',
    segmentBorder: theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]',
    tabActiveText: theme === 'dark' ? 'text-white' : 'text-gray-900',
    tabInactiveText: theme === 'dark' ? 'text-white/40 hover:text-white/70' : 'text-gray-500 hover:text-gray-800',
    tabIndicator: theme === 'dark' ? 'bg-white/10 border-white/5' : 'bg-white shadow-sm border-black/5',
    deviceActiveBg: theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm',
    deviceInactiveText: theme === 'dark' ? 'text-white/40 hover:text-white/70' : 'text-gray-500 hover:text-gray-800',
    divider: theme === 'dark' ? 'border-white/10' : 'border-black/10',
    playBg: theme === 'dark' ? 'bg-black/20' : 'bg-gray-100/50',
    deviceBezel: theme === 'dark' ? 'border-black ring-white/20 bg-[#050505]' : 'border-gray-300 ring-black/10 bg-[#f8f9fa]',
    notchBg: theme === 'dark' ? 'bg-black' : 'bg-gray-300',
    codeWrapBg: theme === 'dark' ? 'bg-[#0c0c0c]' : 'bg-[#fafafa]',
    codeTabBg: theme === 'dark' ? 'bg-[#0c0c0c] border-white/[0.05] text-white/70' : 'bg-[#fafafa] border-black/[0.05] text-gray-600',
    codeTabLine: theme === 'dark' ? 'bg-white/80' : 'bg-black/40',
    textAreaText: theme === 'dark' ? 'text-[#e2e8f0]' : 'text-[#334155]',
    scrollThumb: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)',
    scrollThumbHover: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.25)',
  };

  return (
    <div className={`relative w-full ${t.mainBg} ${t.mainText} font-inter overflow-hidden flex items-center justify-center py-4 md:py-8 transition-colors duration-500 rounded-2xl mb-12`}>
      
      {/* Ambient Animated Background Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
        <div className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full ${t.ambient} blur-[120px] transition-colors duration-500`} />
        <div className={`absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full ${t.ambient} blur-[120px] transition-colors duration-500`} />
        <div className={`absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full ${t.ambient} blur-[120px] transition-colors duration-500`} />
        {/* Subtle Grid Overlay */}
        <div className={`absolute inset-0 ${t.grid} [mask-image:linear-gradient(to_bottom,white,transparent)] transition-all duration-500 rounded-2xl`} />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-6 px-4">
        
        {/* Header Content */}
        <div className={`${t.cardBg} backdrop-blur-xl border ${t.cardBorder} rounded-2xl p-6 shadow-2xl ring-1 ${t.cardRing} transition-colors duration-500`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${t.iconWrapBg} rounded-xl flex items-center justify-center border ${t.cardBorder} shadow-inner ring-1 ring-inset ${t.iconWrapRing} transition-colors duration-500`}>
                  <Layout className={`w-6 h-6 ${t.iconText}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className={`text-2xl font-bold tracking-tight ${t.heading}`}>{title}</h1>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${t.badgeBg} border ${t.badgeBorder} ${t.heading} text-xs font-medium transition-colors duration-500`}>
                      <Sparkles className="w-3 h-3" /> Pro
                    </span>
                  </div>
                  <p className={`${t.descText} text-sm leading-relaxed max-w-2xl transition-colors duration-500`}>
                    {description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 ${t.btnBg} ${t.btnHover} transition-all duration-300 rounded-lg border ${t.cardBorder} ${t.btnText} ${t.btnTextHover} active:scale-95`}
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button 
                onClick={handleCopyPage}
                className={`group relative px-4 py-2 ${t.btnBg} ${t.btnHover} transition-all duration-300 rounded-lg text-sm font-medium border ${t.cardBorder} flex items-center gap-2 overflow-hidden active:scale-95`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-white/10 to-white/5' : 'from-black/10 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                {isPageCopied ? <Check className={`w-4 h-4 ${t.iconText}`} /> : <Copy className={`w-4 h-4 ${t.btnText} ${t.btnTextHover}`} />}
                <span className={`${t.btnText} ${t.btnTextHover}`}>{isPageCopied ? 'Copied' : 'Copy Component'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Playground Box */}
        <div className={`${t.editorCardBg} backdrop-blur-2xl border ${t.cardBorder} rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[700px] ring-1 ${t.cardRing} transition-colors duration-500`}>
          
          {/* Toolbar */}
          <div className={`flex items-center justify-between px-4 py-3 ${t.toolbarBg} border-b ${t.toolbarBorder} select-none transition-colors duration-500`}>
            
            {/* View Tabs */}
            <div className={`flex items-center p-1 ${t.segmentBg} rounded-lg border ${t.segmentBorder} relative transition-colors duration-500`}>
              <button
                onClick={() => setActiveTab('preview')}
                className={`relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'preview' ? t.tabActiveText : t.tabInactiveText}`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'code' ? t.tabActiveText : t.tabInactiveText}`}
              >
                <Code2 className="w-4 h-4" />
                Code
              </button>
              <div 
                className={`absolute inset-y-1 w-[calc(50%-4px)] ${t.tabIndicator} rounded-md transition-transform duration-300 ease-out z-0`}
                style={{ transform: activeTab === 'code' ? 'translateX(100%)' : 'translateX(0)' }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              
              {activeTab === 'preview' && (
                <div className={`hidden sm:flex items-center p-1 ${t.segmentBg} rounded-lg border ${t.segmentBorder} transition-colors duration-500`}>
                  <button
                    onClick={() => setDevice('desktop')}
                    className={`p-1.5 rounded-md transition-all duration-200 ${device === 'desktop' ? t.deviceActiveBg : t.deviceInactiveText}`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDevice('tablet')}
                    className={`p-1.5 rounded-md transition-all duration-200 ${device === 'tablet' ? t.deviceActiveBg : t.deviceInactiveText}`}
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDevice('mobile')}
                    className={`p-1.5 rounded-md transition-all duration-200 ${device === 'mobile' ? t.deviceActiveBg : t.deviceInactiveText}`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className={`flex items-center gap-2 border-l ${t.divider} pl-4 transition-colors duration-500`}>
                <button 
                  onClick={handleCopyCode}
                  title="Copy code"
                  className={`p-2 ${t.btnText} ${t.btnTextHover} ${t.btnHover} rounded-lg transition-all active:scale-95`}
                >
                  {isCopied ? <Check className={`w-4 h-4 ${t.iconText}`} /> : <Copy className="w-4 h-4" />}
                </button>
                
                {activeTab === 'preview' && (
                  <button 
                    onClick={handleRefresh}
                    title="Reload preview"
                    className={`p-2 ${t.btnText} ${t.btnTextHover} ${t.btnHover} rounded-lg transition-all active:scale-95 active:rotate-180 duration-300`}
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className={`flex-1 relative ${t.playBg} overflow-hidden transition-colors duration-500`}>
            
            {/* Preview Section */}
            <div className={`absolute inset-0 flex items-center justify-center overflow-auto p-4 custom-scrollbar transition-opacity duration-300 ${activeTab === 'preview' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}>
              <div 
                className={`h-full max-h-[800px] transition-all duration-500 ease-in-out origin-center ${getPreviewWidth()}`}
              >
                <div className={`h-full w-full ${t.deviceBezel} ${device !== 'desktop' ? 'rounded-[2.5rem] border-[12px] shadow-2xl' : 'rounded-b-lg'} overflow-hidden relative transition-colors duration-500`}>
                  
                  {device !== 'desktop' && (
                     <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 ${t.notchBg} rounded-b-3xl z-50 flex justify-center items-center transition-colors duration-500`}>
                        <div className={`w-16 h-1 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
                     </div>
                  )}

                  {children ? (
                    <React.Fragment key={refreshKey}>
                      {children}
                    </React.Fragment>
                  ) : (
                    <iframe
                      key={refreshKey}
                      ref={iframeRef}
                      srcDoc={localCode}
                      title="Code Preview"
                      sandbox="allow-scripts allow-modals allow-same-origin"
                      className="w-full h-full border-none bg-white"
                      style={{ display: 'block', width: '100%', height: '100%' }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Code Section */}
            <div className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${t.codeWrapBg} ${activeTab === 'code' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}>
              
              <div className={`flex items-end px-3 pt-3 ${t.segmentBg} border-b ${t.segmentBorder} transition-colors duration-500`}>
                <div className={`px-4 py-2 ${t.codeTabBg} border-t border-x rounded-t-lg flex items-center gap-2 text-[13px] font-fira relative group transition-colors duration-500`}>
                  <div className={`absolute top-0 left-0 w-full h-[2px] ${t.codeTabLine} rounded-t-lg transition-colors duration-500`}></div>
                  <Code2 className={`w-3.5 h-3.5 ${t.iconText}`} />
                  <span>{children ? 'React Component' : 'index.html'}</span>
                </div>
              </div>

              <textarea
                value={localCode}
                onChange={(e) => setLocalCode(e.target.value)}
                spellCheck={false}
                className={`flex-1 w-full p-6 bg-transparent ${t.textAreaText} font-fira text-[14px] leading-relaxed resize-none focus:outline-none focus:ring-0 custom-scrollbar transition-colors duration-500 selection:bg-blue-500/30 selection:text-white`}
                placeholder="Paste your HTML/CSS/JS here..."
              />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-fira { font-family: 'Fira Code', monospace; }

        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${t.scrollThumb};
          border-radius: 6px;
          border: 3px solid transparent;
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${t.scrollThumbHover};
          border: 3px solid transparent;
          background-clip: padding-box;
        }
      `}} />
    </div>
  );
};

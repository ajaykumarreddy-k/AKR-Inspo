import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, FolderGit2, Folder, ChevronLeft, Play, Pause, Sparkles } from "lucide-react";
import projectsData from "../data/projects.json";

// Glob import ALL images across the entire project for production-safe URLs
const allProjectImages = import.meta.glob(
  '../../**/*.{jpg,jpeg,png,webp,gif,JPG,PNG}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const assetImages = import.meta.glob(
  '../../assets/images/*.{jpg,jpeg,png,webp,gif}',
  { eager: true, query: '?url', import: 'default' }
);
const rawImageUrls = Object.values(assetImages) as string[];

// Helper: resolve a thumbnail path (from projects.json) to a bundled Vite URL
function resolveProjectThumbnail(thumbnail: string | null, folder: string): string | null {
  if (!thumbnail) return null;

  // Try the exact thumbnail path
  const key = `../../${thumbnail}`;
  if (allProjectImages[key]) return allProjectImages[key];

  // Fallback: try folder/foldername.png
  const folderName = folder.split('/').pop();
  const fallbackKey = `../../${folder}/${folderName}.png`;
  if (allProjectImages[fallbackKey]) return allProjectImages[fallbackKey];

  return null;
}

export function ProjectsDashboard({ onNavigate, isHome = false }: { onNavigate: (path: string) => void, isHome?: boolean }) {
  const projects = projectsData || [];
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
  const [displayCount, setDisplayCount] = useState(24);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isInfiniteScroll || !observerTarget.current) return;
    
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setDisplayCount(prev => prev + 24);
        }
      },
      { rootMargin: "400px" }
    );
    
    observer.observe(observerTarget.current);
    
    return () => {
      observer.disconnect();
    };
  }, [isInfiniteScroll]);

  // Group projects by their top-level directory
  const groupedProjects = projects.reduce((acc, project) => {
    const topLevel = project.folder.split('/')[0];
    if (!acc[topLevel]) {
      acc[topLevel] = [];
    }
    acc[topLevel].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  const renderContent = () => {
    if (projects.length === 0) {
      return (
        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-[var(--color-border)] rounded-2xl">
          <FolderGit2 className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">No nested projects found</h3>
          <p className="text-gray-500 max-w-sm">
            Run 'bun run dev' to scan your workspace. Any folders containing an index.html file will appear here.
          </p>
        </div>
      );
    }

    const renderProjectCard = (project: any, requireImage = false) => {
      const resolvedThumbnail = resolveProjectThumbnail(project.thumbnail, project.folder);
      if (requireImage && !resolvedThumbnail) return null; // skip no-image cards in home grid
      return (
        <a 
          key={project.id}
          href={project.path}
          className="group relative block w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-accent)] transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden break-inside-avoid mb-6 min-h-[12rem]"
        >
          {resolvedThumbnail ? (
            <div className="w-full overflow-hidden bg-[var(--color-bg)]">
              <img 
                src={resolvedThumbnail} 
                alt={project.name} 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 block"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
            </div>
          ) : (
            // No-image fallback for folder view
            <div className="w-full h-36 flex items-center justify-center bg-[var(--color-bg)]">
              <FolderGit2 className="w-12 h-12 text-[var(--color-accent)]/30" />
            </div>
          )}

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
          
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20 pointer-events-none">
            <div className="p-2 bg-[var(--color-bg)]/80 backdrop-blur-md border border-[var(--color-border)] rounded-xl group-hover:bg-[var(--color-accent)]/10 transition-colors pointer-events-auto">
              <FolderGit2 className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <div className="p-2 bg-[var(--color-bg)]/80 backdrop-blur-md rounded-full shadow-sm pointer-events-auto">
              <ArrowUpRight className="w-4 h-4 text-[var(--color-text)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end z-20 pointer-events-none">
            <div className="flex flex-col gap-0.5 bg-[var(--color-bg)]/80 backdrop-blur-md p-3 rounded-xl shadow-sm border border-[var(--color-border)]/50 pointer-events-auto">
              <h3 className="font-bold text-base truncate text-[var(--color-text)]">{project.name}</h3>
              <p className="text-xs text-[var(--color-text)]/70 font-mono truncate">
                {project.folder.split('/').slice(1).join('/') || project.folder}
              </p>
            </div>
          </div>
        </a>
      );
    };

    if (isHome) {
      // Flatten all projects into one big masonry grid (filter out those with no image)
      const projectElements = projects.map(p => renderProjectCard(p, true)).filter(Boolean);
      
      const rawImageElements = rawImageUrls.map((url, index) => (
        <a 
          key={`raw-img-${index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-accent)] transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden break-inside-avoid mb-6 min-h-[12rem]"
        >
          <div className="w-full overflow-hidden bg-[var(--color-bg)]">
            <img 
              src={url} 
              alt={`Asset ${index}`} 
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 block"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
          </div>
        </a>
      ));

      const allItems = [...projectElements, ...rawImageElements];
      return allItems.slice(0, displayCount);
    }

    if (activeGroup === null) {
      // Render Groups (Folders)
      return Object.entries(groupedProjects).map(([groupName, groupProjects]) => {
        return (
          <button 
            key={groupName}
            onClick={() => setActiveGroup(groupName)}
            className="group relative flex flex-col justify-between h-48 p-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-accent)] transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden text-left break-inside-avoid mb-6 w-full"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            <div className="flex justify-between items-start relative z-10">
              <div className="p-3 bg-[var(--color-bg)]/80 backdrop-blur-sm border border-[var(--color-border)] rounded-xl group-hover:bg-[var(--color-accent)]/10 transition-colors">
                <Folder className="w-6 h-6 text-[var(--color-accent)] fill-[var(--color-accent)]/20" />
              </div>
              <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                {groupProjects.length} {groupProjects.length === 1 ? 'Project' : 'Projects'}
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-auto relative z-10 bg-[var(--color-bg)]/80 backdrop-blur-sm p-2 rounded-xl">
              <h3 className="font-bold text-lg truncate">{groupName}</h3>
              <p className="text-sm text-gray-500 truncate">Click to view contents</p>
            </div>
          </button>
        );
      });
    }

    // Render Projects inside the active group
    const activeProjects = groupedProjects[activeGroup] || [];
    return activeProjects.map(renderProjectCard);
  };

  return (
    <div className={`w-full ${isHome ? 'px-0 py-0 mt-0 z-10' : 'px-4 md:px-6 py-2 z-10 mt-4 md:mt-8'}`}>
      <section className={`relative w-full min-h-[85vh] flex flex-col ${!isHome ? 'bg-[var(--color-bg)] text-[var(--color-text)] rounded-[32px] md:rounded-[48px] p-6 md:p-12 lg:p-14 mb-6 shadow-sm border border-[var(--color-border)]' : 'max-w-[1440px] mx-auto px-5 md:px-16 pb-32'}`}>
        
        {/* Header - Hidden on Home unless we need the back button for a group */}
        {(!isHome || activeGroup) && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-12 gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Component Hub</h1>
              <p className="text-gray-500 max-w-xl">
                {activeGroup 
                  ? `Viewing projects inside "${activeGroup}"`
                  : "Dynamically loaded sub-projects and component libraries. Drop a new folder in the codebase and it appears here automatically."
                }
              </p>
            </div>
            <div className="flex gap-3">
              {activeGroup && (
                <button 
                  onClick={() => setActiveGroup(null)}
                  className="px-6 py-3 bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)] rounded-full font-semibold hover:bg-[var(--color-border)] transition-colors flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Folders
                </button>
              )}
              {!isHome && (
                <button 
                  onClick={() => onNavigate('/')}
                  className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                >
                  Back to Home
                </button>
              )}
            </div>
          </div>
        )}

        {/* Floating Show Me Mode Toggle */}
        {isHome && (
          <div className="flex justify-between items-end w-full mb-8 mt-12 relative z-30">
            <div>
              <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
                All Inspiration
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400">Showing {projects.length + rawImageUrls.length} design files and components.</p>
            </div>
            <button
              onClick={() => setIsInfiniteScroll(!isInfiniteScroll)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                isInfiniteScroll 
                  ? "bg-[var(--color-accent)] text-white shadow-[var(--color-accent)]/25" 
                  : "bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200"
              }`}
            >
              {isInfiniteScroll ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  Pause Infinite Scroll
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Infinite Scroll
                </>
              )}
            </button>
          </div>
        )}

        {/* Dynamic Project Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 w-full">
          {renderContent()}
        </div>
        
        {/* Load More Button & Observer Target */}
        {isHome && displayCount < projects.length + rawImageUrls.length && (
          <div className="w-full flex flex-col items-center mt-12 gap-4">
            <div ref={observerTarget} className="h-4 w-full" />
            {!isInfiniteScroll && (
              <button
                onClick={() => setDisplayCount(prev => prev + 24)}
                className="px-8 py-3 bg-[var(--color-bg)] border-2 border-[var(--color-border)] rounded-full font-bold hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all"
              >
                Load More
              </button>
            )}
          </div>
        )}
        
      </section>
    </div>
  );
}

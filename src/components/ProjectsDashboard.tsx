import { useState } from "react";
import { ArrowUpRight, FolderGit2, Folder, ChevronLeft } from "lucide-react";
import projectsData from "../data/projects.json";

export function ProjectsDashboard({ onNavigate }: { onNavigate: (path: string) => void }) {
  const projects = projectsData || [];
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

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

    if (activeGroup === null) {
      // Render Groups (Folders)
      return Object.entries(groupedProjects).map(([groupName, groupProjects]) => (
        <button 
          key={groupName}
          onClick={() => setActiveGroup(groupName)}
          className="group relative flex flex-col justify-between h-48 p-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-accent)] transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden text-left"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl group-hover:bg-[var(--color-accent)]/10 transition-colors">
              <Folder className="w-6 h-6 text-[var(--color-accent)] fill-[var(--color-accent)]/20" />
            </div>
            <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold px-2 py-1 rounded-md">
              {groupProjects.length} {groupProjects.length === 1 ? 'Project' : 'Projects'}
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-auto">
            <h3 className="font-bold text-lg truncate">{groupName}</h3>
            <p className="text-sm text-gray-500 truncate">Click to view contents</p>
          </div>
        </button>
      ));
    }

    // Render Projects inside the active group
    const activeProjects = groupedProjects[activeGroup] || [];
    return activeProjects.map((project) => (
      <a 
        key={project.id}
        href={project.path}
        className="group relative flex flex-col justify-between h-48 p-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-accent)] transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex justify-between items-start">
          <div className="p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl group-hover:bg-[var(--color-accent)]/10 transition-colors">
            <FolderGit2 className="w-6 h-6 text-[var(--color-accent)]" />
          </div>
          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
        <div className="flex flex-col gap-1 mt-auto">
          <h3 className="font-bold text-lg truncate">{project.name}</h3>
          <p className="text-sm text-gray-500 font-mono truncate">
            {project.folder.split('/').slice(1).join('/') || project.folder}
          </p>
        </div>
      </a>
    ));
  };

  return (
    <div className="w-full px-4 md:px-6 py-2 z-10 mt-4 md:mt-8">
      <section className="relative w-full min-h-[85vh] flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] rounded-[32px] md:rounded-[48px] overflow-hidden p-6 md:p-12 lg:p-14 mb-6 shadow-sm border border-[var(--color-border)]">
        
        {/* Header */}
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
            <button 
              onClick={() => onNavigate('/')}
              className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {renderContent()}
        </div>
        
      </section>
    </div>
  );
}

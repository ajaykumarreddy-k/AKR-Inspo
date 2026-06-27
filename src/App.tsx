/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, Suspense, lazy } from "react";
import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";
import { Footer } from "./components/Footer";
import { LinksPage } from "./components/LinksPage";
import { InspirationPage } from "./components/InspirationPage";
import { ResourcesPage } from "./components/ResourcesPage";
import { ProjectsDashboard } from "./components/ProjectsDashboard";
import { useFonts } from "./hooks/useFonts";

const ScrollAnimationsPage = lazy(() => import("./scroll-animations/ScrollAnimationsPage"));

export default function App() {
  useFonts(); // auto-load all fonts from assets/Fonts/
  const getActiveRoute = () => {
    const hash = window.location.hash;
    if (hash) {
      // Normalize e.g. "#/links" or "#links" to "/links"
      return hash.replace(/^#\/?/, "/");
    }
    return window.location.pathname;
  };

  const [currentPath, setCurrentPath] = useState(getActiveRoute());

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(getActiveRoute());
    };
    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("hashchange", handleNavigation);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("hashchange", handleNavigation);
    };
  }, []);

  const navigate = (path: string) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    try {
      window.history.pushState({}, "", cleanPath);
      setCurrentPath(cleanPath);
    } catch (e) {
      // Fallback for file:// or strict environment restrictions
      window.location.hash = cleanPath;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const isLinksPage = currentPath.endsWith("/links") || currentPath === "links";
  const isInspirationPage = currentPath.endsWith("/inspiration") || currentPath === "inspiration";
  const isResourcesPage = currentPath.endsWith("/resources") || currentPath === "resources";
  const isProjectsPage = currentPath.endsWith("/projects") || currentPath === "projects";
  const isScrollAnimationsPage = currentPath.startsWith("/scroll-animations");

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] text-black dark:text-white font-sans antialiased transition-colors duration-300 relative selection:bg-neutral-200 dark:selection:bg-neutral-800 overflow-x-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow w-full flex flex-col relative">
          {isScrollAnimationsPage ? (
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Loading animations...</div>}>
              <ScrollAnimationsPage />
            </Suspense>
          ) : isLinksPage ? (
            <LinksPage onNavigate={navigate} />
          ) : isInspirationPage ? (
            <InspirationPage onNavigate={navigate} />
          ) : isResourcesPage ? (
            <ResourcesPage onNavigate={navigate} />
          ) : isProjectsPage ? (
            <ProjectsDashboard onNavigate={navigate} />
          ) : (
            <>
              <Hero onNavigate={navigate} />
              <ProjectsDashboard onNavigate={navigate} isHome={true} />
            </>
          )}
        </main>
        {!isLinksPage && !isInspirationPage && !isResourcesPage && !isProjectsPage && !isScrollAnimationsPage && <Footer onNavigate={navigate} />}
      </div>
    </div>
  );
}


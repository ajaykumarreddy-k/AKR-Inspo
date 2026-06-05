/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";
import { Footer } from "./components/Footer";
import { LinksPage } from "./components/LinksPage";
import { InspirationPage } from "./components/InspirationPage";
import { ResourcesPage } from "./components/ResourcesPage";
import { useFonts } from "./hooks/useFonts";

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

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] text-black dark:text-white font-sans antialiased transition-colors duration-300 relative selection:bg-neutral-200 dark:selection:bg-neutral-800 overflow-x-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow w-full flex flex-col relative">
          {isLinksPage ? (
            <LinksPage onNavigate={navigate} />
          ) : isInspirationPage ? (
            <InspirationPage onNavigate={navigate} />
          ) : isResourcesPage ? (
            <ResourcesPage onNavigate={navigate} />
          ) : (
            <>
              <Hero onNavigate={navigate} />
              <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 pt-0 pb-32 z-10">
                <Gallery />
              </div>
            </>
          )}
        </main>
        {!isLinksPage && !isInspirationPage && !isResourcesPage && <Footer onNavigate={navigate} />}
      </div>
    </div>
  );
}


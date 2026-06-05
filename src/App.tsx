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

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const isLinksPage = currentPath === "/links";
  const isInspirationPage = currentPath === "/inspiration";
  const isResourcesPage = currentPath === "/resources";

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
              <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 pt-2 pb-32 z-10">
                <h2 className="text-2xl font-bold mb-8 tracking-tight text-center md:text-left text-neutral-800 dark:text-neutral-200">Component Gallery</h2>
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


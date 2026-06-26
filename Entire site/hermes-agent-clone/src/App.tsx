/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import Platforms from './components/Platforms';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-blue text-white selection:bg-white selection:text-brand-blue font-sans">
      <Header />
      <main className="pt-32">
        <Hero />
        <VideoSection />
        <Platforms />
        <Features />
        <section className="bg-brand-blue w-full overflow-hidden select-none py-12 md:py-20">
          <div className="flex items-center justify-center pointer-events-none">
            <div className="text-white hermes-giant-text font-serif text-center whitespace-nowrap">
              HERMES
            </div>
          </div>
        </section>
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

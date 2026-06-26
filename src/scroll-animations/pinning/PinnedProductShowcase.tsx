import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  markers?: boolean;
  scrub?: number | boolean;
  pin?: boolean;
  start?: string;
  end?: string;
  duration?: number;
  ease?: string;
  disabled?: boolean;
}

const products = [
  { id: 1, name: 'Nebula', color: 'from-violet-600 to-purple-900', desc: 'Deep space-inspired design' },
  { id: 2, name: 'Ember', color: 'from-orange-500 to-red-700', desc: 'Warm and vibrant aesthetic' },
  { id: 3, name: 'Ocean', color: 'from-cyan-500 to-blue-800', desc: 'Fluid and calming palette' },
  { id: 4, name: 'Mint', color: 'from-emerald-400 to-teal-700', desc: 'Fresh and modern look' },
];

export default function PinnedProductShowcase({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top top',
  end = '+=200%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section, i) => {
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
          markers,
        });

        gsap.from(section.querySelector('.product-card'), {
          scale: 0.7,
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top top',
            scrub,
            markers: false,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="relative bg-gray-950">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">Product Showcase</h2>
          <p className="text-gray-400 text-lg">Each card pins as you scroll through</p>
        </div>
      </div>

      {products.map((product, i) => (
        <div
          key={product.id}
          ref={(el) => { sectionsRef.current[i] = el!; }}
          className="relative h-screen flex items-center justify-center px-6"
        >
          <div className="product-card w-full max-w-lg">
            <div
              className={`rounded-2xl bg-gradient-to-br ${product.color} p-8 shadow-2xl`}
            >
              <div className="text-white/20 text-6xl font-black mb-4">
                {String(product.id).padStart(2, '0')}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-white/70 text-lg">{product.desc}</p>
              <div className="mt-6 flex gap-3">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <span
                    key={size}
                    className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-400 text-xl">End of showcase</p>
      </div>
    </div>
  );
}

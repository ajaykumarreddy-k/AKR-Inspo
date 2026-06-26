const e=`import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { title: 'Product One', desc: 'Sleek design meets performance.' },
  { title: 'Product Two', desc: 'Built for the modern workflow.' },
  { title: 'Product Three', desc: 'Engineered with precision.' },
];

const PinnedProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: pinRef.current,
      });

      const cards = gsap.utils.toArray<HTMLDivElement>('.product-card');
      gsap.to(cards, {
        x: () => -(cards.length - 1) * 320,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh]"
      style={{ background: 'var(--color-bg)' }}
    >
      <div ref={pinRef} className="flex h-screen flex-col items-center justify-center overflow-hidden">
        <h2 className="mb-10 text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
          Pinned Product Showcase
        </h2>
        <div ref={cardsRef} className="flex gap-6">
          {products.map((p, i) => (
            <div
              key={i}
              className="product-card flex h-80 w-72 shrink-0 flex-col items-center justify-center rounded-2xl p-6 text-center"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="mb-4 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold"
                style={{ background: 'var(--color-primary)', color: 'var(--color-bg)' }}
              >
                {i + 1}
              </div>
              <h3 className="mb-2 text-2xl font-semibold" style={{ color: 'var(--color-text)' }}>
                {p.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PinnedProductShowcase;
`;export{e as default};

import type { FeatureCardStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type FeatureCardData = {
  alt: string;
  imgSrc: string;
  srcSet: string;
  title: string;
  description: string;
  id?: string;
};
/** A feature card. */
export default function FeatureCard({ d, cids, styles }: { d: FeatureCardData; cids: string[]; styles: FeatureCardStyles }) {
  return (
    <div data-cid={cids[0]} className={cn("h-120 block rounded-2xl bg-surface-2", styles.className)} id={d.id}>
      <div data-cid={cids[1]} className="flex p-4 flex-col justify-start items-start gap-4">
        <div data-cid={cids[2]} className={cn("h-73 block rounded-2xl overflow-hidden", styles.className2)}>
          <img data-cid={cids[3]} className="w-full h-73 inline-block max-w-full overflow-clip object-cover align-middle" data-component="image" alt={d.alt} sizes="100vw" src={d.imgSrc} srcSet={d.srcSet} />
        </div>
        <div data-cid={cids[4]} className="w-full h-35 block text-left">
          <div data-cid={cids[5]} className="flex p-4 flex-col justify-start items-start gap-4">
            <h3 data-cid={cids[6]} className="block text-color-001 [font-family:'Martina_Plantijn',_Arial,_sans-serif] text-[1.5rem] tracking-[-0.96px]" data-component="heading">
              {d.title}
            </h3>
            <p data-cid={cids[7]} className="w-full max-w-68 block text-color-003 text-sm leading-[1.3125rem]">
              {d.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

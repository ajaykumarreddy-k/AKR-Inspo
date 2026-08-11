import type { MediaCardStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type MediaCardData = {
  kind?: string;
  title: string;
  text: string;
  label: string;
  imgSrc: string;
  srcSet: string;
  ariahidden?: string;
};
/** A card with media + heading. */
export default function MediaCard({ d, cids, styles }: { d: MediaCardData; cids: string[]; styles: MediaCardStyles }) {
  return (
    <div data-cid={cids[0]} className={cn("w-85 h-full block absolute top-0 mr-6 shrink-0", styles.className)} role="listitem" aria-hidden={d.ariahidden}>
      <div data-cid={cids[1]} className="w-85 h-72.5 block relative max-w-85 rounded-2xl bg-border max-md:w-84 max-md:h-72">
        <div data-cid={cids[2]} className="flex pt-27.5 pb-6 px-5 flex-col justify-start items-stretch gap-10">
          <div data-cid={cids[3]} className="flex relative flex-col justify-start items-center gap-4">
            <h3 data-cid={cids[4]} className="block text-color-001 [font-family:'Martina_Plantijn',_Arial,_sans-serif] text-[1.5rem] tracking-[-0.96px] max-md:text-xl max-md:leading-5 max-md:tracking-[-0.8px]" data-component={d.kind}>
              {d.title}
            </h3>
            <div data-cid={cids[5]} className="block max-w-80 text-muted-foreground text-sm leading-[1.3125rem]">
              {d.text}
            </div>
          </div>
          <a data-cid={cids[6]} className={cn("h-8.5 flex max-w-full py-3 px-4 rounded-xl justify-center items-center shrink-0 gap-x-3 text-background bg-color-002 cursor-pointer hover:bg-clr-8 hover:border-clr-8 focus:border-color-002", styles.className2)} data-component="link" href="https://calendar.notion.so/meet/gauthierwillemse/mindoo" target="_blank">
            <div data-cid={cids[7]} className="block text-sm leading-[1.3125rem]">
              {d.label}
            </div>
          </a>
        </div>
        <div data-cid={cids[8]} className={cn("w-56 block absolute -top-14.5 left-42.5 transform-[matrix(1,0,0,1,-112,0)] pointer-events-none", styles.className3)}>
          <img data-cid={cids[9]} className="w-full h-53 inline-block max-w-full overflow-clip object-cover align-middle pointer-events-none" data-component="image" alt="" sizes="100vw" src={d.imgSrc} srcSet={d.srcSet} />
        </div>
      </div>
    </div>
  );
}

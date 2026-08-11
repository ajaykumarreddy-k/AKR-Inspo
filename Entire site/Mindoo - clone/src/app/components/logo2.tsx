import type { Logo2Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Logo2Data = {
  alt: string;
  imgSrc: string;
  sizes?: string;
  srcSet?: string;
};
/** A logo. */
export default function Logo2({ d, cids, styles }: { d: Logo2Data; cids: string[]; styles: Logo2Styles }) {
  return (
    <div data-cid={cids[0]} className={cn("block absolute rounded-2xl overflow-hidden", styles.className)}>
      <img data-cid={cids[1]} className={cn("w-full inline-block max-w-full overflow-clip object-cover align-middle", styles.className2)} data-component="image" alt={d.alt} src={d.imgSrc} sizes={d.sizes} srcSet={d.srcSet} />
    </div>
  );
}

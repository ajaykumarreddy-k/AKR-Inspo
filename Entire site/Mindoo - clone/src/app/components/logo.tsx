import type { LogoStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type LogoData = {
  alt: string;
  sizes: string;
  imgSrc: string;
  srcSet: string;
};
/** A logo. */
export default function Logo({ d, cids, styles }: { d: LogoData; cids: string[]; styles: LogoStyles }) {
  return (
    <div data-cid={cids[0]} className={cn("shrink-0 block", styles.className)}>
      <img data-cid={cids[1]} className={cn("w-full inline-block max-w-full overflow-clip object-cover align-middle", styles.className2)} data-component="image" alt={d.alt} sizes={d.sizes} src={d.imgSrc} srcSet={d.srcSet} />
    </div>
  );
}

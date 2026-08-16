import type { Tile2Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Tile2Data = {
  kind?: string;
  height: string;
  imgSrc: string;
  width: string;
};
/** A content tile. */
export default function Tile2({ d, cids, styles }: { d: Tile2Data; cids: string[]; styles: Tile2Styles }) {
  return (
    <img data-cid={cids[0]} className={cn("block absolute min-w-0 max-w-full overflow-clip align-middle", styles.className)} data-component={d.kind} alt="" aria-hidden="true" height={d.height} src={d.imgSrc} width={d.width} />
  );
}

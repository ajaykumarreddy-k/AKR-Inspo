import type { TileStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type TileData = {
  ariahidden?: string;
  height: string;
  imgSrc: string;
  width: string;
};
/** A content tile. */
export default function Tile({ d, cids, styles }: { d: TileData; cids: string[]; styles: TileStyles }) {
  return (
    <img data-cid={cids[0]} className={cn("block absolute max-w-full overflow-clip align-middle", styles.className)} data-component="image" alt="" aria-hidden={d.ariahidden} height={d.height} src={d.imgSrc} width={d.width} />
  );
}

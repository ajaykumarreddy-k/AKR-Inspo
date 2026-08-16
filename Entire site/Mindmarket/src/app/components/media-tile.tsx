import type { ReactNode } from "react";
import type { MediaTileStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type MediaTileData = {
  dataicon: string;
  icon: ReactNode;
  description: string;
  description2: string;
};
/** A media tile. */
export default function MediaTile({ d, cids, styles }: { d: MediaTileData; cids: string[]; styles: MediaTileStyles }) {
  return (
    <div data-cid={cids[0]} className={cn("w-[23.3625rem] h-100 block sticky top-[6.6125rem] max-md:w-[20.9375rem] max-md:top-[3.7625rem] md:max-lg:w-182 md:max-lg:top-[7.9625rem] 2xl:w-[35.8625rem] 2xl:h-137.5 2xl:top-[133.5px]", styles.className)}>
      <div data-cid={cids[1]} className={cn("min-h-100 flex p-[33.7px] rounded-[50px] flex-col justify-between origin-[186.875px_200px] max-md:p-[1.5375rem] max-lg:rounded-[35px] max-lg:transform-[none] max-lg:origin-[initial] md:max-lg:p-[28.5px] 2xl:min-h-137.5 2xl:p-8.5 2xl:transform-[none] 2xl:origin-[initial]", styles.className2)}>
        <div data-cid={cids[2]} className="flex justify-end">
          <span data-cid={cids[3]} className={cn("flex rounded-[100%] justify-center items-center text-[0.5625rem] leading-[0.875rem]", styles.className3)}>
            {" "}
            <span data-cid={cids[4]} className="h-full block align-middle">
              {" "}
              <svg data-cid={cids[5]} className="w-auto h-16 block overflow-hidden align-middle max-md:h-15 md:max-lg:h-15.5" data-component="image" aria-hidden="true" height="1em" viewBox="0 0 66 66" width="1em" focusable="false" data-icon={d.dataicon} fill="currentColor">{d.icon}</svg>
              {" "}
            </span>
            {" "}
          </span>
          {" "}
        </div>
        {" "}
        <p data-cid={cids[6]} className="block text-[7.8125rem] font-normal leading-[7.4375rem] tracking-[-7.49px] max-md:text-[6.3125rem] max-md:leading-[6rem] max-md:tracking-[-6.07px] md:max-lg:text-[12.9375rem] md:max-lg:leading-[12.3125rem] md:max-lg:tracking-[-12.44px] 2xl:text-[12rem] 2xl:leading-[11.375rem] 2xl:tracking-[-11.52px]">
          {d.description}
        </p>
        {" "}
        <p data-cid={cids[7]} className="flex items-end grow text-xl leading-[1.5625rem] tracking-[-0.81px] text-balance max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]">
          {d.description2}
        </p>
        {" "}
      </div>
      {" "}
    </div>
  );
}

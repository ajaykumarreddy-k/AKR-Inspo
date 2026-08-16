import type { MediaCardStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type MediaCardData = {
  title: string;
  description: string;
  href: string;
  label: string;
};
/** A card with media + heading. */
export default function MediaCard({ d, cids, styles }: { d: MediaCardData; cids: string[]; styles: MediaCardStyles }) {
  return (
    <div data-cid={cids[0]} className={cn("block absolute z-3 max-w-200 transform-[matrix(1,0,0,1,0,80)] max-lg:transform-[none] max-lg:max-w-none", styles.className)}>
      <div data-cid={cids[1]} className="h-full block relative">
        <div data-cid={cids[2]} className={cn("h-full block absolute top-px inset-x-px rounded-[10px]", styles.className2)} />
        {" "}
        <div data-cid={cids[3]} className="h-full block absolute top-0 inset-x-0 rounded-[10px] bg-background" />
        {" "}
        <div data-cid={cids[4]} className="h-full flex relative z-1 py-[1.6625rem] px-[21.3px] flex-col gap-[1.6625rem] max-md:py-[1.5625rem] max-md:px-5 max-md:gap-[1.5625rem] md:max-lg:py-[1.6125rem] md:max-lg:px-[1.2875rem] md:max-lg:gap-[1.6125rem] 2xl:p-[53.1px]">
          <h3 data-cid={cids[5]} className="block text-[2.5rem] leading-[3rem] tracking-[-2.39px] max-md:text-[2.1875rem] max-md:leading-[2.5rem] max-md:tracking-[-2.1px] md:max-lg:text-[2.6875rem] md:max-lg:leading-[3.0625rem] md:max-lg:tracking-[-2.56px] 2xl:text-[3.3125rem] 2xl:leading-[3.8125rem] 2xl:tracking-[-3.19px]" data-component="heading">
            {d.title}
          </h3>
          {" "}
          <p data-cid={cids[6]} className="block text-xl leading-[1.5625rem] tracking-[-0.81px] text-balance max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]">
            {d.description}
          </p>
          {" "}
          <div data-cid={cids[7]} className="block">
            <a data-cid={cids[8]} className={cn("min-h-16 border border-solid border-clr-1 inline-flex relative z-1 p-[0.6625rem] rounded-[10px] items-center gap-[8.5px] text-color-001 text-lg leading-[1.6875rem] cursor-pointer max-md:min-h-[3.7625rem] max-md:p-2.5 max-lg:gap-2 max-md:text-base max-md:leading-[1.5rem] md:max-lg:min-h-[3.8625rem] md:max-lg:p-[10.3px] md:max-lg:text-[1.0625rem] md:max-lg:leading-[1.5625rem] before:content-[''] before:block before:absolute before:inset-0 before:h-16 before:rounded-tl-[10px] max-md:before:h-[3.7625rem] md:max-lg:before:h-[3.8625rem]", styles.className3)} data-component="link" href={d.href} target="_self">
              {"  "}
              <span data-cid={cids[9]} className="block relative z-3 px-[0.6625rem] max-md:px-2.5 md:max-lg:px-[10.3px] hover:transform-[none] focus:transform-[none]">
                {d.label}
              </span>
              {" "}
              <span data-cid={cids[10]} className="w-[42.5px] h-[42.5px] flex relative z-1 rounded-[100%] justify-center items-center bg-background pointer-events-none max-md:w-10 max-md:h-10 md:max-lg:w-[2.575rem] md:max-lg:h-[2.575rem]">
                {" "}
                <span data-cid={cids[11]} className="block align-middle pointer-events-none">
                  {" "}
                  <svg data-cid={cids[12]} className="w-auto h-[1.3125rem] block overflow-hidden align-middle pointer-events-none max-md:h-5 focus:outline-clr-4 focus:[outline-style:auto] focus:outline-[5px]" data-component="icon" aria-hidden="true" height="1em" viewBox="0 0 20 20" width="1em" focusable="false" data-icon="arrow-right" fill="currentColor">
                    <path fill="none" d="m8 14 4-4-4-4" />
                  </svg>
                  {" "}
                </span>
                {" "}
              </span>
              {" "}
            </a>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}

import type { ReactNode } from "react";
import type { Logo2Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Logo2Data = {
  href: string;
  imgSrc: string;
  height: string;
  viewBox: string;
  width: string;
  icon: ReactNode;
};
/** A logo. */
export default function Logo2({ d, cids, styles }: { d: Logo2Data; cids: string[]; styles: Logo2Styles }) {
  return (
    <div data-cid={cids[0]} className={cn("block relative z-1 [pointer-events:all] max-lg:pb-3.5", styles.className)}>
      <div data-cid={cids[1]} className={cn("h-full block bg-surface [pointer-events:all] max-lg:rounded-[30px]", styles.className2)}>
        <a data-cid={cids[2]} className="h-full block cursor-pointer [pointer-events:all]" data-component="link" href={d.href}>
          {" "}
          <div data-cid={cids[3]} className="block relative z-1 [pointer-events:all]" />
          {" "}
          <div data-cid={cids[4]} className="h-full hidden justify-center content-center [pointer-events:all] max-lg:flex">
            <img data-cid={cids[5]} className={cn("w-auto inline rounded-[15px] self-center overflow-clip [pointer-events:all] max-lg:block", styles.className3)} src={d.imgSrc} />
            {" "}
          </div>
          {"  "}
          <svg data-cid={cids[6]} className={cn("block absolute top-0 z-2 [pointer-events:all] max-lg:text-[1.0625rem] max-lg:leading-[1.1875rem] max-lg:tracking-[normal] focus:outline-clr-1 focus:[outline-style:auto] focus:outline-[5px]", styles.className4)} data-component="image" fill="none" height={d.height} viewBox={d.viewBox} width={d.width} xmlns="http://www.w3.org/2000/svg">{d.icon}</svg>
          {" "}
        </a>
        {" "}
      </div>
      {" "}
    </div>
  );
}

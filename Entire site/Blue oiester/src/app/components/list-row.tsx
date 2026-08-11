import type { ListRowStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type ListRowData = {
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow({ d, cids, styles }: { d: ListRowData; cids: string[]; styles: ListRowStyles }) {
  return (
    <li data-cid={cids[0]} className={cn("list-item mr-3.5 row-start-1 [list-style-type:none] pointer-events-none max-lg:[pointer-events:all] 2xl:mr-[20.9px]", styles.className)}>
      <a data-cid={cids[1]} className={cn("block relative pt-[0.0875rem] px-[19.5px] rounded-[40px] self-start col-start-2 row-start-1 text-[0.6875rem] font-medium leading-8 tracking-[0.3px] text-center bg-surface [pointer-events:all] max-lg:px-[16.5px] max-lg:rounded-[30px] max-lg:leading-[1.6875rem] 2xl:pt-0.5 2xl:px-[1.825rem] 2xl:text-[1.0625rem] 2xl:leading-12", styles.className2)} data-component="link" href={d.href}>
        {d.label}
      </a>
      {" "}
    </li>
  );
}

import type { ListRowStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type ListRowData = {
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow({ d, cids, styles }: { d: ListRowData; cids: string[]; styles: ListRowStyles }) {
  return (
    <li data-cid={cids[0]} className="list-item relative">
      <a data-cid={cids[1]} className="flex max-w-full rounded-2xl justify-center items-center gap-2 text-color-001 whitespace-nowrap text-nowrap bg-clr-1 cursor-pointer" data-component="link" href={d.href}>
        <span data-cid={cids[2]} className={cn("block text-sm leading-[1.3125rem]", styles.className)}>
          {d.label}
        </span>
      </a>
    </li>
  );
}

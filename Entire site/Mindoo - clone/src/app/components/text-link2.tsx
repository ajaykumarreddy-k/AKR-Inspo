import type { TextLink2Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type TextLink2Data = {
  href: string;
  label: string;
};
/** A text link. */
export default function TextLink2({ d, cids, styles }: { d: TextLink2Data; cids: string[]; styles: TextLink2Styles }) {
  return (
    <a data-cid={cids[0]} className={cn("block text-color-001 text-sm leading-3.5 cursor-pointer", styles.className)} data-component="link" href={d.href}>
      {d.label}
    </a>
  );
}

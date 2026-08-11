import type { TextLinkStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type TextLinkData = {
  ariacurrent?: string;
  href: string;
  label: string;
};
/** A text link. */
export default function TextLink({ d, cids, styles }: { d: TextLinkData; cids: string[]; styles: TextLinkStyles }) {
  return (
    <a data-cid={cids[0]} className={cn("block text-color-001 text-sm leading-3.5 cursor-pointer", styles.className)} data-component="link" aria-current={d.ariacurrent} href={d.href}>
      {d.label}
    </a>
  );
}

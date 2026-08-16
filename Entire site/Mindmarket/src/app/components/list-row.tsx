export type ListRowData = {
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow({ d, cids }: { d: ListRowData; cids: string[] }) {
  return (
    <li data-cid={cids[0]} className="list-item">
      <a data-cid={cids[1]} className="inline cursor-pointer hover:underline" data-component="link" href={d.href} target="_self">
        {d.label}
      </a>
      {" "}
    </li>
  );
}

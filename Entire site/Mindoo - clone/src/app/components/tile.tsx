export type TileData = {
  text: string;
};
/** A content tile. */
export default function Tile({ d, cids }: { d: TileData; cids: string[] }) {
  return (
    <div data-cid={cids[0]} className="h-7.5 flex px-3 rounded-full justify-center items-center bg-surface max-md:h-6">
      <div data-cid={cids[1]} className="block text-muted-foreground text-[0.875rem] whitespace-nowrap max-md:text-[0.75rem]">
        {d.text}
      </div>
    </div>
  );
}

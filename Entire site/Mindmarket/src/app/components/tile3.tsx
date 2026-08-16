export type Tile3Data = {
  description: string;
};
/** A content tile. */
export default function Tile3({ d, cids }: { d: Tile3Data; cids: string[] }) {
  return (
    <div data-cid={cids[0]} className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]">
      <div data-cid={cids[1]} className="w-16 h-16 flex p-[1.0625rem] rounded-[100%] justify-center items-center shrink-0 bg-background max-md:w-[3.7625rem] max-md:h-[3.7625rem] max-md:p-4 md:max-lg:w-[3.8625rem] md:max-lg:h-[3.8625rem] md:max-lg:p-[16.5px]">
        {" "}
      </div>
      {" "}
      <p data-cid={cids[2]} className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]">
        {d.description}
      </p>
      {" "}
    </div>
  );
}

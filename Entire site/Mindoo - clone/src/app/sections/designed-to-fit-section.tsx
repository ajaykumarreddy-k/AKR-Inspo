import Tile, { type TileData } from "../components/tile";
import { Tile_cids } from "../_cids";
const Tile_data: TileData[] = [
    { text: "No new systems to learn" },
    { text: "Minor workflow changes" },
    { text: "No tech expertise needed" },
    { text: "Built for real-world patient conversations" },
    { text: "Fully auditable, MDR, EU AI Act compliant, GDPR-native" },
    { text: "Creates capacity without increasing headcount" }
];
/** Designed To Fit section. */
export default function DesignedToFitSection({ tileData = Tile_data } = {}) {
  return (
    <section className="block relative bg-surface" data-cid="n393">
      <div className="block pt-48 max-lg:pt-16" data-cid="n394" />
      <div className="block px-20 max-lg:px-6" data-cid="n395">
        <div className="block max-w-320 mx-auto" data-cid="n396">
          <div className="flex flex-col justify-start items-center gap-16 text-center" data-cid="n397">
            <div className="flex flex-col justify-start items-center gap-8" data-cid="n398">
              <div className="block max-w-156 text-color-001 [font-family:'Martina_Plantijn',_Arial,_sans-serif] text-[4rem] leading-[4.375rem] tracking-[-2.56px] max-md:max-w-60 max-md:text-2xl max-md:leading-[1.625rem] max-md:tracking-[-0.96px] md:max-lg:max-w-136 md:max-lg:text-[3.5rem] md:max-lg:leading-[3.875rem] md:max-lg:tracking-[-2.24px]" data-cid="n399" data-component="heading" aria-label="Designed to fit the way you already work.">
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n400" aria-hidden="true">
                  Designed
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n401" aria-hidden="true">
                  to
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n402" aria-hidden="true">
                  fit
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n403" aria-hidden="true">
                  the
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n404" aria-hidden="true">
                  way
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n405" aria-hidden="true">
                  you
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n406" aria-hidden="true">
                  already
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n407" aria-hidden="true">
                  work.
                </div>
              </div>
              <p className="w-full max-w-105 block text-muted-foreground" data-cid="n408">
                {"Mindoo doesn’t replace staff. "}
                <br className="inline" data-cid="n409" />
                It takes on the repeat work around care. And your team can get back to what they came into healthcare for.
              </p>
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-8" data-cid="n410">
              <div className="w-full h-160 flex relative rounded-2xl justify-center items-center overflow-hidden bg-border md:max-lg:w-[85%]" data-cid="n411">
                <div className="w-full h-full block" data-cid="n412">
                  <img className="w-280 h-160 inline-block overflow-clip aspect-[auto_1120/640] max-md:w-[20.4375rem] md:max-lg:w-153 2xl:w-320" data-cid="n413" height="640" src="/assets/cloned/images/1ecd8452fa34.png" width="1120" alt="" />
                </div>
                <div className="h-33 flex absolute bottom-8 inset-x-0 min-w-0 justify-center items-start max-md:h-34 max-md:bottom-4" data-cid="n414">
                  <div className="flex max-w-[50%] flex-wrap justify-center items-start gap-1 max-md:max-w-full md:max-lg:max-w-[80%]" data-cid="n415">
                    {tileData.map((d, i) => <Tile key={i} d={d} cids={Tile_cids[i]} />)}
                  </div>
                </div>
              </div>
              <div className="block max-w-66 text-muted-foreground text-[0.625rem] leading-[0.9375rem] tracking-[0.5px] uppercase" data-cid="n428">
                Patients feel heard. Staff feel supported. Time is used where it matters most.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block pt-16" data-cid="n429" />
    </section>
  );
}

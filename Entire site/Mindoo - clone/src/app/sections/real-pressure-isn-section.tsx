import Logo2, { type Logo2Data } from "../components/logo2";
import { Logo2_cids } from "../_cids";
import { Logo2_styles } from "../_styles";
const Logo2_data: Logo2Data[] = [
    { alt: "Male doctor with gray hair and stethoscope thoughtfully listening to a patient with blonde hair in a medical office.", imgSrc: "/assets/cloned/images/8d191f478c51.png" },
    { alt: "Healthcare worker in blue scrubs pushing a patient on a stretcher through a hospital hallway.", imgSrc: "/assets/cloned/images/2a0071484c96.png" },
    { alt: "Surgeon in blue scrubs and surgical cap walking quickly through an operating room.", imgSrc: "/assets/cloned/images/56ae038188ea.png", sizes: "(max-width: 540px) 100vw, 540px", srcSet: "/assets/cloned/images/b5b78b3a2f7a.png 500w, /assets/cloned/images/56ae038188ea.png 540w" },
    { alt: "Person wearing and adjusting blue disposable gloves on their hands.", imgSrc: "/assets/cloned/images/1e1d5dd710b8.png" }
];
/** Real Pressure Isn section. */
export default function RealPressureIsnSection({ logo2Data = Logo2_data } = {}) {
  return (
    <section className="h-220 block relative bg-surface max-md:h-160" data-cid="n154" id="problem">
      <div className="block px-20 h-full max-lg:px-6" data-cid="n155">
        <div className="block max-w-320 mx-auto h-full" data-cid="n156">
          <div className="h-full flex justify-center items-center" data-cid="n157">
            <div className="flex relative flex-col justify-start items-start" data-cid="n158">
              <div className="w-0 h-px block" data-cid="n159">
                {logo2Data.map((d, i) => <Logo2 key={i} d={d} cids={Logo2_cids[i]} styles={Logo2_styles[i]} />)}
              </div>
              <div className="block max-w-156 text-color-001 [font-family:'Martina_Plantijn',_Arial,_sans-serif] text-[4rem] leading-[4.375rem] tracking-[-2.56px] max-md:max-w-60 max-md:text-2xl max-md:leading-[1.625rem] max-md:tracking-[-0.96px] md:max-lg:max-w-136 md:max-lg:text-[3.5rem] md:max-lg:leading-[3.875rem] md:max-lg:tracking-[-2.24px]" data-cid="n168" data-component="heading" aria-label="The real pressure isn’t  the care. It’s everything  around it.">
                <span className="inline text-muted-foreground" data-cid="n169">
                  <div className="inline-block relative [filter:blur(0px)]" data-cid="n170" aria-hidden="true">
                    The
                  </div>
                  {" "}
                  <div className="inline-block relative [filter:blur(0px)]" data-cid="n171" aria-hidden="true">
                    real
                  </div>
                  {" "}
                  <div className="inline-block relative [filter:blur(0px)]" data-cid="n172" aria-hidden="true">
                    pressure
                  </div>
                  {" "}
                  <div className="inline-block relative [filter:blur(0px)]" data-cid="n173" aria-hidden="true">
                    isn’t
                  </div>
                  {" "}
                  <div className="inline-block relative [filter:blur(0px)]" data-cid="n174" aria-hidden="true">
                    the
                  </div>
                  {" "}
                  <div className="inline-block relative [filter:blur(0px)]" data-cid="n175" aria-hidden="true">
                    care.
                  </div>
                </span>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n176" aria-hidden="true">
                  It’s
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n177" aria-hidden="true">
                  everything
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n178" aria-hidden="true">
                  around
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n179" aria-hidden="true">
                  it.
                </div>
              </div>
              <div className="flex mt-12 flex-col justify-start items-start gap-4" data-cid="n180">
                <p className="block max-w-142.5 text-color-001 text-2xl leading-9 max-md:max-w-60 max-md:text-sm max-md:leading-[1.3125rem] md:max-lg:max-w-114 md:max-lg:text-xl md:max-lg:leading-7.5" data-cid="n181">
                  The day breaks under intake, calls, symptom logs, and coordination long before the clinical work starts.
                </p>
                <p className="block max-w-142.5 text-color-001 text-2xl leading-9 max-md:max-w-60 max-md:text-sm max-md:leading-[1.3125rem] md:max-lg:max-w-114 md:max-lg:text-xl md:max-lg:leading-7.5" data-cid="n182">
                  More demand from hospitals. Tighter budgets. Fewer people to handle all that.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import FeatureCard from "../components/feature-card";
import { FeatureCard_cids } from "../_cids";
import { FeatureCard_styles } from "../_styles";
import { features as featuresContent } from "../content";
/** Feature Grid section. */
export default function FeatureGridSection({ features = featuresContent } = {}) {
  return (
    <section className="block relative bg-surface" style={{ backgroundImage: "linear-gradient(var(--surface), var(--background))" }} data-cid="n430" id="safety">
      <div className="block pt-16" data-cid="n431" />
      <div className="block px-20 max-lg:px-6" data-cid="n432">
        <div className="block max-w-320 mx-auto" data-cid="n433">
          <div className="flex flex-col justify-start items-center gap-16 text-center" data-cid="n434">
            <div className="block max-w-195 text-color-001 [font-family:'Martina_Plantijn',_Arial,_sans-serif] text-[4rem] leading-[4.375rem] tracking-[-2.56px] max-md:max-w-75 max-md:text-2xl max-md:leading-[1.625rem] max-md:tracking-[-0.96px] md:max-lg:max-w-170 md:max-lg:text-[3.5rem] md:max-lg:leading-[3.875rem] md:max-lg:tracking-[-2.24px]" data-cid="n435" data-component="heading" aria-label="Highest safety standards, through and through.">
              <div className="inline-block relative [filter:blur(0px)]" data-cid="n436" aria-hidden="true">
                Highest
              </div>
              {" "}
              <div className="inline-block relative [filter:blur(0px)]" data-cid="n437" aria-hidden="true">
                safety
              </div>
              {" "}
              <div className="inline-block relative [filter:blur(0px)]" data-cid="n438" aria-hidden="true">
                standards,
              </div>
              {" "}
              <div className="inline-block relative [filter:blur(0px)]" data-cid="n439" aria-hidden="true">
                through
              </div>
              {" "}
              <div className="inline-block relative [filter:blur(0px)]" data-cid="n440" aria-hidden="true">
                and
              </div>
              {" "}
              <div className="inline-block relative [filter:blur(0px)]" data-cid="n441" aria-hidden="true">
                through.
              </div>
            </div>
            <div className="block" data-cid="n442">
              <div className="w-full grid gap-2 [grid-auto-columns:1fr] grid-cols-[repeat(auto-fit,_minmax(355px,_1fr))] max-md:flex max-lg:flex-col max-md:grid-cols-[1fr_1fr]" data-cid="n443">
                {features.map((d, i) => <FeatureCard key={i} d={d} cids={FeatureCard_cids[i]} styles={FeatureCard_styles[i]} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block pt-32" data-cid="n468" />
    </section>
  );
}

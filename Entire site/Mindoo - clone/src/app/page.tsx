import DittoMotion from "./ditto/DittoMotion";
import HeroSection from "./sections/hero-section";
import RealPressureIsnSection from "./sections/real-pressure-isn-section";
import StartWhereTheSection from "./sections/start-where-the-section";
import DonNeedEverythingSection from "./sections/don-need-everything-section";
import StartToFinishSection from "./sections/start-to-finish-section";
import DesignedToFitSection from "./sections/designed-to-fit-section";
import FeatureGridSection from "./sections/feature-grid-section";
import BecauseHealthcareIsSection from "./sections/because-healthcare-is-section";
import NavigationHomeProblemSection from "./sections/navigation-home-problem-section";
import ListRow, { type ListRowData } from "./components/list-row";
import Icon from "./svgs/svg-icon";
import Icon2 from "./svgs/svg-icon2";
import { ListRow_cids } from "./_cids";
import { ListRow_styles } from "./_styles";

const ListRow_data: ListRowData[] = [
    { href: "/#problem", label: "Problem" },
    { href: "/#solution", label: "Solution" },
    { href: "/#agents", label: "Agents" },
    { href: "/#safety", label: "Safety" }
];

export default function Page() {
  return (
    <>
      <div className="min-h-screen block overflow-clip" data-cid="n1">
        <div className="block" data-cid="n2">
          <div className="block" data-cid="n3" />
        </div>
        <div className="h-12.5 block fixed top-10 inset-x-0 z-1000 transform-[matrix(1,1.74533e-05,-1.74533e-05,1,0,0)] origin-[640px_25px] max-md:origin-[187.5px_25px] md:max-lg:origin-[384px_25px] 2xl:origin-[960px_25px]" data-cid="n4">
          <div className="block relative z-1000" data-cid="n5">
            <div className="block px-20 max-lg:px-6" data-cid="n6">
              <div className="block max-w-320 mx-auto" data-cid="n7">
                <div className="h-12.5 border border-solid border-border block max-w-220 mx-auto rounded-2xl justify-center items-center bg-background shadow-[var(--clr-0)_0px_2px_8px_0px] max-lg:relative" data-cid="n8">
                  <div className="h-full flex pr-2 pl-4 justify-center items-center gap-5 max-lg:justify-between" data-cid="n9">
                    <div className="w-1/3 flex justify-start items-center max-md:w-[41%] md:max-lg:w-[18%]" data-cid="n10">
                      <a className="w-31 h-[1.6rem] block max-w-full shrink-0 text-color-001 cursor-pointer" data-cid="n11" data-component="link" aria-current="page" href="/">
                        <img className="w-full h-6 inline-block max-w-full overflow-clip object-cover align-middle" data-cid="n12" data-component="image" alt="Mindoo logo" src="/assets/cloned/svg/d16fd1605e4b.svg" />
                      </a>
                    </div>
                    <div className="flex justify-center items-center max-lg:hidden" data-cid="n13">
                      <ul className="flex justify-start items-center gap-4 [list-style-type:none] list-outside" data-cid="n14">
                        {ListRow_data.map((d, i) => <ListRow key={i} d={d} cids={ListRow_cids[i]} styles={ListRow_styles[i]} />)}
                      </ul>
                    </div>
                    <div className="w-70 flex justify-end items-center gap-0.5 max-lg:w-10" data-cid="n27">
                      <div className="flex justify-start items-center gap-1 max-lg:hidden" data-cid="n28">
                        <a className="w-[4.6875rem] h-8.5 border border-solid border-border flex max-w-full py-3 px-4 rounded-xl justify-center items-center shrink-0 gap-x-3 text-color-002 bg-background cursor-pointer hover:bg-surface" data-cid="n29" data-component="link" href="https://platform.mindoo.ai/login" target="_blank">
                          <div className="block text-sm leading-[1.3125rem] whitespace-nowrap" data-cid="n30">
                            Sign in
                          </div>
                        </a>
                        <a className="w-[7.0625rem] h-8.5 flex max-w-full py-3 px-4 rounded-xl justify-center items-center shrink-0 gap-x-3 text-background bg-color-002 cursor-pointer hover:bg-clr-8 hover:border-clr-8 focus:border-color-002" data-cid="n31" data-component="link" href="https://calendar.notion.so/meet/gauthierwillemse/mindoo" target="_blank">
                          <div className="block text-sm leading-[1.3125rem] whitespace-nowrap" data-cid="n32">
                            Book a demo
                          </div>
                        </a>
                      </div>
                      <button className="w-10 h-10 hidden min-w-0 flex-col justify-center items-center gap-1.5 text-center bg-clr-1 cursor-pointer max-lg:border max-lg:border-solid max-lg:border-border max-lg:flex max-lg:rounded-2xl" data-cid="n33" aria-expanded="false" aria-label="Toggle menu" type="button">
                        <div className="block max-lg:w-[0.9375rem]" data-cid="n34">
                          <Icon cid={"n35"} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block pointer-events-none before:content-['_'] before:table before:w-0 before:h-0 before:text-foreground before:text-base before:font-medium before:leading-6 after:content-['_'] after:table after:w-0 after:h-0 after:text-foreground after:text-base after:font-medium after:leading-6" data-cid="n36" />
        <main className="block" data-cid="n37">
          <div className="h-1 block" style={{ backgroundImage: "linear-gradient(90deg, var(--primary), var(--clr-2) 60%, var(--clr-3))" }} data-cid="n38" />
          <div className="block" data-cid="n39">
            <div className="block" data-cid="n40" role="list">
              <div className="block" data-cid="n41" role="listitem">
                <a className="h-15.5 flex max-w-full pt-3 pb-8 px-4 justify-center items-center gap-2.5 text-color-001 bg-surface cursor-pointer max-md:px-8" data-cid="n42" data-component="link" href="/news/mindoo-raises-eu5m-to-build-ai-agents-that-handle-intake-patient-access-and-follow-up-for-healthcare-teams">
                  <div className="block overflow-hidden text-foreground text-xs leading-4.5 whitespace-nowrap text-nowrap" data-cid="n43">
                    Mindoo raises €5M to build AI agents that handle intake, patient access and follow-up for healthcare teams.
                  </div>
                  <div className="flex justify-start items-center gap-1 whitespace-nowrap text-nowrap" data-cid="n44">
                    <div className="block text-muted-foreground text-xs leading-4.5" data-cid="n45">
                      Read more
                    </div>
                    <div className="w-4 block text-muted-foreground" data-cid="n46">
                      <Icon2 cid={"n47"} />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <HeroSection />
          <RealPressureIsnSection />
          <StartWhereTheSection />
          <DonNeedEverythingSection />
          <StartToFinishSection />
          <DesignedToFitSection />
          <FeatureGridSection />
          <BecauseHealthcareIsSection />
        </main>
        <NavigationHomeProblemSection />
        <div className="h-1 block" style={{ backgroundImage: "linear-gradient(90deg, var(--primary), var(--clr-2) 60%, var(--clr-3))" }} data-cid="n534" />
      </div>
      {" "}
      <DittoMotion spec={{"waapi":[],"rotators":[],"reveals":[{"cid":"n94","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n96","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n98","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n99","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n100","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n101","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n102","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n103","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n104","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n105","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n106","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n107","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n108","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n109","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n110","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n111","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n112","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n113","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n114","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n115","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n116","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n117","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n118","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n119","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n120","opacity":"0","transform":"none","transition":"","visibility":"hidden"},{"cid":"n160","opacity":"0.3","transform":"none","transition":"opacity 0.6s ease, transform 0.6s ease"},{"cid":"n162","opacity":"0","transform":"none","transition":"opacity 0.6s ease, transform 0.6s ease"},{"cid":"n164","opacity":"0.2","transform":"none","transition":"opacity 0.6s ease, transform 0.6s ease"},{"cid":"n228","opacity":"0","transform":"none","transition":"opacity 0.6s ease, transform 0.6s ease"},{"cid":"n236","opacity":"0","transform":"none","transition":"opacity 0.6s ease, transform 0.6s ease"},{"cid":"n238","opacity":"0","transform":"none","transition":"opacity 0.6s ease, transform 0.6s ease"},{"cid":"n242","opacity":"0","transform":"none","transition":"opacity 0.6s ease, transform 0.6s ease"}],"marquees":[]}} />
    </>
  );
}

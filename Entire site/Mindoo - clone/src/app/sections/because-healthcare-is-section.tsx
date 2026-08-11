import Logo, { type LogoData } from "../components/logo";
import Illustration2 from "../svgs/svg-illustration2";
import Illustration3 from "../svgs/svg-illustration3";
import { Logo_cids2 } from "../_cids";
import { Logo_styles2 } from "../_styles";
const Logo_data2: LogoData[] = [
    { alt: "Blue mindoo character", sizes: "(max-width: 811px) 100vw, 811px", imgSrc: "/assets/cloned/images/c3c150ae1301.png", srcSet: "/assets/cloned/images/b804f27ee69d.png 500w, /assets/cloned/images/c47e546ede7f.png 800w, /assets/cloned/images/c3c150ae1301.png 811w" },
    { alt: "Orange mindoo character", sizes: "(max-width: 605px) 100vw, 605px", imgSrc: "/assets/cloned/images/8636cb69c6a3.png", srcSet: "/assets/cloned/images/3a3733b18682.png 500w, /assets/cloned/images/8636cb69c6a3.png 605w" },
    { alt: "Pink mindoo character", sizes: "(max-width: 605px) 100vw, 605px", imgSrc: "/assets/cloned/images/c8294150fca8.png", srcSet: "/assets/cloned/images/93887c50f1aa.png 500w, /assets/cloned/images/c8294150fca8.png 605w" },
    { alt: "Green mindoo character", sizes: "(max-width: 534px) 100vw, 534px", imgSrc: "/assets/cloned/images/d179217c5b0e.png", srcSet: "/assets/cloned/images/3271f3234178.png 500w, /assets/cloned/images/d179217c5b0e.png 534w" },
    { alt: "Purple mindoo character", sizes: "(max-width: 534px) 100vw, 534px", imgSrc: "/assets/cloned/images/555282caa1e7.png", srcSet: "/assets/cloned/images/70770befa748.png 500w, /assets/cloned/images/555282caa1e7.png 534w" }
];
/** Because Healthcare Is section. */
export default function BecauseHealthcareIsSection({ logoData2 = Logo_data2 } = {}) {
  return (
    <section className="block relative bg-background" data-cid="n469">
      <div className="block pt-16" data-cid="n470" />
      <div className="flex justify-center items-center" data-cid="n471">
        <div className="w-80 h-40 flex relative justify-center items-start" data-cid="n472">
          <div className="flex relative justify-start items-start" data-cid="n473">
            {logoData2.map((d, i) => <Logo key={i} d={d} cids={Logo_cids2[i]} styles={Logo_styles2[i]} />)}
          </div>
        </div>
        <div className="h-[17.6875rem] block absolute top-10 right-0 left-[45.6rem] min-w-0 max-w-180 max-md:h-[10.4375rem] max-md:top-[5.2375rem] max-md:right-[-112.5px] max-md:left-[167.5px] md:max-lg:h-[263.7px] md:max-lg:top-[38.3px] md:max-lg:-right-[9.6rem] md:max-lg:left-[25.6rem] 2xl:h-[368.3px] 2xl:left-300" data-cid="n484">
          <div className="h-full block before:content-['_'] before:table before:w-0 before:h-0 before:text-foreground before:text-base before:font-medium before:leading-6 after:content-['_'] after:table after:w-0 after:h-0 after:text-foreground after:text-base after:font-medium after:leading-6" data-cid="n485">
            <Illustration2 cid={"n486"} />
          </div>
        </div>
        <div className="h-[16.0625rem] block absolute top-[0.8375rem] right-[45.6rem] left-0 min-w-0 max-w-180 max-md:h-[151.9px] max-md:top-[53.3px] max-md:right-[167.5px] max-md:left-[-112.5px] md:max-lg:h-[14.05rem] md:max-lg:top-[0.8rem] md:max-lg:right-[27.6rem] md:max-lg:-left-[9.6rem] 2xl:h-[334.3px] 2xl:right-300" data-cid="n487">
          <div className="h-full block before:content-['_'] before:table before:w-0 before:h-0 before:text-foreground before:text-base before:font-medium before:leading-6 after:content-['_'] after:table after:w-0 after:h-0 after:text-foreground after:text-base after:font-medium after:leading-6" data-cid="n488">
            <Illustration3 cid={"n489"} />
          </div>
        </div>
      </div>
      <div className="block pt-16" data-cid="n490" />
      <div className="block px-20 max-lg:px-6" data-cid="n491">
        <div className="block max-w-320 mx-auto" data-cid="n492">
          <div className="flex flex-col justify-start items-center gap-8 text-center" data-cid="n493">
            <div className="flex flex-col justify-start items-center gap-12" data-cid="n494">
              <div className="block max-w-220.5 text-color-001 [font-family:'Martina_Plantijn',_Arial,_sans-serif] text-[5rem] leading-20 tracking-[-3.2px] max-md:max-w-130.5 max-md:text-5xl max-md:leading-12 max-md:tracking-[-1.92px] md:max-lg:max-w-175.5 md:max-lg:text-[4rem] md:max-lg:leading-16 md:max-lg:tracking-[-2.56px]" data-cid="n495" data-component="heading" aria-label="Because healthcare is already stressful enough.">
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n496" aria-hidden="true">
                  Because
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n497" aria-hidden="true">
                  healthcare
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n498" aria-hidden="true">
                  is
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n499" aria-hidden="true">
                  already
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n500" aria-hidden="true">
                  stressful
                </div>
                {" "}
                <div className="inline-block relative [filter:blur(0px)]" data-cid="n501" aria-hidden="true">
                  enough.
                </div>
              </div>
              <p className="block text-muted-foreground text-xl leading-7.5" data-cid="n502">
                {"Create breathing room for your team, "}
                <br className="inline" data-cid="n503" />
                without hiring more people to do boring admin work.
              </p>
            </div>
            <a className="w-[7.0625rem] h-8.5 flex max-w-full py-3 px-4 rounded-xl justify-center items-center shrink-0 gap-x-3 text-background bg-color-002 cursor-pointer hover:bg-clr-8 hover:border-clr-8 focus:bg-clr-14 focus:border-clr-14" data-cid="n504" data-component="link" href="https://calendar.notion.so/meet/gauthierwillemse/mindoo" target="_blank">
              <div className="block text-sm leading-[1.3125rem] whitespace-nowrap" data-cid="n505">
                Book a demo
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="block pt-12" data-cid="n506" />
    </section>
  );
}

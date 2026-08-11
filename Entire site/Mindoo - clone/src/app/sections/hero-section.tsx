import Logo, { type LogoData } from "../components/logo";
import Illustration from "../svgs/svg-illustration";
import Illustration2 from "../svgs/svg-illustration2";
import Illustration3 from "../svgs/svg-illustration3";
import { Logo_cids } from "../_cids";
import { Logo_styles } from "../_styles";
const Logo_data: LogoData[] = [
    { alt: "Blue mindoo character", sizes: "(max-width: 811px) 100vw, 811px", imgSrc: "/assets/cloned/images/c3c150ae1301.png", srcSet: "/assets/cloned/images/b804f27ee69d.png 500w, /assets/cloned/images/c47e546ede7f.png 800w, /assets/cloned/images/c3c150ae1301.png 811w" },
    { alt: "Orange mindoo character", sizes: "(max-width: 605px) 100vw, 605px", imgSrc: "/assets/cloned/images/8636cb69c6a3.png", srcSet: "/assets/cloned/images/3a3733b18682.png 500w, /assets/cloned/images/8636cb69c6a3.png 605w" },
    { alt: "Pink mindoo character", sizes: "(max-width: 605px) 100vw, 605px", imgSrc: "/assets/cloned/images/c8294150fca8.png", srcSet: "/assets/cloned/images/93887c50f1aa.png 500w, /assets/cloned/images/c8294150fca8.png 605w" },
    { alt: "Green mindoo character", sizes: "(max-width: 534px) 100vw, 534px", imgSrc: "/assets/cloned/images/d179217c5b0e.png", srcSet: "/assets/cloned/images/3271f3234178.png 500w, /assets/cloned/images/d179217c5b0e.png 534w" },
    { alt: "Purple mindoo character", sizes: "(max-width: 534px) 100vw, 534px", imgSrc: "/assets/cloned/images/555282caa1e7.png", srcSet: "/assets/cloned/images/70770befa748.png 500w, /assets/cloned/images/555282caa1e7.png 534w" }
];
/** Hero section — the page's lead block. */
export default function HeroSection({ logoData = Logo_data } = {}) {
  return (
    <section className="block relative bg-surface" style={{ backgroundImage: "linear-gradient(0deg, var(--surface), var(--background) 30%)" }} data-cid="n48">
      <div className="block pt-24 max-md:pt-12" data-cid="n49" />
      <div className="block px-20 max-lg:px-6" data-cid="n50">
        <div className="block max-w-320 mx-auto" data-cid="n51">
          <div className="flex flex-col justify-start items-center" data-cid="n52">
            <div className="flex flex-col justify-start items-center gap-4 text-center" data-cid="n53">
              <div className="h-7 flex rounded-lg justify-center items-center text-muted-foreground tracking-[0.8px] bg-background" data-cid="n54">
                <div className="flex px-3 justify-center items-center gap-3" data-cid="n55">
                  <div className="block text-[0.625rem] leading-2.5 tracking-[0.5px] uppercase whitespace-nowrap" data-cid="n56">
                    {"AI intake & patient access automation"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-center gap-8" data-cid="n57">
                <div className="flex flex-col justify-start items-center gap-6" data-cid="n58">
                  <div className="block max-w-171.5 text-color-001 [font-family:'Martina_Plantijn',_Arial,_sans-serif] text-[5rem] leading-20 tracking-[-3.2px] max-md:max-w-101.5 max-md:text-5xl max-md:leading-12 max-md:tracking-[-1.92px] md:max-lg:max-w-136.5 md:max-lg:text-[4rem] md:max-lg:leading-16 md:max-lg:tracking-[-2.56px]" data-cid="n59" data-component="heading" aria-label="The help healthcare teams were missing.">
                    <div className="inline-block relative" data-cid="n60" aria-hidden="true">
                      The
                    </div>
                    {" "}
                    <div className="inline-block relative" data-cid="n61" aria-hidden="true">
                      help
                    </div>
                    {" "}
                    <div className="inline-block relative" data-cid="n62" aria-hidden="true">
                      healthcare
                    </div>
                    {" "}
                    <div className="inline-block relative" data-cid="n63" aria-hidden="true">
                      teams
                    </div>
                    {" "}
                    <div className="inline-block relative" data-cid="n64" aria-hidden="true">
                      were
                    </div>
                    {" "}
                    <div className="inline-block relative" data-cid="n65" aria-hidden="true">
                      missing.
                    </div>
                  </div>
                  <div className="block max-w-125 text-muted-foreground" data-cid="n66" aria-label="Mindoo takes on the routine tasks, so your team can focus on what only humans can do. Intake done. Calls answered. Follow-ups handled. You get more capacity with the same team.">
                    <div className="block relative" data-cid="n67" aria-hidden="true">
                      {"Mindoo takes on the routine tasks, so your team can focus on what "}
                    </div>
                    <div className="block relative" data-cid="n68" aria-hidden="true">
                      {"only humans can do. Intake done. Calls answered. Follow-ups handled. "}
                    </div>
                    <div className="block relative" data-cid="n69" aria-hidden="true">
                      You get more capacity with the same team.
                    </div>
                  </div>
                </div>
              </div>
              <div className="block" data-cid="n70">
                <div className="flex pt-4 justify-center items-center gap-0.5 max-md:flex-wrap" data-cid="n71">
                  <a className="w-[7.0625rem] h-8.5 flex max-w-full py-3 px-4 rounded-xl justify-center items-center shrink-0 gap-x-3 text-background bg-color-002 cursor-pointer hover:bg-clr-8 hover:border-clr-8 focus:border-color-002" data-cid="n72" data-component="link" href="https://calendar.notion.so/meet/gauthierwillemse/mindoo" target="_blank">
                    <div className="block text-sm leading-[1.3125rem] whitespace-nowrap" data-cid="n73">
                      Book a demo
                    </div>
                  </a>
                  <a className="w-[7.1875rem] h-8.5 border border-solid border-border flex max-w-full py-3 px-4 rounded-xl justify-center items-center shrink-0 gap-x-3 text-color-002 bg-background cursor-pointer hover:bg-surface" data-cid="n74" data-component="link" href="#how">
                    <div className="block text-sm leading-[1.3125rem] whitespace-nowrap" data-cid="n75">
                      How it works
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block pt-6" data-cid="n76" />
      <div className="h-64 flex relative justify-center items-start" data-cid="n77">
        <div className="w-80 h-40 flex relative justify-center items-start" data-cid="n78">
          <div className="flex relative justify-start items-start" data-cid="n79">
            {logoData.map((d, i) => <Logo key={i} d={d} cids={Logo_cids[i]} styles={Logo_styles[i]} />)}
          </div>
          <div className="w-82.5 h-full border border-solid border-border block absolute top-0 -left-112 z-5 min-w-0 rounded-2xl overflow-hidden bg-background shadow-[var(--clr-4)_0px_2px_8px_0px] max-lg:hidden" data-cid="n90">
            <div className="flex p-3.5 flex-col justify-start items-start gap-3" data-cid="n91">
              <div className="w-full block" data-cid="n92">
                <div className="flex justify-start items-center gap-2" data-cid="n93">
                  <div className="w-5 block" data-cid="n94">
                    <img className="w-full h-5 inline-block max-w-full overflow-clip object-cover align-middle" data-cid="n95" data-component="image" alt="Blue mindoo character" src="/assets/cloned/images/a800228d19bf.png" />
                  </div>
                  <div className="block text-muted-foreground text-xs leading-4.5" data-cid="n96">
                    Max, the Intake agent
                  </div>
                </div>
              </div>
              <div className="block max-w-75 text-color-001" data-cid="n97" aria-label="I'm Max from Dr. Johnssons clinic. I'll help you prepare for your appointment today. What's the main reason for your visit today?">
                <div className="inline-block relative" data-cid="n98" aria-hidden="true">
                  I'm
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n99" aria-hidden="true">
                  Max
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n100" aria-hidden="true">
                  from
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n101" aria-hidden="true">
                  Dr.
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n102" aria-hidden="true">
                  Johnssons
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n103" aria-hidden="true">
                  clinic.
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n104" aria-hidden="true">
                  I'll
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n105" aria-hidden="true">
                  help
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n106" aria-hidden="true">
                  you
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n107" aria-hidden="true">
                  prepare
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n108" aria-hidden="true">
                  for
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n109" aria-hidden="true">
                  your
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n110" aria-hidden="true">
                  appointment
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n111" aria-hidden="true">
                  today.
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n112" aria-hidden="true">
                  What's
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n113" aria-hidden="true">
                  the
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n114" aria-hidden="true">
                  main
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n115" aria-hidden="true">
                  reason
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n116" aria-hidden="true">
                  for
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n117" aria-hidden="true">
                  your
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n118" aria-hidden="true">
                  visit
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n119" aria-hidden="true">
                  today?
                </div>
              </div>
            </div>
          </div>
          <div className="w-82.5 h-34 border border-solid border-border block absolute top-4 -right-116 z-5 min-w-0 rounded-2xl overflow-hidden bg-background shadow-[var(--clr-4)_0px_2px_8px_0px] max-lg:hidden" data-cid="n120">
            <div className="flex p-3.5 flex-col justify-start items-start gap-3" data-cid="n121">
              <div className="w-full block" data-cid="n122">
                <div className="flex justify-between items-center gap-2" data-cid="n123">
                  <div className="flex justify-start items-center gap-2" data-cid="n124">
                    <div className="w-5 block" data-cid="n125">
                      <img className="w-full h-5 inline-block max-w-full overflow-clip object-cover align-middle" data-cid="n126" data-component="image" alt="David avatar" src="/assets/cloned/images/5f82277e1535.png" />
                    </div>
                    <div className="block text-muted-foreground text-xs leading-4.5" data-cid="n127">
                      David
                    </div>
                  </div>
                  <div className="flex px-2 rounded-md justify-start items-center gap-2 bg-surface-2" data-cid="n128">
                    <div className="w-24 block" data-cid="n129">
                      <Illustration cid={"n130"} />
                    </div>
                    <div className="block text-muted-foreground text-xs leading-4.5" data-cid="n131">
                      00:08
                    </div>
                  </div>
                </div>
              </div>
              <div className="block max-w-75 text-color-001" data-cid="n132" aria-label="I’ve been having headaches for about two weeks now. They’re getting worse and worse">
                <div className="inline-block relative" data-cid="n133" aria-hidden="true">
                  I’ve
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n134" aria-hidden="true">
                  been
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n135" aria-hidden="true">
                  having
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n136" aria-hidden="true">
                  headaches
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n137" aria-hidden="true">
                  for
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n138" aria-hidden="true">
                  about
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n139" aria-hidden="true">
                  two
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n140" aria-hidden="true">
                  weeks
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n141" aria-hidden="true">
                  now.
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n142" aria-hidden="true">
                  They’re
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n143" aria-hidden="true">
                  getting
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n144" aria-hidden="true">
                  worse
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n145" aria-hidden="true">
                  and
                </div>
                {" "}
                <div className="inline-block relative" data-cid="n146" aria-hidden="true">
                  worse
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[17.6875rem] block absolute -top-[0.8rem] right-0 left-[45.6rem] min-w-0 max-w-180 max-md:h-[10.4375rem] max-md:top-9 max-md:-right-[4.6875rem] max-md:left-32.5 md:max-lg:h-[263.7px] md:max-lg:top-[7.7px] md:max-lg:-right-[9.6rem] md:max-lg:left-[25.6rem] 2xl:h-[368.3px] 2xl:left-300" data-cid="n147">
          <div className="h-full block before:content-['_'] before:table before:w-0 before:h-0 before:text-foreground before:text-base before:font-medium before:leading-6 after:content-['_'] after:table after:w-0 after:h-0 after:text-foreground after:text-base after:font-medium after:leading-6" data-cid="n148">
            <Illustration2 cid={"n149"} />
          </div>
        </div>
        <div className="h-[16.0625rem] block absolute top-[-56.3px] right-[45.6rem] left-0 min-w-0 max-w-180 max-md:h-[151.9px] max-md:top-2.5 max-md:right-32.5 max-md:-left-[4.6875rem] md:max-lg:h-[14.05rem] md:max-lg:top-[-30.7px] md:max-lg:right-[27.6rem] md:max-lg:-left-[9.6rem] 2xl:h-[334.3px] 2xl:right-300" data-cid="n150">
          <div className="h-full block before:content-['_'] before:table before:w-0 before:h-0 before:text-foreground before:text-base before:font-medium before:leading-6 after:content-['_'] after:table after:w-0 after:h-0 after:text-foreground after:text-base after:font-medium after:leading-6" data-cid="n151">
            <Illustration3 cid={"n152"} />
          </div>
        </div>
      </div>
      <div className="block pt-24 max-md:pt-12" data-cid="n153" />
    </section>
  );
}

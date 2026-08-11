import MediaCard, { type MediaCardData } from "../components/media-card";
import Icon3 from "../svgs/svg-icon3";
import { MediaCard_cids } from "../_cids";
import { MediaCard_styles } from "../_styles";
const MediaCard_data: MediaCardData[] = [
    { kind: "heading", title: "Follow-up agent", text: "Checks in after visits and monitors recovery. Alerts your team if something needs attention.", label: "Try Lisa", imgSrc: "/assets/cloned/images/d74fcecf50b0.png", srcSet: "/assets/cloned/images/6e21bf769440.png 500w, /assets/cloned/images/d74fcecf50b0.png 696w" },
    { ariahidden: "true", kind: "heading", title: "Scribe agent", text: "Drafts notes, letters and orders.\nFinds the details clinicians need. In seconds.", label: "Try Jimmy", imgSrc: "/assets/cloned/images/74d5f7b78ffa.png", srcSet: "/assets/cloned/images/6f01f0897647.png 500w, /assets/cloned/images/74d5f7b78ffa.png 696w" },
    { ariahidden: "true", title: "Intake agent", text: "Collects symptoms and history before the visit.\nPrepares a clear summary for the clinician.", label: "Try Max", imgSrc: "/assets/cloned/images/322aa0d50103.png", srcSet: "/assets/cloned/images/3934ae6ff8dc.png 500w, /assets/cloned/images/322aa0d50103.png 696w" },
    { ariahidden: "true", title: "Reception agent", text: "Answers routine calls. Handles bookings, rescheduling and simple requests.", label: "Try Sara", imgSrc: "/assets/cloned/images/5074571cee2a.png", srcSet: "/assets/cloned/images/5e34d494e605.png 500w, /assets/cloned/images/5074571cee2a.png 714w" },
    { ariahidden: "true", kind: "heading", title: "Custom agent", text: "Custom to your workflows. Teams simply describe what they need, and the agent follows.", label: "Try now", imgSrc: "/assets/cloned/images/74515f60a7f6.png", srcSet: "/assets/cloned/images/30791d936dfa.png 500w, /assets/cloned/images/74515f60a7f6.png 696w" }
];
/** Don Need Everything section. */
export default function DonNeedEverythingSection({ mediaCardData = MediaCard_data } = {}) {
  return (
    <section className="block relative bg-surface" data-cid="n248" id="agents">
      <div className="block pt-32" data-cid="n249" />
      <div className="flex flex-col justify-start items-center gap-16 text-center" data-cid="n250">
        <div className="block max-w-130.5 text-color-001 [font-family:'Martina_Plantijn',_Arial,_sans-serif] text-5xl leading-[2.6875rem] tracking-[-1.92px] max-md:max-w-90 max-md:text-[2rem] max-md:leading-[1.8125rem] max-md:tracking-[-1.28px] md:max-lg:max-w-112.5 md:max-lg:text-[2.5rem] md:max-lg:leading-9 md:max-lg:tracking-[-1.6px]" data-cid="n251" data-component="heading" aria-label="You don’t need everything on day one. Add AI agents as your team needs them.">
          <div className="inline-block relative [filter:blur(0px)]" data-cid="n252" aria-hidden="true">
            You
          </div>
          {" "}
          <div className="inline-block relative [filter:blur(0px)]" data-cid="n253" aria-hidden="true">
            don’t
          </div>
          {" "}
          <div className="inline-block relative [filter:blur(0px)]" data-cid="n254" aria-hidden="true">
            need
          </div>
          {" "}
          <div className="inline-block relative [filter:blur(0px)]" data-cid="n255" aria-hidden="true">
            everything
          </div>
          {" "}
          <div className="inline-block relative [filter:blur(0px)]" data-cid="n256" aria-hidden="true">
            on
          </div>
          {" "}
          <div className="inline-block relative [filter:blur(0px)]" data-cid="n257" aria-hidden="true">
            day
          </div>
          {" "}
          <div className="inline-block relative [filter:blur(0px)]" data-cid="n258" aria-hidden="true">
            one.
          </div>
          {" "}
          <span className="inline text-muted-foreground" data-cid="n259">
            <div className="inline-block relative [filter:blur(0px)]" data-cid="n260" aria-hidden="true">
              Add
            </div>
            {" "}
            <div className="inline-block relative [filter:blur(0px)]" data-cid="n261" aria-hidden="true">
              AI
            </div>
            {" "}
            <div className="inline-block relative [filter:blur(0px)]" data-cid="n262" aria-hidden="true">
              agents
            </div>
            {" "}
            <div className="inline-block relative [filter:blur(0px)]" data-cid="n263" aria-hidden="true">
              as
            </div>
            {" "}
            <div className="inline-block relative [filter:blur(0px)]" data-cid="n264" aria-hidden="true">
              your
            </div>
            {" "}
            <div className="inline-block relative [filter:blur(0px)]" data-cid="n265" aria-hidden="true">
              team
            </div>
            {" "}
            <div className="inline-block relative [filter:blur(0px)]" data-cid="n266" aria-hidden="true">
              needs
            </div>
            {" "}
            <div className="inline-block relative [filter:blur(0px)]" data-cid="n267" aria-hidden="true">
              them.
            </div>
          </span>
        </div>
        <div className="w-full max-w-340 block relative pt-8 overflow-hidden max-md:pt-12" data-cid="n268">
          <div className="flex flex-col justify-start items-center gap-12" data-cid="n269">
            <div className="w-full block" data-cid="n270">
              <div className="flex relative justify-start items-center" data-cid="n271" role="list">
                <div className="w-full h-72.5 block relative max-md:h-72" data-cid="n272">
                  <div className="w-320 h-full block absolute top-0 transform-[matrix(1,0,0,1,470.016,0)] max-md:w-[23.4375rem] max-md:transform-[matrix(1,0,0,1,19.5,0)] md:max-lg:w-192 md:max-lg:transform-[matrix(1,0,0,1,213.965,0)] 2xl:w-340 2xl:transform-[matrix(1,0,0,1,510,0)]" data-cid="n273">
                    {mediaCardData.map((d, i) => <MediaCard key={i} d={d} cids={MediaCard_cids[i]} styles={MediaCard_styles[i]} />)}
                  </div>
                </div>
              </div>
            </div>
            <div className="block max-md:max-w-120" data-cid="n324">
              <div className="flex justify-center items-center gap-4" data-cid="n325">
                <div className="w-8 h-8 border border-solid border-border flex rounded-full justify-center items-center cursor-pointer hover:bg-clr-9 focus:bg-clr-12" data-cid="n326">
                  <div className="w-5 h-5 block text-muted-foreground" data-cid="n327">
                    <Icon3 cid={"n328"} />
                  </div>
                </div>
                <div className="block" data-cid="n329">
                  <div className="flex justify-start items-center gap-0.5" data-cid="n330">
                    <div className="w-8 h-0.5 block bg-color-001" data-cid="n331" />
                    <div className="w-5 h-0.5 block bg-border" data-cid="n332" />
                    <div className="w-5 h-0.5 block bg-border" data-cid="n333" />
                    <div className="w-5 h-0.5 block bg-border" data-cid="n334" />
                    <div className="w-5 h-0.5 block bg-border" data-cid="n335" />
                  </div>
                </div>
                <div className="w-8 h-8 border border-solid border-border flex rounded-full justify-center items-center transform-[matrix(-1,0,0,-1,0,0)] origin-[16px_16px] cursor-pointer hover:bg-clr-10 focus:bg-clr-13" data-cid="n336">
                  <div className="w-5 h-5 block text-muted-foreground" data-cid="n337">
                    <Icon3 cid={"n338"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-40 h-full block absolute top-0 max-md:hidden" style={{ backgroundImage: "linear-gradient(90deg, var(--surface), var(--clr-7))" }} data-cid="n339" />
          <div className="w-40 h-full block absolute top-0 right-0 transform-[matrix(-1,0,0,-1,0,0)] origin-[80px_201px] max-md:hidden" style={{ backgroundImage: "linear-gradient(90deg, var(--surface), var(--clr-7))" }} data-cid="n340" />
        </div>
        <div className="block max-w-90 text-muted-foreground text-[0.625rem] leading-[0.9375rem] tracking-[0.5px] uppercase" data-cid="n341">
          Mindoo is the only agent platform that lets clinicians shape their own agents, inside a safe and governed infrastructure.
        </div>
      </div>
      <div className="block pt-32" data-cid="n342" />
    </section>
  );
}

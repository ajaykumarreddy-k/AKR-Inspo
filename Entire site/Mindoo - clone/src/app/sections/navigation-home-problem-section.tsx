import TextLink, { type TextLinkData } from "../components/text-link";
import TextLink2 from "../components/text-link2";
import { TextLink_cids, TextLink2_cids } from "../_cids";
import { TextLink_styles, TextLink2_styles } from "../_styles";
import { textLink2Data as textLink2DataContent } from "../content";
const TextLink_data: TextLinkData[] = [
    { ariacurrent: "page", href: "/", label: "Home" },
    { href: "/#problem", label: "Problem" },
    { href: "/#solution", label: "Solution" },
    { href: "/#agents", label: "Agents" }
];
/** Navigation Home Problem section. */
export default function NavigationHomeProblemSection({ textLinkData = TextLink_data, textLink2Data = textLink2DataContent } = {}) {
  return (
    <section className="block relative bg-background" data-cid="n507">
      <div className="block p-6" data-cid="n508">
        <div className="h-[34.075rem] block relative max-w-348 rounded-2xl overflow-hidden aspect-[13.92/6.16] bg-surface mx-auto max-md:h-192 max-lg:aspect-[initial] md:max-lg:h-120 2xl:h-154" data-cid="n509">
          <div className="h-full flex relative z-1 p-12 justify-between items-start max-lg:flex-col max-lg:justify-start max-lg:gap-16" data-cid="n510">
            <a className="w-[21%] block max-w-full text-color-001 cursor-pointer max-md:w-[69.5%] md:max-lg:w-[38%] 2xl:w-[18.5%]" data-cid="n511" data-component="link" href="#">
              <img className="w-full h-11.5 inline-block max-w-full overflow-clip object-cover align-middle max-md:h-[1.9375rem]" data-cid="n512" data-component="image" alt="Mindoo logo" src="/assets/cloned/svg/d16fd1605e4b.svg" />
            </a>
            <div className="block" data-cid="n513">
              <div className="grid gap-10 [grid-auto-columns:1fr] grid-cols-[repeat(auto-fit,_minmax(127px,_1fr))]" data-cid="n514">
                <div className="block" data-cid="n515">
                  <div className="flex flex-col justify-start items-start gap-4" data-cid="n516">
                    <div className="block text-primary text-xs leading-3 tracking-[0.6px] uppercase" data-cid="n517">
                      navigation
                    </div>
                    {textLinkData.map((d, i) => <TextLink key={i} d={d} cids={TextLink_cids[i]} styles={TextLink_styles[i]} />)}
                  </div>
                </div>
                <div className="block" data-cid="n522">
                  <div className="flex flex-col justify-start items-start gap-4" data-cid="n523">
                    <div className="block text-primary text-xs leading-3 tracking-[0.6px] uppercase" data-cid="n524">
                      legal
                    </div>
                    {textLink2Data.map((d, i) => <TextLink2 key={i} d={d} cids={TextLink2_cids[i]} styles={TextLink2_styles[i]} />)}
                  </div>
                </div>
                <div className="block" data-cid="n528">
                  <div className="flex flex-col justify-start items-start gap-4" data-cid="n529">
                    <div className="block text-primary text-xs leading-3 tracking-[0.6px] uppercase" data-cid="n530">
                      social
                    </div>
                    <a className="block text-color-001 text-sm leading-3.5 cursor-pointer hover:opacity-[0.829526] focus:opacity-[0.988176]" data-cid="n531" data-component="link" href="https://www.linkedin.com/company/mindooai/" target="_blank">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[541.3px] block absolute top-[54.5px] inset-x-0 [mix-blend-mode:multiply] max-md:h-[14.4rem] max-md:top-[33.6rem] md:max-lg:h-[15.8375rem] md:max-lg:top-66 md:max-lg:right-36 2xl:h-[38.225rem] 2xl:top-[3.85rem]" data-cid="n532">
            <img className="w-full h-[33.8125rem] inline-block max-w-full overflow-clip object-cover align-middle max-md:h-57.5 md:max-lg:h-[15.8125rem] 2xl:h-153" data-cid="n533" data-component="image" alt="Mindoo character floating on a cloud" sizes="(max-width: 991px) 100vw, 1136px" src="/assets/cloned/images/147dd2ede7ab.png" srcSet="/assets/cloned/images/17089e913204.png 500w, /assets/cloned/images/2db28cadb50c.png 800w, /assets/cloned/images/5a1256666e2f.png 1080w, /assets/cloned/images/bf69dcc85dcf.png 1600w, /assets/cloned/images/b441a0d387c6.png 2000w, /assets/cloned/images/147dd2ede7ab.png 2088w" />
          </div>
        </div>
      </div>
    </section>
  );
}

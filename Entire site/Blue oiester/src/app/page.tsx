import Icon from "./svgs/svg-icon";
import Icon2 from "./svgs/svg-icon2";
import ListRow, { type ListRowData } from "./components/list-row";
import Illustration from "./svgs/svg-illustration";
import Logo, { type LogoData } from "./components/logo";
import Logo2, { type Logo2Data } from "./components/logo2";
import Illustration2 from "./svgs/svg-illustration2";
import Illustration3 from "./svgs/svg-illustration3";
import Illustration4 from "./svgs/svg-illustration4";
import { ListRow_cids, Logo_cids, Logo2_cids, Logo_cids2 } from "./_cids";
import { ListRow_styles, Logo_styles, Logo2_styles, Logo_styles2 } from "./_styles";

const ListRow_data: ListRowData[] = [
    { href: "/", label: "Featured" },
    { href: "/exhibitions/", label: "Exhibitions" },
    { href: "/events/", label: "Events" },
    { href: "/writing/", label: "Writing" },
    { href: "/about/", label: "About" },
    { href: "/shop/", label: "Shop" },
    { href: "/search/", label: "Search" }
];
const Logo_data: LogoData[] = [
    { href: "/exhibitions/hawaiki-apopz/", imgSrc: "/assets/cloned/images/b510a6655a23.webp", height: "309", viewBox: "0 0 523 309", width: "523", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Hawaiki Apōpz 2026. Te Ikahoungata, Mara TK, Keita Newbery & Ngaumutane Jones" alignmentBaseline="top" xlinkHref="#text-path-0-features" startOffset="0%" js-offset="0.4979562714695931">
                {"Past Exhibition: Hawaiki Apōpz 2026. Te Ikahoungata, Mara TK, Keita Newbery & Ngaumutane Jones"}
              </textPath>
            </text>
            <path d=" M 523 90 L 523 269 A 40 40 0 0 1 483 309 L 40 309 A 40 40 0 0 1 0 269   L 0 40  A 40 40 0 0 1  40 0 L  483 0  A  40 40 0 0 1 523 40 L 523 40" transform="translate(39.999875,39.999875)" id="text-path-0-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/ghost-hiikoi-2/", imgSrc: "/assets/cloned/images/4ad5523a98b3.webp", height: "317", viewBox: "0 0 230 317", width: "230", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Ghost Hiikoi 2 2026. ilish thomas" alignmentBaseline="top" xlinkHref="#text-path-1-features" startOffset="0%" js-offset="0.14385504890233278">
                {"Past Exhibition: Ghost Hiikoi 2 2026. ilish thomas"}
              </textPath>
            </text>
            <path d="M 90 0 L  190 0  A  40 40 0 0 1 230 40 L 230 277 A 40 40 0 0 1 190 317 L 40 317 A 40 40 0 0 1 0 277   L 0 40  A 40 40 0 0 1  40 0" transform="translate(39.999875,39.999875)" id="text-path-1-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/project-nature-fig-20b-maps-of-the-world-vol1/", imgSrc: "/assets/cloned/images/1c94f17827c8.webp", height: "198", viewBox: "0 0 230 198", width: "230", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Project Nature Fig 20b. {maps of the world Vol.1} 2007. " alignmentBaseline="top" xlinkHref="#text-path-2-features" startOffset="0%" js-offset="0.6589581413194537">
                {"Past Exhibition: Project Nature Fig 20b. {maps of the world Vol.1} 2007."}
              </textPath>
            </text>
            <path d="M 140 198 L 40 198 A 40 40 0 0 1 0 158   L 0 40  A 40 40 0 0 1  40 0 L  190 0  A  40 40 0 0 1 230 40 L 230 158 A 40 40 0 0 1 190 198 L  190 198 " transform="translate(39.999875,39.999875)" id="text-path-2-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/the-blue-oysters-second-anniversary/", imgSrc: "/assets/cloned/images/b7119fd1939e.webp", height: "142", viewBox: "0 0 316 142", width: "316", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: The Blue Oyster’s Second Anniversary 2001. " alignmentBaseline="top" xlinkHref="#text-path-3-features" startOffset="0%" js-offset="0.40880248807370667">
                {"Past Exhibition: The Blue Oyster’s Second Anniversary 2001."}
              </textPath>
            </text>
            <path d=" M 316 65 L 316 102 A 40 40 0 0 1 276 142 L 40 142 A 40 40 0 0 1 0 102   L 0 40  A 40 40 0 0 1  40 0 L  276 0  A  40 40 0 0 1 316 40 L 316 40" transform="translate(39.999875,39.999875)" id="text-path-3-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/the-barge-and-the-bear/", imgSrc: "/assets/cloned/images/f40fc62a729b.webp", height: "441", viewBox: "0 0 265 441", width: "265", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: The Barge and the Bear 2008. " alignmentBaseline="top" xlinkHref="#text-path-4-features" startOffset="0%" js-offset="0.13263328280299902">
                {"Past Exhibition: The Barge and the Bear 2008."}
              </textPath>
            </text>
            <path d="M 90 0 L  225 0  A  40 40 0 0 1 265 40 L 265 401 A 40 40 0 0 1 225 441 L 40 441 A 40 40 0 0 1 0 401   L 0 40  A 40 40 0 0 1  40 0" transform="translate(39.999875,39.999875)" id="text-path-4-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/hone-wiremu-heke-pokai-agrees-im-a-country-hick/", imgSrc: "/assets/cloned/images/f65923d3c00a.webp", height: "620", viewBox: "0 0 230 620", width: "230", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Hone Wiremu Heke Pokai agrees, I’m a country hick. 2003. " alignmentBaseline="top" xlinkHref="#text-path-5-features" startOffset="0%" js-offset="0.3819487979635596">
                {"Past Exhibition: Hone Wiremu Heke Pokai agrees, I’m a country hick. 2003."}
              </textPath>
            </text>
            <path d=" M 230 90 L 230 580 A 40 40 0 0 1 190 620 L 40 620 A 40 40 0 0 1 0 580   L 0 40  A 40 40 0 0 1  40 0 L  190 0  A  40 40 0 0 1 230 40 L 230 40" transform="translate(39.999875,39.999875)" id="text-path-5-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/waves-and-bodies-in-waves-in-bodies/", imgSrc: "/assets/cloned/images/5a79e2e16c4e.webp", height: "198", viewBox: "0 0 281 198", width: "281", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Waves and bodies in waves in bodies 2016. Charlotte Parallel" alignmentBaseline="top" xlinkHref="#text-path-6-features" startOffset="0%" js-offset="0.7964608110487461">
                {"Past Exhibition: Waves and bodies in waves in bodies 2016. Charlotte Parallel"}
              </textPath>
            </text>
            <path d="M 0 90 L 0 40  A 40 40 0 0 1  40 0 L  241 0  A  40 40 0 0 1 281 40 L 281 158 A 40 40 0 0 1 241 198 L 40 198 A 40 40 0 0 1 0 158   L  0 140 " transform="translate(39.999875,39.999875)" id="text-path-6-features" className="js-created-path" />
            </> }
];
const Logo2_data: Logo2Data[] = [
    { href: "/exhibitions/rant/", imgSrc: "/assets/cloned/images/4cf331d3baa8.webp", height: "130", viewBox: "0 0 471 130", width: "471", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Rant 2004. " alignmentBaseline="top" xlinkHref="#text-path-7-features" startOffset="0%" js-offset="0.1938105747103691">
                {"Past Exhibition: Rant 2004."}
              </textPath>
            </text>
            <path d="M 90 0 L  431 0  A  40 40 0 0 1 471 40 L 471 90 A 40 40 0 0 1 431 130 L 40 130 A 40 40 0 0 1 0 90   L 0 40  A 40 40 0 0 1  40 0" transform="translate(39.999875,39.999875)" id="text-path-7-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/pinewood-bend-2013/", imgSrc: "/assets/cloned/images/a089c3684e75.webp", height: "193", viewBox: "0 0 436 193", width: "436", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Pinewood Bend 2013 2013. Judy Darragh" alignmentBaseline="top" xlinkHref="#text-path-8-features" startOffset="0%" js-offset="0.11115694027394057">
                {"Past Exhibition: Pinewood Bend 2013 2013. Judy Darragh"}
              </textPath>
            </text>
            <path d="M 90 0 L  396 0  A  40 40 0 0 1 436 40 L 436 153 A 40 40 0 0 1 396 193 L 40 193 A 40 40 0 0 1 0 153   L 0 40  A 40 40 0 0 1  40 0" transform="translate(39.999875,39.999875)" id="text-path-8-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/idle-hands/", imgSrc: "/assets/cloned/images/fd12ea4827e3.webp", height: "384", viewBox: "0 0 178 384", width: "178", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Idle Hands 2022. Zoe Thompson-Moore, Dulce Lamarca & Kate Mitchell" alignmentBaseline="top" xlinkHref="#text-path-9-features" startOffset="0%" js-offset="0.7836220992729068">
                {"Past Exhibition: Idle Hands 2022. Zoe Thompson-Moore, Dulce Lamarca & Kate Mitchell"}
              </textPath>
            </text>
            <path d="M 0 90 L 0 40  A 40 40 0 0 1  40 0 L  138 0  A  40 40 0 0 1 178 40 L 178 344 A 40 40 0 0 1 138 384 L 40 384 A 40 40 0 0 1 0 344   L  0 140 " transform="translate(39.999875,39.999875)" id="text-path-9-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/2006-graduate-exhibition/", imgSrc: "/assets/cloned/images/8c7e5c8eff2a.webp", height: "442", viewBox: "0 0 316 442", width: "316", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: 2006 Graduate Exhibition 2006. " alignmentBaseline="top" xlinkHref="#text-path-10-features" startOffset="0%" js-offset="0.6716780928894878">
                {"Past Exhibition: 2006 Graduate Exhibition 2006."}
              </textPath>
            </text>
            <path d="M 226 442 L 40 442 A 40 40 0 0 1 0 402   L 0 40  A 40 40 0 0 1  40 0 L  276 0  A  40 40 0 0 1 316 40 L 316 402 A 40 40 0 0 1 276 442 L  276 442 " transform="translate(39.999875,39.999875)" id="text-path-10-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/a-tragic-delusion/", imgSrc: "/assets/cloned/images/61097f5bf66c.webp", height: "210", viewBox: "0 0 368 210", width: "368", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: A Tragic Delusion 2015. Deanna Dowling, Tomas Richards, Cobi Taylor & Robyn Jordaan" alignmentBaseline="top" xlinkHref="#text-path-11-features" startOffset="0%" js-offset="0.7799386123195291">
                {"Past Exhibition: A Tragic Delusion 2015. Deanna Dowling, Tomas Richards, Cobi Taylor & Robyn Jordaan"}
              </textPath>
            </text>
            <path d="M 278 210 L 40 210 A 40 40 0 0 1 0 170   L 0 40  A 40 40 0 0 1  40 0 L  328 0  A  40 40 0 0 1 368 40 L 368 170 A 40 40 0 0 1 328 210 L  328 210 " transform="translate(39.999875,39.999875)" id="text-path-11-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/works-on-paper/", imgSrc: "/assets/cloned/images/8e979de380cb.webp", height: "268", viewBox: "0 0 385 268", width: "385", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Works on Paper 2002. " alignmentBaseline="top" xlinkHref="#text-path-12-features" startOffset="0%" js-offset="0.1612160421907902">
                {"Past Exhibition: Works on Paper 2002."}
              </textPath>
            </text>
            <path d="M 90 0 L  345 0  A  40 40 0 0 1 385 40 L 385 228 A 40 40 0 0 1 345 268 L 40 268 A 40 40 0 0 1 0 228   L 0 40  A 40 40 0 0 1  40 0" transform="translate(39.999875,39.999875)" id="text-path-12-features" className="js-created-path" />
            </> }
];
const Logo_data2: LogoData[] = [
    { href: "/exhibitions/av-senario/", imgSrc: "/assets/cloned/images/28683bc9d99e.webp", height: "541", viewBox: "0 0 316 541", width: "316", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: A/V Senario 2007. " alignmentBaseline="top" xlinkHref="#text-path-14-features" startOffset="0%" js-offset="0.10139477737247944">
                {"Past Exhibition: A/V Senario 2007."}
              </textPath>
            </text>
            <path d="M 90 0 L  276 0  A  40 40 0 0 1 316 40 L 316 501 A 40 40 0 0 1 276 541 L 40 541 A 40 40 0 0 1 0 501   L 0 40  A 40 40 0 0 1  40 0" transform="translate(39.999875,39.999875)" id="text-path-14-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/flesh-perspective/", imgSrc: "/assets/cloned/images/6602b214bc36.webp", height: "384", viewBox: "0 0 178 384", width: "178", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Flesh Perspective 2018. Joshua Rutter" alignmentBaseline="top" xlinkHref="#text-path-15-features" startOffset="0%" js-offset="0.4696716604754329">
                {"Past Exhibition: Flesh Perspective 2018. Joshua Rutter"}
              </textPath>
            </text>
            <path d=" M 178 90 L 178 344 A 40 40 0 0 1 138 384 L 40 384 A 40 40 0 0 1 0 344   L 0 40  A 40 40 0 0 1  40 0 L  138 0  A  40 40 0 0 1 178 40 L 178 40" transform="translate(39.999875,39.999875)" id="text-path-15-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/modernlove/", imgSrc: "/assets/cloned/images/00ec26e6126a.webp", height: "210", viewBox: "0 0 127 210", width: "127", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: MODERNLOVE 2008. " alignmentBaseline="top" xlinkHref="#text-path-16-features" startOffset="0%" js-offset="0.7403340401127935">
                {"Past Exhibition: MODERNLOVE 2008."}
              </textPath>
            </text>
            <path d="M 0 90 L 0 40  A 40 40 0 0 1  40 0 L  87 0  A  40 40 0 0 1 127 40 L 127 170 A 40 40 0 0 1 87 210 L 40 210 A 40 40 0 0 1 0 170   L  0 140 " transform="translate(39.999875,39.999875)" id="text-path-16-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/the-shape-of-things/", imgSrc: "/assets/cloned/images/e8819a2f9fb0.webp", height: "210", viewBox: "0 0 178 210", width: "178", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: The Shape of Things 2003. " alignmentBaseline="top" xlinkHref="#text-path-17-features" startOffset="0%" js-offset="0.12718620225787164">
                {"Past Exhibition: The Shape of Things 2003."}
              </textPath>
            </text>
            <path d="M 65 0 L  138 0  A  40 40 0 0 1 178 40 L 178 170 A 40 40 0 0 1 138 210 L 40 210 A 40 40 0 0 1 0 170   L 0 40  A 40 40 0 0 1  40 0" transform="translate(39.999875,39.999875)" id="text-path-17-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/duty-free-art/", imgSrc: "/assets/cloned/images/e4701c6aa20c.webp", height: "268", viewBox: "0 0 230 268", width: "230", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Duty Free Art 2016. Hito Steyerl" alignmentBaseline="top" xlinkHref="#text-path-18-features" startOffset="0%" js-offset="0.16903732288628817">
                {"Past Exhibition: Duty Free Art 2016. Hito Steyerl"}
              </textPath>
            </text>
            <path d="M 90 0 L  190 0  A  40 40 0 0 1 230 40 L 230 228 A 40 40 0 0 1 190 268 L 40 268 A 40 40 0 0 1 0 228   L 0 40  A 40 40 0 0 1  40 0" transform="translate(39.999875,39.999875)" id="text-path-18-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/world-of-pain/", imgSrc: "/assets/cloned/images/9616f030ce89.webp", height: "268", viewBox: "0 0 316 268", width: "316", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: World of Pain 2003. " alignmentBaseline="top" xlinkHref="#text-path-19-features" startOffset="0%" js-offset="0.167419807985425">
                {"Past Exhibition: World of Pain 2003."}
              </textPath>
            </text>
            <path d="M 90 0 L  276 0  A  40 40 0 0 1 316 40 L 316 228 A 40 40 0 0 1 276 268 L 40 268 A 40 40 0 0 1 0 228   L 0 40  A 40 40 0 0 1  40 0" transform="translate(39.999875,39.999875)" id="text-path-19-features" className="js-created-path" />
            </> },
    { href: "/exhibitions/brickwork/", imgSrc: "/assets/cloned/images/805895e2d798.webp", height: "384", viewBox: "0 0 281 384", width: "281", icon: <>
            <text width="200">
              <textPath className="js-text-path" data-text="Past Exhibition: Brickwork 2006. " alignmentBaseline="top" xlinkHref="#text-path-20-features" startOffset="0%" js-offset="0.7397314723581077">
                {"Past Exhibition: Brickwork 2006."}
              </textPath>
            </text>
            <path d="M 0 90 L 0 40  A 40 40 0 0 1  40 0 L  241 0  A  40 40 0 0 1 281 40 L 281 344 A 40 40 0 0 1 241 384 L 40 384 A 40 40 0 0 1 0 344   L  0 140 " transform="translate(39.999875,39.999875)" id="text-path-20-features" className="js-created-path" />
            </> }
];

export default function Page() {
  return (
    <>
      <div className="flex relative flex-wrap items-start overflow-hidden bg-background max-lg:block max-lg:[flex-wrap:initial] max-lg:[align-items:initial]" data-cid="n1" id="wrap">
        <header className="block pointer-events-none" data-cid="n2">
          <div className="h-[89.7px] grid absolute inset-x-0 z-50 py-[1.65rem] overflow-hidden pointer-events-none grid-cols-[1.223fr_1fr] max-lg:h-[9.9625rem] max-lg:block max-lg:pt-[0.6625rem] max-lg:pb-[22.5px] max-lg:grid-cols-[initial] 2xl:h-[8.4125rem] 2xl:py-[39.7px]" data-cid="n3">
            <div className="w-11 h-11 block fixed top-3.5 left-[1195.3px] min-w-0 mx-[20.5px] transform-[matrix(1,0,0,1,0,-200)] cursor-pointer [pointer-events:all]" data-cid="n4">
              <Icon cid={"n5"} />
              {" "}
            </div>
            {" "}
            <div className="block mx-auto self-start col-start-2 row-start-1 [pointer-events:all]" data-cid="n6">
              <div className="flex text-color-001 [pointer-events:all] max-lg:relative max-lg:z-1 max-lg:justify-end" data-cid="n7">
                <a className="h-8 flex relative invisible mr-3.5 pt-[0.0875rem] px-[19.5px] rounded-[40px] text-[0.6875rem] font-medium leading-8 tracking-[0.3px] text-center whitespace-nowrap text-nowrap bg-surface cursor-pointer [pointer-events:all] max-lg:h-[1.7rem] max-lg:mr-2.5 max-lg:pt-[1.5px] max-lg:px-[16.5px] max-lg:rounded-[30px] max-lg:text-xs max-lg:leading-[1.6875rem] 2xl:h-12 2xl:mr-[20.9px] 2xl:pt-0.5 2xl:px-[1.825rem] 2xl:text-[1.0625rem] 2xl:leading-12 before:content-['0'] before:block before:w-[9.3px] before:h-[1.9125rem] before:text-color-001 before:text-[0.6875rem] before:font-medium before:leading-8 before:tracking-[0.3px] before:text-center max-lg:before:h-[25.7px] max-lg:before:text-xs max-lg:before:leading-[1.6875rem] 2xl:before:w-[13.3px] 2xl:before:h-[2.875rem] 2xl:before:text-[1.0625rem] 2xl:before:leading-12" data-cid="n8" href="/checkout/cart/">
                  x Cart
                </a>
                {" "}
                <a className="h-8 hidden relative min-w-0 pt-[0.0875rem] px-[19.5px] rounded-[40px] text-sm font-medium leading-8 tracking-[0.3px] text-center whitespace-nowrap text-nowrap bg-surface cursor-pointer [pointer-events:all]" data-cid="n9" role="button">
                  Index
                </a>
                {" "}
                <a className="w-[27.5%] h-[36.9px] flex p-[0.65rem] rounded-[90px] justify-center items-center underline bg-surface transform-[matrix(1,0,0,1,0,-2.43476)] cursor-pointer [pointer-events:all] max-lg:w-[26%] max-lg:h-[31.3px] max-lg:p-[8.9px] max-lg:transform-[none] 2xl:h-[55.3px] 2xl:p-[15.7px] 2xl:transform-[matrix(1,0,0,1,0,-3.65215)]" data-cid="n10">
                  {" "}
                  <Icon2 cid={"n11"} />
                  {" "}
                </a>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <ul className="h-[36.9px] grid mx-auto col-start-1 row-start-1 whitespace-nowrap text-nowrap [list-style-type:disc] list-outside pointer-events-none grid-cols-[1.277fr_1.386fr_1.114fr_1.129fr_1.058fr_1fr_1.139fr_auto] max-lg:h-20 max-lg:min-h-20 max-lg:mt-[0.9375rem] max-lg:grid-cols-[104.469px_103.375px_81.875px_82.1719px_77.5625px_72.2656px_82.875px] max-lg:[grid-auto-columns:min-content] max-lg:overflow-auto max-lg:[pointer-events:all] max-lg:mx-0 2xl:h-[55.3px] after:content-[''] after:block after:absolute after:inset-y-0 after:right-0 after:left-[19.6875rem] after:w-15 after:h-[9.9625rem] md:max-lg:after:left-177 2xl:after:hidden" data-cid="n12">
              {ListRow_data.map((d, i) => <ListRow key={i} d={d} cids={ListRow_cids[i]} styles={ListRow_styles[i]} />)}
            </ul>
            {" "}
          </div>
          {" "}
          <div className="h-400 block absolute top-[112.7px] right-0 left-[40.05rem] z-48 mx-[20.5px] pt-[1.4375rem] col-start-1 row-start-1 text-[2.375rem] [font-weight:645] leading-[3.375rem] tracking-[-1px] pointer-events-none max-md:h-406 max-lg:top-[6.4625rem] max-lg:-left-2.5 max-lg:mx-2.5 max-lg:pt-[19.5px] max-lg:text-2xl max-lg:leading-[2.125rem] md:max-lg:h-512 2xl:h-540 2xl:top-[10.5625rem] 2xl:left-[60.075rem] 2xl:mx-[30.7px] 2xl:pt-[2.15rem] 2xl:text-[3.5625rem] 2xl:leading-[5.125rem]" data-cid="n27">
            <Illustration cid={"n28"} />
            {" "}
          </div>
          {" "}
        </header>
        {" "}
        <main className="h-[274.0375rem] min-h-screen block relative overflow-hidden bg-background max-lg:h-[8652.3px] 2xl:h-[411.0625rem] after:content-[''] after:table after:w-0 after:h-0 grid-cols-2" data-cid="n29" id="content" role="main">
          <div className="w-full block relative float-left z-49 -mr-320 pt-[163.5px] pointer-events-none max-md:-mr-[23.4375rem] max-lg:pt-[11.8125rem] md:max-lg:-mr-192 2xl:-mr-480 2xl:pt-[15.325rem]" data-cid="n30">
            <article className="h-[4207.3px] min-h-screen block pt-[16.7px] pointer-events-none max-lg:h-[527.7rem] max-lg:pt-3.5 2xl:h-[6310.9px] 2xl:pt-[1.5625rem]" data-cid="n31">
              <div className="h-full block mb-3.5 overflow-hidden pointer-events-none max-lg:mb-5 2xl:mb-[20.9px]" data-cid="n32">
                <div className="h-[1391.3px] grid mx-[20.5px] [grid-template-areas:'._._._._._._._._._._._._b_b_b_b_b_b_._._._._._.'_'y_y_y_y_y_._._._._._._._b_b_b_b_b_b_._._._._._.'_'a_a_a_a_a_a_a_a_a_a_a_a_b_b_b_b_b_b_._._._._._.'_'a_a_a_a_a_a_a_a_a_a_a_a_b_b_b_b_b_b_._._._._._.'_'a_a_a_a_a_a_a_a_a_a_a_a_b_b_b_b_b_b_._._._._._.'_'a_a_a_a_a_a_a_a_a_a_a_a_b_b_b_b_b_b_._._._._._.'_'a_a_a_a_a_a_a_a_a_a_a_a_b_b_b_b_b_b_._._._._._.'_'a_a_a_a_a_a_a_a_a_a_a_a_._._._._._._c_c_c_c_c_c'_'a_a_a_a_a_a_a_a_a_a_a_a_._._._._._._c_c_c_c_c_c'_'._._._._._._._._._._._._._._._._._._c_c_c_c_c_c'_'._._._._._._._._._._._e_e_e_e_e_e_e_c_c_c_c_c_c'_'._._._d_d_d_d_d_d_d_d_e_e_e_e_e_e_e_c_c_c_c_c_c'_'._._._d_d_d_d_d_d_d_d_e_e_e_e_e_e_e_f_f_f_f_f_f'_'._._._d_d_d_d_d_d_d_d_e_e_e_e_e_e_e_f_f_f_f_f_f'_'._._._d_d_d_d_d_d_d_d_e_e_e_e_e_e_e_f_f_f_f_f_f'_'._._x_._._._._._._._._e_e_e_e_e_e_e_f_f_f_f_f_f'_'._._x_._._._._._._._._e_e_e_e_e_e_e_f_f_f_f_f_f'_'._._x_._._._._._._._._e_e_e_e_e_e_e_f_f_f_f_f_f'_'._._._._._._._._._._._e_e_e_e_e_e_e_f_f_f_f_f_f'_'._._._._g_g_g_g_g_g_g_._._._._._._._f_f_f_f_f_f'_'._._._._g_g_g_g_g_g_g_._._._._._._._f_f_f_f_f_f'_'._._._._g_g_g_g_g_g_g_._._._._._._._f_f_f_f_f_f'_'._._._._g_g_g_g_g_g_g_._._._._._._._f_f_f_f_f_f'_'._._._._g_g_g_g_g_g_g_._._._._._._._f_f_f_f_f_f'] text-color-001 font-normal leading-[1.0625rem] tracking-[0.4px] pointer-events-none grid-cols-24 max-lg:h-702.5 max-lg:-mt-px max-lg:mx-2.5 max-lg:[grid-template-areas:'._._._._._._._._._._._._._._._y_y_y_y_y_y_y_._.'_'._._._._._._._._._._._._._._._y_y_y_y_y_y_y_._.'_'._._._._._._._._._._._._._._._y_y_y_y_y_y_y_._.'_'._z_z_z_z_z_z_z_z_z_z_z_z_z_z_z_z_z_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._._.'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._._.'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._._.'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._._.'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'] max-lg:leading-[0.875rem] 2xl:h-[130.4375rem] 2xl:mx-[30.7px] 2xl:leading-[1.5625rem]" data-cid="n33">
                  {Logo_data.map((d, i) => <Logo key={i} d={d} cids={Logo_cids[i]} styles={Logo_styles[i]} />)}
                  {" "}
                  <div className="h-[11.4625rem] flex relative rounded-[40px] flex-col justify-center items-center [grid-column-start:x] [grid-column-end:x] [grid-row-start:x] [grid-row-end:x] whitespace-nowrap text-nowrap bg-surface [pointer-events:all] max-lg:h-32.5 max-lg:rounded-[30px] 2xl:h-[275.1px]" data-cid="n83">
                    <div className="block transform-[matrix(0,1,-1,0,0,0)] origin-[22.8047px_8.40625px] [pointer-events:all] max-lg:transform-[matrix(0,1,-1,0,-2,0)] max-lg:origin-[19.8047px_7.14844px] 2xl:origin-[34.3047px_12.6172px]" data-cid="n84">
                      <a className="block cursor-pointer [pointer-events:all]" data-cid="n85" data-component="link" href="/shop/">
                        SHOP
                      </a>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div className="h-[1391.3px] grid mx-[20.5px] [grid-template-areas:'._._b_b_b_b_b_b_b_b_b_b_a_a_a_a_a_a_a_a_a_a_a_.'_'._._b_b_b_b_b_b_b_b_b_b_a_a_a_a_a_a_a_a_a_a_a_.'_'._._b_b_b_b_b_b_b_b_b_b_a_a_a_a_a_a_a_a_a_a_a_.'_'._._b_b_b_b_b_b_b_b_b_b_a_a_a_a_a_a_a_a_a_a_a_.'_'._._b_b_b_b_b_b_b_b_b_b_a_a_a_a_a_a_a_a_a_a_a_.'_'._._._._._d_d_d_d_d_d_d_d_._._._._._._._._._._.'_'._._._._._d_d_d_d_d_d_d_d_._._._._._._._._._._.'_'._._._._._d_d_d_d_d_d_d_d_e_e_e_e_e_e_e_e_e_._.'_'._._._._._d_d_d_d_d_d_d_d_e_e_e_e_e_e_e_e_e_._.'_'._._._._._d_d_d_d_d_d_d_d_e_e_e_e_e_e_e_e_e_._.'_'c_c_c_c_c_d_d_d_d_d_d_d_d_e_e_e_e_e_e_e_e_e_._.'_'c_c_c_c_c_d_d_d_d_d_d_d_d_e_e_e_e_e_e_e_e_e_._.'_'c_c_c_c_c_d_d_d_d_d_d_d_d_._._._._._._._._._._.'_'c_c_c_c_c_d_d_d_d_d_d_d_d_._._._._._._._._._._.'_'c_c_c_c_c_._._._._._._._._f_f_f_f_f_f_f_f_f_._.'_'c_c_c_c_c_._._._._._._._._f_f_f_f_f_f_f_f_f_._.'_'c_c_c_c_c_._._._._._._._._f_f_f_f_f_f_f_f_f_._.'_'c_c_c_c_c_._._._._._._._._f_f_f_f_f_f_f_f_f_._.'_'._._._._._g_g_g_g_g_g_g_._f_f_f_f_f_f_f_f_f_._.'_'._._._._._g_g_g_g_g_g_g_._f_f_f_f_f_f_f_f_f_._.'_'._._._._._g_g_g_g_g_g_g_._._._._._._._._._._x_.'_'._._._._._g_g_g_g_g_g_g_._._._._._._._._._._x_.'_'._._._._._g_g_g_g_g_g_g_._._._._._._._._._._x_.'_'._._._._._g_g_g_g_g_g_g_._._._._._._._._._._._.'] text-color-001 font-normal leading-[1.0625rem] tracking-[0.4px] pointer-events-none grid-cols-24 max-lg:h-702.5 max-lg:mx-2.5 max-lg:[grid-template-areas:'._._._._._._._._._._._._._._._y_y_y_y_y_y_y_._.'_'._._._._._._._._._._._._._._._y_y_y_y_y_y_y_._.'_'._._._._._._._._._._._._._._._y_y_y_y_y_y_y_._.'_'._z_z_z_z_z_z_z_z_z_z_z_z_z_z_z_z_z_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._._.'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._._.'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._._.'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._._.'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'] max-lg:leading-[0.875rem] 2xl:h-[130.4375rem] 2xl:mx-[30.7px] 2xl:leading-[1.5625rem]" data-cid="n86">
                  {Logo2_data.map((d, i) => <Logo2 key={i} d={d} cids={Logo2_cids[i]} styles={Logo2_styles[i]} />)}
                  {" "}
                  <div className="h-[21.7375rem] block relative z-1 [grid-column-start:g] [grid-column-end:g] [grid-row-start:g] [grid-row-end:g] [pointer-events:all] max-lg:h-87 max-lg:pb-3.5 2xl:h-[521.7px]" data-cid="n129">
                    <div className="h-full block rounded-[40px] bg-surface [pointer-events:all] max-lg:rounded-[30px]" data-cid="n130">
                      <a className="h-full block cursor-pointer [pointer-events:all]" data-cid="n131" data-component="link" href="/exhibitions/deep-sea-dis-comedusae/">
                        {" "}
                        <div className="block relative z-1 [pointer-events:all]" data-cid="n132" />
                        {" "}
                        <Illustration2 cid={"n133"} />
                        {" "}
                      </a>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="h-[9.825rem] flex relative mt-[16.7px] rounded-[40px] flex-col justify-center items-center [grid-column-start:x] [grid-column-end:x] [grid-row-start:x] [grid-row-end:x] whitespace-nowrap text-nowrap bg-surface [pointer-events:all] max-lg:h-32.5 max-lg:rounded-[30px] max-lg:mt-0 2xl:h-[14.7375rem] 2xl:mt-[1.5625rem]" data-cid="n134">
                    <div className="block transform-[matrix(0,1,-1,0,0,0)] origin-[34.2031px_8.40625px] [pointer-events:all] max-lg:transform-[matrix(0,1,-1,0,-2,0)] max-lg:origin-[30.7031px_7.14844px] 2xl:origin-[51.7031px_12.6172px]" data-cid="n135">
                      <a className="block cursor-pointer [pointer-events:all]" data-cid="n136" data-component="link" href="/follow/">
                        FOLLOW
                      </a>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div className="h-[1391.3px] grid mt-[16.7px] mx-[20.5px] [grid-template-areas:'._a_a_a_a_a_a_a_a_._._._._._._._._._._._._._._.'_'._a_a_a_a_a_a_a_a_._._._._._c_c_c_c_._._._._._.'_'._a_a_a_a_a_a_a_a_._._._._._c_c_c_c_._._._._._.'_'._a_a_a_a_a_a_a_a_._._._._._c_c_c_c_._._._._._.'_'._a_a_a_a_a_a_a_a_._._._._._c_c_c_c_._._._._._.'_'._a_a_a_a_a_a_a_a_._._._._._c_c_c_c_._._._._._.'_'._a_a_a_a_a_a_a_a_b_b_b_b_b_._._._._d_d_d_d_d_.'_'._a_a_a_a_a_a_a_a_b_b_b_b_b_._._._._d_d_d_d_d_.'_'._a_a_a_a_a_a_a_a_b_b_b_b_b_._._._._d_d_d_d_d_.'_'._a_a_a_a_a_a_a_a_b_b_b_b_b_._._._._d_d_d_d_d_.'_'._a_a_a_a_a_a_a_a_b_b_b_b_b_._._._._d_d_d_d_d_.'_'._._e_e_e_e_e_e_._b_b_b_b_b_._._._._._._._._._.'_'._._e_e_e_e_e_e_._b_b_b_b_b_._._._._._._._._._.'_'._._e_e_e_e_e_e_._b_b_b_b_b_._._._._._._._._._.'_'._._e_e_e_e_e_e_._._._._._._g_g_g_g_g_g_g_._._.'_'._._e_e_e_e_e_e_._._._._._._g_g_g_g_g_g_g_._._.'_'._._e_e_e_e_e_e_._._._._._._g_g_g_g_g_g_g_._._.'_'._x_._._._._._._._._._._._._g_g_g_g_g_g_g_._._.'_'._x_._._._._f_f_f_f_f_f_f_f_g_g_g_g_g_g_g_._._.'_'._x_._._._._f_f_f_f_f_f_f_f_g_g_g_g_g_g_g_._._.'_'._._._._._._f_f_f_f_f_f_f_f_g_g_g_g_g_g_g_._._.'_'._._._._._._f_f_f_f_f_f_f_f_g_g_g_g_g_g_g_._._.'_'._._._._._._f_f_f_f_f_f_f_f_._._._._._._._._._.'_'._._._._._._f_f_f_f_f_f_f_f_._._._._._._._._._.'] text-color-001 font-normal leading-[1.0625rem] tracking-[0.4px] pointer-events-none grid-cols-24 max-lg:h-702.5 max-lg:mx-2.5 max-lg:[grid-template-areas:'._._._._._._._._._._._._._._._y_y_y_y_y_y_y_._.'_'._._._._._._._._._._._._._._._y_y_y_y_y_y_y_._.'_'._._._._._._._._._._._._._._._y_y_y_y_y_y_y_._.'_'._z_z_z_z_z_z_z_z_z_z_z_z_z_z_z_z_z_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_._._._._._.'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._._.'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._._.'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._x_x'_'._._._b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_b_._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._._._._.'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._w_w'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._._.'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._._.'_'._._._d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_e_._._._._.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._._._._f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_f_.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'_'._._._g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_g_._._.'] max-lg:leading-[0.875rem] max-lg:mt-0 2xl:h-[130.4375rem] 2xl:mt-[1.5625rem] 2xl:mx-[30.7px] 2xl:leading-[1.5625rem]" data-cid="n137">
                  {Logo_data2.map((d, i) => <Logo key={i} d={d} cids={Logo_cids2[i]} styles={Logo_styles2[i]} />)}
                  {" "}
                  <div className="h-[10.875rem] flex relative rounded-[40px] flex-col justify-center items-center [grid-column-start:x] [grid-column-end:x] [grid-row-start:x] [grid-row-end:x] whitespace-nowrap text-nowrap bg-surface [pointer-events:all] max-lg:h-32.5 max-lg:rounded-[30px] 2xl:h-[260.9px]" data-cid="n187">
                    <div className="block transform-[matrix(0,1,-1,0,0,0)] origin-[46.8047px_8.40625px] [pointer-events:all] max-lg:transform-[matrix(0,1,-1,0,-2,0)] max-lg:origin-[40.3047px_7.14844px] 2xl:origin-[68.8047px_12.6172px]" data-cid="n188">
                      <a className="block cursor-pointer [pointer-events:all]" data-cid="n189" data-component="link" href="/follow/">
                        SUBSCRIBE
                      </a>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
          </div>
          {" "}
          <div className="h-[123.075rem] block fixed right-320 left-0 z-47 -mr-320 bg-background [filter:blur(13px)] pointer-events-none max-md:h-[1307.7px] max-md:right-[23.4375rem] max-md:-mr-[23.4375rem] md:max-lg:h-[111.7875rem] md:max-lg:right-192 md:max-lg:-mr-192 2xl:h-[184.6125rem] 2xl:right-480 2xl:-mr-480" data-cid="n190">
            <article className="h-[1955.3px] min-h-screen block pt-[16.7px] pointer-events-none max-md:h-[1287.7px] max-lg:pt-3.5 max-lg:text-surface md:max-lg:h-[110.5375rem] 2xl:h-[183.3125rem] 2xl:pt-[1.5625rem]" data-cid="n191">
              <div className="block mb-[275.5px] pointer-events-none max-lg:mt-25 max-lg:mb-[35.5px] 2xl:mb-[25.825rem]" data-cid="n192">
                <div className="grid [grid-template-areas:'t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_.'_'h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_._d_d_d_d_d_d_._.'_'c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._.'] pointer-events-none grid-cols-24 max-lg:[grid-template-areas:'t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_.'_'h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_._.'_'d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._.'_'c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c']" data-cid="n193">
                  <a className="h-[12.175rem] block mx-[20.5px] [grid-column-start:t] [grid-column-end:t] [grid-row-start:t] [grid-row-end:t] cursor-pointer pointer-events-none max-lg:h-15 max-lg:mx-2.5 2xl:h-[18.2625rem] 2xl:mx-[30.7px]" data-cid="n194" data-component="link" href="/exhibitions/ghost-hiikoi-2/">
                    {" "}
                    <h1 className="block text-[3.9375rem] leading-[5.5625rem] tracking-[normal] pointer-events-none max-lg:text-xl max-lg:leading-[1.75rem] 2xl:text-[5.875rem] 2xl:leading-[8.3125rem]" data-cid="n195" data-component="heading">
                      Blue Oyster
                    </h1>
                    {" "}
                    <Illustration3 cid={"n196"} />
                    {" "}
                  </a>
                  {" "}
                  <div className="block mx-[20.5px] [grid-column-start:h] [grid-column-end:h] [grid-row-start:h] [grid-row-end:h] pointer-events-none max-lg:mt-[0.925rem] max-lg:mx-2.5 2xl:mx-[30.7px]" data-cid="n197">
                    <a className="h-full block cursor-pointer pointer-events-none max-lg:pr-15" data-cid="n198" data-component="link" href="/exhibitions/ghost-hiikoi-2/">
                      {" "}
                      <figure className="h-full block pointer-events-none" data-cid="n199">
                        <picture className="w-[47.4375rem] h-126.5 block [mix-blend-mode:multiply] bg-contain [background-position:50%_50%] bg-no-repeat [filter:grayscale(1)] pointer-events-none max-md:w-66 max-md:h-[10.9375rem] md:max-lg:w-156 md:max-lg:h-104 2xl:w-[71.1875rem] 2xl:h-[47.4375rem]" data-cid="n200">
                          <source className="inline pointer-events-none" data-cid="n201" media="(min-width: 769px)" sizes="59.78260869565217vw" srcSet="/assets/cloned/images/376ebcfe8fac.png 2449w, /assets/cloned/images/8000d34ff2f7.webp 1224w, /assets/cloned/images/8aadfc338bd8.png 612w" />
                          {" "}
                          <source className="inline pointer-events-none" data-cid="n202" media="(max-width: 768px)" sizes="72.94117647058823vw" srcSet="/assets/cloned/images/79224d4dde2f.png 1120w, /assets/cloned/images/ffbebd4bab8c.webp 620w, /assets/cloned/images/d8948bb97a69.webp 310w" />
                          {" "}
                          <img className="w-[47.4375rem] h-126.5 block opacity-99 [mix-blend-mode:multiply] max-w-full max-h-full overflow-clip [filter:grayscale(1)] pointer-events-none max-md:w-66 max-md:h-[10.9375rem] md:max-lg:w-156 md:max-lg:h-104 2xl:w-[71.1875rem] 2xl:h-[47.4375rem]" data-cid="n203" data-component="image" alt="Still from Ghost Hiikoi 2 (2026), ilish thomas." src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
                          {" "}
                        </picture>
                      </figure>
                      {" "}
                    </a>
                    {" "}
                  </div>
                  {" "}
                  <div className="block max-w-80 my-[76.5px] self-end [grid-column-start:d] [grid-column-end:d] [grid-row-start:d] [grid-row-end:d] text-[1.75rem] leading-[1.9375rem] tracking-[0.3px] pointer-events-none max-lg:mt-[1.5625rem] max-lg:mb-5 max-lg:mx-auto max-lg:text-sm max-lg:leading-[1rem] max-lg:tracking-[0.42px] max-lg:max-w-none 2xl:max-w-115 2xl:my-[7.175rem] 2xl:text-[2.5rem] 2xl:leading-[2.8125rem]" data-cid="n204">
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n205">
                      {" Past Exhibition "}
                    </p>
                    {" "}
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n206" />
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n207">
                      Hātarei 20 Hune -
                      <br className="inline pointer-events-none" data-cid="n208" />
                      Hātarei 1 Ākuhata
                    </p>
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n209" />
                    {" "}
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n210" />
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n211">
                      Saturday 20 June -
                      <br className="inline pointer-events-none" data-cid="n212" />
                      Saturday 1 August
                    </p>
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n213" />
                    {" "}
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n214">
                      2026
                    </p>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div className="block mb-[14.35rem] pointer-events-none max-lg:mb-[12.1875rem] 2xl:mb-[344.3px]" data-cid="n215">
                <div className="grid [grid-template-areas:'t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_.'_'h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_._d_d_d_d_d_d_._.'_'c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_._.'] pointer-events-none grid-cols-24 max-lg:[grid-template-areas:'t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_t_.'_'h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_h_._.'_'d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_d_._.'_'c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c_c']" data-cid="n216">
                  <a className="h-[12.175rem] block mx-[20.5px] [grid-column-start:t] [grid-column-end:t] [grid-row-start:t] [grid-row-end:t] cursor-pointer pointer-events-none max-lg:h-15 max-lg:mx-2.5 2xl:h-[18.2625rem] 2xl:mx-[30.7px]" data-cid="n217" data-component="link" href="/events/panel-discussion-hawaiki-apopz/">
                    {" "}
                    <p className="block text-[3.9375rem] leading-[5.5625rem] tracking-[normal] pointer-events-none max-lg:text-xl max-lg:leading-[1.75rem] 2xl:text-[5.875rem] 2xl:leading-[8.3125rem]" data-cid="n218">
                      Past Event
                    </p>
                    {" "}
                    <Illustration4 cid={"n219"} />
                    {" "}
                  </a>
                  {" "}
                  <div className="block mx-[20.5px] [grid-column-start:h] [grid-column-end:h] [grid-row-start:h] [grid-row-end:h] pointer-events-none max-lg:mt-[0.925rem] max-lg:mx-2.5 2xl:mx-[30.7px]" data-cid="n220">
                    <a className="h-full block cursor-pointer pointer-events-none" data-cid="n221" data-component="link" href="/events/panel-discussion-hawaiki-apopz/">
                      {" "}
                      <figure className="h-full block pointer-events-none" data-cid="n222">
                        <picture className="w-[47.4375rem] h-126.5 block [mix-blend-mode:multiply] bg-contain [background-position:50%_50%] bg-no-repeat [filter:grayscale(1)] pointer-events-none max-md:w-81 max-md:h-[13.4375rem] md:max-lg:w-171 md:max-lg:h-114 2xl:w-[71.1875rem] 2xl:h-[47.4375rem]" data-cid="n223">
                          <source className="inline pointer-events-none" data-cid="n224" media="(min-width: 769px)" sizes="59.78260869565217vw" srcSet="/assets/cloned/images/1020a0e24121.png 2449w, /assets/cloned/images/ad416b39a151.webp 1224w, /assets/cloned/images/05476a793262.png 612w" />
                          {" "}
                          <source className="inline pointer-events-none" data-cid="n225" media="(max-width: 768px)" sizes="72.94117647058823vw" srcSet="/assets/cloned/images/7af18e80bf50.png 1120w, /assets/cloned/images/5209bb1e1e1d.webp 620w, /assets/cloned/images/243e315bf030.webp 310w" />
                          {" "}
                          <img className="w-[47.4375rem] h-126.5 block opacity-99 [mix-blend-mode:multiply] max-w-full max-h-full overflow-clip [filter:grayscale(1)] pointer-events-none max-md:w-81 max-md:h-[13.4375rem] md:max-lg:w-171 md:max-lg:h-114 2xl:w-[71.1875rem] 2xl:h-[47.4375rem]" data-cid="n226" data-component="image" alt="Install photograph of Newanewa - Ngaumutane Jones" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
                          {" "}
                        </picture>
                      </figure>
                      {" "}
                    </a>
                    {" "}
                  </div>
                  {" "}
                  <div className="block max-w-80 my-[76.5px] self-end [grid-column-start:d] [grid-column-end:d] [grid-row-start:d] [grid-row-end:d] text-[1.75rem] leading-[1.9375rem] tracking-[0.3px] pointer-events-none max-lg:mt-[1.5625rem] max-lg:mb-5 max-lg:mx-auto max-lg:text-sm max-lg:leading-[1rem] max-lg:tracking-[0.42px] max-lg:max-w-none 2xl:max-w-115 2xl:my-[7.175rem] 2xl:text-[2.5rem] 2xl:leading-[2.8125rem]" data-cid="n227">
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n228">
                      Hātarei 20 Hune
                    </p>
                    {" "}
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n229">
                      Saturday 20 June
                    </p>
                    {" "}
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n230">
                      2026
                    </p>
                    {" "}
                    <p className="block mb-3.5 pointer-events-none 2xl:mb-5" data-cid="n231">
                      <br className="inline pointer-events-none" data-cid="n232" />
                      {"Blue Oyster Art Project Space "}
                    </p>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <footer className="h-8 block invisible mt-20 pointer-events-none max-lg:h-[1.7rem] max-md:mt-[5.075rem] max-lg:text-[0.5625rem] max-lg:leading-[0.8125rem] md:max-lg:mt-[6.4rem] 2xl:h-12 2xl:mt-27" data-cid="n233">
                <div className="h-8 block relative pointer-events-none max-lg:h-[1.7rem] 2xl:h-12" data-cid="n234">
                  <div className="h-8 flex relative mt-[31.3px] mb-3.5 mx-[20.5px] justify-between [pointer-events:all] max-lg:h-[1.7rem] max-lg:mt-[1.6625rem] max-lg:mb-5 max-lg:mx-2.5 2xl:h-12 2xl:mt-[2.9375rem] 2xl:mb-[20.9px] 2xl:mx-[30.7px]" data-cid="n235">
                    <span className="flex pr-[0.4375rem] justify-between items-center [pointer-events:all] max-lg:pr-2.5 2xl:pr-[0.65rem]" data-cid="n236">
                      {"Te Tio Kikorangi Blue Oyster Project Art Space "}
                    </span>
                    {" "}
                    <button className="h-8 flex relative px-[19.5px] rounded-[40px] text-color-001 text-[0.6875rem] font-medium leading-8 tracking-[0.3px] text-center whitespace-nowrap text-nowrap [font-feature-settings:normal] bg-surface cursor-pointer [pointer-events:all] max-lg:h-[1.7rem] max-lg:px-[16.5px] max-lg:rounded-[30px] max-lg:justify-end max-lg:leading-[1.6875rem] 2xl:h-12 2xl:px-[1.825rem] 2xl:text-[1.0625rem] 2xl:leading-12" data-cid="n237" id="menu-toggle-footer" type="button">
                      <span className="h-8 flex pt-[0.0875rem] text-[0.875rem] [pointer-events:all] max-lg:h-[1.7rem] max-lg:pt-[0.075rem] max-lg:text-[0.75rem] 2xl:h-12 2xl:pt-0.5 2xl:text-[1.3125rem]" data-cid="n238">
                        Index
                      </span>
                      {" "}
                    </button>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </footer>
              {" "}
            </article>
            {" "}
          </div>
          {" "}
        </main>
        {" "}
      </div>
      {" "}
    </>
  );
}

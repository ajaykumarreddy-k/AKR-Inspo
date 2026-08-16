import CardGridItem from "../components/card-grid-item";
import Tile3 from "../components/tile3";
import MediaTile2, { type MediaTile2Data } from "../components/media-tile2";
import MediaTile3, { type MediaTile3Data } from "../components/media-tile3";
import MediaTile4, { type MediaTile4Data } from "../components/media-tile4";
import { Tile3_cids, MediaTile2_cids, MediaTile3_cids, MediaTile4_cids } from "../_cids";
import { MediaTile2_styles, MediaTile3_styles, MediaTile4_styles } from "../_styles";
import { cards as cardsContent, tile3Data as tile3DataContent } from "../content";
const MediaTile2_data: MediaTile2Data[] = [
    { id: "datoimage-31", sizes: "(max-width: 100px) 100vw, 100px", srcSet: "/assets/cloned/images/c5cc038ac80a.png 50w, /assets/cloned/images/0b198a3ca3c3.png 75w, /assets/cloned/images/7117e82966d1.png 100w", imgSrc: "/assets/cloned/images/7117e82966d1.png", description: "Paypal" },
    { id: "datoimage-32", sizes: "(max-width: 88px) 100vw, 88px", srcSet: "/assets/cloned/images/9912136447e0.png 66w, /assets/cloned/images/94027b3f51c5.png 88w", imgSrc: "/assets/cloned/images/94027b3f51c5.png", description: "Walmart" },
    { id: "datoimage-33", sizes: "(max-width: 100px) 100vw, 100px", srcSet: "/assets/cloned/images/2150512199c0.png 50w, /assets/cloned/images/a96521159f20.png 75w, /assets/cloned/images/cb94b21d9998.png 100w", imgSrc: "/assets/cloned/images/cb94b21d9998.png", description: "Moët & Chandon" },
    { id: "datoimage-34", sizes: "(max-width: 100px) 100vw, 100px", srcSet: "/assets/cloned/images/a86f68967749.png 50w, /assets/cloned/images/2e4b81f75873.png 75w, /assets/cloned/images/5635b2736593.png 100w", imgSrc: "/assets/cloned/images/5635b2736593.png", description: "Coinbase" }
];
const MediaTile3_data: MediaTile3Data[] = [
    { id: "datoimage-37", srcSet: "/assets/cloned/images/0d0c8776b738.png 50w, /assets/cloned/images/0939e63e6fa9.png 75w, /assets/cloned/images/d565672b30f6.png 100w", imgSrc: "/assets/cloned/images/d565672b30f6.png", description: "Google" },
    { id: "datoimage-38", srcSet: "/assets/cloned/images/d1ef06562d73.png 50w, /assets/cloned/images/3ca86c317b72.png 75w, /assets/cloned/images/4a77efe1399e.png 100w", imgSrc: "/assets/cloned/images/4a77efe1399e.png", description: "Youtube" },
    { id: "datoimage-39", srcSet: "/assets/cloned/images/5252b0b6d671.png 50w, /assets/cloned/images/c28b185a054c.png 75w, /assets/cloned/images/b40f7240451d.png 100w", imgSrc: "/assets/cloned/images/b40f7240451d.png", description: "Uber" },
    { id: "datoimage-40", srcSet: "/assets/cloned/images/30c77e75eded.png 50w, /assets/cloned/images/784b6ae042ba.png 75w, /assets/cloned/images/e9665f0b7863.png 100w", imgSrc: "/assets/cloned/images/e9665f0b7863.png", description: "Meta" }
];
const MediaTile4_data: MediaTile4Data[] = [
    { id: "datoimage-47", style: { backgroundImage: "url(data:image/png" }, sizes: "(max-width: 100px) 100vw, 100px", srcSet: "/assets/cloned/images/2bb92da13e37.png 50w, /assets/cloned/images/b4c31e724435.png 75w, /assets/cloned/images/30ab1bba881b.png 100w", imgSrc: "/assets/cloned/images/30ab1bba881b.png", description: "WhatsApp" },
    { id: "datoimage-48", style: { backgroundImage: "url(data:image/png" }, sizes: "(max-width: 100px) 100vw, 100px", srcSet: "/assets/cloned/images/352fb97675cd.png 50w, /assets/cloned/images/866e1c2b6d5a.png 75w, /assets/cloned/images/856dca12966d.png 100w", imgSrc: "/assets/cloned/images/856dca12966d.png", description: "NielsenIQ" },
    { id: "datoimage-49", style: { backgroundImage: "url(data:image/png" }, sizes: "(max-width: 100px) 100vw, 100px", srcSet: "/assets/cloned/images/21b5eb5a2dc5.png 50w, /assets/cloned/images/0db74155d946.png 75w, /assets/cloned/images/43a8c58bcf9f.png 100w", imgSrc: "/assets/cloned/images/43a8c58bcf9f.png", description: "HP" },
    { id: "datoimage-50", style: { backgroundImage: "url(data:image/png" }, sizes: "(max-width: 99px) 100vw, 99px", srcSet: "/assets/cloned/images/af1b931ca55d.png 74w, /assets/cloned/images/695bccd852f9.png 99w", imgSrc: "/assets/cloned/images/695bccd852f9.png", description: "AnswerLab" },
    { id: "datoimage-51", style: { backgroundImage: "url(data:image/jpeg" }, sizes: "(max-width: 100px) 100vw, 100px", srcSet: "/assets/cloned/images/efa82c11d51d.png 50w, /assets/cloned/images/76ff7617f24d.png 75w, /assets/cloned/images/e8d89cf37065.png 100w", imgSrc: "/assets/cloned/images/e8d89cf37065.png", description: "Starbucks" }
];
/** Featured Articles section. */
export default function FeaturedArticlesSection({ cards = cardsContent, tile3Data = tile3DataContent, mediaTile2Data = MediaTile2_data, mediaTile3Data = MediaTile3_data, mediaTile4Data = MediaTile4_data } = {}) {
  return (
    <div className="block rounded-[50px] bg-clr-3 max-lg:rounded-[35px]" data-cid="n406">
      <div className="grid pt-[168.7px] pb-[5.25rem] px-5 gap-5 grid-cols-16 max-lg:block max-md:pt-[83.1px] max-md:pb-[2.0375rem] max-lg:px-0 max-lg:gap-[initial] max-lg:grid-cols-[initial] md:max-lg:pt-[105.3px] md:max-lg:pb-[2.3rem] 2xl:pt-42.5 2xl:pb-[5.3125rem]" data-cid="n407">
        <h2 className="w-px h-px block absolute min-w-0 -m-px overflow-hidden whitespace-nowrap text-nowrap [clip-path:inset(50%)]" data-cid="n408" data-component="heading">
          Featured Articles
        </h2>
        {" "}
        <ul className="w-full grid gap-5 col-start-2 col-end-16 [list-style-type:none] list-outside grid-cols-4 max-lg:flex max-lg:pr-5 max-lg:pb-5 max-lg:overflow-auto max-lg:gap-[initial] max-lg:[grid-column-start:initial] max-lg:[grid-column-end:initial]" data-cid="n409">
          {cards.map((d) => <CardGridItem key={d.variant} d={d} />)}
        </ul>
        {" "}
      </div>
      {" "}
      <div className="block py-[168.7px] max-md:py-[8.15rem] md:max-lg:py-[147.1px] 2xl:py-42.5" data-cid="n481">
        <div className="block px-5" data-cid="n482">
          <div className="grid gap-5 grid-cols-16 max-md:grid-cols-6" data-cid="n483">
            <div className="block col-start-2 col-end-[span_14] max-lg:col-span-full" data-cid="n484">
              <h2 className="block max-w-[637.5px] mb-[5.25rem] mx-auto text-[3.3125rem] leading-[3.75rem] tracking-[-3.15px] text-center max-md:max-w-[501.9px] max-md:mb-[3.6rem] max-md:text-[2.1875rem] max-md:leading-[2.5rem] max-md:tracking-[-2.1px] md:max-lg:max-w-[32.2rem] md:max-lg:mb-[69.1px] md:max-lg:text-[2.6875rem] md:max-lg:leading-[3.0625rem] md:max-lg:tracking-[-2.56px] 2xl:mb-[5.3125rem] 2xl:leading-[3.8125rem] 2xl:tracking-[-3.19px]" data-cid="n485" data-component="heading">
                Brands that choose MindMarket
              </h2>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div className="flex flex-col gap-[1.0625rem] max-md:gap-4 md:max-lg:gap-[16.5px]" data-cid="n486">
          <c-rail class="block overflow-hidden" data-cid="n487" id="rail-1">
            <div className="flex items-center whitespace-nowrap text-nowrap transform-[matrix(1,0,0,1,-1697.77,0)] 2xl:transform-[none]" data-cid="n488">
              <div className="flex pr-[1.0625rem] items-center gap-[1.0625rem] max-md:pr-4 max-md:gap-4 md:max-lg:pr-[16.5px] md:max-lg:gap-[16.5px]" data-cid="n489">
                <div className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]" data-cid="n490">
                  <div className="w-16 flex p-[1.0625rem] rounded-[100%] justify-center items-center shrink-0 bg-background max-md:w-[3.7625rem] max-md:p-4 md:max-lg:w-[3.8625rem] md:max-lg:p-[16.5px]" data-cid="n491">
                    <img className="w-7.5 h-7.5 block max-w-full overflow-clip align-middle max-md:w-7 max-md:h-7 md:max-lg:w-[1.8125rem] md:max-lg:h-[1.8125rem]" data-cid="n492" alt="Discord" src="/assets/cloned/svg/0b6390ad296a.svg" />
                    {" "}
                  </div>
                  {" "}
                  <p className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]" data-cid="n493">
                    Discord
                  </p>
                  {" "}
                </div>
                {tile3Data.map((d, i) => <Tile3 key={i} d={d} cids={Tile3_cids[i]} />)}
                {" "}
              </div>
              {" "}
              <div className="flex pr-[1.0625rem] items-center gap-[1.0625rem] max-md:pr-4 max-md:gap-4 md:max-lg:pr-[16.5px] md:max-lg:gap-[16.5px]" data-cid="n512" aria-hidden="true">
                <div className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]" data-cid="n513">
                  <div className="w-16 flex p-[1.0625rem] rounded-[100%] justify-center items-center shrink-0 bg-background max-md:w-[3.7625rem] max-md:p-4 md:max-lg:w-[3.8625rem] md:max-lg:p-[16.5px]" data-cid="n514">
                    <img className="w-7.5 h-7.5 block max-w-full overflow-clip align-middle max-md:w-7 max-md:h-7 md:max-lg:w-[1.8125rem] md:max-lg:h-[1.8125rem]" data-cid="n515" data-component="image" alt="Discord" src="/assets/cloned/svg/0b6390ad296a.svg" />
                    {" "}
                  </div>
                  {" "}
                  <p className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]" data-cid="n516">
                    Discord
                  </p>
                  {" "}
                </div>
                {mediaTile2Data.map((d, i) => <MediaTile2 key={i} d={d} cids={MediaTile2_cids[i]} styles={MediaTile2_styles[i]} />)}
                <div className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]" data-cid="n545">
                  {" "}
                  <p className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]" data-cid="n546">
                    Airbnb
                  </p>
                  {" "}
                </div>
                {" "}
              </div>
            </div>
            {" "}
          </c-rail>
          {" "}
          <c-rail class="block overflow-hidden" data-cid="n547" id="rail-2">
            <div className="flex items-center whitespace-nowrap text-nowrap transform-[matrix(1,0,0,1,-13.405,0)] 2xl:transform-[none]" data-cid="n548">
              <div className="flex pr-[1.0625rem] items-center gap-[1.0625rem] max-md:pr-4 max-md:gap-4 md:max-lg:pr-[16.5px] md:max-lg:gap-[16.5px]" data-cid="n549">
                {mediaTile3Data.map((d, i) => <MediaTile3 key={i} d={d} cids={MediaTile3_cids[i]} styles={MediaTile3_styles[i]} />)}
                <div className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]" data-cid="n578">
                  <div className="w-16 h-16 flex p-[1.0625rem] rounded-[100%] justify-center items-center shrink-0 bg-background max-md:w-[3.7625rem] max-md:h-[3.7625rem] max-md:p-4 md:max-lg:w-[3.8625rem] md:max-lg:h-[3.8625rem] md:max-lg:p-[16.5px]" data-cid="n579">
                    <img className="w-7 h-[1.8125rem] block max-w-full overflow-clip align-middle" data-cid="n580" data-component="image" alt="Citizens Bank" src="/assets/cloned/svg/87a59798e06f.svg" />
                    {" "}
                  </div>
                  {" "}
                  <p className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]" data-cid="n581">
                    Citizens Bank
                  </p>
                  {" "}
                </div>
                <div className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]" data-cid="n582">
                  <div className="w-16 h-16 flex p-[1.0625rem] rounded-[100%] justify-center items-center shrink-0 bg-background max-md:w-[3.7625rem] max-md:h-[3.7625rem] max-md:p-4 md:max-lg:w-[3.8625rem] md:max-lg:h-[3.8625rem] md:max-lg:p-[16.5px]" data-cid="n583">
                    <c-dato-image class="block 2xl:hidden" data-cid="n584" id="datoimage-41">
                      <picture className="w-7.5 h-7.5 block text-clr-1 bg-cover [background-position:50%_50%] bg-no-repeat max-md:w-7 max-md:h-7 md:max-lg:w-[1.8125rem] md:max-lg:h-[1.8125rem] 2xl:hidden" style={{ backgroundImage: "url(data:image/png" }} data-cid="n585">
                        <source className="inline 2xl:hidden" data-cid="n586" sizes="(max-width: 100px) 100vw, 100px" srcSet="/assets/cloned/images/1215a7a43317.png 50w, /assets/cloned/images/295d4ba8008f.png 75w, /assets/cloned/images/94c2ef126be7.png 100w, /assets/cloned/images/f6e5cf1cf6dd.png 150w, /assets/cloned/images/ef13aa8e57a4.png 200w, /assets/cloned/images/536ede931127.png 300w, /assets/cloned/images/f5bc51912a76.png 400w" />
                        {" "}
                        <img className="w-7.5 h-7.5 block max-w-full overflow-clip aspect-square align-middle max-md:w-7 max-md:h-7 md:max-lg:w-[1.8125rem] md:max-lg:h-[1.8125rem] 2xl:hidden" data-cid="n587" data-component="image" alt="" src="/assets/cloned/images/94c2ef126be7.png" />
                        {" "}
                      </picture>
                      {" "}
                    </c-dato-image>
                    {" "}
                  </div>
                  {" "}
                  <p className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]" data-cid="n588">
                    American Express
                  </p>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div className="flex pr-[1.0625rem] items-center gap-[1.0625rem] max-md:pr-4 max-md:gap-4 md:max-lg:pr-[16.5px] md:max-lg:gap-[16.5px]" data-cid="n589" aria-hidden="true">
                <div className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]" data-cid="n590">
                  <div className="w-16 h-16 flex p-[1.0625rem] rounded-[100%] justify-center items-center shrink-0 bg-background max-md:w-[3.7625rem] max-md:h-[3.7625rem] max-md:p-4 md:max-lg:w-[3.8625rem] md:max-lg:h-[3.8625rem] md:max-lg:p-[16.5px]" data-cid="n591">
                    {" "}
                  </div>
                  {" "}
                  <p className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]" data-cid="n592">
                    Google
                  </p>
                  {" "}
                </div>
                <div className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]" data-cid="n593">
                  <div className="w-16 h-16 flex p-[1.0625rem] rounded-[100%] justify-center items-center shrink-0 bg-background max-md:w-[3.7625rem] max-md:h-[3.7625rem] max-md:p-4 md:max-lg:w-[3.8625rem] md:max-lg:h-[3.8625rem] md:max-lg:p-[16.5px]" data-cid="n594">
                    {" "}
                  </div>
                  {" "}
                  <p className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]" data-cid="n595">
                    Youtube
                  </p>
                  {" "}
                </div>
                {" "}
              </div>
            </div>
            {" "}
          </c-rail>
          {" "}
          <c-rail class="block overflow-hidden" data-cid="n596" id="rail-3">
            <div className="flex items-center whitespace-nowrap text-nowrap transform-[matrix(1,0,0,1,-8.4,0)] 2xl:transform-[none]" data-cid="n597">
              <div className="flex pr-[1.0625rem] items-center gap-[1.0625rem] max-md:pr-4 max-md:gap-4 md:max-lg:pr-[16.5px] md:max-lg:gap-[16.5px]" data-cid="n598">
                <div className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]" data-cid="n599">
                  <div className="w-16 flex p-[1.0625rem] rounded-[100%] justify-center items-center shrink-0 bg-background max-md:w-[3.7625rem] max-md:p-4 md:max-lg:w-[3.8625rem] md:max-lg:p-[16.5px]" data-cid="n600">
                    <img className="w-7.5 h-7.5 block max-w-full overflow-clip align-middle max-md:w-7 max-md:h-7 md:max-lg:w-[1.8125rem] md:max-lg:h-[1.8125rem]" data-cid="n601" data-component="image" alt="Amazon" src="/assets/cloned/svg/8fb3c46ef45b.svg" />
                    {" "}
                  </div>
                  {" "}
                  <p className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]" data-cid="n602">
                    Amazon
                  </p>
                  {" "}
                </div>
                {mediaTile4Data.map((d, i) => <MediaTile4 key={i} d={d} cids={MediaTile4_cids[i]} styles={MediaTile4_styles[i]} />)}
                {" "}
              </div>
              {" "}
              <div className="flex pr-[1.0625rem] items-center gap-[1.0625rem] max-md:pr-4 max-md:gap-4 md:max-lg:pr-[16.5px] md:max-lg:gap-[16.5px]" data-cid="n638" aria-hidden="true">
                <div className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]" data-cid="n639">
                  <div className="w-16 flex p-[1.0625rem] rounded-[100%] justify-center items-center shrink-0 bg-background max-md:w-[3.7625rem] max-md:p-4 md:max-lg:w-[3.8625rem] md:max-lg:p-[16.5px]" data-cid="n640">
                    <img className="w-7.5 h-7.5 block max-w-full overflow-clip align-middle max-md:w-7 max-md:h-7 md:max-lg:w-[1.8125rem] md:max-lg:h-[1.8125rem]" data-cid="n641" alt="Amazon" src="/assets/cloned/svg/8fb3c46ef45b.svg" />
                    {" "}
                  </div>
                  {" "}
                  <p className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]" data-cid="n642">
                    Amazon
                  </p>
                  {" "}
                </div>
                <div className="flex py-[21.3px] pr-[42.5px] pl-[21.3px] rounded-[63.8px] items-center gap-[21.3px] bg-surface max-md:py-5 max-md:pr-10 max-md:pl-5 max-md:rounded-[60.2px] max-md:gap-5 md:max-lg:py-[1.2875rem] md:max-lg:pr-[2.575rem] md:max-lg:pl-[1.2875rem] md:max-lg:rounded-[61.8px] md:max-lg:gap-[1.2875rem]" data-cid="n643">
                  <div className="w-16 h-16 flex p-[1.0625rem] rounded-[100%] justify-center items-center shrink-0 bg-background max-md:w-[3.7625rem] max-md:h-[3.7625rem] max-md:p-4 md:max-lg:w-[3.8625rem] md:max-lg:h-[3.8625rem] md:max-lg:p-[16.5px]" data-cid="n644">
                    {" "}
                  </div>
                  {" "}
                  <p className="block text-xl leading-[1.5625rem] tracking-[-0.81px] max-lg:text-[1.1875rem] max-md:leading-[1.4375rem] max-md:tracking-[-0.74px] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[-0.77px]" data-cid="n645">
                    WhatsApp
                  </p>
                  {" "}
                </div>
                {" "}
              </div>
            </div>
            {" "}
          </c-rail>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}

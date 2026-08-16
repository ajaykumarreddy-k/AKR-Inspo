import DropdownMenu from "./ditto/DropdownMenu";
import HeroSection from "./sections/hero-section";
import Navbar from "./sections/navbar";
import RealHumanInsightsSection from "./sections/real-human-insights-section";
import LogoCloudSection from "./sections/logo-cloud-section";
import ReadyWhenYouSection from "./sections/ready-when-you-section";
import Section6 from "./sections/section6";
import FewNumbersBehindSection from "./sections/few-numbers-behind-section";
import FeaturedArticlesSection from "./sections/featured-articles-section";
import Footer from "./sections/footer";
import Icon5 from "./svgs/svg-icon5";
import Icon6 from "./svgs/svg-icon6";
import Icon7 from "./svgs/svg-icon7";
import Icon13 from "./svgs/svg-icon13";
import ClientMotion from "./components/client-motion";

export default function Page() {
  return (
    <>
      <ClientMotion />
      <HeroSection />
      {" "}
      <c-menu-desktop class="inline" data-cid="n4" id="menudesktop-2">
        <Navbar />
        {" "}
      </c-menu-desktop>
      {" "}
      <c-menu-mobile class="w-full h-full hidden fixed z-100 p-[1.0625rem] overflow-hidden pointer-events-none max-md:w-[23.4375rem] max-md:h-203 max-lg:block max-md:p-4 md:max-lg:w-192 md:max-lg:h-256 md:max-lg:p-[16.5px]" data-cid="n49" id="menumobile-1">
        <div className="min-h-17 flex py-[8.5px] pr-[8.5px] pl-[0.8rem] rounded-[10px] justify-between items-center bg-background max-md:min-h-[3.7625rem] max-lg:py-2 max-lg:pr-2 max-md:pl-3 md:max-lg:min-h-[3.8625rem] md:max-lg:pl-[0.775rem]" data-cid="n50">
          <a className="flex min-w-0 items-center gap-[1.0625rem] cursor-pointer max-md:gap-2.5 md:max-lg:gap-[16.5px]" data-cid="n51" href="/">
            {" "}
            <span className="w-px h-px block absolute min-w-0 -m-px overflow-hidden whitespace-nowrap text-nowrap [clip-path:inset(50%)]" data-cid="n52">
              Home
            </span>
            {" "}
            <span className="block min-w-0 align-middle" data-cid="n53">
              {" "}
              <Icon5 cid={"n54"} />
              {" "}
            </span>
            {" "}
            <span className="block min-w-0 align-middle" data-cid="n55">
              {" "}
              <Icon6 cid={"n56"} />
              {" "}
            </span>
            {" "}
          </a>
          {" "}
          <div className="flex min-w-0 items-center gap-[0.8rem] max-md:gap-2.5 md:max-lg:gap-[0.775rem]" data-cid="n57">
            <div className="block min-w-0" data-cid="n58">
              <a className="inline-flex py-[8.5px] px-[0.8rem] rounded-[5px] justify-center items-center text-lg leading-[1.4375rem] tracking-[-0.72px] bg-surface cursor-pointer whitespace-nowrap max-md:hidden md:max-lg:py-2 md:max-lg:px-[0.775rem] md:max-lg:text-[1.0625rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[-0.68px]" data-cid="n59" href="/contact-us">
                Get a quote
              </a>
              {" "}
            </div>
            {" "}
            <div className="block relative min-w-0" data-cid="n60">
              <button className="w-[42.5px] h-[42.5px] inline-flex relative rounded-[100%] justify-center items-center text-center cursor-default max-md:w-10 max-md:h-10 md:max-lg:w-[2.575rem] md:max-lg:h-[2.575rem] before:content-[''] before:block before:absolute before:inset-0 before:bg-primary before:rounded-tl-[100%] max-md:before:w-10 max-md:before:h-10 md:max-lg:before:w-[2.575rem] md:max-lg:before:h-[2.575rem]" data-cid="n61" type="button">
                {" "}
                <span className="w-px h-px block absolute min-w-0 -m-px overflow-hidden whitespace-nowrap text-nowrap [clip-path:inset(50%)]" data-cid="n62">
                  Toggle menu
                </span>
                {" "}
                <span className="w-[1.0625rem] h-[0.4375rem] flex relative min-w-0 flex-col justify-between" data-cid="n63">
                  {" "}
                  <span className="h-0.5 block min-w-0 rounded-[1px] bg-color-001" data-cid="n64" />
                  {" "}
                  <span className="h-0.5 block min-w-0 rounded-[1px] bg-color-001" data-cid="n65" />
                  {" "}
                </span>
                {" "}
                <span className="w-4 h-4 block absolute top-1/2 left-1/2 min-w-0 -mt-2 -ml-2 max-md:top-5 max-md:left-5 md:max-lg:top-[1.2875rem] md:max-lg:left-[1.2875rem]" data-cid="n66">
                  {" "}
                  <span className="w-0.5 h-full block absolute left-1/2 -ml-px rounded-[1px] bg-color-001 transform-[none] max-lg:h-4 max-lg:left-2 max-lg:transform-[matrix(1,0,0,0,0,0)] max-lg:origin-[0px_8px]" data-cid="n67" />
                  {" "}
                  <span className="w-full h-0.5 block absolute top-1/2 -mt-px rounded-[1px] bg-color-001 transform-[none] max-lg:w-4 max-lg:top-2 max-lg:transform-[matrix(0,0,0,1,0,0)] max-lg:origin-[16px_1px]" data-cid="n68" />
                  {" "}
                </span>
                {" "}
              </button>
              {" "}
              <div className="flex absolute top-0 left-0 opacity-0 justify-center items-center pointer-events-none h-full w-full" data-cid="n69">
                <div className="block min-w-0 pointer-events-none" data-cid="n70" role="status">
                  <Icon7 cid={"n71"} />
                  {" "}
                  <span className="w-px h-px block absolute -m-px overflow-hidden whitespace-nowrap text-nowrap [clip-path:inset(50%)] pointer-events-none" data-cid="n72">
                    Loading...
                  </span>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </c-menu-mobile>
      {" "}
      <main className="block relative z-0 bg-surface" data-cid="n73">
        <div className="block relative z-1" data-cid="n74" id="swup">
          <div className="block" data-cid="n75">
            <RealHumanInsightsSection />
            <LogoCloudSection />
            <c-deluxe-callout class="hidden 2xl:block 2xl:relative 2xl:py-42.5 2xl:rounded-br-[50px] 2xl:rounded-bl-[50px] 2xl:bg-primary" data-cid="n302" id="deluxecallout-70">
              <div className="hidden 2xl:block 2xl:px-5" data-cid="n303">
                <div className="hidden grid-cols-16 2xl:grid 2xl:gap-5 max-md:grid-cols-6" data-cid="n304">
                  <div className="hidden 2xl:block 2xl:col-start-2 2xl:col-end-[span_14]" data-cid="n305">
                    <p className="hidden 2xl:block 2xl:text-[11.625rem] 2xl:leading-[11.0625rem] 2xl:tracking-[-11.17px] 2xl:text-center" data-cid="n306">
                      {"Ready when "}
                      <br className="hidden 2xl:inline" data-cid="n307" />
                      you are!
                    </p>
                    {" "}
                    <div className="hidden 2xl:flex 2xl:mt-[5.3125rem] 2xl:flex-col 2xl:items-center 2xl:gap-[25.5px]" data-cid="n308">
                      <p className="hidden 2xl:block 2xl:max-w-[37.1875rem] 2xl:text-3xl 2xl:leading-[2.25rem] 2xl:tracking-[-1.78px] 2xl:text-center 2xl:text-balance" data-cid="n309">
                        {" Whether you’re launching in one market or ten, we’re here to make your research simple, smart, and human from day one. Let’s talk about your next project. "}
                      </p>
                      {" "}
                      <a className="hidden 2xl:min-h-16 2xl:border 2xl:border-solid 2xl:border-clr-1 2xl:flex 2xl:relative 2xl:z-1 2xl:p-[0.6625rem] 2xl:rounded-[10px] 2xl:items-center 2xl:gap-[8.5px] 2xl:text-color-001 2xl:text-lg 2xl:leading-[1.6875rem] 2xl:cursor-pointer before:content-[''] before:block before:absolute before:inset-0 before:w-[193.5px] before:h-16 before:bg-background before:rounded-tl-[10px] max-lg:before:hidden" data-cid="n310" href="/contact-us" target="_self">
                        {" "}
                        <span className="hidden 2xl:block 2xl:relative 2xl:z-3 2xl:px-[0.6625rem]" data-cid="n311">
                          {" Get a quote "}
                        </span>
                        {" "}
                        <span className="hidden 2xl:w-[42.5px] 2xl:h-[42.5px] 2xl:flex 2xl:relative 2xl:z-1 2xl:rounded-[100%] 2xl:justify-center 2xl:items-center 2xl:bg-primary 2xl:pointer-events-none" data-cid="n312">
                          {" "}
                          <span className="hidden 2xl:block 2xl:align-middle 2xl:pointer-events-none" data-cid="n313">
                            {" "}
                            <Icon13 cid={"n314"} />
                            {" "}
                          </span>
                          {" "}
                        </span>
                        {" "}
                      </a>
                      {" "}
                    </div>
                    {" "}
                    <div className="hidden 2xl:grid 2xl:mt-[15.9375rem] 2xl:gap-5 2xl:grid-cols-[534.156px_534.172px_534.172px] 2xl:text-lg 2xl:leading-[1.4375rem] 2xl:tracking-[-0.72px]" data-cid="n315">
                      <div className="hidden 2xl:block 2xl:text-center" data-cid="n316">
                        Fast, high-quality insights
                      </div>
                      {" "}
                      <div className="hidden 2xl:block 2xl:text-center" data-cid="n317">
                        One seamless project lead
                      </div>
                      {" "}
                      <div className="hidden 2xl:block 2xl:text-center" data-cid="n318">
                        Built for multi-market studies
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div className="hidden w-[56%] 2xl:h-[148.15rem] 2xl:block 2xl:absolute 2xl:-top-270 2xl:pointer-events-none" data-cid="n319">
                <div className="hidden 2xl:w-[67.2rem] 2xl:h-270 2xl:flex 2xl:sticky 2xl:top-0 2xl:items-end 2xl:pointer-events-none" data-cid="n320">
                  <c-rive class="hidden 2xl:block 2xl:pointer-events-none" data-cid="n321" id="rive-71" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
                    <div className="hidden aspect-[1979/1570] 2xl:block 2xl:[translate:0px_100%] 2xl:pointer-events-none" data-cid="n322">
                      <div className="hidden h-full w-full 2xl:block 2xl:pointer-events-none" data-cid="n323">
                        <canvas className="hidden h-full 2xl:w-full 2xl:block 2xl:overflow-clip 2xl:aspect-[auto_1075/852] 2xl:align-middle 2xl:pointer-events-none" data-cid="n324" height="852" width="1075" />
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </c-rive>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </c-deluxe-callout>
            <ReadyWhenYouSection />
            <Section6 />
            <FewNumbersBehindSection />
            <FeaturedArticlesSection />
            <Footer />
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </main>
      {" "}
      <DropdownMenu menus={[{"trigger":"n7","hoverOpen":true,"gap":455,"align":"left","html":"<div style=\"position:absolute;margin:0;display:flex;box-sizing:border-box;width:408px;height:287.125px;min-width:0px;max-width:408px;min-height:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none;border-top-color:rgb(44, 47, 49);border-right-color:rgb(44, 47, 49);border-bottom-color:rgb(44, 47, 49);border-left-color:rgb(44, 47, 49);border-top-left-radius:8.5px;border-top-right-radius:8.5px;border-bottom-right-radius:8.5px;border-bottom-left-radius:8.5px;background-color:rgb(245, 241, 228);color:rgb(44, 47, 49);box-shadow:rgba(0, 0, 2, 0.3) 0px 10px 30px 0px;opacity:0;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;font-size:16px;font-weight:400;font-style:normal;line-height:18.4px;letter-spacing:normal;text-align:start;text-transform:none;text-decoration-line:none;white-space:normal;flex-direction:column;flex-wrap:nowrap;justify-content:normal;align-items:normal;gap:normal;row-gap:normal;column-gap:normal;grid-template-columns:none;grid-template-rows:none;list-style-type:disc;vertical-align:baseline;object-fit:fill;cursor:auto;overflow:hidden\"></div>"}]} />
    </>
  );
}

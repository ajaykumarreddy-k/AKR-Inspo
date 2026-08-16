import MediaTile, { type MediaTileData } from "../components/media-tile";
import { MediaTile_cids } from "../_cids";
import { MediaTile_styles } from "../_styles";
const MediaTile_data: MediaTileData[] = [
    { dataicon: "globe", icon: <>
                <path fill="currentColor" d="M15.5 32.995a17.495 17.495 0 1 1 34.99 0 17.495 17.495 0 0 1-34.99 0M32.995 18h-.125c.23.45.48.988.705 1.585.607 1.615 1.16 3.98.177 6.07-.905 1.925-2.462 2.425-3.625 2.725l-.17.043c-1.13.292-1.6.412-1.937.925-.315.48-.26 1.082.1 2.25l.08.262c.143.455.313.995.4 1.505.112.635.142 1.43-.258 2.2a3.75 3.75 0 0 1-1.554 1.628 5.5 5.5 0 0 1-1.66.525l-.173.03c-.895.157-1.35.237-1.785.705-.343.367-.555 1.005-.68 1.93-.05.377-.08.752-.112 1.14l-.015.204c-.035.426-.08.91-.175 1.326l-.06.275a14.95 14.95 0 0 0 10.867 4.664 14.9 14.9 0 0 0 7.635-2.087 8 8 0 0 1-.645-.715c-.593-.745-1.36-2.017-1.095-3.515.127-.717.513-1.322.89-1.79.385-.475.85-.915 1.258-1.292l.277-.253c.313-.288.583-.533.81-.773q.17-.17.313-.364a1 1 0 0 0 .077-.133c.125-.417-.025-.725-.21-.867-.138-.106-.487-.263-1.115.132q-.314.203-.633.395a2.5 2.5 0 0 1-.687.293 1.335 1.335 0 0 1-1.585-.9 1.5 1.5 0 0 1-.07-.5 2.5 2.5 0 0 1 .04-.473c.063-.525.157-1.3-.143-2.455-.242-.928-.595-1.635-.955-2.355q-.257-.51-.49-1.03c-.22-.5-.46-1.15-.417-1.84.05-.8.453-1.45 1.105-1.94.793-.595 1.79-1.957 2.653-3.335a38 38 0 0 0 1.017-1.725l.058-.105A14.93 14.93 0 0 0 32.995 18m10.093 3.903c-.255.45-.583 1.017-.96 1.62-.848 1.35-2.06 3.1-3.273 4.007a.5.5 0 0 0-.11.1c0 .068.025.253.21.675q.125.277.325.675c.392.785.94 1.887 1.25 3.085.167.64.248 1.21.275 1.703 1.09-.36 2.185-.196 3.03.457 1.045.807 1.483 2.212 1.075 3.57-.19.62-.625 1.133-.975 1.5-.295.307-.65.63-.97.925l-.235.212q-.538.477-1.002 1.026c-.266.325-.355.537-.376.654-.074.413.128.943.59 1.526q.346.428.768.782a14.97 14.97 0 0 0 5.28-11.425c0-4.395-1.89-8.35-4.903-11.092M18 32.995a14.9 14.9 0 0 0 1.968 7.433l.044-.375c.136-1.013.42-2.333 1.33-3.305 1.036-1.11 2.308-1.32 3.12-1.453q.12-.018.228-.04c.435-.075.697-.145.9-.258a1.25 1.25 0 0 0 .535-.59c.035-.067.082-.224.015-.612-.058-.333-.168-.68-.308-1.128l-.102-.334c-.325-1.063-.835-2.788.2-4.36.902-1.368 2.35-1.715 3.285-1.943l.285-.07c.995-.258 1.582-.5 1.99-1.367.53-1.13.3-2.655-.255-4.125q-.437-1.15-1.075-2.2A15 15 0 0 0 18 32.995" />
                </>, description: "60+", description2: " Our network spans over 60 countries, giving you local insight with global consistency. " },
    { dataicon: "check", icon: <>
                <path fill="currentColor" d="M45.429 24.585c.365.375.571.883.571 1.412 0 .53-.206 1.037-.571 1.412L30.805 42.376a2.1 2.1 0 0 1-.675.462 2.04 2.04 0 0 1-2.269-.462l-7.265-7.435a2.035 2.035 0 0 1-.024-2.848 1.91 1.91 0 0 1 2.783.025l5.977 6.118 13.337-13.65a1.913 1.913 0 0 1 2.76 0" />
                </>, description: "400", description2: " We’ve successfully delivered more than 400 research projects around the world — and counting. " },
    { dataicon: "heart", icon: <>
                <path fill="currentColor" d="M50 27.5c-.2-3.8-1.8-6.8-4.4-8.3s-6-1.4-9.4.3c-1 .5-2 1.2-2.9 1.9-.9-.7-1.9-1.4-2.9-1.9-3.4-1.7-6.7-1.8-9.4-.3-5.3 3.1-6 11.7-1.4 19.5 3.5 6 8.8 9.6 13.5 9.6h.4c4.7 0 10-3.6 13.5-9.6 2.1-3.7 3.2-7.7 3-11.3Zm-15.6-1.2s.1.2.2.3c.2.3.5.6.7 1 0 .1.1.2.2.3.3.4.5.8.8 1.2 1.2 2.1 2 4.3 2.4 6.4.7 4.2-.2 7.9-2.8 9.4-.2.1-.4.2-.7.3H35c-.2 0-.4.1-.6.2h-1.2c-.8 0-1.6-.3-2.3-.7-3.9-2.2-4.1-9.5-.4-15.8.9-1.5 1.9-2.8 3-4l.2.2c.3.3.5.6.8.9ZM22 37.4c-3.6-6.3-3.5-13.5.4-15.8.8-.5 1.7-.7 2.7-.7s2.6.4 4 1.1c.7.4 1.4.8 2.1 1.3-1.2 1.3-2.4 2.8-3.3 4.4-2.8 4.9-3.6 10.1-2.6 14-1.3-1.2-2.4-2.7-3.4-4.4Zm22.7 0c-1 1.7-2.1 3.1-3.4 4.4.6-2.1.6-4.4.1-6.9-.4-2.3-1.3-4.7-2.7-7.1v-.1c-.3-.5-.5-.9-.8-1.3-.1-.2-.3-.4-.4-.5-.2-.3-.4-.6-.6-.8-.1-.2-.3-.4-.4-.5-.2-.3-.4-.5-.7-.8 0-.1-.2-.2-.3-.3.7-.5 1.4-1 2.1-1.3 1.4-.7 2.8-1.1 4-1.1s1.9.2 2.7.7c1.8 1 2.9 3.2 3 6.1.2 3.1-.8 6.5-2.6 9.7Z" />
                </>, description: "50+", description2: " From global brands to growing startups, more than 50 clients have partnered with us. " }
];
/** Few Numbers Behind section. */
export default function FewNumbersBehindSection({ mediaTileData = MediaTile_data } = {}) {
  return (
    <div className="block relative z-10 pt-[8.375rem] pb-[168.7px] rounded-[50px] bg-surface max-md:pt-[83.1px] max-md:pb-[8.15rem] max-lg:rounded-[35px] md:max-lg:pt-[105.3px] md:max-lg:pb-[147.1px] 2xl:pt-34 2xl:pb-42.5" data-cid="n369">
      <div className="block px-5" data-cid="n370">
        <div className="grid gap-5 grid-cols-16 max-md:grid-cols-6" data-cid="n371">
          <div className="block col-start-2 col-end-[span_14] max-lg:col-span-full" data-cid="n372">
            <div className="h-full grid gap-5 grid-cols-14 max-lg:grid-cols-1" data-cid="n373">
              <div className="block col-start-1 col-end-9 max-lg:[grid-column-start:initial] max-lg:[grid-column-end:initial]" data-cid="n374">
                <div className="h-100 min-h-100 flex sticky top-37 flex-col justify-between gap-[2.6375rem] max-md:h-72 max-md:gap-[2.0375rem] max-lg:min-h-0 max-lg:static max-lg:top-auto md:max-lg:h-[236.7px] md:max-lg:gap-[2.3rem] 2xl:h-135 2xl:min-h-135 2xl:top-44 2xl:gap-[42.5px]" data-cid="n375">
                  <div className="block max-w-127.5 text-[3.3125rem] leading-[3.75rem] tracking-[-3.15px] max-md:max-w-[562.1px] max-md:text-[2.875rem] max-md:leading-[2.75rem] max-md:tracking-[-2.76px] md:max-lg:max-w-[36.0625rem] md:max-lg:text-[3.8125rem] md:max-lg:leading-[3.625rem] md:max-lg:tracking-[-3.64px] 2xl:max-w-[46.4875rem] 2xl:text-[5.0625rem] 2xl:leading-[4.8125rem] 2xl:tracking-[-4.84px]" data-cid="n376" data-component="heading">
                    <p className="block" data-cid="n377">
                      {"A few numbers behind the "}
                      <strong className="inline-block relative after:content-[''] after:block after:absolute after:top-[56.3px] after:-right-[0.1625rem] after:-bottom-4 after:left-1 after:bg-clr-2 max-md:after:top-11 max-md:after:right-[-2.3px] max-md:after:-bottom-2.5 max-md:after:left-[3.7px] md:max-lg:after:top-[53.5px] md:max-lg:after:-right-[0.1875rem] md:max-lg:after:left-[0.3rem] 2xl:after:top-[72.7px] 2xl:after:-right-1 2xl:after:left-[6.5px]" data-cid="n378">
                        insights
                      </strong>
                      {" we deliver"}
                    </p>
                  </div>
                  {" "}
                  <div className="block" data-cid="n379">
                    <p className="w-[51.5%] block max-w-[26.5625rem] text-lg leading-[1.4375rem] tracking-[-0.72px] text-balance max-md:w-full max-md:max-w-[401.5px] max-md:text-base max-md:leading-[1.25rem] max-md:tracking-[-0.64px] md:max-lg:w-[57%] md:max-lg:max-w-[25.7625rem] md:max-lg:text-[1.0625rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[-0.68px] 2xl:w-[46%]" data-cid="n380">
                      These numbers are more than just milestones. They represent the strength of our connections, the consistency of our work, and the real-world impact we help create for you.
                    </p>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div className="flex mb-[168.7px] pt-[21.0875rem] flex-col col-start-10 col-end-15 max-md:mb-[8.15rem] max-lg:pt-0 max-lg:[grid-column-start:initial] max-lg:[grid-column-end:initial] md:max-lg:mb-[147.1px] 2xl:mb-42.5 2xl:pt-85" data-cid="n381">
                {mediaTileData.map((d, i) => <MediaTile key={i} d={d} cids={MediaTile_cids[i]} styles={MediaTile_styles[i]} />)}
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
    </div>
  );
}

import Icon9 from "../svgs/svg-icon9";
import ListRow from "../components/list-row";
import { ListRow_cids, ListRow_cids2 } from "../_cids";
import { listRowData as listRowDataContent, listRowData2 as listRowData2Content } from "../content";
/** Site footer. */
export default function Footer({ listRowData = listRowDataContent, listRowData2 = listRowData2Content } = {}) {
  return (
    <footer className="h-[893.3px] min-h-screen flex pt-[8.375rem] pb-[38.3px] rounded-[50px] flex-col justify-between gap-y-[5.25rem] overflow-hidden bg-color-004 max-md:h-[75.4625rem] max-md:pt-[3.6rem] max-md:pb-9 max-lg:rounded-[35px] max-md:gap-y-[3.6rem] md:max-lg:h-[83.5375rem] md:max-lg:pt-[69.1px] md:max-lg:pb-[2.3125rem] md:max-lg:gap-y-[69.1px] 2xl:h-270 2xl:pt-34 2xl:gap-y-[5.3125rem]" data-cid="n646">
      <div className="w-full block px-5" data-cid="n647">
        <div className="grid gap-5 grid-cols-16 max-md:grid-cols-6" data-cid="n648">
          <div className="block col-start-2 col-end-[span_14] max-lg:col-span-full" data-cid="n649">
            <div className="h-full grid gap-y-[5.25rem] gap-x-5 grid-cols-14 max-md:gap-y-[3.6rem] max-lg:grid-cols-1 md:max-lg:gap-y-[69.1px] 2xl:gap-y-[5.3125rem]" data-cid="n650">
              <div className="block col-start-[span_6] col-end-[span_6] max-lg:col-span-full 2xl:col-start-[span_4] 2xl:col-end-[span_4]" data-cid="n651">
                <p className="w-full max-w-112.5 block text-xl leading-[1.5625rem] tracking-[-0.81px] max-md:text-2xl max-md:leading-[1.8125rem] max-md:tracking-[-1.46px] md:max-lg:text-[1.6875rem] md:max-lg:leading-8 md:max-lg:tracking-[-1.6px]" data-cid="n652">
                  {" Have a project in mind? We'd love to hear what you're working on and show you how we can help. Whether you're exploring a new market or launching your next product, we're ready when you are. "}
                </p>
                {" "}
                <a className="min-h-16 border border-solid border-clr-1 inline-flex relative z-1 mt-[1.575rem] p-[0.6625rem] rounded-[10px] items-center gap-[8.5px] text-color-001 text-lg leading-[1.6875rem] cursor-pointer max-md:min-h-[3.7625rem] max-md:mt-[16.5px] max-md:p-2.5 max-lg:gap-2 max-md:text-base max-md:leading-[1.5rem] md:max-lg:min-h-[3.8625rem] md:max-lg:mt-[20.3px] md:max-lg:p-[10.3px] md:max-lg:text-[1.0625rem] md:max-lg:leading-[1.5625rem] 2xl:mt-[25.5px] before:content-[''] before:block before:absolute before:inset-0 before:h-16 before:bg-background before:rounded-tl-[10px] max-md:before:h-[3.7625rem] md:max-lg:before:h-[3.8625rem]" data-cid="n653" data-component="link" href="/contact-us" target="_self">
                  {" "}
                  <span className="block relative z-3 px-[0.6625rem] max-md:px-2.5 md:max-lg:px-[10.3px] hover:transform-[none] focus:transform-[none]" data-cid="n654">
                    {" Get a quote "}
                  </span>
                  {" "}
                  <span className="w-[42.5px] h-[42.5px] flex relative z-1 rounded-[100%] justify-center items-center bg-color-004 pointer-events-none max-md:w-10 max-md:h-10 md:max-lg:w-[2.575rem] md:max-lg:h-[2.575rem]" data-cid="n655">
                    {" "}
                    <span className="block align-middle pointer-events-none" data-cid="n656">
                      {" "}
                      <Icon9 cid={"n657"} />
                      {" "}
                    </span>
                    {" "}
                  </span>
                  {" "}
                </a>
                {" "}
              </div>
              {" "}
              <div className="block col-start-9 col-end-[span_5] max-lg:col-span-full 2xl:col-start-10 2xl:col-end-[span_4]" data-cid="n658">
                <nav className="grid gap-y-[0.6625rem] gap-x-5 grid-cols-2 max-md:gap-y-2.5 md:max-lg:gap-y-[10.3px]" data-cid="n659" data-component="nav">
                  <ul className="flex flex-col gap-y-[0.4rem] [list-style-type:none] list-outside max-lg:gap-y-1.5" data-cid="n660">
                    {listRowData.map((d, i) => <ListRow key={i} d={d} cids={ListRow_cids[i]} />)}
                  </ul>
                  {" "}
                  <ul className="flex flex-col gap-y-[0.4rem] [list-style-type:none] list-outside max-lg:gap-y-1.5" data-cid="n671">
                    {listRowData2.map((d, i) => <ListRow key={i} d={d} cids={ListRow_cids2[i]} />)}
                    <li className="list-item" data-cid="n678">
                      <button className="inline-block text-left cursor-pointer hover:underline" data-cid="n679" data-component="button" type="button">
                        {" Cookie Preferences "}
                      </button>
                      {" "}
                    </li>
                  </ul>
                  {" "}
                </nav>
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
      <div className="w-full block px-5" data-cid="n680">
        <div className="grid gap-5 grid-cols-16 max-md:grid-cols-6" data-cid="n681">
          <div className="block col-start-2 col-end-[span_14] max-lg:col-span-full" data-cid="n682">
            <div className="grid pt-8.5 gap-y-[3.675rem] gap-x-5 grid-cols-14 max-lg:border-t max-lg:border-solid max-lg:border-t-clr-0 max-md:pt-8 max-md:gap-y-[2.5625rem] max-lg:grid-cols-1 md:max-lg:pt-[2.0625rem] md:max-lg:gap-y-[3.05rem] 2xl:gap-y-[59.5px]" data-cid="n683">
              <div className="block col-start-[span_7] col-end-[span_7] max-lg:col-span-full" data-cid="n684">
                <p className="block ml-[-8.7px] text-[7.75rem] leading-[7.375rem] tracking-[-7.45px] max-md:-ml-[0.2875rem] max-md:text-[4.0625rem] max-md:leading-[3.875rem] max-md:tracking-[-3.9px] md:max-lg:ml-[-6.7px] md:max-lg:text-8xl md:max-lg:leading-[5.6875rem] md:max-lg:tracking-[-5.76px] 2xl:-ml-[0.8125rem] 2xl:text-[11.625rem] 2xl:leading-[11.0625rem] 2xl:tracking-[-11.17px]" data-cid="n685">
                  {" Let’s "}
                  <br className="inline" data-cid="n686" />
                  {" "}
                  <u className="inline-block relative after:content-[''] after:block after:absolute after:top-[7.1875rem] after:-right-1.5 after:-bottom-8 after:left-2.5 after:bg-primary max-md:after:top-[3.8625rem] max-md:after:right-[-3.3px] max-md:after:-bottom-5 max-md:after:left-[0.325rem] md:max-lg:after:top-[5.5125rem] md:max-lg:after:-right-[0.3rem] md:max-lg:after:left-[7.7px] 2xl:after:top-[10.0625rem] 2xl:after:right-[-9.3px] 2xl:after:-bottom-7.5 2xl:after:left-[14.9px]" data-cid="n687">
                    Connect
                  </u>
                  {" "}
                </p>
                {" "}
              </div>
              {" "}
              <div className="block col-start-10 col-end-[span_4] max-lg:col-span-full max-lg:row-start-1" data-cid="n688">
                <div className="block text-lg leading-[1.4375rem] max-md:text-base max-md:leading-[1.25rem] md:max-lg:text-[1.0625rem] md:max-lg:leading-[1.3125rem]" data-cid="n689">
                  <p className="block text-color-002" data-cid="n690">
                    <strong className="inline text-foreground leading-9 max-md:leading-[2rem] md:max-lg:leading-[2.125rem] 2xl:leading-[2.25rem]" data-cid="n691">
                      Dubai
                    </strong>
                    {" "}
                    <br className="inline" data-cid="n692" />
                    <a className="inline cursor-pointer hover:underline" data-cid="n693" data-component="link" href={"https://www.google.com/maps/place/MindMarket+International/@25.1250606,55.3811616,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f641453924383:0x65ced4061ca04ee4!8m2!3d25.1250606!4d55.3837419!16s%2Fg%2F11w1zfn2jd?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"} rel="noopener" target="_blank">
                      {"Dubai Silicon Oasis, DDP, "}
                    </a>
                    <br className="inline" data-cid="n694" />
                    <a className="inline cursor-pointer hover:underline" data-cid="n695" data-component="link" href={"https://www.google.com/maps/place/MindMarket+International/@25.1250606,55.3811616,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f641453924383:0x65ced4061ca04ee4!8m2!3d25.1250606!4d55.3837419!16s%2Fg%2F11w1zfn2jd?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"} rel="noopener" target="_blank">
                      Building A2, 341041 Dubai, UAE
                    </a>
                    <br className="inline" data-cid="n696" />
                    Mon-Fri 10:00 am - 7:00 pm (GST)
                  </p>
                  {" "}
                  <p className="block mt-[1.125rem] text-color-002 max-md:mt-4 md:max-lg:mt-[1.0625rem]" data-cid="n697">
                    <strong className="inline text-foreground leading-9 max-md:leading-[2rem] md:max-lg:leading-[2.125rem] 2xl:leading-[2.25rem]" data-cid="n698">
                      London
                    </strong>
                    {" "}
                    <br className="inline" data-cid="n699" />
                    <a className="inline cursor-pointer hover:underline" data-cid="n700" data-component="link" href={"https://www.google.com/maps/place/MindMarket/@51.5256447,-0.0862333,17z/data=!3m1!4b1!4m6!3m5!1s0x48761de09ccaac9d:0xd47ba82b0cbcae7d!8m2!3d51.5256447!4d-0.083653!16s%2Fg%2F11w3kg12zx?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"} rel="noopener" target="_blank">
                      {"3rd Floor, 86-90 Paul Street, "}
                    </a>
                    <br className="inline" data-cid="n701" />
                    <a className="inline cursor-pointer hover:underline" data-cid="n702" data-component="link" href={"https://www.google.com/maps/place/MindMarket/@51.5256447,-0.0862333,17z/data=!3m1!4b1!4m6!3m5!1s0x48761de09ccaac9d:0xd47ba82b0cbcae7d!8m2!3d51.5256447!4d-0.083653!16s%2Fg%2F11w3kg12zx?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"} rel="noopener" target="_blank">
                      London EC2A 4NE, UK
                    </a>
                    <br className="inline" data-cid="n703" />
                    Mon-Fri 9:00 am - 6:00 pm (GMT)
                  </p>
                  {" "}
                  <p className="block mt-[1.125rem] text-color-002 max-md:mt-4 md:max-lg:mt-[1.0625rem]" data-cid="n704">
                    <a className="inline cursor-pointer hover:underline" data-cid="n705" data-component="link" href="mailto:curious@themindmarket.com">
                      {" "}
                      <strong className="inline text-foreground leading-9 max-md:leading-[2rem] max-lg:underline md:max-lg:leading-[2.125rem] 2xl:leading-[2.25rem]" data-cid="n706">
                        curious@mindmarket.com
                      </strong>
                      {" "}
                    </a>
                  </p>
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div className="grid mt-[3.675rem] gap-5 grid-cols-14 max-md:mt-[2.5625rem] max-lg:gap-[initial] md:max-lg:mt-[3.05rem] 2xl:mt-[59.5px]" data-cid="n707">
              <div className="block col-start-[span_7] col-end-[span_7] max-lg:border-b max-lg:border-solid max-lg:border-b-clr-0 max-md:mb-[16.5px] max-md:pb-[16.5px] max-lg:col-span-full md:max-lg:mb-[20.3px] md:max-lg:pb-[20.3px]" data-cid="n708">
                <span className="inline" data-cid="n709">
                  {" Copyright © 2026 MindMarket International "}
                </span>
                {" "}
              </div>
              {" "}
              <div className="block col-start-10 col-end-[span_3] max-lg:col-start-[span_7] max-lg:col-end-[span_7]" data-cid="n710">
                <div className="block" data-cid="n711">
                  <a className="inline cursor-pointer" data-cid="n712" data-component="link" href="https://www.esomar.org/" rel="noopener noreferrer" target="_blank">
                    {" "}
                    <img className="w-50 h-6 block max-w-50 overflow-clip aspect-[auto_400/47] align-middle" data-cid="n713" data-component="image" alt="ESOMAR" height="47" src="/assets/cloned/images/673364af1edf.webp" width="400" />
                    {" "}
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div className="flex flex-wrap justify-end items-center gap-x-8.5 col-start-13 col-end-[span_2] text-right max-md:flex-col max-md:items-end max-md:gap-x-8 max-lg:col-start-[span_7] max-lg:col-end-[span_7] md:max-lg:gap-x-[2.0625rem]" data-cid="n714">
                <ul className="block [list-style-type:none] list-outside max-lg:underline" data-cid="n715">
                  <li className="list-item" data-cid="n716">
                    <a className="inline cursor-pointer hover:underline" data-cid="n717" data-component="link" href="https://www.linkedin.com/company/the-mindmarket" target="_self">
                      {" LinkedIn "}
                    </a>
                    {" "}
                  </li>
                </ul>
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
    </footer>
  );
}

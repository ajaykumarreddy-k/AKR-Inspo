export default function Icon10({ cid }: { cid?: string }) {
  return (
    <svg className="hidden h-full 2xl:w-full 2xl:block 2xl:absolute 2xl:overflow-hidden 2xl:align-middle" id="desktop-svg" viewBox="0 0 1944.2 6151.5" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" fill="currentColor" data-cid={cid}>
      <path fill="none" stroke="#8ED462" strokeLinecap="round" strokeWidth="500" d="M1085 250c-868 126.5-961 907-29.5 1453S1397 3353 733 3318s-606-718-53.6-808" id="main-path" style={{ strokeDashoffset: "0", strokeDasharray: "285.69px, 5428.22px" }} />
      <linearGradient id="path-gradient" x1="1020.4" x2="1550.5" y1="2766.3" y2="3624.5" gradientTransform="matrix(1 0 0 -1 -242 5807.4)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#8ED462" />
        <stop offset=".3" stopColor="#378e43" />
        <stop offset=".7" stopColor="#439745" />
        <stop offset="1" stopColor="#8ED462" />
      </linearGradient>
      <path fill="none" stroke="url(#path-gradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="500" d="M1055.5 1703C1987 2249 1397 3353 733 3318" opacity="1" id="shadow-path" style={{ opacity: "1" }} />
      <path fill="none" stroke="#8ED462" strokeLinecap="round" strokeWidth="500" d="M679.3 2510c552.3-90 1689.3 743.4 475.6 1689-985 767.5-234 1313-234 1702.5" id="secondary-path" style={{ zIndex: "3", strokeDashoffset: "0.001", strokeDasharray: "0px, 999999px" }} />
    </svg>
  );
}

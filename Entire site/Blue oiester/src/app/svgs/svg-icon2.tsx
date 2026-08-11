export default function Icon2({ cid }: { cid?: string }) {
  return (
    <svg className="w-auto h-4 block overflow-hidden [pointer-events:all] max-lg:h-3.5 2xl:h-6 focus:outline-clr-1 focus:[outline-style:auto] focus:outline-[5px]" data-component="icon" fill="none" height="100%" viewBox="0 0 22 22" width="100%" xmlns="http://www.w3.org/2000/svg" data-cid={cid}>
      <path d="M1.4 1.4L20.6 20.6" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20.6 1.4L1.4 20.6" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

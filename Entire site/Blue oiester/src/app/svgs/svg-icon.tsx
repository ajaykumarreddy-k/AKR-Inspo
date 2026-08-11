export default function Icon({ cid }: { cid?: string }) {
  return (
    <svg className="w-auto h-11 inline overflow-hidden [pointer-events:all] max-lg:h-[2.3125rem] 2xl:h-16.5" data-component="icon" fill="none" viewBox="0 0 63 63" xmlns="http://www.w3.org/2000/svg" data-cid={cid}>
      <path d="M63 31.5C63 48.897 48.897 63 31.5 63C14.103 63 0 48.897 0 31.5C0 14.103 14.103 0 31.5 0C48.897 0 63 14.103 63 31.5Z" fill="#191919" />
      <path d="M30.2241 44V24.8466L22.8261 32.233L21 30.4388L31.5117 20L42 30.4388L40.2207 32.233L32.7993 24.8466V44H30.2241Z" fill="white" />
    </svg>
  );
}

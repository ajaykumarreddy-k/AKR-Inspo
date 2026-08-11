export default function Icon({ cid }: { cid?: string }) {
  return (
    <svg className="w-auto flex justify-center items-center overflow-hidden max-lg:h-3.5" fill="none" viewBox="0 0 15 14" width="100%" xmlns="http://www.w3.org/2000/svg" data-cid={cid}>
      <path d="M10.8333 11.6667V13.3333H1.66667V11.6667H10.8333ZM15 5.83333V7.5H0V5.83333H15ZM13.3333 0V1.66667H4.16667V0H13.3333Z" fill="#737373" />
    </svg>
  );
}

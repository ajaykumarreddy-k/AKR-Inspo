import { FlaskConical } from 'lucide-react';

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

const WindowsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 448 512" fill="currentColor">
    <path d="M0 93.7l210.5-29.5v169.4H0V93.7zm0 324.6l210.5 29.5V268.4H0v149.9zm237.5 33.3L448 488V268.4H237.5v183.2zM448 24.5l-210.5 29.5v169.4H448V24.5z"/>
  </svg>
);

export default function Platforms() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 border-t border-white/20" id="download">
      {/* Mac OS */}
      <div className="relative group border-b md:border-b-0 md:border-r border-white/20 overflow-hidden aspect-square flex flex-col justify-center items-center text-center p-8">
        <img alt="Mac OS Background" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida/AP1WRLsq0LKZE1RSxWdAVlzrsu1sH3bdVE_91yxQW3CiQqTzJWUbklZF-2CEUvLotiWlGmhKVuMIxRr9X-DCQU6qEUdwYu4543chUnFRDzbeunR3BXpMoen68MR7gShteIyrVx39jqERjalSTSJEJs8dnsJINN3kGuOTbA5SnI54BbM8pJiy9hNuH5SfuYtXxH5eaj5dJB44VNS8n5ZlRC3MPiq5fJSx-KtiEpaywjJdMqloMT038nVjtlPGoI0" />
        <div className="relative z-10 space-y-4 flex flex-col items-center">
          <p className="text-[10px] font-mono uppercase opacity-60 tracking-[0.2em]">MacOS 12+</p>
          <h2 className="font-serif text-5xl">Mac OS</h2>
          <button className="inline-flex items-center gap-2 bg-white text-brand-blue px-6 py-3 text-[10px] font-mono font-bold uppercase hover:bg-opacity-90 transition-all cursor-pointer mt-2">
            <AppleIcon className="h-4 w-4" />
            DOWNLOAD
          </button>
        </div>
      </div>
      {/* Windows */}
      <div className="relative group border-b md:border-b-0 md:border-r border-white/20 overflow-hidden aspect-square flex flex-col justify-center items-center text-center p-8">
        <img alt="Windows Background" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida/AP1WRLvrf28-Ti0TfolK_MsT9WbXKZKIWQusxYcxJxpJVF3R2_RxbKasXmQdufgX2ylld7P__PVAlLdH9sVn6AhV70EmSJbXBWoSUcGBwG7qlDmVMOIiRKtlxZUrCYbXpbERFOQ44Pj0JbSHaH-682glquPrP30MF19m1ZFMv8tHb6eKBBgU_lIN8JIOQkkpAi85cZemkPyUhtVfXPWLSHn3nk6dJUJ78ywnsiabbt4TM2vzqkKHPIIHa4cmow" />
        <div className="relative z-10 space-y-4 flex flex-col items-center">
          <p className="text-[10px] font-mono uppercase opacity-60 tracking-[0.2em]">Windows 10/11</p>
          <h2 className="font-serif text-5xl">Windows</h2>
          <button className="inline-flex items-center gap-2 bg-white text-brand-blue px-6 py-3 text-[10px] font-mono font-bold uppercase hover:bg-opacity-90 transition-all cursor-pointer mt-2">
            <WindowsIcon className="h-4 w-4" />
            DOWNLOAD
          </button>
        </div>
      </div>
      {/* Linux */}
      <div className="relative group overflow-hidden aspect-square flex flex-col justify-center items-center text-center p-8">
        <img alt="Linux Background" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida/AP1WRLsvonBt_1jd2D1OeeFF1AOh4T5mMQEaKjdgf9YNiCAgrrwTKN7J3ryaRdTWwhYz6dLFGzFVbiG0FKUyeI-n2NfaWwJBmQ9BBWU4e7a9r5V9fGcMxVN-eky3PAXCZy77dk7pyIlEKeTX_HZSTrHLL7kIgKchOKsg7Ky7L4y-_swDjMmiRug3QbTOk24OWnQQ-gdK-qmPTcg_WwdPsxrGHGLnv4131QoYIVqAuhtlie3Sto3pU6-TP34U5Q" />
        <div className="relative z-10 space-y-4 flex flex-col items-center">
          <p className="text-[10px] font-mono uppercase opacity-60 tracking-[0.2em]">Any Distro</p>
          <h2 className="font-serif text-5xl">Linux</h2>
          <button className="inline-flex items-center gap-2 bg-white text-brand-blue px-6 py-3 text-[10px] font-mono font-bold uppercase hover:bg-opacity-90 transition-all cursor-pointer mt-2">
            <FlaskConical className="h-4 w-4" />
            INSTALL VIA TERMINAL
          </button>
        </div>
      </div>
    </section>
  );
}

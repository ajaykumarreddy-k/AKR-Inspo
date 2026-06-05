import { useState } from "react";
import { ComponentModal } from "./ComponentModal";

const cards = [
  {
    title: "Navigation Bars",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY4aC4cujyhdqs4drjZpEx4p5tu8tAgEBIuDTft0yYw8VbaxtPsZ_9OS2i26ZDoJC1Wu0Eh-8E6R3zmtRdSlBofakF9UJk0szi9bmBHCPn-Ox14Ux6tNDlVAc6bEzG6WJSFqBGlQs77WqETgK-GwIFFtt0HcrQn_jrknoHVh1Ssa786Kty6lQXycZPPVzAWoHeM0melUVzLEr2bC9ZoG0dpx-D_7nod1m_6wNXVbHwnPzEGboXnINfb2GkIsr14jBZ8s4oL2jUUXYC"
  },
  {
    title: "Action Buttons",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC2gJNoF9U2oKq1ns7GWg6aSUaPVtys9e7DJWt4md5AbOW6-UOPtaJcp0v-TXiMP4Mnpi4ec5Z46ycA0pMfR5Fx1YzUzhxwVFS22UAApIcw_kE0m-kuCzDmfG9vE_ndPv8w71LPpZNYbIewBg3vObL9Gmdw7w5ofM1j0wSHBTDep-Ro0SVPonqHq4a07VdJLUHLnzzUAOfaDgvFRjBMOt9qFhdKN6PmaQyu8JmceyQHfVkyLx0bx46Ea8UQO8TZTVESIpn3XTcqJlL"
  },
  {
    title: "Data Tables",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD_hk4hyy_3R25KOy2vRLYqG6-BfyPZeoJHu5KrFEzdMSm1JMyrC91VKX8tPXlRzZe5e1nhaKPpAipiQnXTKYy1YD3tPHCRNaIESNl81Gi9UEV4iJKMOtcmWpVd6r2rbjr1JioSdDH5t3ipowYjySNM_zHWsI9aT8xVGdLGuEGCwgajHvxph8I3hCb66_ArY3aWhr3Wp17VgpXjvJNHbTNQWo5pQNg1bFcAUGeUM3J11Taor4zlfS3Pdv_JGzskpahhDfTaAu6l9Ps"
  },
  {
    title: "Form Controls",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUUacUpE9CNuuZqDeD9ynkiqXXc-ndokrQuUsbZki-1UlCaCrngK3hgdWDjrFaV5gZ_sIvjcVfGO2pE-nImg6n86bPCgTqIUcCyYHmbjzsyAUHN2wVcu97yLPTcbxeygCXPYEXyTiAocfmIoQW9zUtjtW7DHJ2YNyOu56gQroCAlfDwBEmcQrs2Z6epYZGpPCbcEMGVVlYqXOoP5GNRLQOnP-dnUhkllZtQ3qpOPhCS14vTItLDlJt3R5K3d020w19N1x4AN6kp2Ip"
  },
  {
    title: "Modal Dialogs",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqOGFJ_LMxpX4B3zSjfSXNfzvftcqwjQfbQT8KSPyfyu_Od8V7lisouTilKBSMKpQ_1ZPOf-yoHdq2RVprlazYxJfsLcPyAzFjvVY4g5xqJzh0x_4xgz88Qgr80Ms6Odht9uAQ2nV2fru69lQabKxoD8C_B6l3VCcxkCBeO4bGIQy4LAu9e3Sbr-u2O2J5XwsInFAtA2AAZiPnsOOruYkNysD1A1A6Tmm791xWivQJLeIXNoJ8aHQyi3lxpfK51F9stKLTV4oeUvON"
  },
  {
    title: "Hero Banners",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkzWQDM0CKuz_1BqJK4wpmSIThRkUoeHZKccKEpYvDk0bVmwMbHv6CPcIPUtdvu7h9aIAW7IJfPVTzvCUcCbjiS86MBBz9GBoLxMN97LwyENa4mDhlbuiOTAbGO1EDoN3AWydzO7AmPBSG9oU80UzM1dNC2Dl_Wze4C5ccqmN38dfaLOOz7otRb0pOiHtdYs5hgKHV66WOQolaqe6TBBztVAPryGlPQpEnynacbOgMGgogtFv3cesq3_hCZP2TuNX4YLEyxj7LDhBE"
  },
  {
    title: "Cards & Containers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCE79WeJIGf7qFSeWN_Yucd0ciS6b8FbomMH2VNU5pECF3CZsyrP1uqgvfnw0d2ef2-OAitD7nJ8SPbXWhrbr4js1lOccvldWAmDUBxf21HnQTpJvrHddUuHsznvqa9ZMM1_T8aEifjTETT_1BULUwbl7tRMkI227RYxSJTlWASwZJg9QezUhunUisSrkcUnoldkEIG0hoBjk4tDlWQ2hEvMH2TfpxRS7gxduNFW1gppsSer7_rpDjQZa0rCjlBWZ7yS4724dLraNB"
  },
  {
    title: "Status Indicators",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFApGl4kxKwm4Eeh6YvlvQEP1kzOPvzsrLVWpFNiWBZDro6dlOjBZpjZ7bHSA5xCh_GPLgJD1FGy8knT5kVwKyzcbXJroZ7wgSt-KvE_FZo5RX_zOWPtFzbBywt1XZExKJUY3wklMJI_WzDMhqW3eGswYg6svtM6gnNa_o-ZBnHvg5-QTmwYAYWp6myLUf98BhMWNve02HEl5gfKtCR7gU9y5SBzRU60tuf01naZsMxaY3Qi1eP6gBIb4kPhWzhwoPYh0ShKxiyK7E"
  }
];

export function Gallery() {
  const [selectedCard, setSelectedCard] = useState<typeof cards[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 lg:gap-x-12 lg:gap-y-24">
        {cards.map((card, idx) => (
          <button 
            key={idx} 
            onClick={() => setSelectedCard(card)}
            className="group block text-left w-full cursor-pointer focus:outline-none focus-visible:ring-2 ring-neutral-500 ring-offset-4 dark:ring-offset-black rounded-[32px] transition-all"
          >
            <div className="border border-black/5 dark:border-white/5 rounded-[32px] overflow-hidden bg-white/40 dark:bg-[#111]/40 backdrop-blur-md mb-6 aspect-[16/11] relative transition-all duration-500 group-hover:border-black/20 dark:group-hover:border-white/20 group-hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] dark:group-hover:shadow-[0_20px_60px_rgb(255,255,255,0.05)] shadow-sm">
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.03]" 
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-[20px] md:text-[24px] font-bold tracking-tight text-[#1b1b1b] dark:text-gray-100 transition-colors pl-2">{card.title}</h3>
          </button>
        ))}
      </div>
      
      <ComponentModal 
        isOpen={!!selectedCard} 
        onClose={() => setSelectedCard(null)} 
        card={selectedCard}
      />
    </>
  );
}

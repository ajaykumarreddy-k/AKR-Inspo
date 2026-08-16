import "./globals.css";
import "./ditto.css";
import type { ReactNode } from "react";
import { SITE_ORIGIN } from "../lib/site";

export const metadata = {
  "metadataBase": new URL(SITE_ORIGIN || "http://localhost:3000"),
  "title": "Real human insights",
  "description": "Global qualitative market research agency specialising in consumer insights & qualitative market research methods.",
  "alternates": {
    "canonical": "/"
  },
  "openGraph": {
    "title": "Real human insights",
    "description": "Global qualitative market research agency specialising in consumer insights & qualitative market research methods.",
    "type": "website",
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Real human insights",
    "description": "Global qualitative market research agency specialising in consumer insights & qualitative market research methods.",
  },
  "icons": {
    "icon": [
      {
        "url": "/assets/cloned/svg/86611a1155b6.svg",
        "type": "image/svg",
        "sizes": "16x16"
      },
      {
        "url": "/assets/cloned/svg/96dfa71fa004.svg",
        "type": "image/svg",
        "sizes": "32x32"
      },
      {
        "url": "/assets/cloned/svg/7cb1dd0b9e3a.svg",
        "type": "image/svg",
        "sizes": "96x96"
      },
      {
        "url": "/assets/cloned/svg/a30edca3e194.svg",
        "type": "image/svg",
        "sizes": "192x192"
      }
    ]
  }
};
export const viewport = {
  "width": "device-width",
  "initialScale": 1
};


import MotionProvider from "./components/motion-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={"en"}>
      <head>
        <script
          key="json-ld-0"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Market Research Insights",
            "url": SITE_ORIGIN || "http://localhost:3000",
            "description": "Delivering qualitative market research through local experts worldwide."
          }) }}
        />
      </head>
      <body className="block text-foreground [font-family:Inter,_sans-serif] text-[1.0625rem] font-medium not-italic leading-[1.625rem] tracking-[normal] [word-spacing:0px] text-start normal-case whitespace-normal [word-break:normal] [overflow-wrap:normal] indent-0 [text-shadow:none] [font-variant-caps:normal] [font-feature-settings:normal] list-outside [writing-mode:horizontal-tb] [direction:ltr] bg-background max-md:text-base max-md:leading-6 md:max-lg:leading-[1.5625rem]" data-cid="n0">
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import "./ditto.css";
import type { ReactNode } from "react";
import { SITE_ORIGIN } from "../lib/site";

export const metadata = {
  "metadataBase": new URL(SITE_ORIGIN || "http://localhost:3000"),
  "title": "Blue Oyster Art Project Space",
  "description": "A not for profit gallery and art space located at 16 Dowling Street, Dunedin. All exhibitions and events are free to attend.",
  "alternates": {
    "canonical": "/",
    "languages": {
      "x-default": "https://blueoyster.org.nz/"
    }
  },
  "openGraph": {
    "title": "Blue Oyster Art Project Space",
    "description": "A not for profit gallery and art space located at 16 Dowling Street, Dunedin. All exhibitions and events are free to attend.",
    "type": "website",
    "url": "/",
    "images": [
      "https://blueoyster.org.nz/media/thumbs/hIFaTiKh58wObny6UUX1n3Mw4uGsPtYWssX2dVCNX9M/resize:fill:1200:630:1/gravity:ce/bG9jYWw6Ly8vYmx1/ZW95c3Rlci9tZWRp/YS91cGxvYWRzL2Fk/aG9jL3NpdGVtZXRh/ZGF0YS9CbHVlLU95/c3Rlci1Mb2dvX01B/QkYuanBn"
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Blue Oyster Art Project Space",
    "description": "A not for profit gallery and art space located at 16 Dowling Street, Dunedin. All exhibitions and events are free to attend.",
    "images": [
      "https://blueoyster.org.nz/media/thumbs/hIFaTiKh58wObny6UUX1n3Mw4uGsPtYWssX2dVCNX9M/resize:fill:1200:630:1/gravity:ce/bG9jYWw6Ly8vYmx1/ZW95c3Rlci9tZWRp/YS91cGxvYWRzL2Fk/aG9jL3NpdGVtZXRh/ZGF0YS9CbHVlLU95/c3Rlci1Mb2dvX01B/QkYuanBn"
    ]
  },
  "icons": {
    "apple": [
      {
        "url": "/assets/cloned/images/b9d8f996ac48.png",
        "sizes": "180x180"
      }
    ],
    "icon": [
      {
        "url": "/assets/cloned/images/08a35fc6c652.png",
        "type": "image/png",
        "sizes": "32x32"
      },
      {
        "url": "/assets/cloned/images/f8aebabad3ff.png",
        "type": "image/png",
        "sizes": "16x16"
      }
    ],
    "other": [
      {
        "url": "/assets/cloned/svg/db73ca779a8a.svg",
        "rel": "mask-icon",
        "color": "#000000"
      }
    ]
  },
  "manifest": "/assets/cloned/manifest/7cef7aa0e5bf.webmanifest"
};
export const viewport = {
  "width": "device-width",
  "initialScale": 1,
  "themeColor": "#002FA7"
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={"en"}>
      <body className="min-h-full block relative text-foreground [font-family:residenz,_helvetica,_sans-serif] text-[0.9375rem] font-bold not-italic leading-[1.375rem] tracking-[0.28px] [word-spacing:0px] text-start normal-case whitespace-normal [word-break:normal] [overflow-wrap:normal] indent-0 [text-shadow:none] [font-variant-caps:normal] [font-feature-settings:'kern'_0,_'ss17'] list-outside [writing-mode:horizontal-tb] [direction:ltr] bg-background max-lg:text-[0.8125rem] max-lg:leading-[1.1875rem] 2xl:text-[1.4375rem] 2xl:leading-[2.0625rem]" data-cid="n0">
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import "./ditto.css";
import type { ReactNode } from "react";
import { SITE_ORIGIN } from "../lib/site";

export const metadata = {
  "metadataBase": new URL(SITE_ORIGIN || "http://localhost:3000"),
  "title": "Mindoo - The help healthcare teams were missing.",
  "description": "Mindoo takes on the routine tasks, so your team can focus on what only humans can do. Intake done. Calls answered. Follow-ups handled. You get more capacity with the same team.",
  "openGraph": {
    "title": "Mindoo - The help healthcare teams were missing.",
    "description": "Mindoo takes on the routine tasks, so your team can focus on what only humans can do. Intake done. Calls answered. Follow-ups handled. You get more capacity with the same team.",
    "type": "website",
    "images": [
      "https://cdn.prod.website-files.com/693a7ff7f8662142a99517e0/6940379be918db9a0c4e3841_opengraph.png"
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Mindoo - The help healthcare teams were missing.",
    "description": "Mindoo takes on the routine tasks, so your team can focus on what only humans can do. Intake done. Calls answered. Follow-ups handled. You get more capacity with the same team."
  },
  "icons": {
    "shortcut": [
      {
        "url": "/assets/cloned/images/7aa8f983c2c4.png",
        "type": "image/x-icon"
      }
    ],
    "apple": [
      {
        "url": "/assets/cloned/images/efb970788b5c.png"
      }
    ]
  }
};
export const viewport = {
  "width": "device-width",
  "initialScale": 1
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={"en"}>
      <body className="min-h-full block text-foreground [font-family:Intertight,_Arial,_sans-serif] text-base font-medium not-italic leading-6 tracking-[normal] [word-spacing:0px] text-start normal-case whitespace-normal [word-break:normal] [overflow-wrap:normal] indent-0 [text-shadow:none] [font-variant-caps:normal] [font-feature-settings:normal] list-outside [writing-mode:horizontal-tb] [direction:ltr] bg-background" data-cid="n0">
        {children}
      </body>
    </html>
  );
}

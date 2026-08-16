// Semantic page content extracted from recognized recipe sections.

export type MediaCardDataItem = {
  title: string;
  description: string;
  href: string;
  label: string;
};
export const mediaCardData: MediaCardDataItem[] = [
    { title: "No more chaos.", description: "Managing multiple vendors, juggling time zones, translating insights across cultures — it adds up fast. At MindMarket, we bring it all under one roof. No misalignment, no friction, just seamless collaboration from start to finish.", href: "/services", label: "Services" },
    { title: "One brief. One team.", description: "You brief us once and we take it from there. From methodology design and recruitment to local moderation and reporting, everything is managed by a single point of contact who leads your study from start to finish. You get clear updates, fast turnarounds, and high-quality insights—without compromise.", href: "/methodology", label: "Methodology" },
    { title: "Speak their language.", description: "From gaming to fintech, hospitality to consumer goods, each industry speaks its own language. Our in-market experts don’t just understand people, they understand the context. We bring cultural insight shaped by the sector you’re in, so your message hits home in every market.", href: "/sectors", label: "Industry Sectors" },
    { title: "Global, for real.", description: "Whether you’re researching one market or launching in ten, we scale with you. One partner. Global reach. Consistent quality. Our global network spans regions and industries, giving you on-demand access to the right participants in the right places, without starting from scratch.", href: "/network", label: "Our Network" }
];

export type CardsItem = {
  variant: string;
  eyebrow: string;
  title: string;
  label: string;
};
export const cards: CardsItem[] = [
    { variant: "how-a-global-asset-manager-tested-its-rebr", eyebrow: "Case Studies", title: "How a Global Asset Manager Tested Its Rebrand with CIOs, Consultants and Fund Selectors Across Seven Markets", label: "Read more about How a Global Asset Manager Tested Its Rebrand with CIOs, Consultants and Fund Selectors Across Seven Markets" },
    { variant: "brewing-the-perfect-blend-a-500-person-cof", eyebrow: "Case Studies", title: "Brewing the Perfect Blend: A 500-Person Coffee Taste Test Across London and New York", label: "Read more about Brewing the Perfect Blend: A 500-Person Coffee Taste Test Across London and New York" },
    { variant: "how-to-run-research-in-live-venues-four-me", eyebrow: "Educational", title: "How to Run Research in Live Venues: Four Methods That Capture What Surveys Miss", label: "Read more about How to Run Research in Live Venues: Four Methods That Capture What Surveys Miss" },
    { variant: "how-to-choose-the-right-qualitative-resear", eyebrow: "Methodology", title: "How to Choose the Right Qualitative Research Methodology", label: "Read more about How to Choose the Right Qualitative Research Methodology" }
];

export type Tile3DataItem = {
  description: string;
};
export const tile3Data: Tile3DataItem[] = [
    { description: "Paypal" },
    { description: "Walmart" },
    { description: "Moët & Chandon" },
    { description: "Coinbase" },
    { description: "Airbnb" },
    { description: "Apple" }
];

export type ListRowDataItem = {
  href: string;
  label: string;
};
export const listRowData: ListRowDataItem[] = [
    { href: "/services", label: "Services" },
    { href: "/methodology", label: "Methodology" },
    { href: "/sectors", label: "Industry Sectors" },
    { href: "/network", label: "Network" },
    { href: "/about-us", label: "About Us" }
];

export type ListRowData2Item = {
  href: string;
  label: string;
};
export const listRowData2: ListRowData2Item[] = [
    { href: "/articles", label: "Insights" },
    { href: "/contact-us", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" }
];


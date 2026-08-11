// Semantic page content extracted from recognized recipe sections.

export type ListRowDataItem = {
  href: string;
  label: string;
};
export const listRowData: ListRowDataItem[] = [
    { href: "/#problem", label: "Problem" },
    { href: "/#solution", label: "Solution" },
    { href: "/#agents", label: "Agents" },
    { href: "/#safety", label: "Safety" }
];

export type FeaturesItem = {
  alt: string;
  imgSrc: string;
  srcSet: string;
  title: string;
  description: string;
  id?: string;
};
export const features: FeaturesItem[] = [
    { alt: "Mindoo character at his desk", imgSrc: "/assets/cloned/images/364f9945d1be.png", srcSet: "/assets/cloned/images/1e9bdfe6f3ae.png 500w, /assets/cloned/images/364f9945d1be.png 779w", title: "Transparent by design.", description: "No black boxes. No hidden processing. No surprises for your governance teams." },
    { alt: "Mindoo character in hospital hallway", imgSrc: "/assets/cloned/images/91c864891bf1.png", srcSet: "/assets/cloned/images/37f58126d276.png 500w, /assets/cloned/images/91c864891bf1.png 779w", title: "Proven in real hospitals.", description: "We test every agent in real clinical workflows to make sure Mindoo behaves safely and reliably. Predictable, stable, reviewable." },
    { id: "w-node-_2cbf65de-4f9d-56c6-6261-c80763bfd9f6-a99517c6", alt: "Mindoo character sitting on a chair with a safety lock in his hands", imgSrc: "/assets/cloned/images/ad6a7c052946.png", srcSet: "/assets/cloned/images/dd72b86e4f8e.png 500w, /assets/cloned/images/ad6a7c052946.png 779w", title: "Built for strict healthcare governance.", description: "Full audit trails, clear consent handling, and region-specific data protections." }
];

export type TextLink2DataItem = {
  href: string;
  label: string;
};
export const textLink2Data: TextLink2DataItem[] = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service for patients" },
    { href: "/terms-of-service-for-healthcare-staff", label: "Terms of Service for healthcare staff" }
];


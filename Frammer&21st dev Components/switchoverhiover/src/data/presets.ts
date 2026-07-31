import { TabItem } from "../types";

export interface Preset {
  id: string;
  name: string;
  category: string;
  items: TabItem[];
}

export const PRESETS: Preset[] = [
  {
    id: "spatial-planning",
    name: "Architectural & Interior Design",
    category: "Spatial",
    items: [
      {
        id: "spatial-planning",
        title: "Spatial Planning",
        description:
          "We refine the flow and functionality of your existing floor plan to maximize utility and daily comfort.",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "material-curation",
        title: "Material Curation",
        description:
          "Selecting timeless, high-performance tactile materials and finishes tuned to your architectural space.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "lighting-design",
        title: "Lighting Design",
        description:
          "Atmospheric and task lighting schemes engineered to enhance moods, textures, and architectural dimensions.",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "bespoke-styling",
        title: "Bespoke Styling",
        description:
          "Custom curated furniture, artisan decor, and signature statement pieces to complete your living environment.",
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },
  {
    id: "brand-identity",
    name: "Digital Brand Experience",
    category: "Branding",
    items: [
      {
        id: "brand-strategy",
        title: "Brand Strategy",
        description:
          "Articulating unique market positioning and core value propositions to build lasting consumer loyalty.",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "visual-identity",
        title: "Visual Identity",
        description:
          "Designing bespoke logos, typography systems, and color palettes that stand out across digital touchpoints.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "motion-design",
        title: "Motion & UI Design",
        description:
          "Creating fluid micro-interactions and dynamic motion languages for modern web and mobile applications.",
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "digital-marketing",
        title: "Digital Ecosystems",
        description:
          "Scaling multi-channel digital campaigns driven by data telemetry and high-converting asset designs.",
        image:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },
];

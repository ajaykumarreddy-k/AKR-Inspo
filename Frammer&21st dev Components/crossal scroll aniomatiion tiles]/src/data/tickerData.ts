export interface TickerCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  aspectRatio?: string;
  author?: string;
}

export const DEMO_CARDS: TickerCardItem[] = [
  {
    id: "card-1",
    title: "Title",
    description: "One line to describe the vibe.",
    image: "https://framerusercontent.com/images/t1Gyu5l2W5oPDaqwJlI0jIHTta8.jpg?width=736&height=1592",
    category: "Streetwear & Fashion",
    author: "@tokyo_street",
  },
  {
    id: "card-2",
    title: "Title",
    description: "One line to describe the vibe.",
    image: "https://framerusercontent.com/images/RAf7O796YLzGcIclU4V2DyXBI0.jpg?width=736&height=1104",
    category: "Botanical Art",
    author: "@botanica",
  },
  {
    id: "card-3",
    title: "Title",
    description: "One line to describe the vibe.",
    image: "https://framerusercontent.com/images/Sk7vRqj8niRxHD6Gq8hEsCzcr0.jpg?width=736&height=1313",
    category: "Landscape & Mood",
    author: "@fuji_twilight",
  },
  {
    id: "card-4",
    title: "Title",
    description: "One line to describe the vibe.",
    image: "https://framerusercontent.com/images/mtErwFSaJ5pV5C3eaEXkICVcGw.jpg?width=736&height=921",
    category: "Feline Moments",
    author: "@window_cat",
  },
  {
    id: "card-5",
    title: "Title",
    description: "One line to describe the vibe.",
    image: "https://framerusercontent.com/images/F5TtPbU34HyOrw9EYAYQ23I5g.jpg?width=736&height=1631",
    category: "Nature & Light",
    author: "@spring_canopy",
  },
  {
    id: "card-6",
    title: "Title",
    description: "One line to describe the vibe.",
    image: "https://framerusercontent.com/images/BmNICZbRkuxKRn4pr1HkaESBA.jpg?width=389&height=500",
    category: "Museum Artifacts",
    author: "@sculpture_gallery",
  },
];

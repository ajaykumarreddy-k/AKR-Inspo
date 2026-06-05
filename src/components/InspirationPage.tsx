import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";

interface InspirationPageProps {
  onNavigate: (path: string) => void;
}

interface InspirationImage {
  id: number;
  title: string;
  category: string;
  url: string;
  aspect: string; // tall, wide, square
  photographer: string;
  photoUrl: string;
}

const imageModules = import.meta.glob("../../assets/images/*.{png,jpg,jpeg,PNG,JPEG,JPG,webp,WEBP}", { eager: true });

const inspirationImages: InspirationImage[] = Object.keys(imageModules).map((filePath, index) => {
  const id = index + 1;
  const url = (imageModules[filePath] as any).default;
  const filename = filePath.split("/").pop() || "";
  
  // Dynamic categories
  const categories = ["Architecture", "Minimalism", "UI/UX", "Art"];
  const category = categories[id % categories.length];
  
  // Masonry layout aspect ratio distribution
  const aspectRatios = ["aspect-[3/4]", "aspect-[1/1]", "aspect-[4/3]", "aspect-[3/5]"];
  const aspect = aspectRatios[id % aspectRatios.length];
  
  // Format title (e.g. from filename: img_00001 -> "Image 1")
  const titlePart = filename.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
  const title = titlePart.charAt(0).toUpperCase() + titlePart.slice(1);

  return {
    id,
    title,
    category,
    url,
    aspect,
    photographer: "AKR Inspo Vault",
    photoUrl: "#"
  };
});

export function InspirationPage({ onNavigate }: InspirationPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});

  const categories = ["All", "Architecture", "Minimalism", "UI/UX", "Art"];

  const filteredImages = selectedCategory === "All" 
    ? inspirationImages 
    : inspirationImages.filter(img => img.category === selectedCategory);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleImageClick = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 py-12 md:py-20 z-10 flex-grow flex flex-col justify-start animate-fade-in">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <button 
          onClick={() => onNavigate("/")}
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer w-fit"
        >
          <span className="p-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-all">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </span>
          Back to Showcase
        </button>

        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-center">
          Inspiration Board
        </h1>
        <div className="hidden md:block w-36"></div> {/* Spacer for symmetry */}
      </div>

      {/* Category Pills Filters */}
      <div className="flex flex-wrap gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-tight border cursor-pointer transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#FF4200] border-[#FF4200] text-black shadow-sm"
                : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 text-neutral-700 dark:text-neutral-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* CSS columns masonry layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 [column-fill:_balance] w-full">
        {filteredImages.map((image) => (
          <div 
            key={image.id} 
            onClick={() => handleImageClick(image.url)}
            className="break-inside-avoid mb-6 group relative overflow-hidden rounded-[24px] border border-black/5 dark:border-white/5 bg-neutral-100 dark:bg-neutral-950/20 backdrop-blur-md cursor-pointer transition-all duration-500 hover:shadow-md hover:scale-[1.01]"
          >
            <div className={`w-full ${image.aspect} relative overflow-hidden`}>
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                loading="lazy"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
              <div className="flex justify-end">
                <button 
                  onClick={(e) => toggleLike(image.id, e)}
                  className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white transition-all scale-95 hover:scale-105 active:scale-95"
                >
                  <Heart className={`w-4 h-4 ${likedItems[image.id] ? "fill-[#FF4200] stroke-[#FF4200]" : "stroke-white"}`} />
                </button>
              </div>
              
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/20 text-[10px] font-bold uppercase tracking-wider mb-2">
                  {image.category}
                </span>
                <h3 className="font-bold text-base leading-tight mb-1">{image.title}</h3>
                <p className="text-xs text-neutral-300 font-medium">by {image.photographer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

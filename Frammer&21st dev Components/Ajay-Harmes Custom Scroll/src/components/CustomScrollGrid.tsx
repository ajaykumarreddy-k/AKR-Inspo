import { motion } from 'framer-motion';

const GridItem = ({ index }: { index: number }) => {
  return (
    <div className="bg-[#e2e2e2] w-full h-[300px] sm:h-[400px] overflow-hidden rounded-none">
      <img 
        src={`https://picsum.photos/seed/${(index + 1) * 42}/800/800`} 
        alt={`Showcase item ${index}`}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};

export default function CustomScrollGrid() {
  return (
    <div className="bg-transparent text-white">
      <div className="w-full px-2 sm:px-4 py-10 sm:py-20 relative">
        
        {/* Component Title (Above the Tile) */}
        <div className="mb-8 px-4" style={{ fontFamily: "'Google Sans', 'DM Sans', sans-serif" }}>
          <h2 className="text-4xl font-bold tracking-tight text-white">Ajay-Harmes</h2>
          <p className="text-sm font-medium text-white/60 mt-2 uppercase tracking-widest">Custom Gallery Component</p>
        </div>

        {/* The Tile Container (Blue Background) with sharp corners */}
        <div className="bg-[#0B1A38] border border-white/10 rounded-none p-4 sm:p-8 md:p-12 shadow-2xl w-full">
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            
            {/* Sticky left element (Logo in smooth rectangle) */}
            <div className="w-24 shrink-0 sticky top-12 flex justify-center md:block">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center shadow-lg"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" className="w-12 h-12" />
              </motion.div>
            </div>

            {/* Right side Grid matching the boxes with sharp corners */}
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
                <GridItem key={item} index={i} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

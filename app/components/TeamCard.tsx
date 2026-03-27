import Link from "next/link";

export default function TeamCard({ image, label }: { image: string; label: string }) {
  return (
    <div className="group relative w-125 h-64 rounded-xl overflow-hidden cursor-pointer
                    transition-all duration-300 ease-in-out
                    hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50">
      
      {/* Image */}
      <img src={image} alt={label} className="w-full h-full object-cover" />

      {/* Glass overlay on hover */}
      <div className="absolute inset-0
                      bg-white/0 backdrop-blur-0
                      group-hover:bg-white/10 group-hover:backdrop-blur-sm
                      transition-all duration-300" />

      {/* Label */}
      <Link 
          href={`/${label.toLowerCase()}`}>
      <div className="absolute inset-0 items-center p-4 
                      bg-gradient-to-t from-black/70 to-transparent flex justify-center ">
        
        <p className="text-white text-4xl font-bold ">{label}</p>
        
        
      </div>
      </Link>
    </div>
  );
}
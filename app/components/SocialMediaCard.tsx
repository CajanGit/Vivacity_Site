// import { LucideIcon } from 'lucide-react';
import React from 'react';

interface SocialMediaCardProps {
  icon: React.ComponentType<{size?: number; style?: React.CSSProperties}>;
  name: string;
  handle: string;
  url: string;
  color: string;
}

export function SocialMediaCard({ icon: Icon, name, handle, url, color }: SocialMediaCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-zinc-800 hover:border-zinc-700"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`
        }}
      />
      
      <div className="relative z-10 flex items-center gap-4">
        <div 
          className="flex h-14 w-14 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon 
            size={28}
            style={{ color: color }}
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{name}</h3>
          <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
            {handle}
          </p>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            className="h-5 w-5 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}

"use client";

import React from "react";
import { GreetingCategory, CATEGORIES_CONFIG } from "@/lib/data";
import { Search, Sparkles, Heart, Music, Wine, Compass, Users, LayoutGrid, Plus } from "lucide-react";

interface VideoFiltersProps {
  selectedCategory: GreetingCategory | "all";
  onSelectCategory: (cat: GreetingCategory | "all") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
}

function CategoryIcon({ icon, className = "w-3.5 h-3.5" }: { icon: string; className?: string }) {
  switch (icon) {
    case "heart":
      return <Heart className={className} />;
    case "music":
      return <Music className={className} />;
    case "wine":
      return <Wine className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "compass":
      return <Compass className={className} />;
    case "users":
      return <Users className={className} />;
    case "plus":
      return <Plus className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export default function VideoFilters({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults,
}: VideoFiltersProps) {
  return (
    <div className="space-y-4 mb-8">
      {/* Buscador de nombres */}
      <div className="relative max-w-md mx-auto sm:mx-0">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-gold/20 rounded-xl text-text placeholder-muted/60 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-text"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Chips de categorías */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectCategory("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedCategory === "all"
              ? "bg-gold text-bg shadow-md shadow-gold/20 font-semibold"
              : "bg-surface text-muted border border-white/10 hover:border-gold/40 hover:text-text"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Todos ({totalResults})</span>
        </button>

        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? "bg-gold text-bg shadow-md shadow-gold/20 font-semibold"
                  : "bg-surface text-muted border border-white/10 hover:border-gold/40 hover:text-text"
              }`}
            >
              <CategoryIcon icon={cat.icon} className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

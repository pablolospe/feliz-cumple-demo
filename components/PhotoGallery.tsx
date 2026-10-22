"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { PhotoItem } from "@/lib/data";
import { X, ChevronLeft, ChevronRight, Maximize2, Tag, Calendar, Filter, Sparkles, Shuffle, Search } from "lucide-react";
import { canAutoFocus } from "@/lib/device";

interface PhotoGalleryProps {
  photos: PhotoItem[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [photoList, setPhotoList] = useState<PhotoItem[]>(photos);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  // Sincronizar si cambia el prop photos
  useEffect(() => {
    setPhotoList(photos);
  }, [photos]);

  // Función para mezclar aleatoriamente el orden (Fisher-Yates)
  const handleShuffle = useCallback(() => {
    setIsShuffling(true);
    setPhotoList((prev) => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
    setTimeout(() => {
      setIsShuffling(false);
    }, 400);
  }, []);

  // Configuración y orden de visualización de categorías
  const categoryLabels: Record<string, string> = {
    todas: "Todas las fotos",
    amigos: "Amigos",
    familia: "Familia",
    trabajo: "Trabajo & Diseño",
    viajes: "Viajes",
  };

  // Extraer categorías presentes ordenadas prioritariamente
  const categories = useMemo(() => {
    const desiredOrder = ["todas", "amigos", "familia", "trabajo", "viajes"];
    const found = new Set<string>();
    photos.forEach((p) => {
      if (p.category) found.add(p.category);
    });
    const sorted = desiredOrder.filter((c) => c === "todas" || found.has(c));
    // Agregar cualquier otra categoría que pudiera existir
    found.forEach((c) => {
      if (!sorted.includes(c)) sorted.push(c);
    });
    return sorted;
  }, [photos]);

  // Extraer todos los tags con su frecuencia (insensible a mayúsculas/minúsculas)
  const allTagsWithCount = useMemo(() => {
    const map = new Map<string, { display: string; count: number }>();
    photos.forEach((p) => {
      // Si hay una categoría seleccionada (distinta de 'todas'), opcionalmente podemos ver tags de esa categoría o de todas
      if (selectedCategory !== "todas" && p.category !== selectedCategory) return;
      (p.tags || []).forEach((tag) => {
        const key = tag.trim().toLowerCase();
        if (!key) return;
        const current = map.get(key);
        if (current) {
          current.count += 1;
        } else {
          map.set(key, { display: tag.trim(), count: 1 });
        }
      });
    });
    return Array.from(map.entries())
      .map(([key, val]) => ({ key, display: val.display, count: val.count }))
      .sort((a, b) => b.count - a.count || a.display.localeCompare(b.display));
  }, [photos, selectedCategory]);

  // Tags populares más frecuentes para acceso rápido
  const popularTags = useMemo(() => {
    return allTagsWithCount.slice(0, 10);
  }, [allTagsWithCount]);

  // Estado para el selector/buscador de tags
  const [tagSearch, setTagSearch] = useState<string>("");
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState<boolean>(false);

  // Filtrado de tags en el buscador
  const searchedTags = useMemo(() => {
    if (!tagSearch.trim()) return allTagsWithCount;
    const query = tagSearch.toLowerCase().trim();
    return allTagsWithCount.filter((t) => t.key.includes(query));
  }, [allTagsWithCount, tagSearch]);

  // Filtrar fotos por categoría, tag activo y texto de búsqueda (título y tags)
  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return photoList.filter((p) => {
      const matchCat = selectedCategory === "todas" || p.category === selectedCategory;
      const matchTag =
        !selectedTag ||
        (p.tags &&
          p.tags.some((t) => t.trim().toLowerCase() === selectedTag.toLowerCase()));

      const matchSearch =
        !query ||
        (p.title && p.title.toLowerCase().includes(query)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(query))) ||
        (p.description && p.description.toLowerCase().includes(query));

      return matchCat && matchTag && matchSearch;
    });
  }, [photoList, selectedCategory, selectedTag, searchQuery]);

  // Controlar navegación con teclado en lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
        );
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredPhotos.length]);

  const currentPhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  return (
    <div>
      {/* Barra de Filtros: Búsqueda, Categorías y Tags */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Buscador de fotos por título o tags */}
        <div className="relative w-full max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título o tag (ej: amigos, asado, mate, viaje, familia)..."
            className="w-full pl-10 pr-10 py-2.5 bg-surface border border-gold/20 rounded-xl text-text placeholder-muted/60 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-text cursor-pointer p-1"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Fila 1: Selector de Categorías + Botón Mezcladito */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1 min-w-0">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gold text-bg shadow-md shadow-gold/20 font-semibold"
                      : "bg-surface text-muted border border-white/10 hover:border-gold/40 hover:text-text"
                  }`}
                >
                  {categoryLabels[cat] || cat}
                </button>
              );
            })}
          </div>

          {/* Botón MEZCLADITO! */}
          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            title="Mezclar aleatoriamente el orden de todas las fotos"
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md shrink-0 bg-linear-to-r from-gold via-gold-light to-gold text-bg hover:brightness-110 hover:scale-105 active:scale-95 shadow-gold/20 border border-gold-light/40 ${
              isShuffling ? "opacity-75 scale-95" : ""
            }`}
            aria-label="Mezclar fotos"
          >
            <Shuffle className={`w-3.5 h-3.5 text-bg transition-transform duration-500 ${isShuffling ? "rotate-180" : ""}`} />
            <span className="hidden sm:inline">MEZCLADITO!</span>
          </button>
        </div>

        {/* Fila 2: Tags rápidos + Botón de buscar/explorar todos los tags */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none flex-1 min-w-0">
            <span className="text-[11px] text-muted uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Tag className="w-3 h-3 text-gold/70" />
              Tags:
            </span>

            {/* Pill "Todos" los tags */}
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors shrink-0 cursor-pointer ${
                selectedTag === null
                  ? "bg-gold/20 text-gold-light border border-gold/40 font-medium"
                  : "bg-surface/60 text-muted hover:text-text border border-white/5"
              }`}
            >
              Todos
            </button>

            {/* Tags más populares */}
            {popularTags.slice(0, 8).map((t) => {
              const isSelected =
                selectedTag && selectedTag.toLowerCase() === t.key.toLowerCase();
              return (
                <button
                  key={t.key}
                  onClick={() => setSelectedTag(isSelected ? null : t.key)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? "bg-gold text-bg font-semibold shadow-sm shadow-gold/20"
                      : "bg-surface/80 text-muted hover:text-gold-light border border-white/10 hover:border-gold/30"
                  }`}
                >
                  <span>#{t.display}</span>
                  <span
                    className={`text-[10px] ${
                      isSelected ? "text-bg/70" : "text-muted/60"
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              );
            })}

            {/* Botón "+ Más tags..." */}
            <button
              onClick={() => {
                setTagSearch("");
                setIsTagDropdownOpen(true);
              }}
              className="px-2.5 py-1 rounded-lg text-xs bg-surface2 text-gold-light hover:bg-gold/20 border border-gold/30 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Ver todos ({allTagsWithCount.length})</span>
            </button>
          </div>

          {/* Badge de filtro activo si hay un tag seleccionado que no sea de los visibles o para limpiar */}
          {selectedTag && (
            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
              <button
                onClick={() => setSelectedTag(null)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-gold/15 text-gold-light border border-gold/40 hover:bg-gold/25 transition-colors cursor-pointer font-medium"
                title="Quitar filtro de tag"
              >
                <span>#{selectedTag}</span>
                <X className="w-3 h-3 text-gold-light" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal / Dialog elegante para buscar y seleccionar entre todos los tags */}
      {isTagDropdownOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsTagDropdownOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-surface border border-gold/30 rounded-2xl shadow-2xl p-5 flex flex-col max-h-[85vh] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-text font-serif text-lg">
                <Tag className="w-4 h-4 text-gold" />
                <span>Filtrar por etiqueta</span>
              </div>
              <button
                onClick={() => setIsTagDropdownOpen(false)}
                className="p-1 rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Cerrar buscador"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input de Búsqueda rápida */}
            <div className="relative my-3">
              <input
                type="text"
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                placeholder="Buscar etiqueta (ej: sofi, verano, fadu, risas...)"
                autoFocus={canAutoFocus()}
                className="w-full px-3.5 py-2 pl-9 rounded-xl bg-surface2 border border-white/10 text-text text-sm placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors"
              />
              <Filter className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {tagSearch && (
                <button
                  onClick={() => setTagSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Lista de Tags filtrada con scrollbar suave */}
            <div className="overflow-y-auto flex-1 pr-1 my-2 max-h-[50vh] flex flex-wrap gap-2 content-start">
              {searchedTags.length === 0 ? (
                <div className="w-full py-8 text-center text-sm text-muted">
                  No se encontraron etiquetas con &quot;{tagSearch}&quot;
                </div>
              ) : (
                searchedTags.map((t) => {
                  const isSelected =
                    selectedTag &&
                    selectedTag.toLowerCase() === t.key.toLowerCase();
                  return (
                    <button
                      key={t.key}
                      onClick={() => {
                        setSelectedTag(isSelected ? null : t.key);
                        setIsTagDropdownOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-gold text-bg font-semibold shadow-md shadow-gold/20"
                          : "bg-surface2 text-muted hover:text-text hover:bg-white/10 border border-white/5 hover:border-gold/30"
                      }`}
                    >
                      <span>#{t.display}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isSelected ? "bg-bg/20 text-bg" : "bg-black/30 text-muted"
                        }`}
                      >
                        {t.count}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer con acciones */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-muted">
              <span>{searchedTags.length} etiquetas disponibles</span>
              {selectedTag && (
                <button
                  onClick={() => {
                    setSelectedTag(null);
                    setIsTagDropdownOpen(false);
                  }}
                  className="text-gold-light hover:underline cursor-pointer"
                >
                  Limpiar filtro de tag
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid de Fotografías */}
      {filteredPhotos.length === 0 ? (
        <div className="py-16 text-center glass-panel rounded-2xl border border-white/5 my-4">
          <p className="text-muted text-base mb-2">No se encontraron fotos que coincidan con los filtros seleccionados.</p>
          {(searchQuery || selectedTag || selectedCategory !== "todas") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
                setSelectedCategory("todas");
              }}
              className="mt-2 text-xs text-gold-light hover:underline cursor-pointer"
            >
              Restablecer todos los filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setSelectedIndex(idx)}
              className="group relative rounded-2xl overflow-hidden glass-panel border-gold/20 hover:border-gold transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/10 flex flex-col"
            >
              {/* Contenedor de la Imagen */}
              <div className="w-full aspect-4/3 bg-surface relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                {/* Categoría Badge sobre imagen */}
                {photo.category && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-surface/80 text-gold-light border border-gold/30 backdrop-blur-md">
                    {categoryLabels[photo.category] || photo.category}
                  </span>
                )}

                {/* Botón ampliar */}
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Información de la foto */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-surface/40">
                <div>
                  <h4 className="font-serif text-lg text-text group-hover:text-gold-light transition-colors leading-snug mb-1">
                    {photo.title}
                  </h4>
                </div>

                {/* Tags interactivos */}
                {photo.tags && photo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    {[...new Set(photo.tags)].slice(0, 3).map((tag, i) => (
                      <span
                        key={`${tag}-${i}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-surface2 text-muted hover:text-gold-light hover:bg-gold/20 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                    {photo.tags.length > 3 && (
                      <span className="text-[10px] text-muted self-center">
                        +{photo.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Fullscreen */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Botón Cerrar */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Cerrar visor"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Flecha Izquierda */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
              );
            }}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Flecha Derecha */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
              );
            }}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Contenedor Imagen y Detalles */}
          <div
            className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPhoto.src}
              alt={currentPhoto.title}
              className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl border border-gold/30"
            />
            <div className="mt-4 text-center px-4 w-full max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-1">
                {currentPhoto.category && (
                  <span className="text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold/20 text-gold-light border border-gold/30 font-medium">
                    {categoryLabels[currentPhoto.category] || currentPhoto.category}
                  </span>
                )}
                {currentPhoto.date && (
                  <span className="text-[11px] text-muted flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{currentPhoto.date}</span>
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-text mt-1">
                {currentPhoto.title}
              </h3>
              {/* currentPhoto.description && (
                <p className="text-sm text-muted mt-1.5 leading-relaxed">
                  {currentPhoto.description}
                </p>
              ) */}

              {currentPhoto.tags && (
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                  {currentPhoto.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-surface text-gold border border-gold/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <span className="text-xs text-muted/80 block mt-3">
                {selectedIndex! + 1} de {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, isSectionUnlocked } from "@/lib/auth";
import VideoGallery from "@/components/VideoGallery";
import VideoFilters from "@/components/VideoFilters";
import { SAMPLE_GREETINGS, GreetingCategory } from "@/lib/data";
import { ArrowLeft, Film } from "lucide-react";
import { useDemoSettings } from "@/lib/demo-settings";
import NextSectionCta from "@/components/NextSectionCta";

export default function SaludosPage() {
  const router = useRouter();
  const { themeConfig } = useDemoSettings();
  const [authorized, setAuthorized] = useState(false);
  const [category, setCategory] = useState<GreetingCategory | "all">("all");
  const [search, setSearch] = useState("");
  const themedCopy = themeConfig.sectionCopy.saludos;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    } else if (!isSectionUnlocked("saludos")) {
      router.replace("/home");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const filteredGreetings = useMemo(() => {
    return SAMPLE_GREETINGS.filter((g) => {
      const matchCat = category === "all" || g.category === category;
      const matchSearch =
        !search.trim() || g.name.toLowerCase().includes(search.toLowerCase().trim());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  if (!authorized) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  const pageTitle = themedCopy?.title || "Galería de Saludos";
  const pageSubtitle = themedCopy?.subtitle || "Tus amigos y familia dejándote mensajes llenos de amor";

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col">
      <div className="mb-6">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold-light transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Hub</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-surface2 border border-gold/30 text-gold-light">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/25">
                {themedCopy?.badgeText || "Paso 4 de 4"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif text-text mt-1">{pageTitle}</h1>
            <p className="text-sm text-muted">{pageSubtitle}</p>
          </div>
        </div>
      </div>

      <VideoFilters
        selectedCategory={category}
        onSelectCategory={setCategory}
        searchQuery={search}
        onSearchChange={setSearch}
        totalResults={filteredGreetings.length}
      />

      <VideoGallery greetings={filteredGreetings} />

      {/* Siguiente parada conectada */}
      <NextSectionCta currentSectionId="saludos" />
    </div>
  );
}

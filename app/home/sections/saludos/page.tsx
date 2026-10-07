"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, isSectionUnlocked } from "@/lib/auth";
import VideoGallery from "@/components/VideoGallery";
import VideoFilters from "@/components/VideoFilters";
import { SAMPLE_GREETINGS, GreetingCategory } from "@/lib/data";
import { ArrowLeft, Film } from "lucide-react";

export default function SaludosPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [category, setCategory] = useState<GreetingCategory | "all">("all");
  const [search, setSearch] = useState("");

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
        <div className="w-8 h-8 rounded-full border-2 border-[#c9a84c] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col">
      <div className="mb-6">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm text-[#8878a0] hover:text-[#e8c97a] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Hub</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#241d36] border border-[#c9a84c]/30 text-[#e8c97a]">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-serif text-[#f0ead6]">Galería de Saludos</h1>
            <p className="text-sm text-[#8878a0]">
              Tus amigos y familia dejándote mensajes llenos de amor
            </p>
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
    </div>
  );
}

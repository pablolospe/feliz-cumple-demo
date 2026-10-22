"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, isSectionUnlocked } from "@/lib/auth";
import PhotoGallery from "@/components/PhotoGallery";
import { SAMPLE_PHOTOS } from "@/lib/data";
import { ArrowLeft, Camera } from "lucide-react";
import { useDemoSettings } from "@/lib/demo-settings";
import NextSectionCta from "@/components/NextSectionCta";

export default function FotosPage() {
  const router = useRouter();
  const { themeConfig } = useDemoSettings();
  const [authorized, setAuthorized] = useState(false);
  const themedCopy = themeConfig.sectionCopy.fotos;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    } else if (!isSectionUnlocked("fotos")) {
      router.replace("/home");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  const pageTitle = themedCopy?.title || "Galería de Recuerdos";
  const pageSubtitle = themedCopy?.subtitle || "Selección de fotos hermosas y momentos compartidos";

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col">
      <div className="mb-8">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted hover:text-gold-light bg-surface2/60 hover:bg-surface2 px-3 py-1.5 rounded-full border border-white/10 hover:border-gold/30 transition-all mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-surface2 border border-gold/30 text-gold-light">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/25">
                {themedCopy?.badgeText || "Estación 5"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-text mt-1">{pageTitle}</h1>
            <p className="text-xs sm:text-sm text-muted">{pageSubtitle}</p>
          </div>
        </div>
      </div>

      <PhotoGallery photos={SAMPLE_PHOTOS} />

      {/* Siguiente parada conectada */}
      <NextSectionCta currentSectionId="fotos" />
    </div>
  );
}

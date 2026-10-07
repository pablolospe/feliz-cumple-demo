"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, isSectionUnlocked } from "@/lib/auth";
import PhotoGallery from "@/components/PhotoGallery";
import { SAMPLE_PHOTOS } from "@/lib/data";
import { ArrowLeft, Camera } from "lucide-react";

export default function FotosPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

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

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col">
      <div className="mb-8">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold-light transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Hub</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-surface2 border border-gold/30 text-gold-light">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-serif text-text">Galería de Recuerdos</h1>
            <p className="text-sm text-muted">seleccion random de fotos hermosas</p>
          </div>
        </div>
      </div>

      <PhotoGallery photos={SAMPLE_PHOTOS} />
    </div>
  );
}

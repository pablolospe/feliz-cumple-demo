"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, isSectionUnlocked } from "@/lib/auth";
import YoutubePlayer from "@/components/YoutubePlayer";
import { YOUTUBE_VIDEOS } from "@/lib/data";
import { ArrowLeft, Music } from "lucide-react";

export default function Cumple2026Page() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const info = YOUTUBE_VIDEOS.cumple2026;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    } else if (!isSectionUnlocked("cumple2026")) {
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
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col">
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
            <Music className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-serif text-text">{info.title}</h1>
            <p className="text-sm text-muted">{info.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="my-auto py-6">
        {/* VIDEO 2026 — comentado temporalmente */}
        <YoutubePlayer videoId={info.youtubeId} title={info.title} />
        <p className="text-center text-sm text-muted mt-6 max-w-xl mx-auto leading-relaxed">
          {info.description}
        </p>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, isSectionUnlocked } from "@/lib/auth";
import YoutubePlayer from "@/components/YoutubePlayer";
import { YOUTUBE_VIDEOS } from "@/lib/data";
import { ArrowLeft, Music2 } from "lucide-react";

export default function Cumple2024Page() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const info = YOUTUBE_VIDEOS.cumple2024;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    } else if (!isSectionUnlocked("cumple2024")) {
      router.replace("/home");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#c9a84c] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col">
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
            <Music2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-serif text-[#f0ead6]">{info.title}</h1>
            <p className="text-sm text-[#8878a0]">{info.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="my-auto py-6">
        <YoutubePlayer videoId={info.youtubeId} title={info.title} />
        <p className="text-center text-sm text-[#8878a0] mt-6 max-w-xl mx-auto leading-relaxed">
          {info.description}
        </p>
      </div>
    </div>
  );
}

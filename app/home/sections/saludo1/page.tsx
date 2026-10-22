"use client";

import React from "react";
import GreetingVideoView from "@/components/GreetingVideoView";

export default function Saludo1Page() {
  return (
    <GreetingVideoView
      sectionId="saludo1"
      videoSrc="/videos/saludos/saludo-1.mp4"
      defaultTitle="Saludo 1"
      defaultBadge="Estación 1"
      defaultSubtitle="Video sorpresa"
    />
  );
}

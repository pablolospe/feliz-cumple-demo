"use client";

import React from "react";
import GreetingVideoView from "@/components/GreetingVideoView";

export default function Saludo1Page() {
  return (
    <GreetingVideoView
      sectionId="saludo1"
      videoSrc="/videos/saludos/saludo-2.mp4"
      defaultTitle="Martu"
      defaultBadge="Estación 1"
      defaultSubtitle=""
    />
  );
}

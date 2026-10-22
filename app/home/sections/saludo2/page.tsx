"use client";

import React from "react";
import GreetingVideoView from "@/components/GreetingVideoView";

export default function Saludo2Page() {
  return (
    <GreetingVideoView
      sectionId="saludo2"
      videoSrc="/videos/saludos/saludo-2.mp4"
      defaultTitle="Saludo 2"
      defaultBadge="Estación 2"
      defaultSubtitle="Mensaje especial"
    />
  );
}

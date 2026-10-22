"use client";

import React from "react";
import GreetingVideoView from "@/components/GreetingVideoView";

export default function Saludo3Page() {
  return (
    <GreetingVideoView
      sectionId="saludo3"
      videoSrc="/videos/saludos/saludo-3.mp4"
      defaultTitle="Chicas de la facu"
      defaultBadge="Estación 3"
      defaultSubtitle=""
    />
  );
}

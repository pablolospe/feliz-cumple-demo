"use client";

import React from "react";
import GreetingVideoView from "@/components/GreetingVideoView";

export default function Saludo4Page() {
  return (
    <GreetingVideoView
      sectionId="saludo4"
      videoSrc="/videos/saludos/saludo-padres.mp4"
      defaultTitle="Papás"
      defaultBadge="Estación 4"
      defaultSubtitle="Video de saludo"
    />
  );
}

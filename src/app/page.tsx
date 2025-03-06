"use client";

import React from "react";
import ArtistList from "./components/ArtistList";

export default function Home() {
  return (
    <div className="flex flex-col items-center !text-white">
      <ArtistList/>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import ArtistList from "./components/ArtistList";
import getArtistList from "./helpers/getArtistList";

type artistType = { id: number, name: string, albumCount: number, portrait: string}

export default function Home() {
  const [artistList, setArtistList] = useState<artistType[]>([])

  useEffect(() => {
    const getData = async () => {
      const data = await getArtistList()

      setArtistList(data || [])
    }

    getData()
  
    return () => {
      setArtistList([])
    }
  }, [])

  return (
    <div className="flex flex-col items-center text-white">
      <ArtistList artistList={artistList}/>
    </div>
  );
}

import { notFound } from "next/navigation";
import { VideoList } from "./video";
import { getSubtitles } from "youtube-caption-extractor";

import 'server-only'
import { cache } from "react";

export async function getVideos(q?: string) {
    
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const staticKey = process.env.POCKETBASE_STATIC_KEY ? process.env.POCKETBASE_STATIC_KEY : ''
  myHeaders.append("X-Token", staticKey)
  
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    next: { revalidate: 43200 }
  };

  const queryParam = q ? `?${q}` : ''
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/videos/records${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const video = (await res.json()) as VideoList
  
  if (!video) {
    notFound();
  }
  
  return video;
}

export async function getVideo(id: string, q?: string) {
    
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const staticKey = process.env.POCKETBASE_STATIC_KEY ? process.env.POCKETBASE_STATIC_KEY : ''
  myHeaders.append("X-Token", staticKey)
  
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    next: { revalidate: 43200 }
  };

  const queryParam = q ? `?${q}` : ''
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/videos/records/${id}${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const video = (await res.json()) as VideoList
  
  if (!video) {
    notFound();
  }
  
  return video;
}

export const fetchSubtitles = cache(async (videoId:string, lang = "en") => {
  try {
    const subtitles = await getSubtitles({videoID: videoId, lang: lang})
    return subtitles
  } catch (error) {
    return 
  }
})
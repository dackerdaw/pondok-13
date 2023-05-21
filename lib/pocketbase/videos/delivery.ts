import { notFound } from "next/navigation";
import adminAuth from "../admin/delivery";
import { VideoList } from "./video";

import 'server-only'

export async function getVideos(q?: string) {
    
  const admin = await adminAuth()
    
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", admin.token);
  
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
    
  const admin = await adminAuth()
    
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", admin.token);
  
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
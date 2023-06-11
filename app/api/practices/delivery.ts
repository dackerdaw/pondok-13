import { notFound } from "next/navigation";
import { PracticeList } from "./practice";

import 'server-only'

export async function getPractices(q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/practices/records${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const practice = (await res.json()) as PracticeList
  
  if (!practice) {
    notFound();
  }
  
  return practice;
}

export async function getPractice(id: string, q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/practices/records/${id}${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const practice = (await res.json()) as PracticeList
  
  if (!practice) {
    notFound();
  }
  
  return practice;
}
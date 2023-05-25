import { notFound } from "next/navigation";
import adminAuth from "../admin/delivery";
import { PageList } from "./pages";

import 'server-only'

export async function getPages(q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/pages/records${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const page = (await res.json()) as PageList
  
  if (!page) {
    notFound();
  }
  
  return page;
}

export async function getPage(id: string, q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/pages/records/${id}${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const page = (await res.json()) as PageList
  
  if (!page) {
    notFound();
  }
  
  return page;
}
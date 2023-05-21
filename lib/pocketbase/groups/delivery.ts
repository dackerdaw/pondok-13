import { notFound } from "next/navigation";
import adminAuth from "../admin/delivery";
import { GroupList } from "./groups";

import 'server-only'

export async function getGroups(q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/groups/records${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const group = (await res.json()) as GroupList
  
  if (!group) {
    notFound();
  }
  
  return group;
}

export async function getGroup(id: string, q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/groups/records/${id}${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const group = (await res.json()) as GroupList
  
  if (!group) {
    notFound();
  }
  
  return group;
}
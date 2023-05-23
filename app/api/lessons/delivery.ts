import { notFound } from "next/navigation";
import adminAuth from "../admin/delivery";
import { LessonList } from "./lesson";

import 'server-only'

export async function getLessons(q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/lessons/records${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const lesson = (await res.json()) as LessonList
  
  if (!lesson) {
    notFound();
  }
  
  return lesson;
}

export async function getLesson(id: string, q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/lessons/records/${id}${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const lesson = (await res.json()) as LessonList
  
  if (!lesson) {
    notFound();
  }
  
  return lesson;
}
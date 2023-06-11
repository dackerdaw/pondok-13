import { notFound } from "next/navigation";
import { QuestionList } from "./question";

import 'server-only'

export async function getQuestions(q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/questions/records${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const question = (await res.json()) as QuestionList
  
  if (!question) {
    notFound();
  }
  
  return question;
}

export async function getQuestion(id: string, q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/questions/records/${id}${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const question = (await res.json()) as QuestionList
  
  if (!question) {
    notFound();
  }
  
  return question;
}
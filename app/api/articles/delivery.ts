import { notFound } from "next/navigation";
import { ArticleList } from "./article";

import 'server-only'

export async function getArticles(q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/articles/records${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const article = (await res.json()) as ArticleList
  
  if (!article) {
    notFound();
  }
  
  return article;
}

export async function getArticle(id: string, q?: string) {
    
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
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/articles/records/${id}${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const article = (await res.json()) as ArticleList
  
  if (!article) {
    notFound();
  }
  
  return article;
}
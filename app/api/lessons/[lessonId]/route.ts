import { NextResponse } from 'next/server';

import 'server-only'
import { Lesson } from '../lesson';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { lessonId: string };
  },
) {

  const lessonId = params.lessonId

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const staticKey = process.env.POCKETBASE_STATIC_KEY ? process.env.POCKETBASE_STATIC_KEY : ''
  myHeaders.append("X-Token", staticKey)
  
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    next: { revalidate: 43200 }
  };

  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/lessons/records/${lessonId}`, requestOptions);
  
  if (!res.ok) {
    return NextResponse.json({
      error: "Internal Server Error"
    },
    {
      status: 500
    });
  }
  
  const lesson = (await res.json()) as Lesson
  return NextResponse.json(lesson);
}
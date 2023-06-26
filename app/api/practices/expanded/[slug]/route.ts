import { NextResponse } from 'next/server';

import 'server-only'
import { PracticeList } from '../../practice';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  },
) {

  const slug = params.slug

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const staticKey = process.env.POCKETBASE_STATIC_KEY ? process.env.POCKETBASE_STATIC_KEY : ''
  myHeaders.append("X-Token", staticKey)
  
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    next: { revalidate: 43200 }
  };

  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/practices/records?filter=(slug='${slug}')&expand=problem_types`, requestOptions);
  
  if (!res.ok) {
    return NextResponse.json({
      error: "Internal Server Error"
    },
    {
      status: 500
    });
  }
  
  const units = (await res.json()) as PracticeList
  return NextResponse.json(units);
}
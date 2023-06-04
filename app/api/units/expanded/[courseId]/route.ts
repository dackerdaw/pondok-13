import { NextResponse } from 'next/server';

import 'server-only'
import { UnitList } from '../../units';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { courseId: string };
  },
) {

  const courseId = params.courseId

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const staticKey = process.env.POCKETBASE_STATIC_KEY ? process.env.POCKETBASE_STATIC_KEY : ''
  myHeaders.append("X-Token", staticKey)
  
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    next: { revalidate: 43200 }
  };

  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/units/records?filter=(course_id='${courseId}')&expand=child_pages.child_lessons`, requestOptions);
  
  if (!res.ok) {
    return NextResponse.json({
      error: "Internal Server Error"
    },
    {
      status: 500
    });
  }
  
  const units = (await res.json()) as UnitList
  return NextResponse.json(units);
}
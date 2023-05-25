import { NextRequest, NextResponse } from 'next/server';
import { getUnits } from './delivery';
import type { Unit, UnitList } from './units';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const courseId = searchParams.get('course_id')

  let units: UnitList
  try {
    units = await getUnits(`filter=(course_id='${courseId}')&expand=child_pages`)
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
  
  return new Response(JSON.stringify(units ?? null), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}
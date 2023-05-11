'use client';

import { getSubjects, getSubject } from '@/app/api/subjects/getSubjects';
import useSWR, { Fetcher } from 'swr'
import Link from 'next/link';
import React from 'react';
import { Subject } from '@/app/api/subjects/subject';

export default function LessonNavigator() {
  const unit = useUnit("bab-1-latar-belakang")

  return (
    <>
      <h4 className="text-base font-medium text-gray-300">{unit ? unit.name : ""}</h4>

      <div className="space-y-10 text-white">

        <div className="space-y-5">

        </div>
      </div>
    </>
  );
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

function useUnit (slug: string) {
  const { data } = useSWR(
    `/api/subjects${slug ? `?slug=${slug}` : ''}`,
    fetcher,
    );
 
  // render data
  return data
}

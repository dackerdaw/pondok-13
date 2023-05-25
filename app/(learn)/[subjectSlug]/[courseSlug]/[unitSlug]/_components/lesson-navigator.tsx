'use client';

import useSWR, { Fetcher } from 'swr'
import React from 'react';
import { usePathname } from 'next/navigation';
import { getBaseUrl } from '@/lib/getBaseUrl';
import Link from 'next/link';
import { Page } from '@/app/api/pages/pages';

export default function LessonNavigator({
  courseId
}: {
  courseId: string
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').slice(1)
  const units = useUnits(courseId)
  const defaultUnit = units?.items[0]
  const pages = defaultUnit?.expand.child_pages
  const defaultPage = pages?.[0]

  return (
    <>
      <h4 className="text-base font-medium text-gray-300">{defaultUnit ? defaultUnit.name : ""}</h4>

      <div className="space-y-10 text-white">

        <div className="space-y-5">
          {defaultUnit?.description}
        </div>
      </div>

      <div className="space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {defaultPage?.name}
        </div>

        <div className="grid grid-cols-1 gap-5">
          {pages?.map((page: Page) => {
            return (
              <Link
                href={`/${segments[0]}/${segments[1]}/${segments[2]}/${segments[3]}/${page.id}`}
                key={page.id}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
              >
                <div className="font-medium text-gray-200 group-hover:text-gray-50">
                  {page.name}
                </div>

                <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
                  {page.index}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

function useUnits(courseId?: string) {
  const { data } = useSWR(
    courseId,
    (courseId) => fetch(`${getBaseUrl()}/api/units${courseId ? `?course_id=${courseId}` : ''}`).then(res => res.json()),
  );

  return data
}
'use client';

import useSWR, { Fetcher } from 'swr'
import React from 'react';
import { usePathname } from 'next/navigation';
import { getBaseUrl } from '@/lib/getBaseUrl';

export default function LessonNavigator({
  courseId
}: {
  courseId: string
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').slice(1)
  const units = useUnits(courseId)
  console.log(units)
  const unit = units?.items[0]
  const groups = unit?.expand.child_groups
  console.log(groups)
  const group = groups?.[0]

  return (
    <>
      <h4 className="text-base font-medium text-gray-300">{unit ? unit.name : ""}</h4>

      <div className="space-y-10 text-white">

        <div className="space-y-5">
          {unit?.description}
        </div>
      </div>

      <div className="space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {group?.name}
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* {lessons?.map((item) => {
            const lessonData = item.data()
            return (
              <Link
                href={`/${segments[0]}/${segments[1]}/${segments[2]}/${segments[3]}/${item.id}`}
                key={item.id}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
              >
                <div className="font-medium text-gray-200 group-hover:text-gray-50">
                  {lessonData.name}
                </div>

                <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
                  {lessonData.index}
                </div>
              </Link>
            );
          })} */}
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
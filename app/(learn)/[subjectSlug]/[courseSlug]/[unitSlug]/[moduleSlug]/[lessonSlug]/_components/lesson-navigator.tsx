'use client';

import useSWR, { Fetcher } from 'swr'
import Link from 'next/link';
import React from 'react';
import { getUnit } from '@/lib/firebase/dto/unit';
import { usePathname } from 'next/navigation';
import { getModule } from '@/lib/firebase/dto/module';
import { fetcherGetLessons, getLessons } from '@/lib/firebase/dto/lesson';

export default function LessonNavigator() {
  const pathname = usePathname();
  const segments = pathname.split('/').slice(1)
  const unit = useUnit([segments[0], segments[1], segments[2]])
  const lessonModule = useModule([segments[0], segments[1], segments[2], segments[3]])
  const lessons = useLessons([segments[0], segments[1], segments[2], segments[3]])

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
          {lessonModule?.description}
        </div>

        <div className="grid grid-cols-1 gap-5">
          {lessons?.map((item) => {
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
          })}
        </div>
      </div>
    </>
  );
}

function useUnit(urlSegments: string[]) {
  const { data } = useSWR(
    urlSegments,
    ([subejctId, courseId, unitId]) => getUnit(subejctId, courseId, unitId),
  );

  return data
}

function useModule(urlSegments: string[]) {
  let { data: lessonModule } = useSWR(
    urlSegments,
    ([subejctId, courseId, unitId, lessonModuleId]) => getModule(subejctId, courseId, unitId, lessonModuleId),
  );
  

  return lessonModule
}

function useLessons(urlSegments: string[]) {
  let { data: lessons } = useSWR(
    `subjects/${urlSegments[0]}/courses/${urlSegments[1]}/units/${urlSegments[2]}/modules/${urlSegments[3]}/lessons`,
    (route: string) => fetcherGetLessons(route),
  );

  return lessons
}
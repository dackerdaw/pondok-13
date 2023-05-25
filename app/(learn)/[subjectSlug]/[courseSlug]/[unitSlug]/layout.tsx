import React from 'react';
import LessonNavigator from './_components/lesson-navigator';
import Paginator from '@/ui/paginator';
import { getCourses } from '@/app/api/courses/delivery';
import { getUnits } from '@/app/api/units/delivery';

export const metadata = {
  title: 'Bidang Ilmu',
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const courses = await getCourses(`filter=(slug='${params.courseSlug}')`)
  const course = courses.items[0]
  const units = await getUnits(`filter=(course_id='${course.id}')&expand=child_pages.child_lessons`)
  
  return (

    <div className="grid grid-cols-4 gap-6">

      <div className="col-span-full lg:col-span-1">
        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">


            <div className="space-y-8">
              <h3 className="text-xl font-medium text-gray-300">{course.name}</h3>

              <Paginator
              currentModule={0}
              max={units.items.length-1}
              />
              <LessonNavigator expandedUnits={units}/>


            </div>

          </div>
        </div>
      </div>

      {children}


    </div>
  );
}
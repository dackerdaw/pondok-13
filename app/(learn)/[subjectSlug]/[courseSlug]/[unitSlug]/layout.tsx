import React from 'react';
import LessonNavigator from './_components/lesson-navigator';
import { getCourse } from '@/lib/firebase/dto/course';
import { getModules } from '@/lib/firebase/dto/module';
import Paginator from '@/ui/paginator';
import { getUnits } from '@/lib/firebase/dto/unit';

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
  const course = await getCourse(params.subjectSlug, params.courseSlug)
  const units = await getUnits(params.subjectSlug, params.courseSlug)
  const lessonModules = await getModules(params.subjectSlug, params.courseSlug, params.unitSlug)
  
  return (

    <div className="grid grid-cols-4 gap-6">

      <div className="col-span-full lg:col-span-1">
        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">


            <div className="space-y-8">
              <h3 className="text-xl font-medium text-gray-300">{course.name}</h3>

              <Paginator
              currentModule={0}
              max={lessonModules.length-1}
              />
              <LessonNavigator />


            </div>

          </div>
        </div>
      </div>

      {children}


    </div>
  );
}
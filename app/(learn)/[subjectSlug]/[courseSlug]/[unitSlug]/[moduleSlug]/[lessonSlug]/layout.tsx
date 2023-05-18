import { AddressBar } from '@/ui/address-bar';
import React from 'react';
import LessonNavigator from './_components/lesson-navigator';
import { getSubject } from '@/lib/firebase/dto/subject';
import { getCourse } from '@/lib/firebase/dto/course';
import { getUnit } from '@/lib/firebase/dto/unit';
import { getModule } from '@/lib/firebase/dto/module';
import { getLessons } from '@/lib/firebase/dto/lesson';

export const metadata = {
  title: 'Bidang Ilmu',
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { moduleSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const course = await getCourse(params.subjectSlug, params.courseSlug)

  return (

    <div className="py-32">

      <div className="space-y-8 px-2 pt-20 lg:py-8 lg:px-8">


        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black">
            <AddressBar />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">

          <div className="col-span-full lg:col-span-1">
            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black p-3.5 lg:p-6">


                <div className="space-y-8">
                  <h3 className="text-xl font-medium text-gray-300">{course.name}</h3>
                  
                  <LessonNavigator />

                  
                </div>

              </div>
            </div>
          </div>

          {children}


        </div>

      </div>
    </div>
  );
}

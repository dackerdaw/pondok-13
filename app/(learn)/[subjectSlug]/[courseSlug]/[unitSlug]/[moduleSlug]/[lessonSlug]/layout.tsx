import { getSubjects, getSubject } from '@/app/api/subjects/getSubjects';
import { AddressBar } from '@/ui/address-bar';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';
import Link from 'next/link';
import React from 'react';
import LessonNavigator from './_components/lesson-navigator';

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
  const lessons = await getSubjects({ parent: params.moduleSlug })
  const module = await getSubject({ slug: params.moduleSlug })
  const unit = await getSubject({ slug: params.unitSlug })
  const course = await getSubject({ slug: params.courseSlug })
  const subject = await getSubject({ slug: params.subjectSlug })

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

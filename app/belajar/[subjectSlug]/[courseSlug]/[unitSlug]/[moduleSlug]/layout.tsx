import { getSubjects, getSubject } from '@/app/api/subjects/getSubjects';
import { AddressBar } from '@/ui/address-bar';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';
import Link from 'next/link';
import React from 'react';

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
                <div className="space-y-4">
                  {lessons.map((lesson) => {
                    return (
                      <div className="grid grid-cols-1 gap-5" key={lesson.slug}>
                        <Link
                          href={`/belajar/${params.subjectSlug}/${params.courseSlug}/${params.unitSlug}/${params.moduleSlug}/${lesson.slug}`}
                          key={lesson.name}
                          className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
                        >
                          <div className="font-medium text-gray-200 group-hover:text-gray-50">
                            {lesson.name}
                          </div>

                          {lesson.name ? (
                            <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
                              {lesson.name}
                            </div>
                          ) : null}
                        </Link>
                      </div>
                    );
                  })}
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

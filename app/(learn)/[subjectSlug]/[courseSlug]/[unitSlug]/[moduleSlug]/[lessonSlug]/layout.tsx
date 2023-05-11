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
                  <h4 className="text-base font-medium text-gray-300">{unit.name}</h4>

                  <div className="space-y-10 text-white">

                    <div className="space-y-5">

                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {module.name}
                      </div>
                      {lessons.map((lesson) => {
                        return (
                          <div className="grid grid-cols-1 gap-5" key={lesson.slug}>
                            <Link
                              href={`/${params.subjectSlug}/${params.courseSlug}/${params.unitSlug}/${params.moduleSlug}/${lesson.slug}`}
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
            </div>
          </div>

          {children}


        </div>

      </div>
    </div>
  );
}

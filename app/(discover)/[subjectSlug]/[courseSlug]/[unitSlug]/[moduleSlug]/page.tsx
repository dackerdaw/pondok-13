import { getSubject, getSubjects } from '@/app/api/subjects/getSubjects';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: { moduleSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const lessons = await getSubjects({ parent: params.moduleSlug });
  const lessonModule = await getSubject({ slug: params.moduleSlug });
  
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">{lessonModule.name}</h1>

      <div className="space-y-10 text-white">
        {lessons.map((lesson) => {
          return (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2" key={lesson.slug}>
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
  );
}

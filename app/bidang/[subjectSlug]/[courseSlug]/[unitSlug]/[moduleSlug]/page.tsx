import { getSubject, getSubjects } from '@/app/api/subjects/getSubjects';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: { moduleSlug: string };
}) {
  const lessons = await getSubjects({ parent: params.moduleSlug })
  const module = await getSubject({ slug: params.moduleSlug });
  const unit = await getSubject({ slug: module.parent || "" });
  const course = await getSubject({ slug: unit.parent || "" });
  const subject = await getSubject({ slug: course.parent || "" });
  
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">{module.name}</h1>

      <div className="space-y-10 text-white">
        {lessons.map((lesson) => {
          return (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <Link
                href={`/belajar/${subject.slug}/${course.slug}/${unit.slug}/${module.slug}/${lesson.slug}`}
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

import { getPages } from '@/app/api/pages/delivery';
import { getLessons } from '@/app/api/lessons/delivery';
import Link from 'next/link';
import { convertSlugToReadable } from '@/lib/helper/convertSlugToReadable';

export default async function Page({
  params,
}: {
  params: { pageSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {

  const pages = await getPages(`filter=(slug='${params.pageSlug}')`)
  const page = pages.items[0]

  const lessons = await getLessons(`filter=(page_id='${page.id}')`)
  
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">{page.name}</h1>

      <div className="space-y-4 text-sm text-gray-200">
        <p>{page.description}</p>
        <p>{page.index}</p>
      </div>

      <div className="space-y-10 text-white">
        {lessons.items.map((lesson) => {
          return (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2" key={lesson.id}>
              <Link
                href={`/${params.subjectSlug}/${params.courseSlug}/${params.unitSlug}/${params.pageSlug}/${lesson.lesson_type}/${lesson.lesson_slug}`}
                key={lesson.id}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
              >
                <div className="font-medium text-gray-200 group-hover:text-gray-50">
                  {convertSlugToReadable(lesson.lesson_slug)}
                </div>

                <div className="font-medium text-gray-200 group-hover:text-gray-50">
                  {lesson.lesson_type}
                </div>

                {lesson.index ? (
                  <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
                    {lesson.index}
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

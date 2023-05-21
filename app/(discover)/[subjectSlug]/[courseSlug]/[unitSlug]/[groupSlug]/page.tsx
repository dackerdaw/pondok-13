import convertSlugToReadable from '@/lib/helper/convertSlugToReadable';
import { getGroups } from '@/lib/pocketbase/groups/delivery';
import { getLessons } from '@/lib/pocketbase/lessons/delivery';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: { groupSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {

  const groups = await getGroups(`filter=(slug='${params.groupSlug}')`)
  const group = groups.items[0]

  const lessons = await getLessons(`filter=(group_id='${group.id}')`)
  
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">{group.name}</h1>

      <div className="space-y-4 text-sm text-gray-200">
        <p>{group.description}</p>
        <p>{group.index}</p>
      </div>

      <div className="space-y-10 text-white">
        {lessons.items.map((lesson) => {
          return (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2" key={lesson.id}>
              <Link
                href={`/${params.subjectSlug}/${params.courseSlug}/${params.unitSlug}/${params.groupSlug}/${lesson.lesson_type}/${lesson.lesson_slug}`}
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

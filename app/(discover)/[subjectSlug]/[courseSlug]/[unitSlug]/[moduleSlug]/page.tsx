import { getLessons } from '@/lib/firebase/dto/lesson';
import { getModule } from '@/lib/firebase/dto/module';
import { getDoc } from 'firebase/firestore';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: { moduleSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const lessonModule = await getModule(params.subjectSlug, params.courseSlug, params.unitSlug, params.moduleSlug)
  const lessons = await getLessons(params.subjectSlug, params.courseSlug, params.unitSlug, params.moduleSlug)
  
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">{lessonModule.name}</h1>

      <div className="space-y-4 text-sm text-gray-200">
        <p>{lessonModule.description}</p>
        <p>{lessonModule.index}</p>
      </div>

      <div className="space-y-10 text-white">
        {lessons.map((lesson) => {
          const lessonData = lesson.data()
          const content = lessonData.content.path
          return (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2" key={lesson.id}>
              <Link
                href={`/${params.subjectSlug}/${params.courseSlug}/${params.unitSlug}/${params.moduleSlug}/${lesson.id}`}
                key={lesson.id}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
              >
                <div className="font-medium text-gray-200 group-hover:text-gray-50">
                  {lessonData.name}
                </div>

                <div className="font-medium text-gray-200 group-hover:text-gray-50">
                  {lessonData.index}
                </div>

                {content ? (
                  <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
                    {content}
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

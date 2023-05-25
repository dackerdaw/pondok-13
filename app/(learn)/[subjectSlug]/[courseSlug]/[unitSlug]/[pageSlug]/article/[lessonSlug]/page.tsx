import { getArticle } from "@/lib/firebase/dto/article";
import { getLesson } from "@/lib/firebase/dto/lesson";
import { getVideo } from "@/lib/firebase/dto/video";

export default async function Page({
  params,
}: {
  params: { lessonSlug: string, pageSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const lesson = await getLesson(params.subjectSlug, params.courseSlug, params.unitSlug, params.pageSlug, params.lessonSlug)
  
  let content
  switch (lesson.lesson_code) {
    case 0:
      content = await getVideo(lesson.content.id)
      break;
    case 1:
      content = await getArticle(lesson.content.id)
      break;
    default:
      break;
  }

  return (
    <>
      <div className="col-span-full lg:col-span-2 space-y-8">

        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">

            <div className="space-y-8">
              <h1 className="text-xl font-medium text-gray-300">Belajar</h1>

              <div className="space-y-10 text-white">

                <div className="space-y-4">
                  <h2 className="text-xl font-medium text-gray-400/80">{content?.name}</h2>

                  <div className="space-y-10 text-white">
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      { lesson.lesson_code == 0 ? 
      (
      <div className="col-span-full lg:col-span-1">
        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">

            <div className="space-y-8">
              <h2 className="text-xl font-medium text-gray-300">Transcript</h2>
            </div>

          </div>
        </div>
      </div>
      )
      :
      null
      }
    </>
  );
}

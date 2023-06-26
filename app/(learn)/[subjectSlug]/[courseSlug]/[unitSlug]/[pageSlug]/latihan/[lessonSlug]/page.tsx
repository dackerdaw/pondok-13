import { Suspense } from "react";
import 'katex/dist/katex.min.css';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { getPractices } from "@/app/api/practices/delivery";
import dynamic from 'next/dynamic'
import { getOrCreatePracticeTask } from "@/app/api/practices/getOrCreatePracticeTask";
import { getAssessmentItem } from "@/app/api/assessment-items/delivery";
import ClientWrapper from "./_components/lib/client-wrapper";
 
export default async function Page({
  params,
}: {
  params: { lessonSlug: string, pageSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const practices = await getPractices(`filter=(slug='${params.lessonSlug}')&expand=problem_types`)
  const practice = practices.items[0]
  const task = getOrCreatePracticeTask(practice);
  const questionList = task.reservedItems
  let promiseList = new Array();
  for (let index = 0; index < questionList.length; index++) {
    const questionId = questionList[index];
    promiseList.push(getAssessmentItem(questionId, 'expand=problem_type_parent'))
  }
  const assessmentItems = await Promise.all(promiseList)

  
  return (
    <>
      <div className="col-span-full lg:col-span-3 space-y-8">

        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">

            <div className="space-y-8">
              <h1 className="text-xl font-medium text-gray-300">{practice.name}</h1>

              <div className="space-y-10 text-white">

                <div className="space-y-4">
                  <h2 className="text-xl font-medium text-gray-400/80">{practice.number_of_questions}</h2>

                  <div className="space-y-10 text-white">
                    <Suspense fallback={<>Loading...</>}>
                      <ClientWrapper task={task} assessmentItems={assessmentItems} />
                    </Suspense>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
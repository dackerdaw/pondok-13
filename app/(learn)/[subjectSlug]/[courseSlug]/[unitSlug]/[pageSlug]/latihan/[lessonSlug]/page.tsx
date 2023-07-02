import { Suspense } from "react";
import 'katex/dist/katex.min.css';
import { getPractices } from "@/app/api/practices/delivery";
import { getOrCreatePracticeTask } from "@/app/api/practices/getOrCreatePracticeTask";
import { getAssessmentItem } from "@/app/api/assessment-items/delivery";
import ClientWrapper from "./_components/lib/client-wrapper";
import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";

export default async function Page({
  params,
}: {
  params: { lessonSlug: string, pageSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const practices = await getPractices(`filter=(slug='${params.lessonSlug}')&expand=problem_types`)
  const practice = practices.items[0]

  async function prepareTaskAction() {
    'use server'

    const task = getOrCreatePracticeTask(practice);
    const questionList = task.reservedItems
    let promiseList = new Array();
    for (let index = 0; index < questionList.length; index++) {
      const questionId = questionList[index];
      promiseList.push(getAssessmentItem(questionId, 'expand=problem_type_parent'))
    }
    const assessmentItems = await Promise.all(promiseList) as AssessmentItem[]
    task.assessmentItems = assessmentItems
    return task
  }
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
                  <div className="space-y-10 text-white">
                    <Suspense fallback={<>Loading...</>}>
                      <ClientWrapper practice={practice} prepareTask={prepareTaskAction} />
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
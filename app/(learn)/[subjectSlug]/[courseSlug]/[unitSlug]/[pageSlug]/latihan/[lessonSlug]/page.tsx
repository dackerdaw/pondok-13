import { Suspense } from "react";
import 'katex/dist/katex.min.css';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { getPractices } from "@/app/api/practices/delivery";
import dynamic from 'next/dynamic'
 
const ClientWrapper = dynamic(() => import('./_components/lib/client-wrapper'), {
  ssr: false,
})

export default async function Page({
  params,
}: {
  params: { lessonSlug: string, pageSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const practices = await getPractices(`filter=(slug='${params.lessonSlug}')&expand=problem_types`)
  const practice = practices.items[0]

  
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
                      <ClientWrapper practice={practice} />
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
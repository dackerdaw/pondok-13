import { getArticles } from "@/app/api/articles/delivery";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from "react";
import 'katex/dist/katex.min.css';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default async function Page({
  params,
}: {
  params: { lessonSlug: string, pageSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const articles = await getArticles(`filter=(slug='${params.lessonSlug}')`)
  const article = articles.items[0]
  const content = article.content
  
  return (
    <>
      <div className="col-span-full lg:col-span-2 space-y-8">

        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">

            <div className="space-y-8">
              <h1 className="text-xl font-medium text-gray-300">{article.name}</h1>

              <div className="space-y-10 text-white">

                <div className="space-y-4">
                  <h2 className="text-xl font-medium text-gray-400/80">{article.abstract}</h2>

                  <div className="space-y-10 text-white">
                    <Suspense fallback={<>Loading...</>}>
                      {/* @ts-expect-error Async Server Component */}
                      <MDXRemote source={content} options={{
                        mdxOptions: {
                          remarkPlugins: [remarkMath],
                          rehypePlugins: [rehypeKatex],
                        }
                      }} />
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

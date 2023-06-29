import { getVideos } from "@/app/api/videos/delivery";
import YoutubeClientWrapper from "./_components/youtube-client-wrapper";

export default async function Page({
  params,
}: {
  params: { lessonSlug: string, pageSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const videos = await getVideos(`filter=(slug='${params.lessonSlug}')`)
  const video = videos.items[0]
  const playerParams = "modestbranding=1&rel=0&cc_load_policy=1"
  
  return (
    <>
      <div className="col-span-full lg:col-span-2 space-y-8">

        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">

            <div className="space-y-8">
              <h1 className="text-xl font-medium text-gray-300">Belajar</h1>

              <div className="space-y-10 text-white">

                <div className="space-y-4">
                  <h2 className="text-xl font-medium text-gray-400/80">{video.name}</h2>

                  <div className="space-y-10 text-white">
                    <YoutubeClientWrapper 
                      id={video.external_video_id}
                      title={video.name}
                      params={playerParams}
                    />
                  </div>
                  
                  <h3 className="text-md font-medium text-gray-400/80">Deskripsi</h3>
                  <p>{video.description}</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="col-span-full lg:col-span-1">
        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">

            <div className="space-y-8">
              <h2 className="text-xl font-medium text-gray-300">Transcript</h2>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

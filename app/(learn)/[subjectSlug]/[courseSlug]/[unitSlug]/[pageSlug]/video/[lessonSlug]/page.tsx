import { fetchSubtitles, getVideos } from "@/app/api/videos/delivery";
import YoutubeClientWrapper from "./_components/youtube-client-wrapper";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { lessonSlug: string, pageSlug: string, unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const videos = await getVideos(`filter=(slug='${params.lessonSlug}')`)
  const video = videos.items[0]
  const subtitles = await fetchSubtitles(video.external_video_id, "en")
  if (subtitles == undefined) {
    notFound()
  }
  const transcripts = subtitles.map(sub => ({
    start: +sub.start,
    dur: +sub.dur,
    end: +sub.start + +sub.dur,
    startISO: new Date(+sub.start * 1000).toISOString().slice(14, 19),
    text: sub.text
  }))

  return (
    <>
      <YoutubeClientWrapper
        video={video}
        transcripts={transcripts}
      />
    </>
  );
}

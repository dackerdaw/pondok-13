"use client"

import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import styles from './styles.module.css'
import { useState, useRef, useEffect } from 'react';
import { Transcript, Video } from '@/app/api/videos/video';
import { Button } from '@material-tailwind/react';

export default function YoutubeClientWrapper({
  video,
  transcripts,
}: {
  video: Video,
  transcripts: Transcript[]
}) {
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(-1);
  // const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<YouTubePlayer>(); // Reference to the YouTube player instance
  const timerRef = useRef<any>(); // Reference to the timer interval
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  const seekToTime = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      //   setCurrentTime(time);
    }
  };

  // param is set to any instead of number because getCurrentTime
  // returns a promise<number> for some reason. this is just 
  // typescript issue
  const updateCurrentTranscript = (currentTime: any) => {
    const transcriptIndex = transcripts.findIndex(
      (transcript) => transcript.start <= currentTime && transcript.end >= currentTime
    );
    setCurrentTranscriptIndex(transcriptIndex);
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      // setCurrentTime(prevTime => prevTime + 0.5)
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        updateCurrentTranscript(currentTime)
      }
    }, 500)
  }

  const stopTimer = () => {
    clearInterval(timerRef.current)
  }

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target
  }

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    const playerState = event.data
    if (playerState === 1) {
      startTimer()
    } else {
      stopTimer()
    }
  }

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      cc_load_policy: 1,
      cc_lang_pref: "en",
      rel: 0,
      modestbranding: 1,
    }
  }

  useEffect(() => {
    if (transcriptContainerRef.current) {
      const activeTranscriptElement = transcriptContainerRef.current.children[currentTranscriptIndex] as HTMLElement;
      if (activeTranscriptElement) {
        const topPos = activeTranscriptElement.offsetTop;
        transcriptContainerRef.current.scrollTop = topPos - 192;
      }
    }
  }, [currentTranscriptIndex]);

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

                    <YouTube
                      videoId={video.external_video_id}
                      title={video.name}
                      opts={opts}
                      onReady={onPlayerReady}
                      onStateChange={onStateChange}
                      className={styles.youtubeContainer}
                    />
                    <p>transcript</p>

                  </div>

                  <h3 className="text-md font-medium text-gray-400/80">Deskripsi</h3>
                  <p>{video.description}</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="col-span-full lg:col-span-1 ">
        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">

            <div className="space-y-8">
              <h2 className="text-xl font-medium text-gray-300">Transcript</h2>

              <div className="overflow-y-auto max-h-96 relative scroll-smooth" ref={transcriptContainerRef}>
                {transcripts.map((transcript, index) => (
                  <div key={index}>
                    <Button
                      onClick={() => {
                        setCurrentTranscriptIndex(index);
                        seekToTime(transcript.start)
                      }}
                      color={currentTranscriptIndex === index ? 'blue' : 'green'}
                    >
                      {transcript.startISO}
                    </Button>
                    {transcript.text}
                  </div>
                ))}
              </div>


            </div>

          </div>
        </div>
      </div>
    </>
  );
}
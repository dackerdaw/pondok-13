"use client"

import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import styles from './styles.module.css'
import type Subtitle from 'youtube-caption-extractor'
import { useState, useRef } from 'react';
import { Transcript } from '@/app/api/videos/video';
import { Button } from '@material-tailwind/react';

export default function YoutubeClientWrapper({
  id,
  title,
  transcripts,
}: {
  id: string,
  title: string,
  transcripts: Transcript[]
}) {
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(-1);
  // const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<YouTubePlayer>(); // Reference to the YouTube player instance
  const timerRef = useRef<any>(); // Reference to the timer interval

  const seekToTime = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      //   setCurrentTime(time);
    }
  };

  // param is set to any instead of number because getCurrentTime
  // returns a promise<number> for some reason
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

  return (
    <>
      <YouTube
        videoId={id}
        title={title}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onStateChange}
        className={styles.youtubeContainer}
      />
      <p>transcript</p>
      <div>
        <ul>
          {transcripts.map((transcript, index) => (
            <li
              key={index}
            >
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
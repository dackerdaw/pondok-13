"use client"

import YouTube, { YouTubeProps } from 'react-youtube';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import styles from './styles.module.css'

export default function YoutubeClientWrapper({
    id,
    title,
}: {
    id: string,
    title: string,
}) {

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        console.log("ready")
        event.target.playVideo();
    }
    
    const opts: YouTubeProps['opts'] = {
        playerVars: {
            cc_load_policy: 1,
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
                className={styles.youtubeContainer}
            />
        </>
    );
}
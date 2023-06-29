"use client"

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function YoutubeClientWrapper(props: any) {
    return <LiteYouTubeEmbed {...props} />
}
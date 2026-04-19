import Hls from "hls.js";
import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  filter?: string;
}

export default function VideoBackground({ src, poster, className, filter }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (src.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      }
    } else {
      video.src = src;
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      style={{ filter }}
      className={className}
    />
  );
}

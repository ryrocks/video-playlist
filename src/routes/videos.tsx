import { useState, useEffect } from 'react';
import VideoItem from '../components/video-item';
import { Video } from '../interfaces/video';

export function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/videos.json');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error(error);
      } finally {
        // console.log('finally');
      }
    }

    fetchVideos();
  }, []);

  return (
    <main>
      <h1>Videos route</h1>
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </main>
  )
}
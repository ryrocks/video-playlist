import { useState, useEffect } from 'react';
import VideoItem from '../components/video-item';
import { Video } from '../interfaces/video';
import { useFetchPlaylists } from '../hooks/useFetchPlaylists';

export function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const { playlists, handleSetPlaylists } = useFetchPlaylists();

  const handleAddVideoToPlaylist = (playlistId: number, video: Video) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId && !playlist.videoIds.includes(video.id)) {
        return { ...playlist, videoIds: [...playlist.videoIds, video.id] };
      }
      return playlist;
    });
    handleSetPlaylists(updatedPlaylists);
  };

  const handleRemoveVideoFromPlaylist = (playlistId: number, video: Video) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId && playlist.videoIds.includes(video.id)) {
        return { ...playlist, videoIds: playlist.videoIds.filter((id) => id !== video.id) };
      }
      return playlist;
    });
    handleSetPlaylists(updatedPlaylists);
  };

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
        <VideoItem key={video.id} video={video} playlists={playlists} onAdd={handleAddVideoToPlaylist}
          onRemove={handleRemoveVideoFromPlaylist} />
      ))}
    </main>
  )
}
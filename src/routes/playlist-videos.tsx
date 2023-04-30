import { useMemo } from 'react';
import { useParams } from 'react-router-dom'
import { usePlaylists } from '../hooks/usePlaylists';
import { Video } from '../interfaces/video';
import { useVideos } from '../hooks/useVideos';
import VideoItem from '../components/video-item';

export function PlaylistVideos() {
  const params = useParams();
  const { playlists, handleAddVideoToPlaylist, handleRemoveVideoFromPlaylist } = usePlaylists();
  const { videos } = useVideos();


  const filteredVideos: Video[] = useMemo(() => {
    const playlist = playlists.find((playlist) => playlist.id === Number(params.id));
    if (playlist) {
      return videos.filter((video) => playlist.videoIds.includes(video.id));
    }
    return []
  }, [params, playlists, videos])

  return (
    <main>
      <h1>Playlist route for playlist id: {params.id}</h1>
      {filteredVideos?.map((video) => (
        <VideoItem key={video.id} video={video} playlists={playlists} onAdd={handleAddVideoToPlaylist}
          onRemove={handleRemoveVideoFromPlaylist} />
      ))}
    </main>
  )
}
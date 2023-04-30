import VideoItem from '../components/video-item';
import { usePlaylists } from '../hooks/usePlaylists';
import { useVideos } from '../hooks/useVideos';

export function Videos() {
  const { playlists, handleAddVideoToPlaylist, handleRemoveVideoFromPlaylist } = usePlaylists();
  const { videos } = useVideos();

  return (
    <main>
      <h1>Videos route</h1>
      {videos?.map((video) => (
        <VideoItem key={video.id} video={video} playlists={playlists} onAdd={handleAddVideoToPlaylist}
          onRemove={handleRemoveVideoFromPlaylist} />
      ))}
    </main>
  )
}
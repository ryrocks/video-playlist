import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom'
import { usePlaylists } from '../hooks/usePlaylists';
import { Video } from '../interfaces/video';
import { useVideos } from '../hooks/useVideos';
import VideoItem from '../components/video-item';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';


export function PlaylistVideos() {
  const params = useParams();
  const { playlists, handleAddVideoToPlaylist, handleRemoveVideoFromPlaylist } = usePlaylists();
  const { videos } = useVideos();
  const [enableBulkSelect, setEnableBulkSelect] = useState<boolean>(false);

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
      <div className="mb-2 d-flex justify-content-end">
        <ButtonGroup className="mb-2 d-flex justify-content-end">
          <ToggleButton
            id="toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={enableBulkSelect}
            value="1"
            onChange={(e) => setEnableBulkSelect(e.currentTarget.checked)}
          >
            Bulk Select
          </ToggleButton>
        </ButtonGroup>
      </div>
      {filteredVideos?.map((video) => (
        <VideoItem key={video.id} video={video} playlists={playlists} onAdd={handleAddVideoToPlaylist}
          onRemove={handleRemoveVideoFromPlaylist} enableSelect={enableBulkSelect} />
      ))}
    </main>
  )
}
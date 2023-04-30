import React, { useState } from 'react';

import VideoItem from '../components/video-item';
import { usePlaylists } from '../hooks/usePlaylists';
import { useVideos } from '../hooks/useVideos';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

export function Videos() {
  const { playlists, handleAddVideoToPlaylist, handleRemoveVideoFromPlaylist } = usePlaylists();
  const { videos } = useVideos();
  const [enableBulkSelect, setEnableBulkSelect] = useState<boolean>(false);

  return (
    <main>
      <h1>Videos route</h1>
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
      {videos?.map((video) => (
        <VideoItem key={video.id} video={video} playlists={playlists} onAdd={handleAddVideoToPlaylist}
          onRemove={handleRemoveVideoFromPlaylist} enableSelect={enableBulkSelect} />
      ))}
    </main>
  )
}
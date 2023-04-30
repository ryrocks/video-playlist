import React from 'react';
import { Col, Image, Row, Dropdown, Form } from 'react-bootstrap';
import { Video } from '../interfaces/video';
import { Playlist } from '../interfaces/playlist';

interface VideoItemProps {
  video: Video;
  playlists: Playlist[];
  onAdd: (playlistId: number, video: Video) => void;
  onRemove: (playlistId: number, video: Video) => void;
}

export default function VideoItem(props: VideoItemProps) {
  const { video, playlists, onAdd, onRemove } = props;

  const handleAddToPlaylist = (playlistId: number) => {
    onAdd(playlistId, video);
  };

  const handleRemoveFromPlaylist = (playlistId: number) => {
    onRemove(playlistId, video);
  };

  return (
    <Row>
      <Col xs='12' md='3' className='mb-3'>
        <Image fluid rounded src={`${video.thumbnail}?size=small`} alt={video.name} className='w-100' />
      </Col>
      <Col xs='12' md='9' className='mb-3'>
        <h2 className='h4'>{video.name}</h2>
        <p>{video.description}</p>
        <Dropdown autoClose="outside" id={`video-${video.id}-dropdown`}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Add to playlist
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {playlists.map((playlist) => (
              <div className='px-3 py-1' key={playlist.id}>
                <Form.Check type='checkbox' label={playlist.name} defaultChecked={playlist.videoIds.includes(video.id)} onChange={() => {
                  if (playlist.videoIds.includes(video.id)) {
                    handleRemoveFromPlaylist(playlist.id)
                  } else {
                    handleAddToPlaylist(playlist.id)
                  }
                }} />
              </div>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  )
}
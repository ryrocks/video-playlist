import { Col, Image, Row, Button, Dropdown, DropdownButton } from 'react-bootstrap';
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
        <DropdownButton id={`video-${video.id}-dropdown`} title="Add to playlist">
          {playlists.map((playlist) => (
            <Dropdown.Item key={playlist.id} onClick={() => handleAddToPlaylist(playlist.id)}>
              {playlist.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton id={`video-${video.id}-dropdown-remove`} title="Remove from playlist">
          {playlists.map((playlist) => (
            <Dropdown.Item key={playlist.id} onClick={() => handleRemoveFromPlaylist(playlist.id)}>
              {playlist.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Col>
    </Row>
  )
}
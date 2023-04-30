import { Col, Row, Button } from 'react-bootstrap';
import { Playlist } from '../interfaces/playlist';

interface PlaylistItemProps {
  playlist: Playlist;
  onDelete: () => void;
}

export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist, onDelete } = props;

  const videoCount = playlist.videoIds.length === 1 ? '1 video' : `${playlist.videoIds.length} videos`;

  return (
    <Row className='border rounded p-2 mb-2'>
      <Col xs='12' md='3'>
        <h2 className='h5'>{playlist.name}</h2>
        <p className='mb-0'>{videoCount}</p>
      </Col>
      <Col xs='12' md='9'>
        <p className='mb-0'>{playlist.description}</p>
      </Col>
      <Col xs='12' className='mt-2'>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Col>
    </Row>
  )
}
import { Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Playlist } from '../../interfaces/playlist';
import styles from './playlist-item.module.css'
interface PlaylistItemProps {
  playlist: Playlist;
  onDelete: () => void;
}

function PlaylistItem(props: PlaylistItemProps) {
  const { playlist, onDelete } = props;
  const navigate = useNavigate();

  const videoCount = playlist.videoIds.length === 1 ? '1 video' : `${playlist.videoIds.length} videos`;

  const handleClickDeleteButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    onDelete();
  }

  const handleClickRow = (id: number) => {
    navigate(`/playlists/${id}`)
  }

  return (

    <Row className={`border rounded p-2 mb-2 ${styles.playlistRow}`} onClick={() => handleClickRow(playlist.id)}>
      <Col xs='12' md='3'>
        <h2 className='h5'>{playlist.name}</h2>
        <p className='mb-0'>{videoCount}</p>
      </Col>
      <Col xs='12' md='9' className="d-flex">
        <p className='mb-0 flex-fill' >{playlist.description}</p>
        <div className="d-flex align-items-center">
          <Button variant="danger" onClick={handleClickDeleteButton}>
            Delete
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default PlaylistItem;
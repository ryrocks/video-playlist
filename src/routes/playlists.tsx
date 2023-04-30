import { useState, useEffect } from 'react';
import { PlaylistItem } from '../components/playlist-item';
import { Playlist } from '../interfaces/playlist';
import { Button, Modal, Form } from 'react-bootstrap';


export function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

  const handleCreatePlaylist = () => {
    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName,
      description: newPlaylistDescription,
      videoIds: [],
      dateCreated: new Date().toISOString(),
    };

    setPlaylists([...playlists, newPlaylist]);
    setShowModal(false);
    setNewPlaylistName('');
    setNewPlaylistDescription('');
  };

  const handleDeletePlaylist = (id: number) => {
    setPlaylists(playlists.filter((playlist) => playlist.id !== id));
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/playlists.json');
        const data = await response.json();
        setPlaylists(data);
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
      <h1>Playlists route</h1>
      <Button onClick={() => setShowModal(true)}>Create Playlist</Button>
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} onDelete={() => handleDeletePlaylist(playlist.id)} />
      ))}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter playlist description"
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreatePlaylist}>
            Create Playlist
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
import { useState } from 'react';
import { PlaylistItem } from '../components/playlist-item';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFetchPlaylists } from '../hooks/useFetchPlaylists';


export function Playlists() {
  const { playlists, handleSetPlaylists } = useFetchPlaylists();
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

    const updatedPlaylists = [...playlists, newPlaylist];
    handleSetPlaylists(updatedPlaylists);

    setShowModal(false);
    setNewPlaylistName('');
    setNewPlaylistDescription('');
  };

  const handleDeletePlaylist = (id: number) => {
    const updatedPlaylists = playlists.filter((playlist) => playlist.id !== id);
    handleSetPlaylists(updatedPlaylists);
  };

  return (
    <main>
      <h1>Playlists route</h1>
      <Button className="mb-3" onClick={() => setShowModal(true)}>Create Playlist</Button>
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
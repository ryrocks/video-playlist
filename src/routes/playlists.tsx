import { useState, useCallback } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { usePlaylists } from '../hooks/usePlaylists';
import PlaylistItem from '../components/playlist-item/playlist-item';


export function Playlists() {
  const { playlists, handleSetPlaylists } = usePlaylists();
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState<string>('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePlaylistId, setDeletePlaylistId] = useState<number | null>(null);

  const handleCreatePlaylist = useCallback(() => {
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
  }, [newPlaylistName, newPlaylistDescription, playlists, handleSetPlaylists]);

  const handleDeletePlaylist = useCallback((id: number) => {
    const updatedPlaylists = playlists.filter((playlist) => playlist.id !== id);
    handleSetPlaylists(updatedPlaylists);
    setShowDeleteModal(false);
    setDeletePlaylistId(null);
  }, [playlists, handleSetPlaylists]);

  const handleShowDeleteModal = useCallback((id: number) => {
    setShowDeleteModal(true);
    setDeletePlaylistId(id);
  }, []);

  return (
    <main>
      <h1>Playlists route</h1>
      <Button className="mb-3" onClick={() => setShowModal(true)}>Create Playlist</Button>
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} onDelete={() => handleShowDeleteModal(playlist.id)} />
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletePlaylistId && (
            <>
              Are you sure you want to delete the playlist{' '}
              <strong>
                {
                  playlists.find((playlist) => playlist.id === deletePlaylistId)
                    ?.name
                }
              </strong>
              ?
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeletePlaylist(deletePlaylistId as number)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
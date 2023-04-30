import { useState, useEffect } from 'react';
import { PlaylistItem } from '../components/playlist-item';
import { Playlist } from '../interfaces/playlist';

export function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);


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
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </main>
  );
}
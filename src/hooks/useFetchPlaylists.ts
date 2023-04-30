import { useState, useEffect } from 'react';
import { Playlist } from '../interfaces/playlist';

export function useFetchPlaylists(): { playlists: Playlist[]; handleSetPlaylists: (playlists: Playlist[]) => void } {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const handleSetPlaylists = (playlists: Playlist[]) => {
        setPlaylists(playlists);
        localStorage.setItem('playlists', JSON.stringify(playlists));
    };


    useEffect(() => {
        const storedPlaylists = localStorage.getItem('playlists');
        if (storedPlaylists) {
            setPlaylists(JSON.parse(storedPlaylists));
        } else {
            const fetchVideos = async () => {
                try {
                    const response = await fetch('/playlists.json');
                    const data = await response.json();
                    setPlaylists(data);
                    localStorage.setItem('playlists', JSON.stringify(data));
                } catch (error) {
                    console.error(error);
                } finally {
                    // console.log('finally');
                }
            };

            fetchVideos();
        }
    }, []);

    return { playlists, handleSetPlaylists };
}

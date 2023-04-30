import { useState, useEffect } from 'react';
import { Playlist } from '../interfaces/playlist';
import { Video } from '../interfaces/video';

export function usePlaylists(): { playlists: Playlist[]; handleSetPlaylists: (playlists: Playlist[]) => void, handleAddVideoToPlaylist: (playlistId: number, video: Video) => void, handleRemoveVideoFromPlaylist: (playlistId: number, video: Video) => void } {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const handleSetPlaylists = (playlists: Playlist[]) => {
        setPlaylists(playlists);
        localStorage.setItem('playlists', JSON.stringify(playlists));
    };

    const handleAddVideoToPlaylist = (playlistId: number, video: Video) => {
        const updatedPlaylists = playlists.map((playlist) => {
            if (playlist.id === playlistId && !playlist.videoIds.includes(video.id)) {
                return { ...playlist, videoIds: [...playlist.videoIds, video.id] };
            }
            return playlist;
        });
        handleSetPlaylists(updatedPlaylists);
    };

    const handleRemoveVideoFromPlaylist = (playlistId: number, video: Video) => {
        const updatedPlaylists = playlists.map((playlist) => {
            if (playlist.id === playlistId && playlist.videoIds.includes(video.id)) {
                return { ...playlist, videoIds: playlist.videoIds.filter((id) => id !== video.id) };
            }
            return playlist;
        });
        handleSetPlaylists(updatedPlaylists);
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

    return { playlists, handleSetPlaylists, handleAddVideoToPlaylist, handleRemoveVideoFromPlaylist };
}

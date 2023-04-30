import { useState, useEffect } from 'react';
import { Video } from '../interfaces/video';

export function useVideos(): { videos: Video[] } {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/videos.json');
                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error(error);
            } finally {
                // console.log('finally');
            }
        };

        fetchVideos();
    }, []);

    return { videos };
}

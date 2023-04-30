import { useState, useEffect } from 'react';
import { Video } from '../interfaces/video';

export function useVideos(): { isLoading: boolean, videos: Video[] } {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/videos.json');
                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchVideos();
    }, []);

    return { isLoading, videos };
}

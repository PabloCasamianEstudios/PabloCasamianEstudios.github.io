import { useState, useEffect } from 'react';

const DECODE_TIMEOUT_MS = 2500;

// Decodes every image up front, so no blank paper shows the first time a leaf turns
export default function useImagesReady(sources: string[]) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let alive = true;
        const show = () => {
            if (alive) setReady(true);
        };

        const decodes = sources.map((src) => {
            const img = new Image();
            img.src = src;
            return img.decode().catch(() => {});
        });
        Promise.all(decodes).then(show);
        const fallback = setTimeout(show, DECODE_TIMEOUT_MS);

        return () => {
            alive = false;
            clearTimeout(fallback);
        };
    }, [sources]);

    return ready;
}

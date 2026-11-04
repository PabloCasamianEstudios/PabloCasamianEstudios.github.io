import { useState, useEffect } from 'react';

// Hash routes, so pages also work on GitHub Pages without a server fallback
export default function useRoute() {
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const update = () => {
            setRoute(window.location.hash);
            window.scrollTo({ top: 0 });
        };

        window.addEventListener('hashchange', update);
        return () => window.removeEventListener('hashchange', update);
    }, []);

    return route;
}

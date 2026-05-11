import { useState, useEffect } from 'react';

export default function useClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString('es-ES', { hour12: false });
    const formattedDate = time.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).replace('.', '');

    return { formattedTime, formattedDate };
}

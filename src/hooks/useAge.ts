import { useState, useEffect } from 'react';

export default function useAge(birthDateString: string) {
    const [age, setAge] = useState('0.000000000');

    useEffect(() => {
        const birthDate = new Date(birthDateString);
        
        const update = () => {
            const now = new Date();
            const diffMs = now.getTime() - birthDate.getTime();
            const years = diffMs / (1000 * 60 * 60 * 24 * 365.2425);
            setAge(years.toFixed(9));
        };

        const timer = setInterval(update, 50);
        update();

        return () => clearInterval(timer);
    }, [birthDateString]);

    return age;
}

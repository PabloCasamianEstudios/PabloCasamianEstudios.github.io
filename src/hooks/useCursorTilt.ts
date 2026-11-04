import { useEffect, type RefObject } from 'react';
import { MAX_TILT } from '../components/Notebook/constants';

// Leans an element towards the cursor through CSS variables, without re-rendering
export default function useCursorTilt(ref: RefObject<HTMLElement | null>, isPaused: () => boolean) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse' || isPaused()) return;
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            el.style.setProperty('--ry', `${x * MAX_TILT * 2}deg`);
            el.style.setProperty('--rx', `${-y * MAX_TILT * 2}deg`);
            el.style.setProperty('--sx', `${-x * 40}px`);
            el.style.setProperty('--sy', `${-y * 20}px`);
        };
        const onLeave = () => {
            ['--ry', '--rx', '--sx', '--sy'].forEach((name) => el.style.removeProperty(name));
        };

        window.addEventListener('pointermove', onMove);
        document.addEventListener('pointerleave', onLeave);
        return () => {
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);
        };
    }, [ref, isPaused]);
}

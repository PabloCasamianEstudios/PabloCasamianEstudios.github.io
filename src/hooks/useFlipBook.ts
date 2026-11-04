import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from 'react';
import { DRAG_FLICK, DRAG_SLOP, DRAG_SPAN, FLIP_MS, SETTLE_MIN_MS } from '../components/Notebook/constants';

export interface Flight {
    dir: number;
    drag?: boolean; // follows the pointer
    settleMs?: number; // landing after being released
}

interface Turning {
    i: number;
    dir: number;
}

interface Drag {
    i: number;
    dir: number;
    leaf: HTMLElement;
    span: number;
    progress: number;
}

interface Press {
    id: number;
    x: number;
    y: number;
    t: number;
    last: number;
    v: number;
    drag?: Drag;
}

export default function useFlipBook(rootRef: RefObject<HTMLElement | null>, total: number) {
    const [flipped, setFlipped] = useState(0); // leaves already turned
    const [turning, setTurning] = useState<Turning | null>(null); // last turn, for the shadows
    const [inFlight, setInFlight] = useState<Record<number, Flight>>({}); // leaves in the air
    const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
    const press = useRef<Press | null>(null);
    const dragged = useRef(false); // the last touch was a drag, not a click
    const latest = useRef({ flipped, inFlight, total });

    useEffect(() => {
        latest.current = { flipped, inFlight, total };
    });

    useEffect(() => {
        const pending = timers.current;
        return () => Object.values(pending).forEach(clearTimeout);
    }, []);

    // Each leaf has its own timer: fast clicks don't leave leaves half turned
    const land = useCallback((i: number, ms: number) => {
        clearTimeout(timers.current[i]);
        timers.current[i] = setTimeout(() => {
            setInFlight((flights) => {
                const rest = { ...flights };
                delete rest[i];
                return rest;
            });
            setTurning((t) => (t?.i === i ? null : t));
        }, ms);
    }, []);

    const go = useCallback((dir: number) => {
        if (press.current?.drag) return;
        const next = Math.min(Math.max(flipped + dir, 0), total);
        if (next === flipped) return;
        const i = dir > 0 ? flipped : next;
        setFlipped(next);
        setTurning({ i, dir });
        setInFlight((flights) => ({ ...flights, [i]: { dir } }));
        land(i, FLIP_MS);
    }, [flipped, total, land]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [go]);

    const onPointerDown = (e: ReactPointerEvent) => {
        dragged.current = false;
        if (e.button !== 0 || press.current) return;
        press.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp, last: 0, v: 0 };
    };

    // The leaf follows the pointer without re-rendering. On release it finishes the turn
    // or falls back. Dragging left moves forward, dragging right moves back
    useEffect(() => {
        const startDrag = (p: Press, dx: number, dy: number) => {
            const { flipped, inFlight, total } = latest.current;
            const dir = dx < 0 ? 1 : -1;
            const next = flipped + dir;
            const i = dir > 0 ? flipped : next;
            const leaf = rootRef.current?.querySelector<HTMLElement>(`[data-leaf="${i}"]`);
            if (!leaf || Math.abs(dy) > Math.abs(dx) || next < 0 || next > total || inFlight[i]) {
                press.current = null;
                return;
            }
            p.drag = { i, dir, leaf, span: leaf.offsetWidth * DRAG_SPAN, progress: 0 };
            dragged.current = true;
            // Without this, releasing outside the window would leave the leaf half turned
            leaf.parentElement?.setPointerCapture(p.id);
            setFlipped(next);
            setInFlight((flights) => ({ ...flights, [i]: { dir, drag: true } }));
        };

        const onMove = (e: PointerEvent) => {
            const p = press.current;
            if (!p || e.pointerId !== p.id) return;
            const dx = e.clientX - p.x;
            const dy = e.clientY - p.y;
            if (!p.drag) {
                if (Math.hypot(dx, dy) < DRAG_SLOP) return;
                startDrag(p, dx, dy);
                if (!p.drag) return;
            }
            const { dir, leaf, span } = p.drag;
            const dt = Math.max(e.timeStamp - p.t, 1);
            p.v = p.v * 0.3 + (((dx - p.last) * -dir) / dt) * 0.7;
            p.last = dx;
            p.t = e.timeStamp;
            const progress = Math.min(Math.max((dx * -dir) / span, 0), 1);
            p.drag.progress = progress;
            leaf.style.setProperty('--angle', `${-180 * (dir > 0 ? progress : 1 - progress)}deg`);
            leaf.style.setProperty('--shade', String(Math.sin(progress * Math.PI)));
        };

        const release = (e: PointerEvent, cancelled: boolean) => {
            const p = press.current;
            if (!p || e.pointerId !== p.id) return;
            press.current = null;
            if (!p.drag) return;
            const { i, dir, progress } = p.drag;
            const done = !cancelled && (progress > 0.5 || p.v > DRAG_FLICK);
            const finalDir = done ? dir : -dir;
            const settleMs = Math.max(SETTLE_MIN_MS, (done ? 1 - progress : progress) * FLIP_MS * 0.7);
            setFlipped(finalDir > 0 ? i + 1 : i);
            setInFlight((flights) => ({ ...flights, [i]: { dir: finalDir, settleMs } }));
            land(i, settleMs);
        };

        const onUp = (e: PointerEvent) => release(e, false);
        const onCancel = (e: PointerEvent) => release(e, true);

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onCancel);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onCancel);
        };
    }, [land, rootRef]);

    const isDragging = useCallback(() => Boolean(press.current?.drag), []);

    const onLeafClick = (isFlipped: boolean) => {
        if (!dragged.current) go(isFlipped ? -1 : 1);
    };

    return { flipped, turning, inFlight, onPointerDown, onLeafClick, isDragging };
}

import type { CSSProperties } from 'react';
import type { Flight } from '../../hooks/useFlipBook';
import { LEAF_T, flightZ } from './constants';
import NotebookFace, { type Face } from './NotebookFace';

interface NotebookLeafProps {
    index: number;
    total: number;
    front: Face;
    back: Face;
    isFlipped: boolean;
    isTop: boolean;
    flight?: Flight;
    onClick: () => void;
}

function turnClass(flight?: Flight) {
    if (!flight) return '';
    if (flight.drag) return 'leaf--dragging';
    if (flight.settleMs) return 'leaf--settling';
    return `leaf--turning leaf--${flight.dir > 0 ? 'fwd' : 'bwd'}`;
}

// Real height in the stack: the top leaf of each side is the highest. In the air it goes
// above both stacks, and among several the last one to leave lands on top
function leafZ(index: number, total: number, isFlipped: boolean, flight?: Flight) {
    if (flight) return flightZ(total) + (flight.dir > 0 ? index : total - index) * 0.4;
    return isFlipped ? (index + 1) * LEAF_T : (total - index) * LEAF_T;
}

export default function NotebookLeaf({ index, total, front, back, isFlipped, isTop, flight, onClick }: NotebookLeafProps) {
    const style = {
        '--z': `${leafZ(index, total, isFlipped, flight)}px`,
        '--settle-ms': `${flight?.settleMs ?? 0}ms`,
    } as CSSProperties;

    return (
        <div
            className={`leaf ${isFlipped ? 'leaf--flipped' : ''} ${turnClass(flight)} ${isTop ? 'leaf--top' : ''}`}
            data-leaf={index}
            style={style}
            onClick={onClick}
        >
            <NotebookFace face={front} side="front" />
            <NotebookFace face={back} side="back" />
        </div>
    );
}

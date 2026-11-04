import { useMemo, useRef, type CSSProperties } from 'react';
import useCursorTilt from '../../hooks/useCursorTilt';
import useFlipBook from '../../hooks/useFlipBook';
import { LEAF_T } from './constants';
import NotebookLeaf from './NotebookLeaf';
import type { Face } from './NotebookFace';
import PageBlock from './PageBlock';
import Spiral from './Spiral';
import './Notebook.scss';

interface NotebookProps {
    drawings: string[];
    title: string;
    ready: boolean;
}

// Faces in order (cover, drawings, back cover), paired into the two sides of each leaf
function buildLeaves(drawings: string[], title: string) {
    const faces: Face[] = [
        { type: 'cover', title },
        ...drawings.map((src, i): Face => ({ type: 'drawing', src, n: i + 1 })),
    ];
    if (faces.length % 2 === 0) faces.push({ type: 'blank' });
    faces.push({ type: 'backcover' });

    const leaves: { front: Face; back: Face }[] = [];
    for (let i = 0; i < faces.length; i += 2) leaves.push({ front: faces[i], back: faces[i + 1] });
    return leaves;
}

export default function Notebook({ drawings, title, ready }: NotebookProps) {
    const leaves = useMemo(() => buildLeaves(drawings, title), [drawings, title]);
    const rootRef = useRef<HTMLDivElement>(null);
    const { flipped, turning, inFlight, onPointerDown, onLeafClick, isDragging } = useFlipBook(rootRef, leaves.length);
    useCursorTilt(rootRef, isDragging);

    const state = flipped === 0 ? 'closed' : flipped === leaves.length ? 'ended' : 'open';
    const turnDir = turning ? (turning.dir > 0 ? 'book--fwd' : 'book--bwd') : '';
    // Leaves in the air don't count on either side
    const flying = Object.values(inFlight);
    const leftCount = flipped - flying.filter((f) => f.dir > 0).length;
    const rightCount = leaves.length - flipped - flying.filter((f) => f.dir < 0).length;

    return (
        <div className={`notebook ${ready ? 'notebook--ready' : ''}`} ref={rootRef}>
            <div className="stage">
                <div
                    className={`book book--${state} ${turnDir} ${flying.length ? 'book--busy' : ''}`}
                    onPointerDown={onPointerDown}
                >
                    <Spiral leaves={leaves.length} />
                    <PageBlock side="left" count={leftCount} inner={rightCount === 0 && !flying.length} />
                    <PageBlock side="right" count={rightCount} inner={leftCount === 0 && !flying.length} />
                    {turning && leftCount > 0 && (
                        <div className="cast cast--left" style={{ '--z': `${leftCount * LEAF_T + 0.5}px` } as CSSProperties} />
                    )}
                    {turning && rightCount > 0 && (
                        <div className="cast cast--right" style={{ '--z': `${rightCount * LEAF_T + 0.5}px` } as CSSProperties} />
                    )}
                    {leaves.map((leaf, i) => {
                        const isFlipped = i < flipped;
                        const flight = inFlight[i];
                        return (
                            <NotebookLeaf
                                key={i}
                                index={i}
                                total={leaves.length}
                                front={leaf.front}
                                back={leaf.back}
                                isFlipped={isFlipped}
                                // Only the visible leaf of each side reacts to the mouse: a lower
                                // one lifting on hover would pass through the leaves above it
                                isTop={!flight && (i === flipped || i === flipped - 1)}
                                flight={flight}
                                onClick={() => onLeafClick(isFlipped)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

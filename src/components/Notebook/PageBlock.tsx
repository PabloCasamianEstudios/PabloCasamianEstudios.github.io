import type { CSSProperties } from 'react';
import { LEAF_T } from './constants';

interface PageBlockProps {
    side: 'left' | 'right';
    count: number;
    inner: boolean;
}

// Stack of leaves: 3D walls for the outer edge, top and bottom
export default function PageBlock({ side, count, inner }: PageBlockProps) {
    return (
        <div className={`block block--${side}`} style={{ '--h': `${count * LEAF_T}px` } as CSSProperties}>
            <div className="wall wall--outer" />
            {/* The spine only shows when closed: open, it would share a plane with a leaf at 90° */}
            {inner && <div className="wall wall--inner" />}
            <div className="wall wall--top" />
            <div className="wall wall--bottom" />
        </div>
    );
}

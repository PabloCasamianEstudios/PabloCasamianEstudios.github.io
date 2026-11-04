import type { CSSProperties } from 'react';
import { flightZ } from './constants';

const RINGS = 14;

export default function Spiral({ leaves }: { leaves: number }) {
    const style = { '--z': `${flightZ(leaves) + leaves * 0.4 + 2}px` } as CSSProperties;

    return (
        <div className="spiral" aria-hidden="true" style={style}>
            {Array.from({ length: RINGS }, (_, i) => (
                <span key={i} />
            ))}
        </div>
    );
}

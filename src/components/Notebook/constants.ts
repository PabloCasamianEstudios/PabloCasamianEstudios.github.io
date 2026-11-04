export const FLIP_MS = 1100;
export const MAX_TILT = 14; // degrees the notebook leans towards the cursor
export const LEAF_T = 2.5; // thickness of each leaf in px (real 3D depth)

export const DRAG_SLOP = 8; // px the pointer must move to count as a drag
export const DRAG_SPAN = 1.5; // pointer travel to turn a whole leaf, in page widths
export const DRAG_FLICK = 0.4; // px/ms: a fast swipe turns the leaf even before halfway
export const SETTLE_MIN_MS = 220; // shortest time a released leaf takes to land

// Height a turning leaf flies at: above any stack
export const flightZ = (leaves: number) => (leaves + 1) * LEAF_T;

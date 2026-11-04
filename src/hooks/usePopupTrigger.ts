import { useState, type KeyboardEvent } from 'react';

// Makes any element open a popup, with the mouse or the keyboard
export default function usePopupTrigger() {
    const [open, setOpen] = useState(false);

    const triggerProps = {
        role: 'button',
        tabIndex: 0,
        'aria-haspopup': 'dialog' as const,
        onClick: () => setOpen(true),
        onKeyDown: (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpen(true);
            }
        },
    };

    return { open, close: () => setOpen(false), triggerProps };
}

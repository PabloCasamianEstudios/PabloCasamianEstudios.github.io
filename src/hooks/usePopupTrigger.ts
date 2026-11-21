import { useCallback, useRef, useState, type KeyboardEvent, type SyntheticEvent } from 'react';

// Makes any element open a popup, with the mouse or the keyboard
export default function usePopupTrigger() {
    const [open, setOpen] = useState(false);
    const trigger = useRef<HTMLElement | null>(null);

    const show = (e: SyntheticEvent<HTMLElement>) => {
        trigger.current = e.currentTarget;
        setOpen(true);
    };

    const triggerProps = {
        role: 'button',
        tabIndex: 0,
        'aria-haspopup': 'dialog' as const,
        onClick: show,
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                show(e);
            }
        },
    };

    // Stable, so the popup doesn't redo its setup on every render. Focus goes back
    // to whatever opened the popup, so keyboard users don't land at the top of the page
    const close = useCallback(() => {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
    }, []);

    return { open, close, triggerProps };
}

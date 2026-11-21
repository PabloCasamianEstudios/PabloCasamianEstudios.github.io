import { useEffect, useRef } from 'react';
import { Brush, X } from 'lucide-react';
import Folder from '../Folder/Folder';
import { useLang } from '../../context/LanguageContext';
import './DrawerModal.scss';

export default function DrawerModal({ onClose }: { onClose: () => void }) {
    const { t } = useLang();

    const pages = [
        { href: '#/draws', icon: Brush, file: 'draws.zip', label: t('drawings.name') },
    ];

    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onKey = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key !== 'Tab' || !dialogRef.current) return;

            // Keep Tab cycling inside the popup instead of reaching the page behind it
            const focusable = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div className="lightbox-backdrop" onClick={onClose}>
            <div
                ref={dialogRef}
                className="drawer-modal"
                role="dialog"
                aria-modal="true"
                aria-label={t('drawer.legend')}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="drawer-modal-close" onClick={onClose} aria-label={t('common.close')} autoFocus>
                    <X size={18} aria-hidden="true" />
                </button>

                <Folder legend={t('drawer.legend')}>
                    <p className="drawer-modal-intro">
                        {t('drawer.introStart')}
                        <mark>{t('drawer.introHighlight')}</mark>
                        {t('drawer.introEnd')}
                    </p>
                    <div className="drawer-apps">
                        {pages.map(({ href, icon: Icon, file, label }) => (
                            <a key={href} href={href} className="drawer-app">
                                <span className="social-icon" data-tooltip={label}>
                                    <Icon size={34} strokeWidth={1.5} aria-hidden="true" />
                                </span>
                                <span className="drawer-app-name">{file}</span>
                            </a>
                        ))}
                    </div>
                </Folder>
            </div>
        </div>
    );
}

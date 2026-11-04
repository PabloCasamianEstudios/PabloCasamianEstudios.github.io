import { useLang } from '../../context/LanguageContext';

export type Face =
    | { type: 'cover'; title: string }
    | { type: 'drawing'; src: string; n: number }
    | { type: 'blank' }
    | { type: 'backcover' };

interface NotebookFaceProps {
    face: Face;
    side: 'front' | 'back';
}

export default function NotebookFace({ face, side }: NotebookFaceProps) {
    const { t } = useLang();

    return (
        <div className={`face face--${side} face--${face.type}`}>
            {face.type === 'drawing' && (
                <img src={face.src} alt={`${t('drawings.alt')} ${face.n}`} draggable="false" decoding="sync" />
            )}
            {face.type === 'cover' && <div className="yinyang" role="img" aria-label={face.title} />}
            <div className="shade" />
            <div className="turn-shade" />
        </div>
    );
}

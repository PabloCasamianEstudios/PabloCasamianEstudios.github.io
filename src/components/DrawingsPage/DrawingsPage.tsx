import BackLink from '../BackLink/BackLink';
import Notebook from '../Notebook/Notebook';
import { useLang } from '../../context/LanguageContext';
import useImagesReady from '../../hooks/useImagesReady';
import './DrawingsPage.scss';

// Any image dropped in src/assets/dibujos shows up in the notebook
const modules = import.meta.glob<string>('../../assets/dibujos/*.{jpg,jpeg,png,webp,gif}', {
    eager: true,
    import: 'default',
});

// Reverse file name order: higher numbers first (10 before 2)
const drawings = Object.keys(modules)
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
    .map((path) => modules[path]);

export default function DrawingsPage() {
    const { t } = useLang();
    const ready = useImagesReady(drawings);

    return (
        <>
            <BackLink href="#/" />
            <div id="drawings" className={`drawings-page ${ready ? 'drawings-page--ready' : ''}`}>
                <Notebook drawings={drawings} title={t('drawings.title')} ready={ready} />
            </div>
        </>
    );
}

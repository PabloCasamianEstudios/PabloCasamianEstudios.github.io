import { ArrowLeft } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import './BackLink.scss';

export default function BackLink({ href }: { href: string }) {
    const { t } = useLang();

    return (
        <a href={href} className="back-link" aria-label={t('common.back')} title={t('common.back')}>
            <ArrowLeft size={28} strokeWidth={2.25} />
        </a>
    );
}

import DrawerModal from '../DrawerModal/DrawerModal';
import Folder from '../Folder/Folder';
import { useLang } from '../../context/LanguageContext';
import usePopupTrigger from '../../hooks/usePopupTrigger';

export default function DrawerCard() {
    const { open, close, triggerProps } = usePopupTrigger();
    const { t } = useLang();

    return (
        <>
            <div className="drawer-card" {...triggerProps}>
                <Folder legend={t('drawer.legend')}>
                    <div className="drawer-card-content">
                        <span className="drawer-card-label">{t('drawer.click')}</span>
                    </div>
                </Folder>
            </div>

            {open && <DrawerModal onClose={close} />}
        </>
    );
}

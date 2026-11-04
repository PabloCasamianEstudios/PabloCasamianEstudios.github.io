import { Box, Gamepad2 } from 'lucide-react';
import DrawerModal from '../DrawerModal/DrawerModal';
import { useLang } from '../../context/LanguageContext';
import usePopupTrigger from '../../hooks/usePopupTrigger';
import './ProjectsBox.scss';

export default function ProjectsBox() {
    const { open, close, triggerProps } = usePopupTrigger();
    const { t } = useLang();

    return (
        <>
            <div className="projects-box" {...triggerProps}>
                <span className="box-lid" />
                <span className="box-item box-item--first"><Gamepad2 size={16} /></span>
                <span className="box-item box-item--second"><Box size={16} /></span>
                <div className="box-body">
                    <span className="box-label">{t('projects.potpourri')}</span>
                </div>
            </div>

            {open && <DrawerModal onClose={close} />}
        </>
    );
}

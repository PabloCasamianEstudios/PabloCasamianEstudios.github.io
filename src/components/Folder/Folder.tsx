import type { ReactNode } from 'react';
import './Folder.scss';

interface FolderProps {
    legend: string;
    children: ReactNode;
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    className?: string;
}

export default function Folder({ legend, children, style, bodyStyle, className = '' }: FolderProps) {
    return (
        <section className={`section-folder ${className}`} style={style}>
            <div className="folder-legend">{legend}</div>
            <div className="folder-body" style={bodyStyle}>
                {children}
            </div>
        </section>
    );
}

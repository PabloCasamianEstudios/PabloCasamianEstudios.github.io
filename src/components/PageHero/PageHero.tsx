import type { ReactNode } from 'react';
import './PageHero.scss';

interface PageHeroProps {
    title: string;
    subtitle: string;
    children?: ReactNode;
}

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
    return (
        <header className="page-hero">
            <h1>{title}</h1>
            <p className="page-hero-subtitle">{subtitle}</p>
            {children && <div className="page-hero-body">{children}</div>}
        </header>
    );
}

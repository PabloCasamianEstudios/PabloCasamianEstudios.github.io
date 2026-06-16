import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import es from '../i18n/es.json';
import en from '../i18n/en.json';

type Lang = 'es' | 'en';

// Recursive path accessor type
type PathsOf<T, Prefix extends string = ''> = T extends object
    ? { [K in keyof T]: K extends string
        ? T[K] extends object
            ? PathsOf<T[K], `${Prefix}${K}.`>
            : `${Prefix}${K}`
        : never
    }[keyof T]
    : never;

type TranslationKey = PathsOf<typeof es>;

const translations: Record<Lang, typeof es> = { es, en };

function getNestedValue(obj: Record<string, unknown>, path: string): string {
    const parts = path.split('.');
    let current: unknown = obj;
    for (const part of parts) {
        if (current == null || typeof current !== 'object') return path;
        current = (current as Record<string, unknown>)[part];
    }
    return typeof current === 'string' ? current : path;
}

interface LanguageContextValue {
    lang: Lang;
    toggleLang: () => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Lang {
    const stored = localStorage.getItem('lang');
    if (stored === 'es' || stored === 'en') return stored;
    return navigator.language.startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(getInitialLang);

    const toggleLang = useCallback(() => {
        setLang(prev => {
            const next: Lang = prev === 'es' ? 'en' : 'es';
            localStorage.setItem('lang', next);
            return next;
        });
    }, []);

    const t = useCallback((key: TranslationKey): string => {
        return getNestedValue(translations[lang] as unknown as Record<string, unknown>, key);
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang(): LanguageContextValue {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
    return ctx;
}

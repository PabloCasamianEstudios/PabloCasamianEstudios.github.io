import useAge from '../../hooks/useAge';
import Folder from '../Folder/Folder';
import { useLang } from '../../context/LanguageContext';

export default function HomeTab() {
    const age = useAge('2005-05-21T00:00:00');
    const { t } = useLang();

    return (
        <div id="home" className="tab-pane">
            <Folder legend="readme.md">
                <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1rem', color: 'var(--text)' }}>
                    {t('home.greeting')}{' '}

                    <span style={{
                        background: 'var(--accent)',
                        color: '#1e293b',
                        padding: '2px 8px',
                        fontWeight: 800,
                        borderRadius: '6px',
                        fontFamily: 'JetBrains Mono, monospace',
                        whiteSpace: 'nowrap'
                    }}>
                        {age} {t('home.yearsOld')}
                    </span>.

                    <br /><br />

                    {t('home.p1')}

                    <br /><br />

                    {t('home.p2')}
                </p>

                <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'flex-start' }}>
                    <span 
                        className="location-tag" 
                        data-tooltip="Location: Spain > Zaragoza"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            width="16" 
                            height="16"
                        >
                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        <span>ESP</span>
                    </span>
                </div>

            </Folder>


            <Folder legend={t('home.experienceTitle')} style={{ marginTop: '45px' }}>
                <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '15px' }}>
                    <div style={{ marginBottom: '25px' }}>
                        <span className="tech-pill">{t('home.exp1.period')}</span>
                        <h4 style={{ margin: '5px 0 2px', fontSize: '1.1rem' }}>{t('home.exp1.role')}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0 }}>
                            <b>ViewNext</b>. {t('home.exp1.desc')}
                        </p>
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                        <span className="tech-pill">{t('home.exp2.period')}</span>
                        <h4 style={{ margin: '5px 0 2px', fontSize: '1.1rem' }}>{t('home.exp2.role')}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0 }}>
                            CPIFP Los Enlaces. {t('home.exp2.desc')} <b>ViewNext</b>.
                        </p>
                    </div>
                    <div>
                        <span className="tech-pill">{t('home.exp3.period')}</span>
                        <h4 style={{ margin: '5px 0 2px', fontSize: '1.1rem' }}>{t('home.exp3.role')}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0 }}>
                            CPIFP Los Enlaces. {t('home.exp3.desc')} <b>Deloitte</b>.
                        </p>
                    </div>
                </div>
            </Folder>
        </div>
    );
}

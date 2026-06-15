import useAge from '../../hooks/useAge';
import Folder from '../Folder/Folder';

export default function HomeTab() {
    const age = useAge('2005-05-21T00:00:00');

    return (
        <div id="home" className="tab-pane">
            <Folder legend="readme.md">
                <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1rem', color: 'var(--text)' }}>
    ¡Hola! Soy Pablo, desarrollador Full Stack, y tengo{' '}

    <span style={{
        background: 'var(--accent)',
        color: '#1e293b',
        padding: '2px 8px',
        fontWeight: 800,
        borderRadius: '6px',
        fontFamily: 'JetBrains Mono, monospace',
        whiteSpace: 'nowrap'
    }}>
        {age} años
    </span>.

    <br /><br />

    Desde pequeño siempre me ha gustado crear cosas. Con el tiempo descubrí en la programación la mejor forma de convertir ideas en proyectos reales.

    <br /><br />

    Actualmente trabajo desarrollando software apoyado por IA, utilizando herramientas como VS Code y GitHub Copilot para acelerar procesos, experimentar y construir soluciones de forma más eficiente.
</p>
            </Folder>

            <Folder legend="experience.log" style={{ marginTop: '45px' }}>
                <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '15px' }}>
                    <div style={{ marginBottom: '25px' }}>
                        <span className="tech-pill">2026 - Actualidad</span>
                        <h4 style={{ margin: '5px 0 2px', fontSize: '1.1rem' }}>Desarrollador Junior</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0 }}>
                            <b>ViewNext</b>. Desarrollo de software para el sector asegurador.
                        </p>
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                        <span className="tech-pill">2025 - 2026</span>
                        <h4 style={{ margin: '5px 0 2px', fontSize: '1.1rem' }}>GS DAM (Multiplataforma)</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0 }}>
                            CPIFP Los Enlaces. Prácticas en <b>ViewNext</b>.
                        </p>
                    </div>
                    <div>
                        <span className="tech-pill">2023 - 2025</span>
                        <h4 style={{ margin: '5px 0 2px', fontSize: '1.1rem' }}>GS DAW (Desarrollo Web)</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0 }}>
                            CPIFP Los Enlaces. Prácticas en <b>Deloitte</b>.
                        </p>
                    </div>
                </div>
            </Folder>
        </div>
    );
}

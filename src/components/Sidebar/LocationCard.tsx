import useClock from '../../hooks/useClock';
import Folder from '../Folder/Folder';

export default function LocationCard() {
    const { formattedTime, formattedDate } = useClock();

    return (
        <Folder 
            legend="location.esp" 
            bodyStyle={{ background: 'var(--accent)', color: '#1e293b' }}
        >
            <div className="clock-container" style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 800,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div id="time" style={{ fontSize: '1.3rem', lineHeight: 1.1, fontWeight: 800 }}>{formattedTime}</div>
                <div id="date" style={{ fontSize: '0.8rem', opacity: 0.7 }}>{formattedDate}</div>
            </div>
        </Folder>
    );
}

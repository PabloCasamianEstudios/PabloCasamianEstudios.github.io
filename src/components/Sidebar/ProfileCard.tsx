import { useState } from 'react';
import { User } from 'lucide-react';
import Folder from '../Folder/Folder';

export default function ProfileCard() {
    const [imgError, setImgError] = useState(false);

    return (
        <Folder legend="pablo.casamian" bodyStyle={{ textAlign: 'center' }}>
            <div style={{
                width: '60px',
                height: '60px',
                background: imgError ? 'var(--accent)' : 'transparent',
                borderRadius: '14px',
                margin: '0 auto 12px',
                border: '2px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1e293b',
                overflow: 'hidden'
            }}>
                {!imgError ? (
                    <img 
                        src="/pablocasamianestudios.png" 
                        alt="Pablo Casamián" 
                        onError={() => setImgError(true)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <User size={30} />
                )}
            </div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Pablo Casamián</h3>
            <p style={{
                fontSize: '0.7rem',
                color: 'var(--text-dim)',
                fontFamily: 'JetBrains Mono, monospace'
            }}>Fullstack Developer</p>
        </Folder>
    );
}

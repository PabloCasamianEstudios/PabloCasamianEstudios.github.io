import './Footer.scss';

export default function Footer() {
    const commitHash = import.meta.env.VITE_COMMIT_HASH || 'unknown';
    const repoUrl = 'https://github.com/PabloCasamianEstudios/PabloCasamianEstudios.github.io';
    
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <a 
                    href={repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    source code
                </a>
                <span className="separator">/</span>
                <a 
                    href={`${repoUrl}/commit/${commitHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-link commit-hash"
                >
                    {commitHash}
                </a>
            </div>
        </footer>
    );
}

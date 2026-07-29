import { ExternalLink } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import './YoutubeCard.scss';

interface YoutubeCardProps {
    channelUrl?: string;
    channelName?: string;
    handle?: string;
    avatarUrl?: string;
}

export default function YoutubeCard({
    channelUrl = "https://www.youtube.com/@yingsplayroom",
    channelName = "ying audio",
    handle = "@yingsplayroom",
    avatarUrl
}: YoutubeCardProps) {
    const { t } = useLang();
    const avatarSrc = avatarUrl || `https://unavatar.io/youtube/${handle}`;

    return (
        <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="yt-channel-card"
        >
            <div className="yt-card-header">
                <div className="yt-avatar-wrapper">
                    <img
                        src={avatarSrc}
                        alt={channelName}
                        className="yt-avatar-img"
                        onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                        }}
                    />
                    <div className="yt-badge">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="#ff0000">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </div>
                </div>

                <div className="yt-info">
                    <h3 className="yt-channel-name">{channelName}</h3>
                    <span className="yt-handle">{handle}</span>
                </div>
            </div>

            <div className="yt-action">
                <span className="yt-btn">
                    {t('editing.visitChannel')} <ExternalLink size={13} />
                </span>
            </div>
        </a>
    );
}



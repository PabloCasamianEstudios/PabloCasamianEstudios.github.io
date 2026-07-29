import { useState } from 'react';
import { ZoomIn, X, ExternalLink, Play, Image as ImageIcon, Video, Music } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import Folder from '../Folder/Folder';
import YoutubeCard from '../YoutubeCard/YoutubeCard';
import editingData from '../../data/editing.json';

interface EditingItem {
    id: number;
    title: string;
    src: string;
    audioUrl?: string;
    category?: 'image' | 'video' | 'audio';
    link?: string;
    description?: string;
    description_en?: string;
}

const SHUFFLED_ORDER: Record<number, number> = {
    16: 1, 7: 2, 12: 3, 3: 4, 15: 5, 9: 6, 2: 7, 14: 8,
    6: 9, 11: 10, 4: 11, 13: 12, 8: 13, 1: 14, 10: 15, 5: 16
};

function EditingCardItem({ item, lang, onClick }: { item: EditingItem; lang: string; onClick: () => void }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const description = lang === 'en' && item.description_en ? item.description_en : item.description;

    return (
        <div
            className={`masonry-item ${!isLoaded ? 'is-loading' : ''}`}
            onClick={onClick}
        >
            <img 
                src={item.src} 
                alt={item.title} 
                loading="lazy" 
                className={isLoaded ? 'loaded' : ''}
                onLoad={() => setIsLoaded(true)}
            />

            <div className="masonry-overlay">
                <div className="overlay-icon">
                    {item.category === 'video' ? (
                        <Play size={24} />
                    ) : item.category === 'audio' ? (
                        <Music size={24} />
                    ) : (
                        <ZoomIn size={24} />
                    )}
                </div>
                <div className="masonry-caption">
                    <h4>{item.title}</h4>
                    {description && <p>{description}</p>}
                </div>
            </div>
        </div>
    );
}

export default function EditingTab() {
    const { lang, t } = useLang();
    const [filter, setFilter] = useState<'image' | 'video' | 'audio'>('image');
    const [selectedItem, setSelectedItem] = useState<EditingItem | null>(null);

    const sortedItems = [...editingData]
        .sort((a, b) => (SHUFFLED_ORDER[a.id] ?? a.id) - (SHUFFLED_ORDER[b.id] ?? b.id))
        .filter((item) => item.category === filter) as EditingItem[];

    return (
        <div id="editing" className="tab-pane">
            <Folder legend={t('editing.introLegend')}>
                <p style={{ margin: 0, lineHeight: 1.8, fontSize: '0.98rem', color: 'var(--text-main)' }}>
                    {t('editing.introP1')}
                    <br /><br />
                    {t('editing.introP2')}
                </p>
            </Folder>

            <Folder legend={t('editing.legend')} style={{ marginTop: '35px' }}>
                <div className="editing-header">
                    <div className="editing-filters">
                        <button
                            className={`filter-btn ${filter === 'image' ? 'active' : ''}`}
                            onClick={() => setFilter('image')}
                        >
                            <ImageIcon size={14} />
                            {t('editing.filterImages')}
                        </button>
                        <button
                            className={`filter-btn ${filter === 'video' ? 'active' : ''}`}
                            onClick={() => setFilter('video')}
                        >
                            <Video size={14} />
                            {t('editing.filterVideos')}
                        </button>
                        <button
                            className={`filter-btn ${filter === 'audio' ? 'active' : ''}`}
                            onClick={() => setFilter('audio')}
                        >
                            <Music size={14} />
                            {t('editing.filterAudio')}
                        </button>
                    </div>
                </div>

                {filter === 'audio' && (
                    <YoutubeCard
                        channelUrl="https://www.youtube.com/@yingsplayroom"
                        channelName="ying audio"
                        handle="@yingsplayroom"
                    />
                )}
                {filter === 'video' && (
                    <YoutubeCard
                        channelUrl="https://www.youtube.com/@ReYingYang"
                        channelName="ReYingYang"
                        handle="@ReYingYang"
                    />
                )}

                <div className="masonry-gallery">
                    {sortedItems.map((item) => (
                        <EditingCardItem key={item.id} item={item} lang={lang} onClick={() => setSelectedItem(item)} />
                    ))}
                </div>
            </Folder>

            {selectedItem && (
                <div className="lightbox-backdrop" onClick={() => setSelectedItem(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="lightbox-close" 
                            onClick={() => setSelectedItem(null)}
                            aria-label="Cerrar"
                        >
                            <X size={20} />
                        </button>

                        <div className="lightbox-media-container">
                            {selectedItem.category === 'video' ? (
                                <video src={selectedItem.src} controls autoPlay className="lightbox-media" />
                            ) : selectedItem.category === 'audio' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '30px' }}>
                                    <img src={selectedItem.src} alt={selectedItem.title} className="lightbox-media" style={{ maxHeight: '40vh', borderRadius: '8px', marginBottom: '20px' }} />
                                    <audio src={selectedItem.audioUrl || selectedItem.src} controls autoPlay style={{ width: '100%', maxWidth: '500px' }} />
                                </div>
                            ) : (
                                <img src={selectedItem.src} alt={selectedItem.title} className="lightbox-media" />
                            )}
                        </div>

                        <div className="lightbox-details">
                            <h3>{selectedItem.title}</h3>
                            {selectedItem.description && (
                                <p style={{ marginBottom: '10px' }}>
                                    {lang === 'en' && selectedItem.description_en ? selectedItem.description_en : selectedItem.description}
                                </p>
                            )}

                            {selectedItem.link && (
                                <a 
                                    href={selectedItem.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-demo"
                                    style={{ display: 'inline-flex', marginTop: '8px' }}
                                >
                                    <ExternalLink size={14} /> Link
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

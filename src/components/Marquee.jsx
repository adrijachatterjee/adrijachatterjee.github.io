import { Sparkle } from './Icons';

const words = ['matcha', 'code', 'chai', 'poetry', 'café hopping', 'travel', 'coffee', 'keats', 'anime', 'manga', 'manhwa', 'illustrations', 'playlists', 'night drives', 'pink floyd', 'soot sprites', 'astrology', 'palmistry', 'tarot', 'trying new things'];

// A soft, drifting ribbon of words with little twinkling sparkles in between.
export default function Marquee() {
    const row = words.map((w, i) => (
        <span key={i} className="mq-item" style={{ '--d': `${(i % 6) * -0.7}s` }}>
            <span className="mq-word">{w}</span>
            <Sparkle size={12} className="mq-spark" />
        </span>
    ));
    return (
        <div className="ribbon" aria-hidden="true">
            <div className="ribbon-track"><div className="ribbon-row">{row}</div><div className="ribbon-row">{row}</div></div>
        </div>
    );
}

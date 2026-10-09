import Konpeito, { KONPEITO_COLORS } from '../art/Konpeito';

const words = ['matcha', 'code', 'chai', 'poetry', 'café hopping', 'travel', 'lattes', 'keats', 'anime', 'manga', 'manhwa', 'illustrations', 'playlists', 'night drives', 'pink floyd', 'soot sprites', 'astrology', 'palmistry', 'tarot', 'trying new things'];

export default function Marquee() {
    const row = words.map((w, i) => (
        <span key={i} className="mq-item">{w}<Konpeito size={20} color={KONPEITO_COLORS[i % KONPEITO_COLORS.length]} /></span>
    ));
    return (
        <div className="marquee" aria-hidden="true">
            <div className="marquee-track"><div>{row}</div><div>{row}</div></div>
        </div>
    );
}

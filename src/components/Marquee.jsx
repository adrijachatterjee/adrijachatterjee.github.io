const words = ['matcha', 'code', 'chai', 'poetry', 'café hopping', 'travel', 'coffee', 'keats', 'anime', 'manga', 'manhwa', 'illustrations', 'playlists', 'night drives', 'pink floyd', 'soot sprites', 'astrology', 'palmistry', 'tarot', 'trying new things'];
const colors = ['#ffb3c7', '#ffe08a', '#b9f0d2', '#cdb8ff', '#a9dcff', '#ffc9a8'];

// A string of festive bunting that drifts sideways, each pennant swaying on the rope.
export default function Marquee() {
    const row = words.map((w, i) => (
        <span key={i} className="flag" style={{ '--c': colors[i % colors.length], '--d': `${(i % 5) * -0.6}s` }}>
            <span>{w}</span>
        </span>
    ));
    return (
        <div className="bunting" aria-hidden="true">
            <div className="bunting-track"><div className="bunting-row">{row}</div><div className="bunting-row">{row}</div></div>
        </div>
    );
}

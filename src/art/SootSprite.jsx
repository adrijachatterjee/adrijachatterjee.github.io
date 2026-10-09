// Susuwatari: the soot sprites from Spirited Away and Totoro.
function fuzz(cx, cy, r, spikes = 30) {
    const pts = [];
    for (let i = 0; i < spikes * 2; i++) {
        const a = (i / (spikes * 2)) * Math.PI * 2;
        const jitter = 1 + Math.sin(i * 12.9898) * 0.06;
        const rr = (i % 2 ? r : r * 1.2) * jitter;
        pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
    }
    return `M${pts.join(' L')} Z`;
}

const BODY = fuzz(30, 32, 19);

export default function SootSprite({ size = 56, look = 0, className = '' }) {
    return (
        <svg viewBox="0 0 60 60" width={size} height={size} className={`soot ${className}`} aria-hidden="true">
            <path d={BODY} fill="#16121c" />
            <g className="soot-eyes">
                <circle cx="23" cy="30" r="5.5" fill="#fff" />
                <circle cx="37" cy="30" r="5.5" fill="#fff" />
                <circle cx={23 + look} cy="31" r="2.2" fill="#16121c" />
                <circle cx={37 + look} cy="31" r="2.2" fill="#16121c" />
            </g>
        </svg>
    );
}

// The little star candy that soot sprites love.
function star(cx, cy, r, points = 9) {
    const pts = [];
    for (let i = 0; i < points * 2; i++) {
        const a = (i / (points * 2)) * Math.PI * 2;
        const rr = i % 2 ? r * 0.72 : r;
        pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
    }
    return `M${pts.join(' L')} Z`;
}

const SHAPE = star(12, 12, 9);
export const KONPEITO_COLORS = ['#ffb3c7', '#ffe08a', '#b9f0d2', '#cdb8ff', '#a9dcff'];

export default function Konpeito({ size = 18, color = '#ffb3c7', className = '' }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
            <path d={SHAPE} fill={color} stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
            <circle cx="9" cy="9" r="2" fill="#fff" opacity="0.7" />
        </svg>
    );
}

export const KONPEITO_PATH = SHAPE;

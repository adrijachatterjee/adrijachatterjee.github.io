// The vine-and-flower frame around Howl's door, with Alice-in-Wonderland bits:
// a sleepy doorknob, toadstools and a little "drink me" bottle.
// Frame geometry: the door opening is 240 × 360 at (40, 40), arched with radius 120.

const LEFT = 360, ARC = Math.PI * 120, TOTAL = LEFT * 2 + ARC;

function pointAt(s) {
    if (s < LEFT) return { x: 40, y: 400 - s, nx: -1, ny: 0 };
    if (s < LEFT + ARC) {
        const th = Math.PI - (s - LEFT) / 120;
        return { x: 160 + 120 * Math.cos(th), y: 160 - 120 * Math.sin(th), nx: Math.cos(th), ny: -Math.sin(th) };
    }
    return { x: 280, y: 160 + (s - LEFT - ARC), nx: 1, ny: 0 };
}

const vine = [];
for (let s = 0; s <= TOTAL; s += 6) {
    const p = pointAt(s);
    const o = Math.sin(s / 24) * 8 + 2;
    vine.push(`${(p.x + p.nx * o).toFixed(1)},${(p.y + p.ny * o).toFixed(1)}`);
}
const VINE = `M${vine.join(' L')}`;

const leaves = [];
const flowers = [];
for (let s = 10, i = 0; s < TOTAL; s += 30, i++) {
    const p = pointAt(s);
    const side = i % 2 ? 12 : -2;
    const o = Math.sin(s / 24) * 8 + side;
    const ang = (Math.atan2(p.ny, p.nx) * 180) / Math.PI + (i % 2 ? 40 : -40);
    leaves.push({ x: p.x + p.nx * o, y: p.y + p.ny * o, a: ang, c: ['#6fb768', '#8cc474', '#5fa65a'][i % 3] });
    if (i % 3 === 1) flowers.push({ x: p.x + p.nx * (o + 4), y: p.y + p.ny * (o + 4), c: ['#ffb3c7', '#fff4f8', '#cdb8ff', '#ffe08a'][i % 4] });
}

function Flower({ x, y, c, r = 5 }) {
    return (
        <g transform={`translate(${x} ${y})`} className="vine-flower">
            {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy={-r} rx={r * 0.62} ry={r} fill={c} transform={`rotate(${a})`} />)}
            <circle r={r * 0.5} fill="#ffcf5c" />
        </g>
    );
}

export function DoorFrame() {
    return (
        <svg className="door-frame" viewBox="0 0 320 440" aria-hidden="true">
            <path d="M40 400 V160 A120 120 0 0 1 280 160 V400" stroke="#6b4a2e" strokeWidth="16" fill="none" />
            <path d="M40 400 V160 A120 120 0 0 1 280 160 V400" stroke="#a87a4a" strokeWidth="3" fill="none" transform="translate(0 0)" opacity="0.8" />
            <path d={VINE} stroke="#4f8f45" strokeWidth="3" fill="none" strokeLinecap="round" />
            {leaves.map((l, i) => <ellipse key={i} cx={l.x} cy={l.y} rx="8" ry="3.6" fill={l.c} transform={`rotate(${l.a} ${l.x} ${l.y})`} />)}
            {flowers.map((f, i) => <Flower key={i} {...f} />)}
            <g className="tendrils" stroke="#4f8f45" strokeWidth="2" fill="none" strokeLinecap="round">
                <path d="M110 52 q-6 20 4 30 q8 8 0 14" />
                <path d="M212 54 q8 18 -2 28 q-8 8 2 16" />
            </g>
            <Flower x={114} y={96} c="#ffb3c7" r={4} />
            <Flower x={204} y={98} c="#cdb8ff" r={4} />

            <g className="shroom">
                <rect x="14" y="404" width="10" height="22" rx="4" fill="#fff4e6" />
                <path d="M2 408 Q19 384 36 408 Z" fill="#e0525f" />
                <circle cx="13" cy="400" r="2.4" fill="#fff" /><circle cx="24" cy="397" r="2" fill="#fff" /><circle cx="29" cy="404" r="1.6" fill="#fff" />
                <rect x="30" y="416" width="7" height="12" rx="3" fill="#fff4e6" />
                <path d="M24 418 Q33.5 404 43 418 Z" fill="#f08a5d" />
                <circle cx="31" cy="413" r="1.5" fill="#fff" />
            </g>
            <g className="drink-me" transform="translate(292 392)">
                <rect x="-4" y="-12" width="8" height="8" rx="2" fill="#a87a4a" />
                <path d="M-6 -4 h12 l4 10 v20 a4 4 0 0 1 -4 4 h-12 a4 4 0 0 1 -4 -4 v-20 z" fill="#b9e6ff" opacity="0.9" />
                <path d="M-8 14 h16 v12 a3 3 0 0 1 -3 3 h-10 a3 3 0 0 1 -3 -3 z" fill="#ff9ec7" />
                <path d="M4 -8 q10 -2 12 8" stroke="#6b4a2e" strokeWidth="1" fill="none" />
                <rect x="9" y="0" width="18" height="10" rx="1.5" fill="#fff8ec" stroke="#c9a26a" strokeWidth="0.8" transform="rotate(14 9 0)" />
                <text x="11" y="7.5" fontSize="4.6" fontFamily="Caveat, cursive" fill="#6b4a2e" transform="rotate(14 9 0)">drink me</text>
            </g>
        </svg>
    );
}

// The wooden door itself, with carved panels, a keyhole and a sleepy doorknob.
export function DoorPanel() {
    return (
        <svg viewBox="0 0 240 360" preserveAspectRatio="none" className="door-art" aria-hidden="true">
            <defs>
                <linearGradient id="wood" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#9a6a40" /><stop offset="100%" stopColor="#7d5131" />
                </linearGradient>
            </defs>
            <rect width="240" height="360" fill="url(#wood)" />
            {[48, 96, 144, 192].map((x) => <path key={x} d={`M${x} 0 V360`} stroke="#6b4426" strokeWidth="1.5" opacity="0.5" />)}
            <path d="M40 330 V140 A80 80 0 0 1 200 140 V330 Z" fill="none" stroke="#6b4426" strokeWidth="5" />
            <path d="M58 312 V150 A62 62 0 0 1 182 150 V312 Z" fill="none" stroke="#b4824f" strokeWidth="2" opacity="0.8" />
            <path d="M120 112 l7 12 l-7 12 l-7 -12 z" fill="#e2b864" />
            <g transform="translate(196 196)">
                <circle r="15" fill="#e2b864" stroke="#b08a3a" strokeWidth="2" />
                <path d="M-7 -2 q3 3 6 0 M2 -2 q3 3 6 0" stroke="#6b4a2e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                <path d="M-4 6 q4 3 8 0" stroke="#6b4a2e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                <circle cx="-9" cy="3" r="2.4" fill="#ff9fb4" opacity="0.7" /><circle cx="9" cy="3" r="2.4" fill="#ff9fb4" opacity="0.7" />
            </g>
            <path d="M196 226 a4 4 0 1 1 0.1 0 l3 12 h-6 z" fill="#3b2a1e" />
        </svg>
    );
}

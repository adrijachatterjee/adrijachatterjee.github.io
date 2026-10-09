// Tiny illustrated scenes for each place, drawn to fit behind Howl's door (200 × 300).

function Sky({ id, from, to }) {
    return (
        <>
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={from} />
                    <stop offset="100%" stopColor={to} />
                </linearGradient>
            </defs>
            <rect width="200" height="300" fill={`url(#${id})`} />
        </>
    );
}

// Kolkata: Howrah Bridge at sunset, a yellow taxi and a boat on the Hooghly.
export function Kolkata() {
    return (
        <g>
            <Sky id="sk-kol" from="#ffcfa0" to="#ff9e9e" />
            <circle cx="100" cy="150" r="34" fill="#fff1c9" opacity="0.9" />
            <rect y="226" width="200" height="74" fill="#7fb3d6" />
            <path d="M0 240 Q50 234 100 240 T200 240" stroke="#a9d0ea" strokeWidth="2" fill="none" />
            <g stroke="#4b4660" strokeWidth="3" fill="none" strokeLinejoin="round">
                <path d="M34 226 V110 M48 226 V110 M152 226 V110 M166 226 V110" />
                <path d="M34 110 H48 M152 110 H166 M34 140 H48 M152 140 H166" />
                <path d="M48 116 L100 196 L152 116" />
                <path d="M48 140 L76 196 M152 140 L124 196 M66 144 L100 196 L134 144" strokeWidth="2" />
                <path d="M0 196 H200" strokeWidth="5" />
                <path d="M0 150 L34 196 M200 150 L166 196" strokeWidth="2" />
            </g>
            <g>
                <rect x="84" y="184" width="26" height="10" rx="3" fill="#ffd23f" />
                <rect x="89" y="179" width="15" height="7" rx="2" fill="#ffd23f" />
                <circle cx="90" cy="195" r="2.6" fill="#2a2440" /><circle cx="105" cy="195" r="2.6" fill="#2a2440" />
            </g>
            <path d="M120 262 h40 l-6 8 h-28 z" fill="#8a5a3a" />
            <path d="M138 262 v-18 l12 16 z" fill="#fff8ec" />
        </g>
    );
}

// Bengaluru: a domed hall under jacaranda trees, with a cup of coffee steaming.
export function Bengaluru() {
    return (
        <g>
            <Sky id="sk-blr" from="#b9e2ff" to="#f3e6ff" />
            <ellipse cx="100" cy="300" rx="160" ry="70" fill="#9fd48a" />
            <g fill="#fff8ec" stroke="#cbb89a" strokeWidth="1.5">
                <rect x="42" y="182" width="116" height="48" />
                <rect x="70" y="160" width="60" height="22" />
                <path d="M78 160 Q100 116 122 160 Z" />
            </g>
            <path d="M100 118 v-10" stroke="#cbb89a" strokeWidth="2" />
            <g stroke="#cbb89a" strokeWidth="2">
                {[52, 64, 76, 88, 112, 124, 136, 148].map((x) => <path key={x} d={`M${x} 188 V226`} />)}
            </g>
            <rect x="92" y="204" width="16" height="26" rx="8" fill="#e6d6bb" />
            {[[26, 196], [176, 200]].map(([x, y]) => (
                <g key={x}>
                    <rect x={x - 3} y={y} width="6" height="42" fill="#7a5236" />
                    <circle cx={x} cy={y - 8} r="20" fill="#a77bd9" />
                    <circle cx={x - 14} cy={y + 2} r="13" fill="#c39bf0" />
                    <circle cx={x + 13} cy={y} r="14" fill="#b68be6" />
                </g>
            ))}
            {[[40, 262], [70, 270], [150, 266], [120, 276]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" fill="#c39bf0" />)}
        </g>
    );
}

// India: the Taj Mahal at dawn, reflected in its pool.
export function India() {
    return (
        <g>
            <Sky id="sk-ind" from="#ffd6e6" to="#ffe9c7" />
            <rect y="226" width="200" height="74" fill="#cfe9c9" />
            <rect x="88" y="232" width="24" height="68" fill="#9fd3f5" />
            <g fill="#fffaf0" stroke="#e2cfae" strokeWidth="1.5">
                <rect x="30" y="218" width="140" height="10" />
                <rect x="62" y="160" width="76" height="58" />
                <path d="M74 160 C74 128 88 116 100 100 C112 116 126 128 126 160 Z" />
                <path d="M62 160 C62 148 68 144 72 140 C76 144 82 148 82 160 Z" />
                <path d="M118 160 C118 148 124 144 128 140 C132 144 138 148 138 160 Z" />
                {[38, 156].map((x) => <rect key={x} x={x} y="140" width="7" height="78" />)}
                {[38, 156].map((x) => <path key={`c${x}`} d={`M${x - 2} 140 Q${x + 3.5} 128 ${x + 9} 140 Z`} />)}
            </g>
            <path d="M100 100 v-10" stroke="#e2cfae" strokeWidth="2" />
            <path d="M90 218 V190 Q100 176 110 190 V218" fill="#f1e4cc" />
        </g>
    );
}

// United Kingdom: a clock tower in the rain and a red phone box.
export function UnitedKingdom() {
    return (
        <g>
            <Sky id="sk-uk" from="#9fb8d6" to="#dfe7f2" />
            <g stroke="#ffffff" strokeWidth="1.4" opacity="0.7">
                {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${(i * 23) % 200} ${(i * 41) % 200} l-4 12`} />)}
            </g>
            <rect y="236" width="200" height="64" fill="#8fa3b8" />
            <g fill="#d9c49a" stroke="#a8925f" strokeWidth="1.5">
                <rect x="78" y="96" width="40" height="140" />
                <path d="M74 96 L98 40 L122 96 Z" />
            </g>
            <circle cx="98" cy="118" r="13" fill="#fffaf0" stroke="#a8925f" strokeWidth="2" />
            <path d="M98 118 V109 M98 118 L104 121" stroke="#2a2440" strokeWidth="1.8" strokeLinecap="round" />
            <g stroke="#a8925f" strokeWidth="1.5">
                {[150, 172, 194, 216].map((y) => <path key={y} d={`M80 ${y} H116`} />)}
            </g>
            <rect x="140" y="196" width="26" height="40" rx="3" fill="#d6363f" />
            <rect x="144" y="204" width="18" height="18" fill="#fbe8b8" />
            <path d="M140 200 Q153 188 166 200" fill="#d6363f" />
            <g transform="translate(36 206)">
                <path d="M-16 0 Q0 -18 16 0 Z" fill="#2a2440" />
                <path d="M0 0 V22 q0 4 -4 4" stroke="#2a2440" strokeWidth="2" fill="none" />
            </g>
        </g>
    );
}

// Europe: pastel gabled houses by a canal and a hot-air balloon.
export function Europe() {
    const houses = [
        ['#ffb3c7', 30], ['#ffe08a', 34], ['#a9dcff', 30], ['#b9f0d2', 34], ['#cdb8ff', 30],
    ];
    let x = 8;
    return (
        <g>
            <Sky id="sk-eu" from="#c9b8ff" to="#ffe3d3" />
            <g transform="translate(140 70)">
                <path d="M-20 0 C-20 -28 20 -28 20 0 C20 14 6 22 4 30 H-4 C-6 22 -20 14 -20 0 Z" fill="#ff7eb3" />
                <path d="M-8 -22 C-10 0 -4 18 -4 30 M8 -22 C10 0 4 18 4 30" stroke="#fff" strokeWidth="2" fill="none" opacity="0.7" />
                <rect x="-6" y="34" width="12" height="9" rx="2" fill="#8a5a3a" />
                <path d="M-4 30 L-5 34 M4 30 L5 34" stroke="#8a5a3a" strokeWidth="1.2" />
            </g>
            <rect y="244" width="200" height="56" fill="#7fb3d6" />
            {houses.map(([c, w], i) => {
                const hx = x;
                x += w + 6;
                const top = 150 + (i % 2) * 14;
                return (
                    <g key={i}>
                        <path d={`M${hx} 244 V${top} h${w * 0.2} v-10 h${w * 0.2} v-10 h${w * 0.2} v10 h${w * 0.2} v10 h${w * 0.2} V244 Z`} fill={c} stroke="#fff" strokeWidth="1.5" />
                        <rect x={hx + w * 0.3} y={top + 16} width={w * 0.4} height="12" fill="#fffaf0" />
                        <rect x={hx + w * 0.3} y={top + 40} width={w * 0.4} height="12" fill="#fffaf0" />
                        <rect x={hx + w * 0.35} y="226" width={w * 0.3} height="18" fill="#8a5a3a" />
                    </g>
                );
            })}
            <path d="M0 256 Q50 250 100 256 T200 256" stroke="#a9d0ea" strokeWidth="2" fill="none" />
        </g>
    );
}

export const SCENES = { Kolkata, Bengaluru, India, 'United Kingdom': UnitedKingdom, Europe };

export default function PlaceScene({ name, className = '', slice = true }) {
    const Scene = SCENES[name];
    return (
        <svg viewBox="0 0 200 300" className={className} preserveAspectRatio={slice ? 'xMidYMid slice' : 'xMidYMid meet'} role="img" aria-label={name}>
            <Scene />
        </svg>
    );
}

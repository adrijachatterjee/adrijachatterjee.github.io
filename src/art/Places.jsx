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

// India: Himalayan peaks, a shikara on a lake and a string of prayer flags.
export function India() {
    const flags = ['#4b7fd1', '#fff8ec', '#e0525f', '#5fa65a', '#f2b84b'];
    return (
        <g>
            <Sky id="sk-ind" from="#a9d6f5" to="#ffe6d6" />
            <path d="M-10 200 L50 90 L80 130 L120 60 L160 120 L210 80 V220 H-10 Z" fill="#8fa3c8" />
            <path d="M50 90 L62 112 L54 108 L44 118 Z M120 60 L136 88 L124 82 L112 92 Z M210 80 L196 104 L186 100 Z" fill="#fffaf0" />
            <path d="M-10 214 Q60 180 120 206 T210 196 V230 H-10 Z" fill="#7cbf6a" />
            <rect y="226" width="200" height="74" fill="#7fb3d6" />
            <path d="M0 246 Q50 240 100 246 T200 246" stroke="#a9d0ea" strokeWidth="2" fill="none" />
            <path d="M62 262 Q100 276 140 262 L134 270 Q100 280 68 270 Z" fill="#8a5a3a" />
            <path d="M84 262 V246 H118 V262" fill="#e0525f" />
            <path d="M80 246 H122 L116 240 H86 Z" fill="#f2b84b" />
            <path d="M10 40 Q100 76 190 36" stroke="#6b4a2e" strokeWidth="1" fill="none" />
            {Array.from({ length: 9 }, (_, i) => {
                const x = 22 + i * 19;
                const y = 44 + Math.sin((i / 8) * Math.PI) * 14;
                return <rect key={i} x={x} y={y} width="11" height="13" fill={flags[i % 5]} transform={`rotate(${(i - 4) * 3} ${x} ${y})`} />;
            })}
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

// France: the Eiffel Tower over a café awning.
export function France() {
    return (
        <g>
            <Sky id="sk-fr" from="#cfe2ff" to="#ffe1ea" />
            <rect y="250" width="200" height="50" fill="#e8dcc8" />
            <g fill="none" stroke="#6b5a7a" strokeWidth="2.6" strokeLinejoin="round">
                <path d="M100 40 L92 120 L70 250 M100 40 L108 120 L130 250" />
                <path d="M86 150 L114 150 M80 190 L120 190 M90 120 H110" strokeWidth="4" />
                <path d="M80 250 Q100 206 120 250" />
                <path d="M94 120 L106 150 M106 120 L94 150 M86 150 L114 190 M114 150 L86 190" strokeWidth="1.2" />
            </g>
            <path d="M100 30 v12" stroke="#6b5a7a" strokeWidth="2" />
            <g transform="translate(0 220)">
                {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${i * 40} 0 h40 v14 q-10 8 -20 0 q-10 8 -20 0 z`} fill={i % 2 ? '#fff8ec' : '#e0525f'} />)}
            </g>
            <circle cx="40" cy="262" r="9" fill="#fff8ec" stroke="#6b5a7a" strokeWidth="1.5" />
            <path d="M40 271 v20 M32 291 h16" stroke="#6b5a7a" strokeWidth="2" />
            <circle cx="160" cy="262" r="9" fill="#fff8ec" stroke="#6b5a7a" strokeWidth="1.5" />
            <path d="M160 271 v20 M152 291 h16" stroke="#6b5a7a" strokeWidth="2" />
        </g>
    );
}

// Switzerland: a snowy peak, a chalet and a very blue lake.
export function Switzerland() {
    return (
        <g>
            <Sky id="sk-ch" from="#8fcaf2" to="#e9f6ff" />
            <path d="M20 220 L110 50 L150 120 L190 90 L230 220 Z" fill="#7e8fb0" />
            <path d="M110 50 L132 92 L118 86 L106 100 L94 84 Z M190 90 L204 116 L192 112 Z" fill="#fffaf0" />
            <path d="M-10 230 Q60 196 130 222 T210 214 V250 H-10 Z" fill="#8cc474" />
            <rect y="244" width="200" height="56" fill="#4fb3c8" />
            <path d="M0 262 Q50 256 100 262 T200 262" stroke="#a7e0ea" strokeWidth="2" fill="none" />
            <g transform="translate(40 196)">
                <rect x="0" y="12" width="40" height="30" fill="#c98648" />
                <path d="M-6 14 L20 -4 L46 14 Z" fill="#8a5a3a" />
                <rect x="6" y="20" width="9" height="9" fill="#fff8ec" /><rect x="25" y="20" width="9" height="9" fill="#fff8ec" />
                <path d="M4 32 h32" stroke="#e0525f" strokeWidth="3" />
            </g>
            <g transform="translate(160 210)">
                <rect x="-1" y="-30" width="2" height="34" fill="#6b4a2e" />
                <rect x="1" y="-30" width="18" height="14" fill="#d6363f" />
                <path d="M10 -27 v8 M6 -23 h8" stroke="#fff" strokeWidth="2.4" />
            </g>
        </g>
    );
}

// Germany: timber-framed houses and a pretzel.
export function Germany() {
    const houses = [['#fff4e0', 0], ['#ffe0c9', 50], ['#fff8ec', 100], ['#f6e3c8', 150]];
    return (
        <g>
            <Sky id="sk-de" from="#b9d8f2" to="#fff0dc" />
            <rect y="250" width="200" height="50" fill="#c9b8a0" />
            {houses.map(([c, x], i) => {
                const top = 140 + (i % 2) * 16;
                return (
                    <g key={x}>
                        <rect x={x + 2} y={top} width="46" height={250 - top} fill={c} />
                        <path d={`M${x - 2} ${top} L${x + 25} ${top - 40} L${x + 52} ${top} Z`} fill={i % 2 ? '#c7563f' : '#a8452f'} />
                        <g stroke="#6b4426" strokeWidth="2.2" fill="none">
                            <path d={`M${x + 2} ${top + 30} H${x + 48} M${x + 2} ${top + 62} H${x + 48} M${x + 25} ${top} V250`} />
                            <path d={`M${x + 2} ${top} L${x + 25} ${top + 30} L${x + 48} ${top} M${x + 2} ${top + 62} L${x + 25} ${top + 30} L${x + 48} ${top + 62}`} />
                        </g>
                        <rect x={x + 8} y={top + 70} width="10" height="12" fill="#a9dcff" />
                        <rect x={x + 32} y={top + 70} width="10" height="12" fill="#a9dcff" />
                    </g>
                );
            })}
            <g transform="translate(100 272)" fill="none" stroke="#a8652e" strokeWidth="6" strokeLinecap="round">
                <path d="M-14 6 C-30 -6 -18 -22 0 -8 C18 -22 30 -6 14 6 M-10 -4 L10 8 M10 -4 L-10 8" />
            </g>
        </g>
    );
}

// Belgium: the Atomium and a waffle.
export function Belgium() {
    const balls = [[100, 70], [60, 110], [140, 110], [100, 150], [60, 190], [140, 190], [100, 230], [100, 150]];
    return (
        <g>
            <Sky id="sk-be" from="#d6c8ff" to="#ffe3d3" />
            <rect y="250" width="200" height="50" fill="#9fd48a" />
            <g stroke="#b9c3d6" strokeWidth="5" fill="none">
                <path d="M100 70 L100 230 M60 110 L140 190 M140 110 L60 190 M100 70 L60 110 L100 150 L140 110 Z M60 190 L100 230 L140 190 L100 150 Z" />
                <path d="M100 230 L80 250 M100 230 L120 250" />
            </g>
            {balls.map(([x, y], i) => (
                <g key={i}>
                    <circle cx={x} cy={y} r="13" fill="#dfe6f2" stroke="#9aa6bd" strokeWidth="1.5" />
                    <circle cx={x - 4} cy={y - 4} r="4" fill="#fff" opacity="0.8" />
                </g>
            ))}
            <g transform="translate(40 266)">
                <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#e8b36e" />
                <g stroke="#c98648" strokeWidth="2" fill="none">
                    <path d="M-6 -12 V12 M6 -12 V12 M-18 0 H18" />
                </g>
                <path d="M-6 -14 q6 -8 12 0" fill="#fff8ec" />
            </g>
        </g>
    );
}

export const SCENES = { Kolkata, Bengaluru, India, 'United Kingdom': UnitedKingdom, France, Switzerland, Germany, Belgium };

export default function PlaceScene({ name, className = '', slice = true }) {
    const Scene = SCENES[name];
    return (
        <svg viewBox="0 0 200 300" className={className} preserveAspectRatio={slice ? 'xMidYMid slice' : 'xMidYMid meet'} role="img" aria-label={name}>
            <Scene />
        </svg>
    );
}

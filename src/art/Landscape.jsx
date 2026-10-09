// A dreamy Ghibli-ish daydream for the About polaroid: a matcha hot-air balloon, a tiny
// floating island, a cottage puffing heart-shaped smoke, a tree swing, dandelion seeds,
// and Jiji watching it all from the hilltop.
export default function Landscape({ className = '' }) {
    return (
        <svg viewBox="0 0 300 322" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
                <linearGradient id="ls-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9ccff5" />
                    <stop offset="55%" stopColor="#f6d5ec" />
                    <stop offset="100%" stopColor="#ffe2c8" />
                </linearGradient>
                <radialGradient id="ls-sun">
                    <stop offset="0%" stopColor="#fffbe0" />
                    <stop offset="45%" stopColor="#fff1b8" />
                    <stop offset="100%" stopColor="#fff1b8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="ls-balloon" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#bfe39a" />
                    <stop offset="100%" stopColor="#8cc464" />
                </linearGradient>
            </defs>
            <rect width="300" height="322" fill="url(#ls-sky)" />
            <circle cx="236" cy="64" r="48" fill="url(#ls-sun)" />
            <circle cx="236" cy="64" r="20" fill="#fff8d6" />

            <g className="ls-cloud">
                <g fill="#fff">
                    <circle cx="44" cy="52" r="20" /><circle cx="70" cy="40" r="26" /><circle cx="98" cy="52" r="19" />
                    <rect x="26" y="50" width="90" height="20" rx="10" />
                </g>
                <ellipse cx="72" cy="70" rx="44" ry="5" fill="#d9c8f0" opacity="0.6" />
            </g>
            <g className="ls-cloud ls-cloud-2">
                <g fill="#fff">
                    <circle cx="190" cy="132" r="14" /><circle cx="208" cy="124" r="18" /><circle cx="228" cy="134" r="13" />
                    <rect x="178" y="132" width="62" height="14" rx="7" />
                </g>
            </g>

            <g className="ls-island">
                <path d="M54 112 L96 112 L80 140 L72 150 L66 138 Z" fill="#b39a86" />
                <path d="M50 112 Q75 104 100 112 Q75 118 50 112 Z" fill="#8cc474" />
                <rect x="72" y="96" width="3" height="12" fill="#7a5236" />
                <circle cx="73.5" cy="92" r="8" fill="#6fb768" />
                <path d="M80 140 q2 10 -2 18" stroke="#a9dcff" strokeWidth="2" fill="none" opacity="0.8" />
            </g>

            <g className="ls-balloon">
                <path d="M222 150 C198 150 192 120 204 104 C214 90 230 90 240 104 C252 120 246 150 222 150 Z" fill="url(#ls-balloon)" />
                <path d="M203 118 Q222 126 241 118 L242 124 Q222 132 202 124 Z" fill="#fff6e6" />
                <ellipse cx="222" cy="114" rx="8" ry="3" fill="#fff" opacity="0.5" />
                <circle cx="216" cy="134" r="1.4" fill="#3a2a22" /><circle cx="228" cy="134" r="1.4" fill="#3a2a22" />
                <path d="M219 138 q3 2 6 0" stroke="#3a2a22" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M214 149 L217 162 M230 149 L227 162" stroke="#8a5a3a" strokeWidth="1" />
                <rect x="215" y="162" width="14" height="10" rx="2" fill="#c98648" />
                <path d="M218 158 v-4 h2 Z" fill="#141019" />
            </g>

            <path d="M-10 236 Q60 196 140 222 T310 206 V322 H-10 Z" fill="#b8dfa2" />
            <path d="M-10 262 Q80 226 170 254 T310 244 V322 H-10 Z" fill="#9ccf7f" />
            <path d="M150 322 Q160 290 190 276 Q214 264 222 252" stroke="#fff3dc" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.9" />

            <g transform="translate(206 214)">
                <rect x="0" y="16" width="38" height="26" rx="4" fill="#fffaf0" />
                <path d="M-6 18 Q19 -6 44 18 Z" fill="#e0525f" />
                <rect x="28" y="0" width="7" height="12" fill="#a8452f" />
                <path d="M15 42 v-10 a4 4 0 0 1 8 0 v10 Z" fill="#7a5236" />
                <circle cx="8" cy="26" r="3.5" fill="#ffd36b" />
                <g className="ls-smoke" fill="#fff" opacity="0.85">
                    <path d="M31 -6 c-2 -3 -6 -1 -4 2 l4 4 l4 -4 c2 -3 -2 -5 -4 -2 Z" />
                    <path d="M36 -18 c-1.6 -2.4 -4.8 -0.8 -3.2 1.6 l3.2 3.2 l3.2 -3.2 c1.6 -2.4 -1.6 -4 -3.2 -1.6 Z" />
                </g>
            </g>

            <g transform="translate(48 236)">
                <rect x="-4" y="-6" width="8" height="40" fill="#7a5236" />
                <path d="M2 -8 Q22 -12 34 -4" stroke="#7a5236" strokeWidth="4" fill="none" strokeLinecap="round" />
                <circle cx="-4" cy="-24" r="22" fill="#6fb768" />
                <circle cx="16" cy="-20" r="18" fill="#7cc56e" />
                <circle cx="-20" cy="-12" r="14" fill="#5fa65a" />
                <circle cx="6" cy="-36" r="12" fill="#8fd17f" />
                {[[-10, -28], [12, -30], [-22, -18], [20, -14], [2, -16]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.2" fill="#ffc4d6" />)}
                <g className="ls-swing">
                    <path d="M26 -5 V22 M36 -3 V22" stroke="#8a6a4a" strokeWidth="1.2" />
                    <rect x="23" y="22" width="16" height="3" rx="1.5" fill="#a87a4a" />
                </g>
            </g>

            <g transform="translate(140 222)">
                <path d="M-6 16 C-8 6 -5 -2 0 -3 C5 -2 8 6 6 16 Z" fill="#141019" />
                <ellipse cx="0" cy="-8" rx="7" ry="6" fill="#141019" />
                <path d="M-6 -11 L-5 -19 L-1 -13 Z M6 -11 L5 -19 L1 -13 Z" fill="#141019" />
                <ellipse cx="-2.6" cy="-8" rx="2" ry="2.6" fill="#fffdf6" /><ellipse cx="2.6" cy="-8" rx="2" ry="2.6" fill="#fffdf6" />
                <ellipse cx="-2.3" cy="-8.6" rx="0.9" ry="1.6" fill="#141019" /><ellipse cx="2.9" cy="-8.6" rx="0.9" ry="1.6" fill="#141019" />
                <path className="ls-jiji-tail" d="M5 14 C14 15 16 6 12 2" stroke="#141019" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </g>

            <g className="ls-seeds" stroke="#fff" strokeWidth="0.8" fill="#fff">
                {[[110, 180], [128, 160], [96, 150], [150, 140]].map(([x, y], i) => (
                    <g key={i} className={`ls-seed s${i}`} transform={`translate(${x} ${y})`}>
                        <path d="M0 0 v6" fill="none" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} d="M0 0 v-4" transform={`rotate(${a})`} fill="none" />)}
                    </g>
                ))}
            </g>
            {[[30, 290], [70, 300], [110, 284], [250, 296], [276, 280], [196, 304]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3" fill={['#ffc4d6', '#fff4f8', '#cdb8ff'][i % 3]} />
            ))}
        </svg>
    );
}

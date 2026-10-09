// Totoro at the bus stop, holding the black umbrella from the rain scene in My Neighbour Totoro:
// grey egg-shaped body, cream belly with chevron markings, tall ears, round eyes, long whiskers.
// The big grin shows while he's dancing to his song.
const BODY = '#7f8696';
const DARK = '#2c2f38';

export default function Totoro({ size = 190, className = '' }) {
    const chevrons = [[82, 136], [100, 132], [118, 136], [72, 156], [91, 152], [109, 152], [128, 156]];
    return (
        <svg viewBox="-10 -64 240 304" width={size} height={(size * 304) / 240} className={`totoro ${className}`} aria-hidden="true">
            <g className="totoro-umbrella">
                <path d="M178 96 L176 -22" stroke="#5b3d26" strokeWidth="3" strokeLinecap="round" />
                <path d="M114 -20 Q176 -80 238 -20 Q222 -30 207 -20 Q191 -30 176 -20 Q161 -30 145 -20 Q130 -30 114 -20 Z" fill="#23232c" />
                <path d="M176 -62 V-72" stroke="#23232c" strokeWidth="3" strokeLinecap="round" />
                <path d="M138 -40 Q176 -66 214 -40" stroke="#3b3b48" strokeWidth="2" fill="none" />
            </g>

            <path d="M68 54 C60 22 64 4 73 2 C80 8 83 30 83 50 Z" fill={BODY} />
            <path d="M132 54 C140 22 136 4 127 2 C120 8 117 30 117 50 Z" fill={BODY} />
            <path d="M100 36 C150 36 176 100 178 160 C180 206 150 232 100 232 C50 232 20 206 22 160 C24 100 50 36 100 36 Z" fill={BODY} />
            <path d="M100 114 C142 114 160 150 158 186 C156 216 132 228 100 228 C68 228 44 216 42 186 C40 150 58 114 100 114 Z" fill="#efe7d2" />
            {chevrons.map(([x, y]) => (
                <path key={`${x}-${y}`} d={`M${x - 7} ${y + 5} L${x} ${y - 3} L${x + 7} ${y + 5} L${x} ${y + 1} Z`} fill={BODY} />
            ))}

            <path d="M32 126 C18 150 20 178 34 192" stroke={BODY} strokeWidth="20" strokeLinecap="round" fill="none" />
            <path d="M30 198 l-3 7 M36 199 l0 7 M42 197 l3 6" stroke="#fff8ec" strokeWidth="2" strokeLinecap="round" />
            <path d="M168 128 C184 114 186 98 180 84" stroke={BODY} strokeWidth="20" strokeLinecap="round" fill="none" />
            <path d="M172 80 l-4 -5 M178 77 l0 -6 M185 79 l4 -5" stroke="#fff8ec" strokeWidth="2" strokeLinecap="round" />

            <ellipse cx="74" cy="232" rx="20" ry="8" fill={BODY} />
            <ellipse cx="126" cy="232" rx="20" ry="8" fill={BODY} />
            <path d="M64 236 v4 M72 237 v4 M80 236 v4 M118 236 v4 M126 237 v4 M134 236 v4" stroke="#fff8ec" strokeWidth="1.8" strokeLinecap="round" />

            <g className="totoro-eyes">
                <circle cx="76" cy="74" r="11" fill="#fff" stroke={DARK} strokeWidth="1.6" />
                <circle cx="124" cy="74" r="11" fill="#fff" stroke={DARK} strokeWidth="1.6" />
                <circle cx="77" cy="75" r="4.4" fill={DARK} />
                <circle cx="123" cy="75" r="4.4" fill={DARK} />
            </g>
            <path d="M90 76 Q100 70 110 76 Q100 81 90 76 Z" fill={DARK} />
            <path className="totoro-smile" d="M72 94 Q100 104 128 94" stroke="#4b4f5a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <g className="totoro-grin">
                <path d="M64 90 Q100 132 136 90 Q100 100 64 90 Z" fill="#3a2a30" />
                <path d="M70 93 Q100 101 130 93" stroke="#fff8ec" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
            <g stroke="#4b4f5a" strokeWidth="1.6" strokeLinecap="round">
                <path d="M58 82 L22 72" /><path d="M58 88 L20 88" /><path d="M60 94 L24 104" />
                <path d="M142 82 L178 72" /><path d="M142 88 L180 88" /><path d="M140 94 L176 104" />
            </g>
        </svg>
    );
}

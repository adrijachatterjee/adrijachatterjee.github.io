// Kawaii drink mascots: a matcha bowl, a coffee and a kulhad of chai.
function Face({ cx, cy, s = 1 }) {
    return (
        <g className="cup-face">
            <ellipse className="cup-eye" cx={cx - 9 * s} cy={cy} rx={2.6 * s} ry={3.4 * s} fill="#3a2a22" />
            <ellipse className="cup-eye" cx={cx + 9 * s} cy={cy} rx={2.6 * s} ry={3.4 * s} fill="#3a2a22" />
            <path d={`M${cx - 4 * s} ${cy + 5 * s} Q${cx} ${cy + 9 * s} ${cx + 4 * s} ${cy + 5 * s}`}
                stroke="#3a2a22" strokeWidth={1.8 * s} fill="none" strokeLinecap="round" />
            <ellipse cx={cx - 15 * s} cy={cy + 6 * s} rx={4 * s} ry={2.4 * s} fill="#ff9fb4" opacity="0.7" />
            <ellipse cx={cx + 15 * s} cy={cy + 6 * s} rx={4 * s} ry={2.4 * s} fill="#ff9fb4" opacity="0.7" />
        </g>
    );
}

function Steam({ x = 60 }) {
    return (
        <g className="steam" stroke="var(--steam)" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d={`M${x - 14} 34 q-6 -8 0 -16 q6 -8 0 -16`} />
            <path d={`M${x} 30 q-6 -8 0 -16 q6 -8 0 -16`} />
            <path d={`M${x + 14} 34 q-6 -8 0 -16 q6 -8 0 -16`} />
        </g>
    );
}

export function Matcha({ size = 140 }) {
    return (
        <svg viewBox="0 0 120 120" width={size} height={size} className="cup cup-matcha" aria-hidden="true">
            <Steam />
            <ellipse cx="60" cy="52" rx="44" ry="10" fill="#8fbf5a" />
            <path d="M16 52 Q18 100 60 104 Q102 100 104 52 Z" fill="#f4efe2" />
            <path d="M16 52 Q18 64 24 72 Q60 84 96 72 Q102 64 104 52 Z" fill="#e8dcc0" opacity="0.6" />
            <ellipse cx="60" cy="52" rx="44" ry="10" fill="none" stroke="#d9cfb8" strokeWidth="2" />
            <path className="matcha-swirl" d="M44 52 q8 -5 16 0 q8 5 16 0" stroke="#b6dc85" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <rect x="44" y="102" width="32" height="6" rx="3" fill="#d9cfb8" />
            <Face cx={60} cy={80} />
            <g className="whisk">
                <path d="M98 10 L84 44" stroke="#c9a56e" strokeWidth="3" strokeLinecap="round" />
                <path d="M80 44 Q84 54 90 44" stroke="#c9a56e" strokeWidth="2" fill="#e8d3a8" />
            </g>
        </svg>
    );
}

export function Latte({ size = 140 }) {
    return (
        <svg viewBox="0 0 120 120" width={size} height={size} className="cup cup-latte" aria-hidden="true">
            <Steam x={56} />
            <path d="M92 58 C112 58 112 86 92 86" stroke="#f7d6dd" strokeWidth="7" fill="none" />
            <path d="M22 44 L90 44 L84 100 Q56 110 28 100 Z" fill="#ffe1e7" />
            <ellipse cx="56" cy="44" rx="34" ry="8" fill="#c79a74" />
            <path className="latte-heart" d="M56 49 C50 44 44 44 46 40 C48 37 53 38 56 42 C59 38 64 37 66 40 C68 44 62 44 56 49 Z" fill="#fff6ea" />
            <ellipse cx="56" cy="104" rx="40" ry="6" fill="#f2c5cf" />
            <Face cx={56} cy={74} />
        </svg>
    );
}

export function Chai({ size = 140 }) {
    return (
        <svg viewBox="0 0 120 120" width={size} height={size} className="cup cup-chai" aria-hidden="true">
            <Steam />
            <path d="M24 46 L96 46 L86 102 Q60 108 34 102 Z" fill="#c46a3f" />
            <path d="M28 60 L92 60" stroke="#a9532e" strokeWidth="2" opacity="0.6" />
            <ellipse cx="60" cy="46" rx="36" ry="8" fill="#d79a5e" />
            <ellipse cx="60" cy="46" rx="30" ry="5.5" fill="#c98648" />
            <circle className="cardamom" cx="72" cy="45" r="2.2" fill="#7fa35a" />
            <Face cx={60} cy={78} />
        </svg>
    );
}

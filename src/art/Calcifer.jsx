// Calcifer, the fire demon from Howl's Moving Castle.
export default function Calcifer({ size = 70, className = '' }) {
    return (
        <svg viewBox="0 0 80 104" width={size} height={(size * 104) / 80} className={`calcifer ${className}`} aria-hidden="true">
            <defs>
                <radialGradient id="cal-outer" cx="50%" cy="70%" r="65%">
                    <stop offset="0%" stopColor="#ffd25e" />
                    <stop offset="60%" stopColor="#ff8a3d" />
                    <stop offset="100%" stopColor="#ff5b3a" />
                </radialGradient>
            </defs>
            <g className="calcifer-flame">
                <path d="M40 4 C47 20 66 28 66 56 C66 80 54 92 40 92 C26 92 14 80 14 56 C14 40 23 34 25 20 C29 28 31 33 33 35 C33 22 36 12 40 4 Z" fill="url(#cal-outer)" />
                <path d="M58 30 C64 26 66 18 64 12 C70 20 70 30 64 36 Z" fill="#ff8a3d" />
                <path d="M40 40 C52 48 56 58 56 68 C56 80 48 86 40 86 C32 86 24 80 24 68 C24 58 30 50 40 40 Z" fill="#ffe28a" opacity="0.85" />
                <ellipse cx="32" cy="60" rx="7" ry="8" fill="#fffbe8" />
                <ellipse cx="50" cy="60" rx="7" ry="8" fill="#fffbe8" />
                <circle cx="33" cy="62" r="3.4" fill="#3a1e10" />
                <circle cx="49" cy="62" r="3.4" fill="#3a1e10" />
                <path d="M31 74 Q41 82 51 74" stroke="#3a1e10" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </g>
            <rect x="12" y="92" width="56" height="8" rx="4" fill="#7a4a2a" transform="rotate(-6 40 96)" />
            <rect x="12" y="92" width="56" height="8" rx="4" fill="#8f5a33" transform="rotate(6 40 96)" />
        </svg>
    );
}

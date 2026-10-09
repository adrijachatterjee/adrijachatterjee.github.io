// A rolling-hills scene with a little red-roofed house, like a Ghibli countryside.
export default function Landscape({ className = '' }) {
    return (
        <svg viewBox="0 0 300 220" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
                <linearGradient id="ls-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8fc9ee" />
                    <stop offset="100%" stopColor="#f6e3f0" />
                </linearGradient>
            </defs>
            <rect width="300" height="220" fill="url(#ls-sky)" />
            <circle cx="236" cy="52" r="20" fill="#fff4c4" />
            <g fill="#fff" className="ls-cloud">
                <circle cx="70" cy="58" r="16" /><circle cx="92" cy="48" r="22" /><circle cx="116" cy="58" r="15" />
                <rect x="56" y="56" width="74" height="16" rx="8" />
            </g>
            <path d="M0 150 Q70 112 150 140 T300 128 V220 H0 Z" fill="#a9d68f" />
            <path d="M0 176 Q90 146 180 170 T300 160 V220 H0 Z" fill="#8cc474" />
            <rect x="196" y="118" width="40" height="30" fill="#fff8ec" />
            <path d="M190 120 L216 98 L242 120 Z" fill="#e05a4f" />
            <rect x="211" y="130" width="10" height="18" fill="#7a4a2a" />
            <rect x="200" y="124" width="8" height="8" fill="#9fd3f5" />
            <rect x="224" y="124" width="8" height="8" fill="#9fd3f5" />
            <rect x="62" y="122" width="6" height="30" fill="#7a4a2a" />
            <circle cx="65" cy="112" r="20" fill="#5fa65a" />
            <circle cx="52" cy="122" r="12" fill="#6fb768" />
            <circle cx="78" cy="120" r="13" fill="#6fb768" />
        </svg>
    );
}

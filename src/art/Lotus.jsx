// A lotus for the spiritual corner.
export default function Lotus({ size = 90, className = '' }) {
    return (
        <svg viewBox="0 0 120 80" width={size} height={(size * 80) / 120} className={`lotus ${className}`} aria-hidden="true">
            <g className="lotus-petals">
                <path d="M60 70 C36 64 18 46 14 30 C34 32 50 46 60 70 Z" fill="#f7b9cf" />
                <path d="M60 70 C84 64 102 46 106 30 C86 32 70 46 60 70 Z" fill="#f7b9cf" />
                <path d="M60 70 C42 56 36 34 40 14 C54 26 60 46 60 70 Z" fill="#f49bbb" />
                <path d="M60 70 C78 56 84 34 80 14 C66 26 60 46 60 70 Z" fill="#f49bbb" />
                <path d="M60 70 C50 50 50 24 60 4 C70 24 70 50 60 70 Z" fill="#ef7fa8" />
            </g>
            <path d="M24 72 Q60 82 96 72" stroke="#8cc474" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
    );
}

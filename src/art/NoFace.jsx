// No-Face (Kaonashi) from Spirited Away.
export default function NoFace({ size = 70, className = '' }) {
    return (
        <svg viewBox="0 0 70 140" width={size} height={size * 2} className={`noface ${className}`} aria-hidden="true">
            <path d="M35 6 C58 6 64 40 64 80 C64 110 60 136 60 136 L10 136 C10 136 6 110 6 80 C6 40 12 6 35 6 Z" fill="#17121e" opacity="0.88" />
            <ellipse cx="35" cy="38" rx="16" ry="22" fill="#f6f2ea" />
            <path d="M26 27 L30 20 L32 27 Z M38 27 L40 20 L44 27 Z" fill="#8b6fb8" />
            <path d="M27 40 L30 48 L32 40 Z M38 40 L40 48 L43 40 Z" fill="#8b6fb8" />
            <ellipse cx="29.5" cy="35" rx="3.2" ry="2" fill="#17121e" />
            <ellipse cx="40.5" cy="35" rx="3.2" ry="2" fill="#17121e" />
            <ellipse cx="35" cy="52" rx="3" ry="1.4" fill="#17121e" />
        </svg>
    );
}

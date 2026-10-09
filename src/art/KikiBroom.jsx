// Kiki on her broom with Jiji riding behind, drawn as a silhouette.
export default function KikiBroom({ size = 150, className = '' }) {
    return (
        <svg viewBox="0 0 160 80" width={size} height={size / 2} className={className} aria-hidden="true">
            <path d="M34 52 L150 40" stroke="#5b3d26" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M36 51 L6 40 L3 52 L8 64 Z" fill="#caa36a" />
            <path d="M12 46 L34 51 M10 56 L34 52" stroke="#a9834e" strokeWidth="1" />
            <path d="M80 47 L104 44 L102 24 Q92 16 84 24 Z" fill="#2b2f5c" />
            <path d="M86 46 L80 62 M96 45 L94 62" stroke="#2b2f5c" strokeWidth="3" strokeLinecap="round" />
            <path d="M100 30 L116 38" stroke="#2b2f5c" strokeWidth="3" strokeLinecap="round" />
            <circle cx="93" cy="16" r="7.5" fill="#3a2a22" />
            <path d="M89 9 L82 3 L84 13 Z M97 9 L104 3 L102 13 Z" fill="#e2445c" />
            <circle cx="93" cy="9" r="2" fill="#e2445c" />
            <ellipse cx="62" cy="45" rx="6" ry="4" fill="#16121c" />
            <circle cx="58" cy="39" r="4" fill="#16121c" />
            <path d="M55 37 L55 32 L58 36 Z M59 36 L62 32 L62 37 Z" fill="#16121c" />
            <path d="M67 45 Q74 42 72 36" stroke="#16121c" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
    );
}

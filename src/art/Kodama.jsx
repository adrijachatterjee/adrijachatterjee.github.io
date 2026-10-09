// A kodama, the rattling tree spirit from Princess Mononoke.
export default function Kodama({ size = 44, className = '' }) {
    return (
        <svg viewBox="0 0 50 84" width={size} height={(size * 84) / 50} className={`kodama ${className}`} aria-hidden="true">
            <path d="M15 38 Q12 72 17 80 L33 80 Q38 72 35 38 Z" fill="#f3f0e6" />
            <path d="M15 48 L8 58 M35 48 L42 56" stroke="#f3f0e6" strokeWidth="4" strokeLinecap="round" />
            <g className="kodama-head">
                <path d="M9 22 C9 8 18 4 26 4 C36 4 42 10 41 22 C40 34 33 40 25 40 C15 40 9 34 9 22 Z" fill="#f3f0e6" />
                <circle cx="19" cy="20" r="3.2" fill="#2b2a30" />
                <circle cx="31" cy="22" r="3.2" fill="#2b2a30" />
                <circle cx="24" cy="30" r="2.2" fill="#2b2a30" />
            </g>
        </svg>
    );
}

// My Neighbour Totoro, with a leaf on his head.
export default function Totoro({ size = 150, className = '' }) {
    return (
        <svg viewBox="0 0 160 184" width={size} height={(size * 184) / 160} className={`totoro ${className}`} aria-hidden="true">
            <path d="M52 44 C44 14 48 2 57 5 C62 14 63 30 63 40 Z" fill="#8a909e" />
            <path d="M108 44 C116 14 112 2 103 5 C98 14 97 30 97 40 Z" fill="#8a909e" />
            <path d="M80 30 C132 30 152 110 146 152 C140 180 20 180 14 152 C8 110 28 30 80 30 Z" fill="#8a909e" />
            <ellipse cx="80" cy="128" rx="48" ry="42" fill="#efe6cf" />
            <g stroke="#8a909e" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M58 106 l6 -6 l6 6" /><path d="M74 102 l6 -6 l6 6" /><path d="M90 106 l6 -6 l6 6" />
                <path d="M66 120 l6 -6 l6 6" /><path d="M82 120 l6 -6 l6 6" />
            </g>
            <path d="M18 120 C6 132 8 150 18 156" stroke="#8a909e" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M142 120 C154 132 152 150 142 156" stroke="#8a909e" strokeWidth="12" strokeLinecap="round" fill="none" />
            <g className="totoro-eyes">
                <circle cx="58" cy="62" r="9" fill="#fff" />
                <circle cx="102" cy="62" r="9" fill="#fff" />
                <circle cx="59" cy="63" r="4.5" fill="#22222a" />
                <circle cx="101" cy="63" r="4.5" fill="#22222a" />
            </g>
            <path d="M73 68 Q80 63 87 68 Q80 72 73 68 Z" fill="#22222a" />
            <path d="M56 84 Q80 96 104 84" stroke="#5f6472" strokeWidth="2" fill="none" strokeLinecap="round" />
            <g stroke="#5f6472" strokeWidth="1.6" strokeLinecap="round">
                <path d="M40 70 L16 64" /><path d="M40 76 L14 78" />
                <path d="M120 70 L144 64" /><path d="M120 76 L146 78" />
            </g>
            <g className="totoro-leaf">
                <path d="M66 30 Q78 2 102 12 Q90 32 66 30 Z" fill="#7cbf6a" />
                <path d="M68 29 Q84 20 100 13" stroke="#5a9a4c" strokeWidth="1.6" fill="none" />
            </g>
        </svg>
    );
}

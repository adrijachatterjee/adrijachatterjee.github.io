import { useEffect, useRef, useState } from 'react';

// Jiji, the black cat from Kiki's Delivery Service. His eyes follow the cursor.
export default function Jiji({ size = 110, className = '' }) {
    const ref = useRef(null);
    const [look, setLook] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e) => {
            const r = ref.current?.getBoundingClientRect();
            if (!r) return;
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height * 0.4);
            const d = Math.hypot(dx, dy) || 1;
            const m = Math.min(1, d / 250);
            setLook({ x: (dx / d) * 4 * m, y: (dy / d) * 4.5 * m });
        };
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
    }, []);

    return (
        <svg ref={ref} viewBox="0 0 120 160" width={size} height={(size * 160) / 120}
            className={`jiji ${className}`} aria-hidden="true">
            <path className="jiji-tail" d="M74 146 C106 148 114 114 98 88" stroke="#1b1424"
                strokeWidth="9" strokeLinecap="round" fill="none" />
            <path d="M36 154 C28 124 40 92 60 90 C80 92 92 124 84 154 Z" fill="#1b1424" />
            <ellipse cx="49" cy="153" rx="9" ry="5" fill="#1b1424" />
            <ellipse cx="71" cy="153" rx="9" ry="5" fill="#1b1424" />
            <g className="jiji-ear-l">
                <path d="M32 58 L34 22 L56 44 Z" fill="#1b1424" />
                <path d="M37 50 L38 32 L50 45 Z" fill="#3b2d4d" />
            </g>
            <path d="M88 58 L86 22 L64 44 Z" fill="#1b1424" />
            <path d="M83 50 L82 32 L70 45 Z" fill="#3b2d4d" />
            <ellipse cx="60" cy="64" rx="31" ry="27" fill="#1b1424" />
            <g className="jiji-eyes">
                <ellipse cx="48" cy="63" rx="10" ry="12.5" fill="#fffdf6" />
                <ellipse cx="72" cy="63" rx="10" ry="12.5" fill="#fffdf6" />
                <ellipse cx={48 + look.x} cy={65 + look.y} rx="4.5" ry="7.5" fill="#1b1424" />
                <ellipse cx={72 + look.x} cy={65 + look.y} rx="4.5" ry="7.5" fill="#1b1424" />
                <circle cx={46.5 + look.x} cy={61.5 + look.y} r="1.6" fill="#fff" />
                <circle cx={70.5 + look.x} cy={61.5 + look.y} r="1.6" fill="#fff" />
            </g>
            <path d="M56 80 Q60 83.5 64 80" stroke="#55466b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <g stroke="#55466b" strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
                <path d="M30 74 L14 72" /><path d="M30 78 L15 80" />
                <path d="M90 74 L106 72" /><path d="M90 78 L105 80" />
            </g>
        </svg>
    );
}

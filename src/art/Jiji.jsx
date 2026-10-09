import { useEffect, useRef, useState } from 'react';

// Jiji from Kiki's Delivery Service: a slim, all-black cat with big white oval eyes,
// tall pointed ears and a long, thin tail. He slow-blinks, flicks his tail, twitches an
// ear, and his eyes follow the cursor. `mood` can be 'idle' | 'happy' | 'startled'.
export default function Jiji({ size = 110, className = '', mood = 'idle' }) {
    const ref = useRef(null);
    const [look, setLook] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e) => {
            const r = ref.current?.getBoundingClientRect();
            if (!r) return;
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height * 0.35);
            const d = Math.hypot(dx, dy) || 1;
            const m = Math.min(1, d / 250);
            setLook({ x: (dx / d) * 3.6 * m, y: (dy / d) * 4.2 * m });
        };
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
    }, []);

    const startled = mood === 'startled';
    const happy = mood === 'happy';
    const pupilRy = startled ? 4 : 7.5;

    return (
        <svg ref={ref} viewBox="0 0 120 170" width={size} height={(size * 170) / 120}
            className={`jiji jiji-${mood} ${className}`} aria-hidden="true">
            <path className="jiji-tail" d="M66 162 C92 166 108 150 106 124 C105 110 98 100 90 104"
                stroke="#141019" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M42 164 C36 142 42 116 58 106 C74 112 82 140 78 164 Z" fill="#141019" />
            <path d="M51 118 V162 M63 118 V162" stroke="#141019" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="50" cy="164" rx="6" ry="3.6" fill="#141019" />
            <ellipse cx="64" cy="164" rx="6" ry="3.6" fill="#141019" />
            <g className="jiji-head">
                <g className="jiji-ear-l">
                    <path d="M34 62 L37 20 L58 46 Z" fill="#141019" />
                    <path d="M39 54 L40 31 L52 46 Z" fill="#2e2440" />
                </g>
                <g className="jiji-ear-r">
                    <path d="M86 62 L83 20 L62 46 Z" fill="#141019" />
                    <path d="M81 54 L80 31 L68 46 Z" fill="#2e2440" />
                </g>
                <path d="M30 70 C30 50 44 42 60 42 C76 42 90 50 90 70 C90 86 78 96 60 96 C42 96 30 86 30 70 Z" fill="#141019" />
                <g className="jiji-eyes">
                    {happy ? (
                        <g stroke="#fffdf6" strokeWidth="3.4" fill="none" strokeLinecap="round">
                            <path d="M40 70 Q48 62 56 70" /><path d="M64 70 Q72 62 80 70" />
                        </g>
                    ) : (
                        <>
                            <ellipse cx="48" cy="68" rx={startled ? 12 : 10.5} ry={startled ? 15 : 13} fill="#fffdf6" />
                            <ellipse cx="72" cy="68" rx={startled ? 12 : 10.5} ry={startled ? 15 : 13} fill="#fffdf6" />
                            <ellipse cx={48 + look.x} cy={70 + look.y} rx={startled ? 3 : 4.6} ry={pupilRy} fill="#141019" />
                            <ellipse cx={72 + look.x} cy={70 + look.y} rx={startled ? 3 : 4.6} ry={pupilRy} fill="#141019" />
                            <circle cx={46.4 + look.x} cy={66 + look.y} r="1.5" fill="#fff" />
                            <circle cx={70.4 + look.x} cy={66 + look.y} r="1.5" fill="#fff" />
                        </>
                    )}
                </g>
                <path d="M57 86 Q60 88.5 63 86" stroke="#4a3d5c" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </g>
        </svg>
    );
}

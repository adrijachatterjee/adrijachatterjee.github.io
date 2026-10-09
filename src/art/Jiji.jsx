import { useEffect, useRef, useState } from 'react';

// Jiji from Kiki's Delivery Service, drawn after Adrija's reference: a round head with tall,
// finely outlined ears, big white eyes with small pupils, a bell-shaped body sitting flat,
// a thick tail curling out along the ground, and long thin whiskers.
// He slow-blinks, flicks his tail, twitches his ears and follows the cursor with his eyes.
// `mood`: 'idle' | 'happy' | 'startled' | 'wave'
const FUR = '#161320';
const LINE = '#3b3150';

export default function Jiji({ size = 110, className = '', mood = 'idle' }) {
    const ref = useRef(null);
    const [look, setLook] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e) => {
            const r = ref.current?.getBoundingClientRect();
            if (!r) return;
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height * 0.45);
            const d = Math.hypot(dx, dy) || 1;
            const m = Math.min(1, d / 250);
            setLook({ x: (dx / d) * 3.4 * m, y: (dy / d) * 3.4 * m });
        };
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
    }, []);

    const startled = mood === 'startled';
    const happy = mood === 'happy';
    const big = startled ? 1.15 : 1;

    return (
        <svg ref={ref} viewBox="0 0 160 230" width={size} height={(size * 230) / 160}
            className={`jiji jiji-${mood} ${className}`} aria-hidden="true">
            <path className="jiji-tail" d="M52 206 C36 198 16 200 5 220" stroke={FUR} strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M58 128 C50 156 44 190 42 222 L128 222 C126 190 120 156 108 126 Z" fill={FUR} />
            {mood === 'wave' && (
                <g className="jiji-paw">
                    <path d="M102 172 Q114 156 120 140" stroke={FUR} strokeWidth="9" strokeLinecap="round" fill="none" />
                    <ellipse cx="121" cy="136" rx="6" ry="5" fill={FUR} />
                </g>
            )}

            <g className="jiji-head">
                <g className="jiji-ear-l">
                    <path d="M45 86 L33 48 L64 70 Z" fill={FUR} />
                    <path d="M44 84 L31 45 L40 56" stroke={LINE} strokeWidth="1" fill="none" strokeLinecap="round" />
                    <path d="M40 74 L36 56 L52 70 Z" fill="#2c2440" />
                </g>
                <g className="jiji-ear-r">
                    <path d="M80 68 L92 32 L108 74 Z" fill={FUR} />
                    <path d="M93 30 L109 72" stroke={LINE} strokeWidth="1" fill="none" strokeLinecap="round" />
                    <path d="M89 62 L93 42 L102 68 Z" fill="#2c2440" />
                </g>
                <ellipse cx="80" cy="102" rx="36" ry="33" fill={FUR} />

                <g className="jiji-eyes">
                    {happy ? (
                        <g stroke="#fffdf6" strokeWidth="3.2" fill="none" strokeLinecap="round">
                            <path d="M53 108 Q63 99 73 108" /><path d="M93 98 Q101 90 109 98" />
                        </g>
                    ) : (
                        <>
                            <ellipse cx="63" cy="108" rx={13.5 * big} ry={12.8 * big} fill="#fffdf6" />
                            <ellipse cx="101" cy="96" rx={10.6 * big} ry={10.4 * big} fill="#fffdf6" />
                            <ellipse cx={68 + look.x} cy={110 + look.y} rx={startled ? 1.8 : 2.6} ry={startled ? 3 : 4.4} fill={FUR} />
                            <ellipse cx={99 + look.x} cy={98 + look.y} rx={startled ? 1.7 : 2.4} ry={startled ? 2.8 : 4} fill={FUR} />
                        </>
                    )}
                </g>

                <g stroke={LINE} strokeWidth="1" strokeLinecap="round" fill="none">
                    <path d="M50 124 L20 126" /><path d="M52 130 L28 146" />
                    <path d="M114 96 L146 85" /><path d="M114 103 L146 101" />
                </g>
            </g>
        </svg>
    );
}

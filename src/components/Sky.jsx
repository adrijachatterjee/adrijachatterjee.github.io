import Cloud from '../art/Cloud';
import KikiBroom from '../art/KikiBroom';

const clouds = [
    { top: '8%', w: 260, dur: 90, delay: -10 },
    { top: '22%', w: 180, dur: 120, delay: -60 },
    { top: '40%', w: 320, dur: 140, delay: -30 },
    { top: '58%', w: 200, dur: 100, delay: -80 },
    { top: '74%', w: 280, dur: 160, delay: -120 },
    { top: '88%', w: 160, dur: 110, delay: -40 },
];

// Deterministic pseudo-random so stars don't jump around between renders.
const rand = (i) => (Math.sin(i * 91.7) * 10000) % 1;
const stars = Array.from({ length: 70 }, (_, i) => ({
    left: `${Math.abs(rand(i)) * 100}%`,
    top: `${Math.abs(rand(i + 100)) * 100}%`,
    size: 1 + Math.abs(rand(i + 200)) * 2.4,
    delay: Math.abs(rand(i + 300)) * 4,
}));
const fireflies = stars.slice(0, 14);

export default function Sky({ night }) {
    return (
        <div className="sky" aria-hidden="true">
            <div className="sky-day" />
            <div className="sky-night" />
            {night ? (
                <>
                    {stars.map((s, i) => (
                        <span key={i} className="star" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />
                    ))}
                    {fireflies.map((s, i) => (
                        <span key={i} className="firefly" style={{ left: s.top, top: `${40 + (i % 7) * 8}%`, animationDelay: `${-s.delay * 3}s` }} />
                    ))}
                    <div className="moon" />
                </>
            ) : (
                <>
                    <div className="sun" />
                    {clouds.map((c, i) => (
                        <Cloud key={i} width={c.w} className="cloud" style={{ top: c.top, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }} />
                    ))}
                </>
            )}
            <div className="kiki-fly"><KikiBroom size={130} /></div>
        </div>
    );
}

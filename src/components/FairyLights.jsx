// A string of fairy lights draped across the top of the hero. Only switched on at night.
const SAGS = 3;
const BULBS = 27;
const COLORS = ['#ffd36b', '#ffb3c7', '#b9f0d2', '#cdb8ff', '#ffe9a8'];
const sagAt = (t) => Math.sin(((t * SAGS) % 1) * Math.PI); // 0 at hooks, 1 mid-swag

export default function FairyLights() {
    const pts = Array.from({ length: 121 }, (_, i) => i / 120);
    const wire = pts.map((t, i) => `${i ? 'L' : 'M'}${(t * 1000).toFixed(1)} ${(14 + sagAt(t) * 70).toFixed(1)}`).join(' ');
    return (
        <div className="fairy" aria-hidden="true">
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="fairy-wire">
                <path d={wire} vectorEffect="non-scaling-stroke" />
            </svg>
            {Array.from({ length: BULBS }, (_, i) => {
                const t = (i + 0.5) / BULBS;
                return (
                    <span key={i} className="bulb"
                        style={{ left: `${t * 100}%`, top: `${14 + sagAt(t) * 70}%`, '--c': COLORS[i % COLORS.length], animationDelay: `${(i * 0.37) % 2.4}s` }} />
                );
            })}
        </div>
    );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal, { SectionHead } from './Reveal';
import { Pin } from './Icons';
import { places } from '../data';
import PlaceScene from '../art/Places';
import { DoorFrame, DoorPanel } from '../art/WonderDoor';

// Howl's castle door: turn the colour dial and the door opens somewhere new.
function Dial({ idx, onPick }) {
    const n = places.length;
    const seg = 360 / n;
    const wedge = (i) => {
        const a0 = ((i * seg - 90) * Math.PI) / 180;
        const a1 = (((i + 1) * seg - 90) * Math.PI) / 180;
        const r = 44;
        return `M50 50 L${50 + r * Math.cos(a0)} ${50 + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${50 + r * Math.cos(a1)} ${50 + r * Math.sin(a1)} Z`;
    };
    return (
        <svg viewBox="0 0 100 100" className="dial" role="group" aria-label="Howl's door dial">
            <circle cx="50" cy="50" r="48" fill="#5b3d26" />
            {places.map((p, i) => (
                <path key={p.label} d={wedge(i)} fill={p.color} className={`wedge ${i === idx ? 'on' : ''}`}
                    onClick={() => onPick(i)} role="button" aria-label={p.label} tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPick(i)} />
            ))}
            <motion.g animate={{ rotate: idx * seg + seg / 2 }} style={{ originX: '50px', originY: '50px' }} transition={{ type: 'spring', stiffness: 90, damping: 12 }}>
                <path d="M50 50 L50 10" stroke="#fff6e0" strokeWidth="4" strokeLinecap="round" />
            </motion.g>
            <circle cx="50" cy="50" r="9" fill="#caa36a" stroke="#5b3d26" strokeWidth="2" />
        </svg>
    );
}

export default function Travel() {
    const [idx, setIdx] = useState(0);
    const place = places[idx];
    const next = () => setIdx((i) => (i + 1) % places.length);

    return (
        <section id="travels" className="section">
            <SectionHead chapter="ch. 06" film="howl's moving castle" title="a door that opens <em>anywhere</em>"
                lede="spin the dial on howl's door. two cities called home, 20 indian states & UTs, plus the UK, France, Switzerland, Germany and Belgium so far. my bucket list is longer than my reading list (which is saying something)." />

            <div className="travel-grid">
                <Reveal className="howl-door-wrap">
                    <Dial idx={idx} onPick={setIdx} />
                    <button className="howl-door" onClick={next} aria-label="Open the door to the next place">
                        <AnimatePresence mode="wait">
                            <motion.div key={place.label} className="portal" style={{ '--place': place.color }}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                                <PlaceScene name={place.label} className="portal-scene" />
                            </motion.div>
                        </AnimatePresence>
                        <motion.span key={`door-${idx}`} className="door-panel" initial={{ rotateY: 0 }} animate={{ rotateY: -72 }}
                            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                            <DoorPanel />
                        </motion.span>
                        <DoorFrame />
                    </button>
                    <p className="hand door-hint">tap the door or turn the dial</p>
                </Reveal>

                <div className="travel-side">
                    <AnimatePresence mode="wait">
                        <motion.div key={place.label} className="glass place-card" style={{ '--place': place.color }}
                            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                            <span className="place-kind"><Pin size={16} /> {place.kind}</span>
                            <h3>{place.label}</h3>
                            <p>{place.text}</p>
                            {place.list && <div className="state-chips">{place.list.map((st) => <span key={st}>{st}</span>)}</div>}
                        </motion.div>
                    </AnimatePresence>
                    <div className="passport">
                        {places.map((p, i) => (
                            <button key={p.label} className={`pstamp ${i === idx ? 'on' : ''}`} style={{ '--place': p.color, '--tilt': `${(i % 2 ? 1 : -1) * (3 + i * 1.5)}deg` }}
                                onClick={() => setIdx(i)} aria-label={p.label} title={p.label}>
                                <PlaceScene name={p.label} className="pstamp-art" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

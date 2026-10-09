import { useRef } from 'react';
import { motion } from 'framer-motion';
import { downloadPolaroid } from '../art/Comfort';

// A row of pick-one (or pick-many) pills.
export function Chips({ label, options, value, onChange, multi = false, max }) {
    const isOn = (o) => (multi ? value.includes(o) : value === o);
    const toggle = (o) => {
        if (!multi) return onChange(o);
        if (value.includes(o)) return onChange(value.filter((v) => v !== o));
        if (max && value.length >= max) return onChange([...value.slice(1), o]);
        return onChange([...value, o]);
    };
    return (
        <div className="chips-group" role="group" aria-label={label}>
            <span className="chips-label">{label}{multi && max ? ` (up to ${max})` : ''}</span>
            <div className="pick-chips">
                {options.map((o) => (
                    <button key={o} type="button" className={`pick ${isOn(o) ? 'on' : ''}`} aria-pressed={isOn(o)} onClick={() => toggle(o)}>{o}</button>
                ))}
            </div>
        </div>
    );
}

// Shows the freshly printed polaroid with save / redo buttons.
export function PolaroidReveal({ children, filename, onReset, note }) {
    const wrap = useRef(null);
    return (
        <motion.div className="polaroid-reveal" initial={{ opacity: 0, y: 40, rotate: -6 }} animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
            <div ref={wrap} className="polaroid-print">{children}</div>
            {note && <p className="hand reveal-note">{note}</p>}
            <div className="reveal-actions">
                <button className="btn btn-solid" onClick={() => downloadPolaroid(wrap.current?.querySelector('svg'), filename)}>save my polaroid</button>
                <button className="btn btn-ghost" onClick={onReset}>make another</button>
            </div>
        </motion.div>
    );
}

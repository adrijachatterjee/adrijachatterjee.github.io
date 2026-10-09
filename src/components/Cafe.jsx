import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHead } from './Reveal';
import Reveal from './Reveal';
import { Matcha, Latte, Chai } from '../art/Cups';
import { cafes, art } from '../data';

const menu = [
    { id: 'matcha', Cup: Matcha, name: 'matcha', note: 'whisked, never stirred', mood: 'calm, focused, ready to ship', color: 'var(--matcha)' },
    { id: 'latte', Cup: Latte, name: 'coffee latte', note: 'with a heart on top, always', mood: 'cosy, creative, extra chatty', color: 'var(--latte)' },
    { id: 'chai', Cup: Chai, name: 'chai', note: 'in a kulhad, extra elaichi', mood: 'home. pure home.', color: 'var(--chai)' },
];

const STAMPS = 10;

export default function Cafe() {
    const [order, setOrder] = useState(null);
    const [stamps, setStamps] = useState([]);

    const pick = (item) => {
        setOrder(item);
        setStamps((s) => (s.length >= STAMPS ? [item.id] : [...s, item.id]));
    };

    return (
        <section id="cafe" className="section">
            <SectionHead chapter="ch. 02" film="every ghibli film has a food scene"
                title="a <em>matcha</em>, <em>latte</em> &amp; <em>chai</em> girlie"
                lede="Some people run on code. I run on code plus a very specific cup. Pick one and see what kind of day it makes." />

            <div className="menu">
                {menu.map((item, i) => (
                    <Reveal key={item.id} delay={i * 0.1}>
                        <motion.button className={`glass menu-item ${order?.id === item.id ? 'picked' : ''}`}
                            style={{ '--tint': item.color }} onClick={() => pick(item)}
                            whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }} whileTap={{ scale: 0.95 }}>
                            <item.Cup size={150} />
                            <span className="menu-name">{item.name}</span>
                            <span className="menu-note hand">{item.note}</span>
                        </motion.button>
                    </Reveal>
                ))}
            </div>

            <div className="order-line">
                <AnimatePresence mode="wait">
                    <motion.p key={order?.id || 'none'} className="hand"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        {order ? `one ${order.name} coming up: ${order.mood}` : 'tap a cup to place your order'}
                    </motion.p>
                </AnimatePresence>
            </div>

            <div className="cafe-grid">
                <Reveal className="loyalty">
                    <div className="loyalty-head">
                        <span className="loyalty-title">Café Hopping Club</span>
                        <span className="loyalty-sub">member: Adrija · Bengaluru branch</span>
                    </div>
                    <div className="stamps">
                        {Array.from({ length: STAMPS }, (_, i) => (
                            <span key={i} className={`stamp-slot ${stamps[i] ? `stamped ${stamps[i]}` : ''}`}>
                                {stamps[i] && <motion.span className="stamp-ink" initial={{ scale: 2.4, opacity: 0, rotate: -30 }} animate={{ scale: 1, opacity: 1, rotate: -12 }} />}
                            </span>
                        ))}
                    </div>
                    <p className="loyalty-foot hand">
                        {stamps.length >= STAMPS ? 'card full! next cup is on Jiji.' : `${STAMPS - stamps.length} more cups till a free one`}
                    </p>
                </Reveal>

                <Reveal className="glass cafe-notes" delay={0.1}>
                    <h3>café hopping around Bengaluru</h3>
                    <p>I café hop all over Bengaluru, and whenever a new place opens I'm usually one of the first through the door. I'm always on the hunt for good matcha, pretty latte art and a quiet corner to write in.</p>
                    {cafes.length > 0 ? (
                        <ul className="cafe-list">
                            {cafes.map((c) => (
                                <li key={c.name}><b>{c.name}</b> <span>{c.area}</span> <i className="hand">{c.order}</i></li>
                            ))}
                        </ul>
                    ) : (
                        <p className="hand cafe-soon">the full list is brewing. ask me for recs!</p>
                    )}
                </Reveal>
            </div>

            {art.cafes.some(Boolean) && (
                <div className="cafe-photos">
                    {art.cafes.filter(Boolean).map((src, i) => (
                        <Reveal key={src} className="polaroid small" delay={i * 0.1}><img src={src} alt="a café visit" /></Reveal>
                    ))}
                </div>
            )}
        </section>
    );
}

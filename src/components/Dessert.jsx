import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal, { SectionHead } from './Reveal';
import { Chips, PolaroidReveal } from './Builder';
import { DESSERT, DessertArt, PolaroidSVG, dessertName } from '../art/Comfort';

const today = () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toLowerCase();

// A sweet ending, with Howl dropping by to say hi.
export default function Dessert() {
    const [dessert, setDessert] = useState({ base: 'shortcake', flavor: 'strawberry', toppings: ['whipped cream', 'strawberry'] });
    const [name, setName] = useState('');
    const [printed, setPrinted] = useState(false);
    const set = (k) => (v) => setDessert((x) => ({ ...x, [k]: v }));
    const howlSays = printed ? "oh, that's gorgeous. almost as gorgeous as me." : "hi, i'm Howl. Calcifer's keeping the oven warm, so go on, make something sweet.";

    return (
        <section id="dessert" className="section dessert">
            <SectionHead chapter="ch. 09" film="a sweet ending (howl's moving castle)" title="make your own <em>dessert</em>"
                lede="you made it all the way down here, so you deserve something sweet. no calories on this website, i checked." />

            <div className="howl-wrap">
                <AnimatePresence mode="wait">
                    <motion.p key={howlSays} className="bubble howl-bubble" initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
                        {howlSays}
                    </motion.p>
                </AnimatePresence>
                <motion.img src="/art/howl.webp" alt="Howl from Howl's Moving Castle, waving hello" className="howl" loading="lazy"
                    initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 80, damping: 14 }} />
            </div>

            {!printed ? (
                <>
                    <Reveal className="glass builder dessert-builder">
                        <div className="builder-art">
                            <svg viewBox="0 0 260 230" aria-hidden="true"><DessertArt id="xp" {...dessert} /></svg>
                        </div>
                        <div>
                            <h3 className="builder-title">your dessert</h3>
                            <p className="hand builder-name">{dessertName(dessert)}</p>
                            <Chips label="dessert" options={DESSERT.base} value={dessert.base} onChange={set('base')} />
                            <Chips label="flavour" options={DESSERT.flavor.map(([n]) => n)} value={dessert.flavor} onChange={set('flavor')} />
                            <Chips label="toppings" options={DESSERT.toppings} value={dessert.toppings} onChange={set('toppings')} multi max={4} />
                        </div>
                    </Reveal>
                    <Reveal className="print-bar">
                        <label className="name-field">
                            <span className="hand">who's it for?</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" maxLength={20} />
                        </label>
                        <button className="btn btn-gold" onClick={() => setPrinted(true)}>print my dessert polaroid</button>
                    </Reveal>
                </>
            ) : (
                <PolaroidReveal filename="my-dessert.png" onReset={() => setPrinted(false)} note="okay now come say hi ↓">
                    <PolaroidSVG caption={`${name || 'your'}${name ? "'s" : ''} sweet ending`} sub={`${dessertName(dessert)} · ${today()}`} bg={['#fff0d6', '#f0e4ff']}>
                        <svg x="40" y="60" width="280" height="248" viewBox="0 0 260 230"><DessertArt id="xpp" {...dessert} /></svg>
                    </PolaroidSVG>
                </PolaroidReveal>
            )}
        </section>
    );
}

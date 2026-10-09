import { useState } from 'react';
import Reveal, { SectionHead } from './Reveal';
import { Chips, PolaroidReveal } from './Builder';
import { DRINK, RAMEN, DrinkArt, RamenArt, PolaroidSVG, drinkName, ramenName } from '../art/Comfort';

const today = () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toLowerCase();

// Before you get to know me: grab a drink and a bowl of comfort, then take home a polaroid.
export default function Comfort() {
    const [drink, setDrink] = useState({ base: 'matcha', milk: 'oat', temp: 'iced', toppings: ['boba'] });
    const [ramen, setRamen] = useState({ broth: 'miso', noodles: 'curly', toppings: ['ajitama egg', 'narutomaki', 'nori'] });
    const [name, setName] = useState('');
    const [printed, setPrinted] = useState(false);
    const d = (k) => (v) => setDrink((x) => ({ ...x, [k]: v }));
    const r = (k) => (v) => setRamen((x) => ({ ...x, [k]: v }));

    return (
        <section id="cafe" className="section">
            <SectionHead chapter="ch. 01" film="every ghibli film has a food scene"
                title="before u get to know me, grab a <em>drink</em> &amp; a bowl of <em>comfort</em>"
                lede="matcha, latte, chai: i don't discriminate (certified café girlie). build your order and i'll print you a polaroid to take home." />

            {!printed ? (
                <>
                    <div className="builders">
                        <Reveal className="glass builder">
                            <div className="builder-art">
                                <svg viewBox="0 0 200 240" aria-hidden="true"><DrinkArt id="dp" {...drink} /></svg>
                            </div>
                            <h3 className="builder-title">your drink</h3>
                            <p className="hand builder-name">{drinkName(drink)}</p>
                            <Chips label="base" options={DRINK.base.map(([n]) => n)} value={drink.base} onChange={d('base')} />
                            <Chips label="milk" options={DRINK.milk.map(([n]) => n)} value={drink.milk} onChange={d('milk')} />
                            <Chips label="hot or iced" options={DRINK.temp} value={drink.temp} onChange={d('temp')} />
                            <Chips label="extras" options={DRINK.toppings} value={drink.toppings} onChange={d('toppings')} multi max={3} />
                        </Reveal>

                        <Reveal className="glass builder" delay={0.1}>
                            <div className="builder-art">
                                <svg viewBox="0 0 260 220" aria-hidden="true"><RamenArt id="rp" {...ramen} /></svg>
                            </div>
                            <h3 className="builder-title">your ramen</h3>
                            <p className="hand builder-name">{ramenName(ramen)}</p>
                            <Chips label="broth" options={RAMEN.broth.map(([n]) => n)} value={ramen.broth} onChange={r('broth')} />
                            <Chips label="noodles" options={RAMEN.noodles} value={ramen.noodles} onChange={r('noodles')} />
                            <Chips label="toppings" options={RAMEN.toppings} value={ramen.toppings} onChange={r('toppings')} multi max={5} />
                        </Reveal>
                    </div>

                    <Reveal className="print-bar">
                        <label className="name-field">
                            <span className="hand">whose order is this?</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" maxLength={20} />
                        </label>
                        <button className="btn btn-gold" onClick={() => setPrinted(true)}>print my comfort polaroid</button>
                    </Reveal>
                </>
            ) : (
                <PolaroidReveal filename="my-comfort-order.png" onReset={() => setPrinted(false)}
                    note="now that you're fed and cosy, scroll on and get to know me ↓">
                    <PolaroidSVG caption={`${name || 'your'}${name ? "'s" : ''} comfort order`} sub={`${drink.temp} ${drink.base} + ${ramen.broth} ramen · ${today()}`}
                        bg={['#e8f6e0', '#ffe9f0']}>
                        <svg x="26" y="70" width="150" height="180" viewBox="0 0 200 240"><DrinkArt id="dpp" {...drink} /></svg>
                        <svg x="140" y="140" width="200" height="170" viewBox="0 0 260 220"><RamenArt id="rpp" {...ramen} /></svg>
                    </PolaroidSVG>
                </PolaroidReveal>
            )}

            <Reveal className="glass cafe-notes slim">
                <h3>café hopping, but make it a personality</h3>
                <p>i café hop all over Bengaluru, and if a new place opens there's a 90% chance i've already been (the other 10% is me planning to). always hunting for good matcha, pretty latte art and a quiet corner to write in. dm me for recs, i don't gatekeep.</p>
            </Reveal>
        </section>
    );
}

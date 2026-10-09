import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal, { SectionHead } from './Reveal';
import { TAROT, PALM_LINES } from '../divination';
import { kundli, RASHIS, SOUTH_GRID, TIMEZONES } from '../vedic';

// ---------- vedic birth chart ----------

function VedicChart() {
    const [f, setF] = useState({ date: '', time: '', tz: '+05:30' });
    const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
    const k = useMemo(() => (f.date ? kundli(f.date, f.time, f.tz) : null), [f]);
    const cells = SOUTH_GRID.map(([row, col], i) => ({ row, col, i, planets: k ? k.planets.filter((pl) => pl.rashi === i) : [] }));

    return (
        <div className="vedic">
            <div className="vedic-chart" role="img" aria-label={k ? `South Indian chart with Moon in ${k.moonRashi.name}` : 'Empty South Indian chart'}>
                {cells.map((c) => (
                    <div key={c.i} className={`v-cell ${k && k.moonRashi === RASHIS[c.i] ? 'moon' : ''}`} style={{ gridRow: c.row + 1, gridColumn: c.col + 1 }}>
                        <span className="v-rashi">{RASHIS[c.i].name}</span>
                        <span className="v-planets">
                            {c.planets.map((pl) => (
                                <motion.b key={pl.key} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} title={pl.name}>{pl.key}</motion.b>
                            ))}
                        </span>
                    </div>
                ))}
                <div className="v-center">
                    <span className="v-om">ॐ</span>
                    <span className="hand">{k ? 'your rashi chakra' : 'enter your birth details'}</span>
                </div>
            </div>

            <div className="vedic-side">
                <div className="vedic-fields">
                    <label><span>birth date</span><input type="date" value={f.date} onChange={set('date')} /></label>
                    <label><span>birth time</span><input type="time" value={f.time} onChange={set('time')} /></label>
                    <label><span>time zone</span>
                        <select value={f.tz} onChange={set('tz')}>
                            {TIMEZONES.map(([v, l]) => <option key={v} value={v}>{l} ({v})</option>)}
                        </select>
                    </label>
                </div>
                <AnimatePresence mode="wait">
                    {k ? (
                        <motion.div key={f.date + f.time + f.tz} className="vedic-result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <p className="sign-meta">chandra rashi · your moon sign</p>
                            <h3>{k.moonRashi.name} <span className="v-en">({k.moonRashi.en})</span></h3>
                            <p className="sign-traits">{k.moonRashi.nature}</p>
                            <ul className="sign-reading">
                                <li><b>nakshatra</b> {k.nakshatra.name}, pada {k.nakshatra.pada} · ruled by {k.nakshatra.lord}</li>
                                <li><b>surya rashi</b> {k.sunRashi.name} ({k.sunRashi.en})</li>
                                <li><b>rashi lord</b> {k.moonRashi.lord}</li>
                                <li><b>your cosmic brew</b> {k.moonRashi.brew}</li>
                            </ul>
                            <p className="form-fine">
                                Sidereal (Lahiri) positions{k.timeKnown ? '' : ', assuming noon since no birth time was given'}. Su Sun · Mo Moon · Ra Rahu · Ke Ketu.
                                For a full kundli with your lagna and dashas, <a href="#hello">ask me for a reading</a>.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.p key="hint" className="hand zodiac-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            in Jyotish, your moon sign says the most about you. let's find yours.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ---------- tarot ----------

function Motif({ type }) {
    const g = { fill: 'none', stroke: '#e9c46a', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
    switch (type) {
        case 'star': return <path {...g} d="M30 6 L35 24 L54 24 L39 35 L45 54 L30 42 L15 54 L21 35 L6 24 L25 24 Z" />;
        case 'moon': return <path {...g} d="M40 8 A24 24 0 1 0 40 52 A18 18 0 1 1 40 8 Z" />;
        case 'sun': return <g {...g}><circle cx="30" cy="30" r="11" />{Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <path key={i} d={`M${30 + Math.cos(a) * 16} ${30 + Math.sin(a) * 16} L${30 + Math.cos(a) * 24} ${30 + Math.sin(a) * 24}`} />; })}</g>;
        case 'wheel': return <g {...g}><circle cx="30" cy="30" r="22" /><circle cx="30" cy="30" r="6" />{[0, 45, 90, 135].map((a) => <path key={a} d="M30 8 V52" transform={`rotate(${a} 30 30)`} />)}</g>;
        case 'infinity': return <path {...g} d="M30 30 C22 18 8 18 8 30 C8 42 22 42 30 30 C38 18 52 18 52 30 C52 42 38 42 30 30 Z" />;
        case 'hearts': return <g {...g}><path d="M22 44 C10 34 8 24 15 20 C19 18 22 21 22 24 C22 21 25 18 29 20 C36 24 34 34 22 44 Z" /><path d="M38 40 C28 32 26 24 32 20 C35 18 38 21 38 23 C38 21 41 18 44 20 C50 24 48 32 38 40 Z" /></g>;
        case 'lantern': return <g {...g}><path d="M22 18 H38 L42 44 H18 Z" /><path d="M26 18 V12 H34 V18 M24 50 H36" /><path d="M30 26 C27 31 27 36 30 38 C33 36 33 31 30 26 Z" /></g>;
        case 'laurel': return <g {...g}><circle cx="30" cy="30" r="12" /><path d="M14 46 C6 36 6 22 14 12 M46 46 C54 36 54 22 46 12" />{[18, 26, 34, 42].map((y) => <path key={y} d={`M${y < 30 ? 11 : 9} ${y} l-5 -3 M${y < 30 ? 49 : 51} ${y} l5 -3`} />)}</g>;
        case 'flower': return <g {...g}>{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="30" cy="18" rx="6" ry="11" transform={`rotate(${a} 30 30)`} />)}<circle cx="30" cy="30" r="4" /></g>;
        default: return <g {...g}><path d="M8 30 Q30 10 52 30 Q30 50 8 30 Z" /><circle cx="30" cy="30" r="7" /></g>;
    }
}

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const LABELS = ['past', 'present', 'future'];

// Ask a question, shuffle, pick three cards from the spread, and get a reading.
function TarotGame() {
    const [stage, setStage] = useState('ask');
    const [question, setQuestion] = useState('');
    const [deck, setDeck] = useState(TAROT);
    const [picked, setPicked] = useState([]);

    const begin = (e) => {
        e?.preventDefault();
        setPicked([]);
        setDeck(shuffle(TAROT));
        setStage('shuffling');
        setTimeout(() => setStage('pick'), 1500);
    };
    const pick = (i) => {
        if (stage !== 'pick' || picked.includes(i) || picked.length >= 3) return;
        const next = [...picked, i];
        setPicked(next);
        if (next.length === 3) setTimeout(() => setStage('done'), 900);
    };
    const cards = picked.map((i) => deck[i]);
    const mid = (deck.length - 1) / 2;
    const spread = typeof window !== 'undefined' && window.innerWidth < 640 ? 17 : 34;
    const tilt = spread < 30 ? 5 : 7;

    return (
        <div className="tarot">
            {stage === 'ask' && (
                <form className="tarot-ask" onSubmit={begin}>
                    <label>
                        <span className="hand">whisper your question to the deck</span>
                        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="what should I focus on this month?" maxLength={90} />
                    </label>
                    <button type="submit" className="btn btn-gold">shuffle the deck</button>
                </form>
            )}

            {stage === 'shuffling' && (
                <div className="tarot-stack" aria-live="polite">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <motion.span key={i} className="tarot-back mini"
                            animate={{ x: [0, (i % 2 ? 1 : -1) * 60, 0], rotate: [0, (i % 2 ? 1 : -1) * 12, 0], y: [0, -i * 2, 0] }}
                            transition={{ duration: 0.5, repeat: 2, delay: i * 0.05 }}>
                            <span className="tarot-back-art" />
                        </motion.span>
                    ))}
                    <p className="hand">shuffling the stars…</p>
                </div>
            )}

            {(stage === 'pick' || stage === 'done') && (
                <>
                    <div className="tarot-slots">
                        {LABELS.map((l, i) => (
                            <div key={l} className="tarot-slot">
                                <span className={`tarot-card ${cards[i] ? 'flipped' : ''}`}>
                                    <span className="tarot-inner">
                                        <span className="tarot-back"><span className="tarot-back-art" /></span>
                                        <span className="tarot-front">
                                            {cards[i] && (
                                                <>
                                                    <svg viewBox="0 0 60 60" className="tarot-motif" aria-hidden="true"><Motif type={cards[i].motif} /></svg>
                                                    <span className="tarot-name">{cards[i].name}</span>
                                                </>
                                            )}
                                        </span>
                                    </span>
                                </span>
                                <span className="tarot-label hand">{l}</span>
                            </div>
                        ))}
                    </div>

                    {stage === 'pick' && (
                        <>
                            <p className="hand tarot-hint">pick {3 - picked.length} more card{picked.length === 2 ? '' : 's'} from the spread</p>
                            <div className="tarot-fan">
                                {deck.map((c, i) => (
                                    <motion.button key={c.name} className="tarot-back fan-card" aria-label={`Card ${i + 1}`}
                                        disabled={picked.includes(i)} onClick={() => pick(i)}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: picked.includes(i) ? 0 : 1, y: picked.includes(i) ? -80 : 0, rotate: (i - mid) * tilt, x: (i - mid) * spread }}
                                        whileHover={{ y: -18 }} transition={{ type: 'spring', stiffness: 160, damping: 18, delay: stage === 'pick' && picked.length === 0 ? i * 0.04 : 0 }}>
                                        <span className="tarot-back-art" />
                                    </motion.button>
                                ))}
                            </div>
                        </>
                    )}

                    {stage === 'done' && (
                        <motion.div className="tarot-result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                            {question && <p className="tarot-q">“{question}”</p>}
                            {cards.map((c, i) => <p key={c.name}><b>{LABELS[i]} · {c.name}</b> {c.message}</p>)}
                            <p className="hand tarot-sum">
                                {cards[0].name} behind you, {cards[1].name} with you, and {cards[2].name} ahead. Want the full story?
                            </p>
                            <div className="tarot-actions">
                                <a className="btn btn-gold" href="#hello">ask me for a real reading</a>
                                <button className="btn btn-ghost" onClick={() => { setQuestion(''); setStage('ask'); }}>ask again</button>
                            </div>
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
}

// ---------- palm ----------

function PalmMap() {
    const [line, setLine] = useState(PALM_LINES[0]);
    const paths = {
        heart: 'M60 128 C80 120 108 118 140 126',
        head: 'M50 150 C74 142 102 148 126 164',
        life: 'M62 134 C48 154 50 192 72 222',
        fate: 'M98 226 C96 196 96 164 100 132',
    };
    return (
        <div className="palm">
            <svg viewBox="0 0 180 240" className="palm-svg" role="group" aria-label="Palm lines">
                <path className="palm-hand" d="M58 232 C48 214 44 190 44 168 C34 160 22 146 16 132 C12 122 22 116 30 124 C38 132 44 140 48 140 L48 50 C48 36 70 36 70 50 L72 104 L74 34 C74 18 98 18 98 34 L98 104 L100 40 C100 26 122 26 122 40 L122 108 L126 64 C126 52 146 52 146 64 L148 120 C152 160 150 200 134 222 C128 230 118 232 106 232 Z" />
                {PALM_LINES.map((l) => (
                    <g key={l.id} className={`palm-line ${line.id === l.id ? 'on' : ''}`} onClick={() => setLine(l)} onMouseEnter={() => setLine(l)}
                        role="button" tabIndex={0} aria-label={l.name} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLine(l)}>
                        <path d={paths[l.id]} className="palm-hit" />
                        <path d={paths[l.id]} className="palm-stroke" />
                    </g>
                ))}
            </svg>
            <AnimatePresence mode="wait">
                <motion.div key={line.id} className="palm-info" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <h4>{line.name}</h4>
                    <p>{line.text}</p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function Readings() {
    return (
        <section id="readings" className="section readings">
            <SectionHead chapter="ch. 03" film="a falling star (howl's moving castle)" title="the stars told me <em>so</em>"
                lede="I'm an astrology and palmistry enthusiast, and I do readings. Pull a card, explore the lines of a palm, and peek at your Vedic chart." />

            <Reveal className="cosmos">
                <div className="cosmos-stars" aria-hidden="true" />
                <p className="eyebrow">a little tarot game</p>
                <TarotGame />
            </Reveal>

            <Reveal className="cosmos">
                <div className="cosmos-stars" aria-hidden="true" />
                <p className="eyebrow">read the palm</p>
                <PalmMap />
            </Reveal>

            <Reveal className="cosmos">
                <div className="cosmos-stars" aria-hidden="true" />
                <p className="eyebrow">your vedic birth chart · jyotish</p>
                <VedicChart />
            </Reveal>
        </section>
    );
}

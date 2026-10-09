import Reveal, { SectionHead } from './Reveal';
import SootGang from './SootGang';
import Landscape from '../art/Landscape';
import { art, languages, now } from '../data';

const stats = [
    ['20', 'indian states & UTs (and counting)'],
    ['6', 'countries wandered so far'],
    ['∞', 'cups of matcha, coffee & chai (stopped counting)'],
    ['4', 'languages (one is still loading…)'],
];

export default function About() {
    return (
        <section id="about" className="section">
            <SectionHead chapter="ch. 02" film="spirited away (into tech)" title="a little <em>bit</em> of everything" />
            <div className="about-grid">
                <Reveal className="polaroid">
                    {art.portrait ? <img src={art.portrait} alt="Jiji reading a book in a bathtub among lily pads, with a cup of coffee" loading="lazy" /> : <Landscape className="polaroid-art" />}
                    <p className="hand">my ideal sunday, honestly</p>
                </Reveal>
                <Reveal className="glass about-text" delay={0.1}>
                    <p>hii, i'm Adrija! a <b>Kolkata</b> girl who now lives in <b>Bengaluru</b>, a software engineer by day, and someone whose head is permanently a little bit in the clouds.</p>
                    <p>lifelong learner, certified matcha-in-one-hand, book-in-the-other person. i write poetry, doodle, binge anime, manga and manhwa way past bedtime, make a playlist for every tiny mood, read birth charts and palms, and i'm learning Korean one hangul letter at a time (안녕!).</p>
                    <p>i've wandered through 20 Indian states and UTs, the UK, France, Switzerland, Germany and Belgium, and i'm nowhere near done. most weekends you'll find me hopping between cafés in Bengaluru, "just getting some work done" (i am not getting work done).</p>
                    <p className="hand quote">"once you've met someone, you never really forget them." <span>· Zeniba</span></p>
                </Reveal>
            </div>
            <div className="stats">
                {stats.map(([n, l], i) => (
                    <Reveal key={l} className="glass stat" delay={i * 0.08}>
                        <span className="stat-num">{n}</span><span className="stat-label">{l}</span>
                    </Reveal>
                ))}
            </div>
            <div className="about-row">
                <Reveal className="glass now-card">
                    <p className="eyebrow">right now</p>
                    <ul>
                        {now.map(([verb, what]) => <li key={verb}><span className="hand">{verb}</span> {what}</li>)}
                    </ul>
                </Reveal>
                <Reveal className="glass lang-card" delay={0.1}>
                    <p className="eyebrow">i say hello in</p>
                    <div className="langs">
                        {languages.map((l) => (
                            <div key={l.name} className={`lang ${l.learning ? 'learning' : ''}`} tabIndex={0}>
                                <span className="lang-hello" lang={{ Bengali: 'bn', Hindi: 'hi', English: 'en', Korean: 'ko' }[l.name]}>{l.hello}</span>
                                <span className="lang-name">{l.name} · {l.level}</span>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
            <Reveal><SootGang /></Reveal>
        </section>
    );
}

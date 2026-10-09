import Reveal, { SectionHead } from './Reveal';
import SootGang from './SootGang';
import Landscape from '../art/Landscape';
import { art, languages, now } from '../data';

const stats = [
    ['20', 'Indian states & UTs explored'],
    ['6', 'countries wandered'],
    ['∞', 'cups of matcha, latte & chai'],
    ['4', 'languages, one in progress'],
];

export default function About() {
    return (
        <section id="about" className="section">
            <SectionHead chapter="ch. 01" film="spirited away (into tech)" title="a little <em>bit</em> of everything" />
            <div className="about-grid">
                <Reveal className="polaroid">
                    {art.portrait ? <img src={art.portrait} alt="Jiji reading a book in a bathtub among lily pads, with a cup of coffee" loading="lazy" /> : <Landscape className="polaroid-art" />}
                    <p className="hand">my ideal sunday, honestly</p>
                </Reveal>
                <Reveal className="glass about-text" delay={0.1}>
                    <p>I'm Adrija: a <b>Kolkata</b> girl living in <b>Bengaluru</b>, a software development engineer at <b>Amazon</b>, and someone who's always a little bit in the clouds.</p>
                    <p>I'm a lifelong learner, happiest with a matcha in one hand and a book in the other. I write poetry, doodle, binge anime, manga and manhwa, make a playlist for every mood, read birth charts and palms, and I'm learning Korean one hangul letter at a time.</p>
                    <p>I've wandered through 20 Indian states and UTs, the UK, France, Switzerland, Germany and Belgium. Most weekends you'll find me hopping between cafés in Bengaluru.</p>
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

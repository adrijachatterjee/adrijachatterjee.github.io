import Reveal, { SectionHead } from './Reveal';
import SootGang from './SootGang';
import Landscape from '../art/Landscape';
import { art, languages, now } from '../data';

const stats = [
    ['9.75', 'B.Tech CGPA'],
    ['3+ yrs', 'building software'],
    ['∞', 'cups of matcha, latte & chai'],
    ['4', 'languages, one in progress'],
];

export default function About() {
    return (
        <section id="about" className="section">
            <SectionHead chapter="ch. 01" film="spirited away (into tech)" title="a little <em>bit</em> of everything" />
            <div className="about-grid">
                <Reveal className="polaroid">
                    {art.portrait ? <img src={art.portrait} alt="Adrija" /> : <Landscape className="polaroid-art" />}
                    <p className="hand">somewhere between Kolkata & Bengaluru</p>
                </Reveal>
                <Reveal className="glass about-text" delay={0.1}>
                    <p>I'm a software developer from <b>Kolkata</b>, now living in <b>Bengaluru</b>. I did my B.Tech in Computer Science &amp; Engineering and started at Amazon as an SDE intern on Amazon Music. After that I worked on robotics simulations at Spacewalk and HPC workload management (PBS Pro) at Altair. In 2025 I came back to Amazon full time.</p>
                    <p>I'm a lifelong learner, and I'm happiest with a matcha in one hand and a book in the other. I've travelled through almost every state in India, plus the UK and Europe. On weekends I'm usually exploring a new café somewhere in Bengaluru.</p>
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

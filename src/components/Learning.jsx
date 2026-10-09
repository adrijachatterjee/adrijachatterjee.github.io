import Reveal, { SectionHead } from './Reveal';
import { Trophy, Rocket } from './Icons';
import { education } from '../data';

export default function Learning() {
    const { degree, schools, wins, certs, stack } = education;
    return (
        <section id="learning" className="section">
            <SectionHead chapter="ch. 07" film="whisper of the heart" title="forever a <em>student</em>"
                lede="shizuku learned that you polish a rough stone slowly. i'm still polishing mine: one course, one certificate and one 2am rabbit hole at a time." />

            <Reveal className="glass edu">
                <div>
                    <p className="t-date">{degree.date}</p>
                    <h3>{degree.title}</h3>
                    <p>{degree.school}</p>
                </div>
                <div className="edu-grade">
                    <span className="stat-num">{degree.grade}</span>
                    <span className="stat-label">{degree.gradeNote}</span>
                </div>
            </Reveal>

            <div className="two-col">
                {schools.map((s, i) => (
                    <Reveal key={s.name} className="glass school" delay={i * 0.08}>
                        <p className="t-date">{s.date}</p><h3>{s.name}</h3><p>{s.grade}</p>
                    </Reveal>
                ))}
                {wins.map((w, i) => (
                    <Reveal key={w} className="glass win" delay={i * 0.08}>
                        {i === 0 ? <Trophy size={28} /> : <Rocket size={28} />}
                        <p dangerouslySetInnerHTML={{ __html: w }} />
                    </Reveal>
                ))}
            </div>

            <p className="hand learn-note">rough stones i've polished along the way</p>
            <div className="chips">
                {certs.map((c, i) => <Reveal as="span" key={c} className="chip" delay={i * 0.03}>{c}</Reveal>)}
            </div>
            <div className="tools">{stack.map((t) => <span key={t}>{t}</span>)}</div>
        </section>
    );
}

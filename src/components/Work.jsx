import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal, { SectionHead } from './Reveal';
import NoFace from '../art/NoFace';
import { experience, projects } from '../data';

export default function Work() {
    const [noFace, setNoFace] = useState(false);
    return (
        <section id="work" className="section">
            <SectionHead chapter="ch. 03" film="kiki's delivery service" title="delivering <em>code</em> since 2020"
                lede="Like Kiki, I've learned that every new town (and every new codebase) takes a little courage and a lot of practice." />

            <ol className="timeline">
                {experience.map((job, i) => (
                    <Reveal as="li" key={job.company + job.date} className={`glass t-item ${job.current ? 'current' : ''}`} delay={0.05}>
                        <span className={`postmark ${job.current ? 'live' : ''}`}>{job.current ? 'in flight' : 'delivered'}</span>
                        <div className="t-meta">
                            <span className="t-date">{job.date}</span>
                            <span className="pill">{job.type}</span>
                        </div>
                        <h3>{job.role} <span className="at">@ {job.company}</span></h3>
                        {job.location && <p className="t-loc">{job.location}</p>}
                        <ul className="t-points">
                            {job.points.map((p, j) => <li key={j} dangerouslySetInnerHTML={{ __html: p }} />)}
                        </ul>
                        {job.tags.length > 0 && <div className="t-tags">{job.tags.map((t) => <span key={t}>{t}</span>)}</div>}
                        <p className="t-note hand">{job.note}</p>
                    </Reveal>
                ))}
            </ol>

            <div className="noface-spot" onMouseEnter={() => setNoFace(true)} onMouseLeave={() => setNoFace(false)} onClick={() => setNoFace((v) => !v)}>
                <NoFace size={58} />
                <motion.span className="bubble" animate={{ opacity: noFace ? 1 : 0, y: noFace ? 0 : 8 }}>ah… ah… (he approves of her PRs)</motion.span>
            </div>

            <h3 className="sub-h">little castles i've built on the side</h3>
            <div className="projects">
                {projects.map((p, i) => (
                    <Reveal key={p.name} delay={i * 0.08}>
                        <a className="glass project" href={p.url} target="_blank" rel="noopener noreferrer">
                            <span className="project-num">0{i + 1}</span>
                            <h3>{p.name}</h3>
                            <p>{p.blurb}</p>
                            <span className="t-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</span>
                        </a>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

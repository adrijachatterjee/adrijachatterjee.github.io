import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal, { SectionHead } from './Reveal';
import NoFace from '../art/NoFace';
import { currentRole, projects, links } from '../data';

export default function Work() {
    const [noFace, setNoFace] = useState(false);
    return (
        <section id="work" className="section">
            <SectionHead chapter="ch. 03" film="kiki's delivery service" title="what i do <em>by day</em>"
                lede="Like Kiki, I've learned that every new town (and every new codebase) takes a little courage and a lot of practice." />

            <Reveal className="glass t-item current now-role">
                <span className="postmark live">in flight</span>
                <div className="t-meta"><span className="pill">currently</span></div>
                <h3>{currentRole.role} <span className="at">@ {currentRole.company}</span></h3>
                <p className="t-loc">{currentRole.location}</p>
                <p className="now-role-blurb">{currentRole.blurb}</p>
                <a className="hand role-link" href={links.linkedin} target="_blank" rel="noopener noreferrer">the full flight log is on LinkedIn →</a>
            </Reveal>

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

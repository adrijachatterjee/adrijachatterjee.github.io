import Reveal, { SectionHead } from './Reveal';
import TotoroTune from './TotoroTune';
import SootSprite from '../art/SootSprite';
import { GitHub, LinkedIn, Instagram, Mail, Quill } from './Icons';
import { links } from '../data';

const socials = [
    [links.linkedin, 'linkedin', LinkedIn],
    [links.github, 'github', GitHub],
    [links.instagram, 'instagram', Instagram],
    [links.musings, 'musings', Quill],
    [`mailto:${links.email}`, 'email', Mail],
];

export default function Contact() {
    return (
        <section id="hello" className="section hello">
            <SectionHead chapter="ch. 09" film="my neighbour totoro" title="waiting at the bus stop<br>for your <em>message</em>"
                lede="Want to talk code, books, travel, café recs, or book a reading? Totoro and I are waiting. Bring an umbrella." />

            <Reveal>
                <TotoroTune>
                    <div className="rain" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 7) * -0.3}s` }} />)}</div>
                    <div className="stop-sign" aria-hidden="true"><span>hello stop</span></div>
                    <SootSprite size={30} className="stop-soot s-a" />
                    <SootSprite size={24} className="stop-soot s-b" look={1.5} />
                </TotoroTune>
            </Reveal>

            <a className="email hand" href={`mailto:${links.email}`}>{links.email}</a>
            <a className="btn btn-gold reading-cta" href="#book">book an astrology or palm reading</a>
            <div className="socials">
                {socials.map(([href, label, Icon]) => (
                    <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label}>
                        <Icon size={20} /><span>{label}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}

import Reveal, { SectionHead } from './Reveal';
import Totoro from '../art/Totoro';
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
            <SectionHead chapter="ch. 08" film="my neighbour totoro" title="waiting at the bus stop<br>for your <em>message</em>"
                lede="Want to talk code, books, travel or café recs? Totoro and I are waiting. Bring an umbrella." />

            <Reveal className="bus-stop">
                <div className="rain" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 7) * -0.3}s` }} />)}</div>
                <div className="stop-sign" aria-hidden="true"><span>hello stop</span></div>
                <Totoro size={170} className="contact-totoro" />
                <SootSprite size={30} className="stop-soot s-a" />
                <SootSprite size={24} className="stop-soot s-b" look={1.5} />
            </Reveal>

            <a className="email hand" href={`mailto:${links.email}`}>{links.email}</a>
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

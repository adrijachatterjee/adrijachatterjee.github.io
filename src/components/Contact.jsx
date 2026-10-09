import Reveal, { SectionHead } from './Reveal';
import TotoroTune from './TotoroTune';
import SootSprite from '../art/SootSprite';
import { GitHub, LinkedIn, Instagram, Mail, Quill } from './Icons';
import { links } from '../data';

const reasons = [
    'just chat about anything (or nothing)',
    'nerd out about tech',
    'get something coded or built',
    'get your palm or birth chart read',
    'go café hopping in Bengaluru',
    'swap anime, manga & manhwa recs',
];

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
            <SectionHead chapter="ch. 10" film="my neighbour totoro" title="waiting at the bus stop<br>for your <em>message</em>"
                lede="ok so i'm kind of a jack of all trades (lol). hit me up if u wanna:" />

            <Reveal className="reasons">
                {reasons.map((r, i) => <span key={r} className="reason" style={{ '--tilt': `${i % 2 ? 2 : -2}deg` }}>{r}</span>)}
            </Reveal>
            <p className="hand reasons-foot">totoro and i will be at the bus stop. bring an umbrella.</p>

            <Reveal>
                <TotoroTune>
                    <div className="rain" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 7) * -0.3}s` }} />)}</div>
                    <div className="stop-sign" aria-hidden="true"><span>hello stop</span></div>
                    <SootSprite size={30} className="stop-soot s-a" />
                    <SootSprite size={24} className="stop-soot s-b" look={1.5} />
                </TotoroTune>
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

import { motion } from 'framer-motion';
import Reveal, { SectionHead } from './Reveal';
import Kodama from '../art/Kodama';
import Lotus from '../art/Lotus';
import { Quill, Palette, Vinyl, Book, Wand, Camera } from './Icons';
import { links } from '../data';

const quests = [
    { Icon: Quill, cls: 'q-poet', title: 'the poet', text: 'I write musings, read Keats and keep a notebook of thoughts too big to say out loud.', link: [links.musings, '@musings_by_adrija'] },
    { Icon: Palette, cls: 'q-art', title: 'the doodler', text: 'Illustrations, doodles and a little graphic design. I\'m happiest when things look pretty.' },
    { Icon: Vinyl, cls: 'q-music', title: 'the playlist curator', text: 'Beatles for sunny days, Pink Floyd for night drives and Linkin Park forever.' },
    { Icon: Book, cls: 'q-books', title: 'the bookworm', text: 'Always reading something, with a stack of unread books waiting.' },
    { Icon: Wand, cls: 'q-try', title: 'trying stuff', text: 'New recipes, new skills, new aesthetics. If it sounds fun, I\'m in.' },
    { Icon: Camera, cls: 'q-creator', title: 'the creator', text: 'I share bits of life, jacarandas and moody skies with 14K+ lovely people.', link: [links.instagram, '@_adrija_chatterjee'] },
];

export default function Beyond() {
    return (
        <section id="side-quests" className="section">
            <SectionHead chapter="ch. 07" film="princess mononoke" title="forest spirits &amp; <em>side quests</em>"
                lede="I collect hobbies the way Ghibli heroines collect tiny magical companions." />

            <Reveal className="glass seeker">
                <Lotus size={120} />
                <div>
                    <p className="eyebrow">the seeker</p>
                    <h3 className="seeker-mantra">ॐ · aham brahmasmi</h3>
                    <p>Underneath the code and the cafés, there's a quieter, spiritual me. I find calm in a lotus, a swan gliding on water, and the belief that <span className="hand inline">what's yours will find you.</span></p>
                </div>
                <Kodama className="seeker-kodama" size={40} />
            </Reveal>

            <div className="quests">
                {quests.map(({ Icon, cls, title, text, link }, i) => (
                    <Reveal key={title} delay={i * 0.06}>
                        <motion.article className={`glass quest ${cls}`} whileHover={{ y: -8, rotate: i % 2 ? 1.5 : -1.5 }}>
                            <span className="quest-icon"><Icon size={34} /></span>
                            <h3>{title}</h3>
                            <p>{text}</p>
                            {link && <a className="quest-link hand" href={link[0]} target="_blank" rel="noopener noreferrer">{link[1]} →</a>}
                            {i === 2 && <Kodama className="quest-kodama" size={30} />}
                        </motion.article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

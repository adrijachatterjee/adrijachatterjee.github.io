import { motion } from 'framer-motion';
import { Sparkle } from './Icons';
import SootSprite from '../art/SootSprite';
import { Matcha, Latte, Chai } from '../art/Cups';
import FairyLights from './FairyLights';

function Letters({ text, className, delay = 0 }) {
    return (
        <span className={className}>
            <span className="sr-only">{text}</span>
            {[...text].map((ch, i) => (
                <motion.span key={i} className="letter" aria-hidden="true"
                    initial={{ opacity: 0, y: 60, rotate: -10 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: delay + i * 0.05, type: 'spring', stiffness: 160, damping: 14 }}>
                    {ch}
                </motion.span>
            ))}
        </span>
    );
}

export default function Hero() {
    return (
        <section className="hero" id="top">
            <FairyLights />
            <motion.p className="hand hero-hi" initial={{ opacity: 0, rotate: -12 }} animate={{ opacity: 1, rotate: -5 }} transition={{ delay: 0.2 }}>
                hi, i'm
            </motion.p>
            <h1 className="hero-name">
                <Letters text="Adrija" className="name-first" delay={0.3} />
                <Letters text="Chatterjee" className="name-last" delay={0.6} />
            </h1>
            <motion.p className="hero-tag" initial={{ y: 16 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}>
                software developer <Sparkle /> café girlie <Sparkle /> wanderer <Sparkle /> stargazer &amp; palm reader
            </motion.p>
            <motion.p className="hero-sub" initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.5 }}>
                i write code by day. the rest of the time (and lunch breaks, lol) i'm café hopping,
                reading palms and living like a slightly chaotic ghibli side character.
            </motion.p>
            <motion.div className="hero-cta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <a href="#work" className="btn btn-solid">peek inside</a>
                <a href="#cafe" className="btn btn-ghost">grab a cup w me</a>
                <a href="#readings" className="btn btn-gold">let me read ur stars</a>
            </motion.div>

            <div className="hero-cups">
                <Matcha size={92} /><Latte size={92} /><Chai size={92} />
            </div>
            <SootSprite className="hero-soot hs1" size={40} />
            <SootSprite className="hero-soot hs2" size={30} look={1.5} />
            <SootSprite className="hero-soot hs3" size={34} look={-1.5} />

            <a href="#about" className="scroll-cue hand">scroll down, the wind is rising</a>
        </section>
    );
}

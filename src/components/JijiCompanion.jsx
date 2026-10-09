import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Jiji from '../art/Jiji';
import { jijiLines } from '../data';

// Jiji sits in the corner, waves hello when you arrive, and chats when you tap him.
const VISIT_KEY = 'jiji-visits';

function greeting() {
    const h = new Date().getHours();
    const time = h < 5 ? 'up late, huh? me too.' : h < 12 ? 'good morning!' : h < 17 ? 'good afternoon!' : h < 21 ? 'good evening!' : 'a night owl! perfect flying weather.';
    const visits = Number(localStorage.getItem(VISIT_KEY) || 0) + 1;
    localStorage.setItem(VISIT_KEY, String(visits));
    if (visits === 1) return `${time} i'm Jiji. welcome to Adrija's little corner of the sky. tap me anytime.`;
    if (visits < 5) return `${time} welcome back! the soot sprites missed you.`;
    return `${time} you again! visit #${visits}. should i put the kettle on?`;
}

export default function JijiCompanion() {
    const [line, setLine] = useState(null);
    const [n, setN] = useState(0);
    const [mood, setMood] = useState('idle');

    useEffect(() => {
        const t = setTimeout(() => {
            setLine(greeting());
            setMood('wave');
        }, 1600);
        const t2 = setTimeout(() => setMood('idle'), 4400);
        return () => { clearTimeout(t); clearTimeout(t2); };
    }, []);

    useEffect(() => {
        if (!line) return;
        const t = setTimeout(() => setLine(null), line.length > 60 ? 7000 : 4500);
        return () => clearTimeout(t);
    }, [line, n]);

    const talk = () => {
        setLine(jijiLines[n % jijiLines.length]);
        setN((x) => x + 1);
        setMood('happy');
        setTimeout(() => setMood('idle'), 900);
    };

    return (
        <div className="jiji-corner">
            <AnimatePresence>
                {line && (
                    <motion.div key={line} className="bubble jiji-bubble" initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6 }}>
                        {line}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button className="jiji-btn" onClick={talk} aria-label="Talk to Jiji"
                whileHover={{ y: -6, rotate: -3 }} whileTap={{ scale: 0.9, rotate: 4 }}>
                <Jiji size={78} mood={mood} />
            </motion.button>
        </div>
    );
}

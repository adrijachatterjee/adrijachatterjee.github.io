import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Jiji from '../art/Jiji';
import { jijiLines } from '../data';

// Jiji sits in the corner and chats when you tap him.
export default function JijiCompanion() {
    const [line, setLine] = useState(null);
    const [n, setN] = useState(0);
    const [mood, setMood] = useState('idle');

    useEffect(() => {
        const t = setTimeout(() => setLine('psst. tap me.'), 2500);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!line) return;
        const t = setTimeout(() => setLine(null), 4500);
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

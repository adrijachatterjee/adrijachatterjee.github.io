import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SootSprite from '../art/SootSprite';
import Konpeito, { KONPEITO_COLORS } from '../art/Konpeito';

const spots = [
    { x: '8%', y: '55%', s: 54 }, { x: '28%', y: '20%', s: 40 }, { x: '48%', y: '60%', s: 62 },
    { x: '68%', y: '25%', s: 44 }, { x: '84%', y: '58%', s: 50 },
];

function Sprite({ spot, onFeed, i }) {
    const [pops, setPops] = useState([]);
    const feed = () => {
        const id = Date.now() + Math.random();
        setPops((p) => [...p, { id, color: KONPEITO_COLORS[(i + p.length) % KONPEITO_COLORS.length] }]);
        setTimeout(() => setPops((p) => p.filter((x) => x.id !== id)), 900);
        onFeed();
    };
    return (
        <motion.div className="sprite" style={{ left: spot.x, top: spot.y }}
            drag dragMomentum={false} dragElastic={0.3}
            whileHover={{ y: -14, scale: 1.12 }} whileTap={{ scale: 0.82 }} onTap={feed}
            animate={{ y: [0, -6, 0] }} transition={{ y: { duration: 1.6 + i * 0.3, repeat: Infinity, ease: 'easeInOut' } }}>
            <SootSprite size={spot.s} look={i % 2 ? 1.5 : -1.5} />
            <AnimatePresence>
                {pops.map((p) => (
                    <motion.span key={p.id} className="pop" initial={{ opacity: 1, y: 0, scale: 0.6 }}
                        animate={{ opacity: 0, y: -50, scale: 1.2, rotate: 120 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
                        <Konpeito size={18} color={p.color} />
                    </motion.span>
                ))}
            </AnimatePresence>
        </motion.div>
    );
}

// A little playground of draggable soot sprites. Tap one to feed it konpeito.
export default function SootGang() {
    const [fed, setFed] = useState(0);
    const area = useRef(null);
    return (
        <div className="soot-area glass" ref={area}>
            {spots.map((s, i) => <Sprite key={i} i={i} spot={s} onFeed={() => setFed((f) => f + 1)} />)}
            <p className="soot-count hand">konpeito fed: {fed}{fed >= 10 ? ' (they love you now)' : ''}</p>
            <p className="soot-hint">tap to feed, drag to play</p>
        </div>
    );
}

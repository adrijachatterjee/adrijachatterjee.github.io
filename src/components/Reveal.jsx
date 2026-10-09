import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
    const M = motion[as];
    return (
        <M className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </M>
    );
}

export function SectionHead({ chapter, film, title, lede }) {
    return (
        <Reveal className="section-head">
            <p className="eyebrow">{chapter} <span>·</span> {film}</p>
            <h2 dangerouslySetInnerHTML={{ __html: title }} />
            {lede && <p className="lede">{lede}</p>}
        </Reveal>
    );
}

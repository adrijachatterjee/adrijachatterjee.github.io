import { useEffect } from 'react';
import { KONPEITO_COLORS, KONPEITO_PATH } from '../art/Konpeito';

// Leaves a trail of konpeito stars behind the cursor.
export default function CursorTrail() {
    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
        let last = 0;
        const onMove = (e) => {
            const now = performance.now();
            if (now - last < 70) return;
            last = now;
            const color = KONPEITO_COLORS[Math.floor(Math.random() * KONPEITO_COLORS.length)];
            const el = document.createElement('span');
            el.className = 'trail';
            el.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="${KONPEITO_PATH}" fill="${color}" stroke="${color}" stroke-width="2.2" stroke-linejoin="round"/></svg>`;
            el.style.left = `${e.clientX}px`;
            el.style.top = `${e.clientY}px`;
            el.style.setProperty('--dx', `${Math.random() * 40 - 20}px`);
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 1000);
        };
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
    }, []);
    return null;
}

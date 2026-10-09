import { useEffect } from 'react';

const COLORS = [['#ffc4d6', '#ff8fb1'], ['#fff0f5', '#ffb3c7'], ['#e6d9ff', '#b89cff'], ['#ffe3ec', '#f7a8c4']];

// Five-petal sakura with notched petals.
const PETAL = 'M0 0 C-5 -4 -5 -10 -2 -13 L0 -11 L2 -13 C5 -10 5 -4 0 0 Z';
const flower = (fill, edge) =>
    `<svg viewBox="-15 -15 30 30" width="100%" height="100%">${[0, 72, 144, 216, 288]
        .map((a) => `<path d="${PETAL}" fill="${fill}" stroke="${edge}" stroke-width="0.6" transform="rotate(${a})"/>`)
        .join('')}<circle r="2.6" fill="#ffd36b"/></svg>`;

// Leaves a light trail of sakura blossoms behind the cursor, and a soft ripple where you click.
export default function CursorTrail() {
    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || !window.matchMedia('(pointer: fine)').matches) return undefined;
        let last = 0;
        let lx = 0, ly = 0;
        const onMove = (e) => {
            const now = performance.now();
            if (now - last < 110 || Math.hypot(e.clientX - lx, e.clientY - ly) < 30) return;
            last = now; lx = e.clientX; ly = e.clientY;
            const [fill, edge] = COLORS[Math.floor(Math.random() * COLORS.length)];
            const el = document.createElement('span');
            const size = 10 + Math.random() * 6;
            el.className = 'trail';
            el.innerHTML = flower(fill, edge);
            el.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;--dx:${Math.random() * 60 - 30}px;--dy:${50 + Math.random() * 60}px;--rot:${Math.random() * 360 - 180}deg`;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 1400);
        };
        const onClick = (e) => {
            if (e.target.closest('a, button, input, canvas, [role="button"], .game, .sprite')) return;
            const el = document.createElement('span');
            el.className = 'ripple';
            el.style.cssText = `left:${e.clientX}px;top:${e.clientY}px`;
            el.innerHTML = flower('#fff0f5', '#ffb3c7');
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 900);
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('click', onClick);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('click', onClick);
        };
    }, []);
    return null;
}

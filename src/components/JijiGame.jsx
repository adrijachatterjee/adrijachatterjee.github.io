import { useEffect, useRef, useState } from 'react';
import { SectionHead } from './Reveal';
import Reveal from './Reveal';
import Jiji from '../art/Jiji';

// Jiji's Delivery Dash: Kiki caught a cold (like in the film), so Jiji is flying the broom.
// Hold to rise, let go to glide down. Grab parcels, sip drinks for a shield, dodge crows and
// clock towers. Herring pie is worth a lot, even if nobody actually likes it.

const BEST_KEY = 'jiji-best';
const ITEMS = {
    parcel: { r: 15, points: 1, label: '+1 delivery' },
    matcha: { r: 14, points: 1, label: 'matcha shield!', shield: true },
    latte: { r: 14, points: 1, label: 'latte shield!', shield: true },
    chai: { r: 14, points: 1, label: 'chai shield!', shield: true },
    pie: { r: 15, points: 3, label: '+3 herring pie (she hates it)' },
};

function drawJiji(ctx, x, y, t, s) {
    const tilt = Math.max(-0.35, Math.min(0.35, s.vy / 900));
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(tilt);
    if (s.inv > 0 && Math.floor(s.inv * 12) % 2 === 0) ctx.globalAlpha = 0.45;

    // wind streaks
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        const o = ((t * 260 + i * 40) % 120);
        ctx.beginPath(); ctx.moveTo(-40 - o, 14 + i * 6); ctx.lineTo(-58 - o, 14 + i * 6); ctx.stroke();
    }

    // broom: stick, bristles and Kiki's red bow tied on
    ctx.strokeStyle = '#5b3d26'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-34, 20); ctx.lineTo(44, 12); ctx.stroke();
    ctx.fillStyle = '#caa36a';
    ctx.beginPath(); ctx.moveTo(-30, 19); ctx.lineTo(-58, 10); ctx.lineTo(-60, 22); ctx.lineTo(-54, 34); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#e2445c';
    ctx.beginPath(); ctx.moveTo(-26, 18); ctx.lineTo(-34, 8); ctx.lineTo(-30, 22); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-26, 18); ctx.lineTo(-20, 8); ctx.lineTo(-22, 22); ctx.closePath(); ctx.fill();

    if (s.shield > 0) {
        ctx.strokeStyle = `rgba(184,240,170,${0.5 + Math.sin(t * 10) * 0.25})`;
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(2, -4, 34, 0, Math.PI * 2); ctx.stroke();
    }

    const black = '#141019';
    // tail: long and thin, flicking
    ctx.strokeStyle = black; ctx.lineWidth = 3.6;
    const flick = Math.sin(t * 5) * 8;
    ctx.beginPath(); ctx.moveTo(-10, 10); ctx.bezierCurveTo(-30, 8, -36, -12 + flick, -26, -22 + flick); ctx.stroke();
    // body + thin legs gripping the broom
    ctx.fillStyle = black;
    ctx.beginPath(); ctx.ellipse(0, 4, 13, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(6, 8); ctx.lineTo(9, 16); ctx.moveTo(-4, 9); ctx.lineTo(-4, 17); ctx.stroke();
    // head
    ctx.save();
    ctx.translate(10, -14);
    ctx.rotate(Math.sin(t * 2) * 0.05);
    ctx.beginPath();
    ctx.moveTo(-10, -4); ctx.lineTo(-9, -21); ctx.lineTo(0, -10);
    ctx.lineTo(4, -10); ctx.lineTo(13, -21 + (Math.sin(t * 3) > 0.96 ? 3 : 0)); ctx.lineTo(14, -4);
    ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.ellipse(2, 0, 14, 12, 0, 0, Math.PI * 2); ctx.fill();
    // eyes: big white ovals, black oval pupils looking ahead
    const blink = (t % 3.4) < 0.12 || s.happy > 0;
    ctx.fillStyle = '#fffdf6';
    if (blink) {
        ctx.strokeStyle = '#fffdf6'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-6, 0); ctx.quadraticCurveTo(-2, -4, 2, 0); ctx.moveTo(5, 0); ctx.quadraticCurveTo(9, -4, 13, 0); ctx.stroke();
    } else {
        const big = s.hurt > 0 ? 1.25 : 1;
        ctx.beginPath(); ctx.ellipse(-2, 0, 4.8 * big, 6 * big, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(9, 0, 4.8 * big, 6 * big, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = black;
        const pr = s.hurt > 0 ? 1.2 : 2.1;
        ctx.beginPath(); ctx.ellipse(-0.6, 0.6, pr, 3.4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(10.4, 0.6, pr, 3.4, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
    ctx.restore();
}

function drawItem(ctx, it, t) {
    ctx.save();
    ctx.translate(it.x, it.y + Math.sin(t * 3 + it.ph) * 4);
    if (it.type === 'parcel') {
        ctx.fillStyle = '#d9a86c'; ctx.fillRect(-13, -10, 26, 20);
        ctx.fillStyle = '#e2445c'; ctx.fillRect(-2, -10, 4, 20); ctx.fillRect(-13, -2, 26, 4);
        ctx.beginPath(); ctx.ellipse(-4, -12, 4, 3, -0.5, 0, Math.PI * 2); ctx.ellipse(4, -12, 4, 3, 0.5, 0, Math.PI * 2); ctx.fill();
    } else if (it.type === 'pie') {
        ctx.fillStyle = '#c98648'; ctx.beginPath(); ctx.ellipse(0, 2, 16, 9, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e8b36e'; ctx.beginPath(); ctx.ellipse(0, -1, 14, 7, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#8fa3b8'; ctx.beginPath(); ctx.ellipse(0, -2, 7, 3, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(6, -2); ctx.lineTo(10, -5); ctx.lineTo(10, 1); ctx.fill();
    } else {
        const cup = { matcha: ['#f4efe2', '#8fbf5a'], latte: ['#ffe1e7', '#c79a74'], chai: ['#c46a3f', '#d79a5e'] }[it.type];
        ctx.fillStyle = cup[0];
        ctx.beginPath(); ctx.moveTo(-11, -6); ctx.lineTo(11, -6); ctx.lineTo(8, 11); ctx.lineTo(-8, 11); ctx.closePath(); ctx.fill();
        ctx.fillStyle = cup[1]; ctx.beginPath(); ctx.ellipse(0, -6, 11, 3, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#3a2a22';
        ctx.beginPath(); ctx.arc(-4, 2, 1.2, 0, 7); ctx.arc(4, 2, 1.2, 0, 7); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(-3, -10); ctx.quadraticCurveTo(-6, -14, -3, -18); ctx.moveTo(3, -10); ctx.quadraticCurveTo(0, -14, 3, -18); ctx.stroke();
    }
    ctx.restore();
}

function drawCrow(ctx, c, t) {
    ctx.save();
    ctx.translate(c.x, c.y);
    const flap = Math.sin(t * 14 + c.ph) * 10;
    ctx.fillStyle = '#2a2433';
    ctx.beginPath(); ctx.ellipse(0, 0, 14, 7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-12, -3, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f2b84b'; ctx.beginPath(); ctx.moveTo(-17, -3); ctx.lineTo(-24, -1); ctx.lineTo(-17, 0); ctx.fill();
    ctx.fillStyle = '#2a2433';
    ctx.beginPath(); ctx.moveTo(-2, -2); ctx.lineTo(8, -14 - flap); ctx.lineTo(12, -2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(22, -4); ctx.lineTo(20, 4); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-13, -4, 1.6, 0, 7); ctx.fill();
    ctx.restore();
}

function drawTower(ctx, o, H) {
    const top = H - o.h;
    ctx.fillStyle = o.color;
    ctx.fillRect(o.x - o.w / 2, top, o.w, o.h);
    ctx.fillStyle = '#c7563f';
    ctx.beginPath(); ctx.moveTo(o.x - o.w / 2 - 6, top); ctx.lineTo(o.x, top - 34); ctx.lineTo(o.x + o.w / 2 + 6, top); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.arc(o.x, top + 22, 11, 0, 7); ctx.fill();
    ctx.strokeStyle = '#2a2440'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(o.x, top + 22); ctx.lineTo(o.x, top + 15); ctx.moveTo(o.x, top + 22); ctx.lineTo(o.x + 5, top + 24); ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    for (let y = top + 44; y < H - 10; y += 26) ctx.fillRect(o.x - 6, y, 12, 14);
}

export default function JijiGame({ night }) {
    const wrap = useRef(null);
    const canvas = useRef(null);
    const nightRef = useRef(night);
    const [phase, setPhase] = useState('ready');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [best, setBest] = useState(() => Number(localStorage.getItem(BEST_KEY) || 0));
    const game = useRef(null);

    useEffect(() => { nightRef.current = night; }, [night]);

    useEffect(() => {
        const cv = canvas.current;
        const ctx = cv.getContext('2d');
        let W = 0, H = 0, raf = 0, last = performance.now(), visible = true;

        const resize = () => {
            const r = wrap.current.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio, 2);
            W = r.width; H = r.height;
            cv.width = W * dpr; cv.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        const town = Array.from({ length: 30 }, (_, i) => ({ x: i * 70, h: 40 + ((i * 37) % 60), c: ['#f3b8a8', '#a8d4e6', '#f6dfa8', '#c5b3e6', '#b9e0c4'][i % 5] }));
        const fresh = () => ({
            y: H * 0.45, vy: 0, hold: false, t: 0, speed: 230, score: 0, lives: 3,
            inv: 0, shield: 0, hurt: 0, happy: 0, items: [], crows: [], towers: [], texts: [],
            nextItem: 0.8, nextCrow: 2.2, nextTower: 3.5, nextPie: 14, scrollX: 0,
        });
        game.current = { s: fresh(), state: 'ready', fresh };

        const spawnText = (s, text, x, y, color = '#fff') => s.texts.push({ text, x, y, life: 1, color });

        const update = (dt) => {
            const g = game.current;
            const s = g.s;
            s.t += dt;
            s.scrollX += s.speed * dt * 0.5;
            if (g.state !== 'playing') { s.y = H * 0.45 + Math.sin(s.t * 2) * 10; return; }

            s.speed = Math.min(480, 230 + s.t * 5);
            s.vy += (s.hold ? -1500 : 950) * dt;
            s.vy = Math.max(-360, Math.min(420, s.vy));
            s.y += s.vy * dt;
            if (s.y < 40) { s.y = 40; s.vy = 0; }
            if (s.y > H - 40) { s.y = H - 40; s.vy = -200; }
            s.inv = Math.max(0, s.inv - dt);
            s.shield = Math.max(0, s.shield - dt);
            s.hurt = Math.max(0, s.hurt - dt);
            s.happy = Math.max(0, s.happy - dt);

            const px = W * 0.24;
            s.nextItem -= dt; s.nextCrow -= dt; s.nextTower -= dt; s.nextPie -= dt;
            if (s.nextItem <= 0) {
                const r = Math.random();
                const type = r < 0.72 ? 'parcel' : ['matcha', 'latte', 'chai'][Math.floor(Math.random() * 3)];
                s.items.push({ type, x: W + 30, y: 60 + Math.random() * (H - 180), ph: Math.random() * 6 });
                s.nextItem = 0.9 + Math.random() * 0.9;
            }
            if (s.nextPie <= 0) {
                s.items.push({ type: 'pie', x: W + 30, y: 60 + Math.random() * (H - 180), ph: 0 });
                s.nextPie = 12 + Math.random() * 8;
            }
            if (s.nextCrow <= 0) {
                s.crows.push({ x: W + 40, y: 50 + Math.random() * (H - 160), ph: Math.random() * 6, by: 0 });
                s.nextCrow = Math.max(0.7, 2.4 - s.t * 0.03) * (0.6 + Math.random() * 0.8);
            }
            if (s.nextTower <= 0) {
                s.towers.push({ x: W + 40, w: 34 + Math.random() * 14, h: 90 + Math.random() * (H * 0.38), color: ['#f6e7d0', '#efd9c9', '#e6e0f2'][Math.floor(Math.random() * 3)] });
                s.nextTower = 2.6 + Math.random() * 2.4;
            }

            const hit = () => {
                if (s.inv > 0) return;
                if (s.shield > 0) { s.shield = 0; s.inv = 0.8; spawnText(s, 'shield popped!', px, s.y - 40); return; }
                s.lives -= 1; s.inv = 1.6; s.hurt = 0.8;
                setLives(s.lives);
                spawnText(s, s.lives > 0 ? 'mrrROW!' : 'oof.', px, s.y - 40, '#ffb3c7');
                if (s.lives <= 0) {
                    g.state = 'over';
                    setPhase('over');
                    setBest((b) => {
                        const nb = Math.max(b, s.score);
                        localStorage.setItem(BEST_KEY, String(nb));
                        return nb;
                    });
                }
            };

            for (const it of s.items) {
                it.x -= s.speed * dt;
                if (!it.got && Math.hypot(it.x - px, it.y - s.y) < ITEMS[it.type].r + 20) {
                    it.got = true;
                    const def = ITEMS[it.type];
                    s.score += def.points; setScore(s.score);
                    if (def.shield) s.shield = 5;
                    s.happy = 0.35;
                    spawnText(s, def.label, it.x, it.y - 20);
                }
            }
            for (const c of s.crows) {
                c.x -= (s.speed + 110) * dt;
                c.y += Math.sin(s.t * 3 + c.ph) * 40 * dt;
                if (Math.hypot(c.x - px, c.y - s.y) < 28) hit();
            }
            for (const o of s.towers) {
                o.x -= s.speed * dt;
                const top = H - o.h - 20;
                if (px + 16 > o.x - o.w / 2 && px - 16 < o.x + o.w / 2 && s.y + 16 > top) hit();
            }
            s.items = s.items.filter((i) => i.x > -40 && !i.got);
            s.crows = s.crows.filter((c) => c.x > -50);
            s.towers = s.towers.filter((o) => o.x > -80);
            for (const tx of s.texts) { tx.life -= dt * 0.8; tx.y -= 30 * dt; }
            s.texts = s.texts.filter((tx) => tx.life > 0);
        };

        const draw = () => {
            const s = game.current.s;
            const n = nightRef.current;
            const sky = ctx.createLinearGradient(0, 0, 0, H);
            sky.addColorStop(0, n ? '#141a46' : '#8fcaf2');
            sky.addColorStop(0.7, n ? '#4a2f6e' : '#ffe0ea');
            sky.addColorStop(1, n ? '#6a3f6e' : '#ffd6bf');
            ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = n ? '#f6edc8' : '#fff4c4';
            ctx.beginPath(); ctx.arc(W * 0.82, H * 0.2, 30, 0, 7); ctx.fill();
            if (n) {
                ctx.fillStyle = '#fff';
                for (let i = 0; i < 40; i++) ctx.fillRect((i * 97 + 13) % W, (i * 53) % (H * 0.6), 1.6, 1.6);
            }

            // sea with sparkles
            ctx.fillStyle = n ? '#2b3a78' : '#9fd3f0';
            ctx.fillRect(0, H - 120, W, 120);
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            for (let i = 0; i < 12; i++) {
                const x = ((i * 113) - s.scrollX * 0.3) % W;
                ctx.fillRect((x + W) % W, H - 110 + (i % 4) * 8, 14, 2);
            }

            // seaside town rooftops (parallax)
            const off = (s.scrollX * 0.8) % (town.length * 70);
            for (const b of town) {
                let x = b.x - off;
                if (x < -70) x += town.length * 70;
                ctx.fillStyle = n ? '#3b2f5c' : b.c;
                ctx.fillRect(x, H - 20 - b.h, 60, b.h + 20);
                ctx.fillStyle = n ? '#57406e' : '#d9674f';
                ctx.beginPath(); ctx.moveTo(x - 4, H - 20 - b.h); ctx.lineTo(x + 30, H - 46 - b.h); ctx.lineTo(x + 64, H - 20 - b.h); ctx.fill();
                ctx.fillStyle = n ? '#ffd36b' : 'rgba(255,255,255,0.7)';
                ctx.fillRect(x + 14, H - b.h, 10, 10); ctx.fillRect(x + 36, H - b.h, 10, 10);
            }

            for (const o of s.towers) drawTower(ctx, o, H - 20);
            for (const it of s.items) drawItem(ctx, it, s.t);
            for (const c of s.crows) drawCrow(ctx, c, s.t);
            drawJiji(ctx, W * 0.24, s.y, s.t, s);

            ctx.font = '600 22px Caveat, cursive';
            ctx.textAlign = 'center';
            for (const tx of s.texts) {
                ctx.globalAlpha = Math.max(0, tx.life);
                ctx.fillStyle = tx.color;
                ctx.strokeStyle = 'rgba(42,36,64,0.55)'; ctx.lineWidth = 3;
                ctx.strokeText(tx.text, tx.x, tx.y); ctx.fillText(tx.text, tx.x, tx.y);
            }
            ctx.globalAlpha = 1;
        };

        const loop = (now) => {
            const dt = Math.min((now - last) / 1000, 0.04);
            last = now;
            if (visible) { update(dt); draw(); }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            if (!visible && game.current.state === 'playing') game.current.s.hold = false;
        });
        io.observe(wrap.current);

        const down = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
                if (game.current.state !== 'playing' || !visible) return;
                e.preventDefault();
                game.current.s.hold = true;
            }
        };
        const up = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') game.current.s.hold = false;
        };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            window.removeEventListener('resize', resize);
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
        };
    }, []);

    const start = () => {
        const g = game.current;
        g.s = g.fresh();
        g.s.y = canvas.current.getBoundingClientRect().height * 0.45;
        g.state = 'playing';
        setScore(0); setLives(3); setPhase('playing');
    };
    const hold = (v) => () => { if (game.current?.state === 'playing') game.current.s.hold = v; };

    return (
        <section id="play" className="section">
            <SectionHead chapter="ch. 05" film="a jiji side story" title="jiji's delivery <em>dash</em>"
                lede="plot twist: kiki caught a cold after that rainy delivery, so jiji's flying the broom today. pls help him, he's trying his best." />

            <Reveal>
                <div className="game glass" ref={wrap}
                    onPointerDown={hold(true)} onPointerUp={hold(false)} onPointerLeave={hold(false)} onPointerCancel={hold(false)}>
                    <canvas ref={canvas} className="game-canvas" />
                    <div className="game-hud">
                        <span className="hud-score">deliveries: <b>{score}</b></span>
                        <span className="hud-lives">
                            <span className="sr-only">{lives} lives left</span>
                            {[0, 1, 2].map((i) => <i key={i} className={i < lives ? 'on' : ''} />)}
                        </span>
                        <span className="hud-best">best: {best}</span>
                    </div>

                    {phase !== 'playing' && (
                        <div className="game-overlay">
                            <Jiji size={phase === 'over' ? 70 : 84} mood={phase === 'over' ? 'startled' : 'happy'} />
                            {phase === 'ready' ? (
                                <>
                                    <h3>Jiji's Delivery Dash</h3>
                                    <p>hold (or press space) to fly up, let go to glide. grab parcels, sip matcha, latte or chai for a shield, and dodge the crows + clock towers. the herring pie is worth 3. nobody likes it.</p>
                                </>
                            ) : (
                                <>
                                    <h3>{score >= best && score > 0 ? 'new best delivery run!' : 'Jiji needs a nap'}</h3>
                                    <p>{score} deliveries made. {score >= 15 ? 'Osono would hire him full time ngl.' : 'kiki is proud of him anyway.'}</p>
                                </>
                            )}
                            <button className="btn btn-solid" onClick={start} onPointerDown={(e) => e.stopPropagation()}>
                                {phase === 'ready' ? 'start delivering' : 'fly again'}
                            </button>
                        </div>
                    )}
                </div>
            </Reveal>
        </section>
    );
}

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// A dramatic, scroll-reactive Ghibli sky: the sun sets as you scroll, clouds glow with
// the light, sakura petals swirl away from the cursor, and at night there are stars,
// an aurora, fireflies and shooting stars. Click the sky for a burst of petals.

const skyVert = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const skyFrag = /* glsl */ `
precision highp float;
uniform float uTime, uScroll, uNight, uAspect;
uniform vec2 uMouse;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
}
vec3 ramp(float s, vec3 a, vec3 b, vec3 c, vec3 d) {
    if (s < 0.4) return mix(a, b, smoothstep(0.0, 0.4, s));
    if (s < 0.75) return mix(b, c, smoothstep(0.4, 0.75, s));
    return mix(c, d, smoothstep(0.75, 1.0, s));
}

void main() {
    vec2 uv = vUv;
    float s = uScroll;

    // dawn -> bright day -> golden sunset -> dusk, as you scroll down the page
    vec3 top = ramp(s, vec3(.52,.75,.95), vec3(.36,.66,.95), vec3(.38,.36,.80), vec3(.17,.16,.48));
    vec3 mid = ramp(s, vec3(.97,.84,.93), vec3(.74,.88,.98), vec3(.98,.58,.70), vec3(.66,.38,.62));
    vec3 bot = ramp(s, vec3(1.0,.86,.78), vec3(.99,.92,.95), vec3(1.0,.70,.42), vec3(1.0,.52,.42));
    vec3 nTop = mix(vec3(.04,.05,.18), vec3(.01,.01,.08), s);
    vec3 nMid = mix(vec3(.14,.12,.36), vec3(.08,.06,.25), s);
    vec3 nBot = mix(vec3(.34,.21,.42), vec3(.22,.10,.30), s);
    top = mix(top, nTop, uNight); mid = mix(mid, nMid, uNight); bot = mix(bot, nBot, uNight);
    vec3 col = uv.y > 0.5 ? mix(mid, top, smoothstep(0.5, 1.0, uv.y)) : mix(bot, mid, smoothstep(0.0, 0.5, uv.y));

    // the sun sinks as you scroll; the moon hangs high at night
    vec2 p = vec2((uv.x - 0.5) * uAspect, uv.y);
    vec2 sunPos = vec2(0.3 * uAspect, mix(0.86, 0.16, s));
    vec2 moonPos = vec2(0.3 * uAspect, 0.82);
    vec2 lp = mix(sunPos, moonPos, uNight);
    float d = length(p - lp);
    vec3 sunCol = mix(vec3(1.0, .96, .78), vec3(1.0, .55, .30), smoothstep(0.35, 1.0, s));
    vec3 lc = mix(sunCol, vec3(.96, .93, .82), uNight);
    float disk = 1.0 - smoothstep(0.065, 0.075, d);
    float moonShade = uNight * (1.0 - smoothstep(0.06, 0.075, length(p - lp - vec2(0.03, 0.02)))) * 0.85;
    col = mix(col, lc, disk * (1.0 - moonShade));
    col += lc * exp(-d * 3.5) * mix(0.6, 0.22, uNight);

    // god rays fanning out from the sun
    float ang = atan(p.y - lp.y, p.x - lp.x);
    float rays = pow(noise(vec2(ang * 7.0, uTime * 0.06)), 3.0) * exp(-d * 1.6);
    col += lc * rays * 0.45 * (1.0 - uNight);

    // layered painterly cloud banks lit by the sun
    vec2 cp = vec2(p.x * 1.4 + uTime * 0.012, p.y * 3.2) + uMouse * 0.04;
    float c1 = fbm(cp);
    float c2 = fbm(cp * 1.8 + vec2(uTime * 0.02, 3.0));
    float bank = smoothstep(0.52, 0.8, c1) * smoothstep(0.0, 0.3, uv.y) * (1.0 - smoothstep(0.7, 0.95, uv.y));
    float bank2 = smoothstep(0.6, 0.85, c2) * (1.0 - smoothstep(0.0, 0.45, uv.y));
    vec3 cloudLit = mix(vec3(1.0), vec3(1.0, .72, .62), smoothstep(0.45, 1.0, s));
    vec3 cloudCol = mix(cloudLit, vec3(.32, .28, .52), uNight);
    float rim = exp(-length(p - lp) * 2.0) * (1.0 - uNight);
    col = mix(col, cloudCol + rim * lc * 0.4, bank * 0.6);
    col = mix(col, cloudCol * 0.95, bank2 * 0.5);

    // aurora ribbons at night
    float ax = p.x * 1.1 + uTime * 0.025;
    float wave = 0.72 + 0.07 * sin(ax * 2.2 + fbm(vec2(ax, uTime * 0.08)) * 3.0);
    float aur = (1.0 - smoothstep(0.0, 0.14, abs(uv.y - wave))) * fbm(vec2(ax * 3.0, uv.y * 7.0 - uTime * 0.15));
    col += uNight * aur * mix(vec3(.25, .95, .7), vec3(.75, .45, 1.0), uv.x) * 0.55;

    float vig = 1.0 - smoothstep(0.4, 1.3, length((uv - 0.5) * vec2(uAspect * 0.75, 1.0)));
    col *= mix(0.72, 1.0, vig);
    gl_FragColor = vec4(col, 1.0);
}
`;

const starVert = /* glsl */ `
attribute float aSeed;
uniform float uTime, uSize, uScale;
varying float vTw;
void main() {
    vTw = 0.55 + 0.45 * sin(uTime * (1.0 + aSeed * 3.0) + aSeed * 40.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * (1.0 + aSeed * 1.6) * (uScale / -mv.z);
    gl_Position = projectionMatrix * mv;
}
`;
const starFrag = /* glsl */ `
uniform float uOpacity;
uniform vec3 uColor;
varying float vTw;
void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * vTw * uOpacity);
}
`;

function petalGeometry() {
    const s = new THREE.Shape();
    s.moveTo(0, -0.5);
    s.bezierCurveTo(0.48, -0.25, 0.42, 0.36, 0.09, 0.5);
    s.lineTo(0, 0.37);
    s.lineTo(-0.09, 0.5);
    s.bezierCurveTo(-0.42, 0.36, -0.48, -0.25, 0, -0.5);
    const g = new THREE.ShapeGeometry(s, 8);
    g.scale(0.26, 0.26, 0.26);
    return g;
}

function cloudTexture() {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 128;
    const ctx = c.getContext('2d');
    const blobs = [[70, 82, 44], [120, 62, 56], [176, 78, 42], [96, 92, 40], [150, 94, 40], [208, 92, 28], [44, 98, 26]];
    for (const [x, y, r] of blobs) {
        const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.7, 'rgba(255,255,255,0.85)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
}

export default function Sky3D({ night }) {
    const mount = useRef(null);
    const nightRef = useRef(night ? 1 : 0);

    useEffect(() => { nightRef.current = night ? 1 : 0; }, [night]);

    useEffect(() => {
        const el = mount.current;
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
        } catch {
            return undefined; // no WebGL: the CSS gradient underneath still shows
        }
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const small = window.innerWidth < 700;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.autoClear = false;
        el.appendChild(renderer.domElement);

        // background sky (fullscreen shader)
        const bgScene = new THREE.Scene();
        const bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const skyU = {
            uTime: { value: 0 }, uScroll: { value: 0 }, uNight: { value: nightRef.current },
            uAspect: { value: 1 }, uMouse: { value: new THREE.Vector2() },
        };
        bgScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ vertexShader: skyVert, fragmentShader: skyFrag, uniforms: skyU, depthWrite: false })));

        // 3D layer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
        camera.position.set(0, 0, 10);
        const halfH = (z) => Math.tan(THREE.MathUtils.degToRad(30)) * (camera.position.z - z);

        // stars
        const STARS = small ? 400 : 900;
        const sp = new Float32Array(STARS * 3);
        const ss = new Float32Array(STARS);
        for (let i = 0; i < STARS; i++) {
            sp[i * 3] = (Math.random() - 0.5) * 120;
            sp[i * 3 + 1] = (Math.random() - 0.2) * 60;
            sp[i * 3 + 2] = -40 - Math.random() * 20;
            ss[i] = Math.random();
        }
        const starGeo = new THREE.BufferGeometry();
        starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
        starGeo.setAttribute('aSeed', new THREE.BufferAttribute(ss, 1));
        const starU = { uTime: skyU.uTime, uSize: { value: 1.6 }, uScale: { value: 90 }, uOpacity: { value: 0 }, uColor: { value: new THREE.Color('#fffbe8') } };
        const starMat = new THREE.ShaderMaterial({ vertexShader: starVert, fragmentShader: starFrag, uniforms: starU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
        scene.add(new THREE.Points(starGeo, starMat));

        // fireflies
        const FF = small ? 30 : 60;
        const fp = new Float32Array(FF * 3);
        const fs = new Float32Array(FF);
        const ffBase = [];
        for (let i = 0; i < FF; i++) {
            const z = -2 - Math.random() * 6;
            ffBase.push({ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z, ph: Math.random() * 10 });
            fs[i] = 0.6 + Math.random() * 0.4;
        }
        const ffGeo = new THREE.BufferGeometry();
        ffGeo.setAttribute('position', new THREE.BufferAttribute(fp, 3));
        ffGeo.setAttribute('aSeed', new THREE.BufferAttribute(fs, 1));
        const ffU = { uTime: skyU.uTime, uSize: { value: 3.2 }, uScale: { value: 60 }, uOpacity: { value: 0 }, uColor: { value: new THREE.Color('#fff2a0') } };
        const ffMat = new THREE.ShaderMaterial({
            vertexShader: starVert,
            fragmentShader: starFrag, uniforms: ffU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        });
        scene.add(new THREE.Points(ffGeo, ffMat));

        // clouds
        const cloudTex = cloudTexture();
        const clouds = [];
        for (let i = 0; i < (small ? 5 : 9); i++) {
            const mat = new THREE.SpriteMaterial({ map: cloudTex, transparent: true, depthWrite: false, opacity: 0.9 });
            const spr = new THREE.Sprite(mat);
            const z = -8 - Math.random() * 18;
            const sc = 6 + Math.random() * 8;
            spr.scale.set(sc, sc / 2, 1);
            spr.position.set((Math.random() - 0.5) * halfH(z) * 4, (Math.random() - 0.3) * halfH(z) * 1.4, z);
            spr.userData.speed = 0.15 + Math.random() * 0.25;
            scene.add(spr);
            clouds.push(spr);
        }

        // sakura petals
        const N = small ? 90 : 200;
        const petals = new THREE.InstancedMesh(petalGeometry(), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, opacity: 0.95, depthWrite: false }), N);
        const palette = ['#ffc4d6', '#ffb0c8', '#ffe3ec', '#ffd1dc', '#f7a8c4', '#fff0f5'].map((c) => new THREE.Color(c));
        const P = [];
        for (let i = 0; i < N; i++) {
            const z = -4 + Math.random() * 7;
            const h = halfH(z);
            P.push({
                x: (Math.random() - 0.5) * h * 4, y: (Math.random() - 0.5) * h * 2, z,
                vx: 0.35 + Math.random() * 0.5, vy: -0.25 - Math.random() * 0.35,
                kx: 0, ky: 0, rx: Math.random() * 6, ry: Math.random() * 6, rz: Math.random() * 6,
                sr: 0.4 + Math.random() * 1.2, s: 0.6 + Math.random() * 0.8, ph: Math.random() * 10,
            });
            petals.setColorAt(i, palette[i % palette.length]);
        }
        scene.add(petals);
        const dummy = new THREE.Object3D();

        // shooting stars
        const shooters = Array.from({ length: 3 }, () => {
            const m = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.04), new THREE.MeshBasicMaterial({ color: '#fffbe8', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
            m.position.z = -20;
            m.userData = { life: 0 };
            scene.add(m);
            return m;
        });
        let nextShooter = 2;
        const launchShooter = (x, y) => {
            const m = shooters.find((s) => s.userData.life <= 0);
            if (!m) return;
            const h = halfH(-20);
            m.position.set(x ?? (Math.random() * 0.8 - 0.2) * h * 1.6, y ?? h * (0.4 + Math.random() * 0.5), -20);
            m.rotation.z = -0.5;
            m.userData = { life: 1, vx: -14, vy: -8 };
        };

        // input
        const mouse = new THREE.Vector2(0, 0);
        const mouseS = new THREE.Vector2(0, 0);
        let mouseActive = false;
        let burstAt = 0;
        const onMove = (e) => {
            mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
            mouseActive = true;
        };
        const onClick = (e) => {
            if (e.target.closest('a, button, input, canvas, .glass, .loyalty, .polaroid, [role="button"]')) return;
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = -(e.clientY / window.innerHeight) * 2 + 1;
            for (let k = 0; k < 36; k++) {
                const p = P[(burstAt + k) % N];
                const h = halfH(p.z);
                p.x = nx * h * camera.aspect; p.y = ny * h;
                const a = Math.random() * Math.PI * 2;
                const v = 2.5 + Math.random() * 4;
                p.kx = Math.cos(a) * v; p.ky = Math.sin(a) * v;
            }
            burstAt = (burstAt + 36) % N;
            if (nightRef.current > 0.5) launchShooter();
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('click', onClick);

        const resize = () => {
            const w = window.innerWidth, h = window.innerHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            skyU.uAspect.value = w / h;
        };
        resize();
        window.addEventListener('resize', resize);

        let raf = 0;
        let last = performance.now();
        let running = true;
        const clock = { t: 0 };

        const frame = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            clock.t += dt;
            const t = clock.t;

            const max = document.documentElement.scrollHeight - window.innerHeight;
            const scroll = max > 0 ? window.scrollY / max : 0;
            skyU.uScroll.value += (scroll - skyU.uScroll.value) * 0.06;
            skyU.uNight.value += (nightRef.current - skyU.uNight.value) * 0.05;
            skyU.uTime.value = t;
            mouseS.lerp(mouse, 0.05);
            skyU.uMouse.value.copy(mouseS);
            const nightV = skyU.uNight.value;
            const sv = skyU.uScroll.value;

            camera.position.x = mouseS.x * 0.5;
            camera.position.y = mouseS.y * 0.35;
            camera.lookAt(0, 0, -10);

            starU.uOpacity.value = nightV;
            ffU.uOpacity.value = nightV;

            // fireflies wander and drift toward the cursor at night
            for (let i = 0; i < FF; i++) {
                const b = ffBase[i];
                const h = halfH(b.z);
                const tx = mouseActive ? mouseS.x * 0.6 : 0;
                const ty = mouseActive ? mouseS.y * 0.6 : 0;
                fp[i * 3] = (b.x + Math.sin(t * 0.3 + b.ph) * 0.35 + tx * 0.25) * h * camera.aspect;
                fp[i * 3 + 1] = (b.y + Math.cos(t * 0.25 + b.ph * 1.3) * 0.3 + ty * 0.25) * h;
                fp[i * 3 + 2] = b.z;
            }
            ffGeo.attributes.position.needsUpdate = true;

            // clouds drift and catch the sunset
            const tint = new THREE.Color(1, 1, 1).lerp(new THREE.Color(1, 0.78, 0.7), THREE.MathUtils.smoothstep(sv, 0.45, 1)).lerp(new THREE.Color(0.36, 0.33, 0.58), nightV);
            for (const c of clouds) {
                c.position.x += c.userData.speed * dt;
                const lim = halfH(c.position.z) * camera.aspect + c.scale.x;
                if (c.position.x > lim) c.position.x = -lim;
                c.material.color.copy(tint);
                c.material.opacity = 0.85 - nightV * 0.45;
            }

            // petals: wind + sway + cursor swirl
            petals.material.opacity = 0.95 - nightV * 0.55;
            for (let i = 0; i < N; i++) {
                const p = P[i];
                const h = halfH(p.z);
                const hw = h * camera.aspect;
                const sway = Math.sin(t * 1.2 + p.ph) * 0.4;
                if (mouseActive) {
                    const mx = mouseS.x * hw, my = mouseS.y * h;
                    const dx = p.x - mx, dy = p.y - my;
                    const dd = Math.hypot(dx, dy) || 1;
                    const R = 1.8;
                    if (dd < R) {
                        const f = (1 - dd / R) * 9 * dt;
                        p.kx += (dx / dd) * f - (dy / dd) * f * 1.2;
                        p.ky += (dy / dd) * f + (dx / dd) * f * 1.2;
                    }
                }
                p.kx *= 0.96; p.ky *= 0.96;
                p.x += (p.vx + sway + p.kx) * dt;
                p.y += (p.vy + p.ky) * dt;
                p.rx += p.sr * dt; p.ry += p.sr * 0.7 * dt; p.rz += p.sr * 0.4 * dt;
                if (p.x > hw + 1) p.x = -hw - 1;
                if (p.x < -hw - 1) p.x = hw + 1;
                if (p.y < -h - 1) { p.y = h + 1; p.x = (Math.random() - 0.5) * hw * 2; }
                if (p.y > h + 1.5) p.y = -h - 1;
                dummy.position.set(p.x, p.y, p.z);
                dummy.rotation.set(p.rx, p.ry, p.rz);
                dummy.scale.setScalar(p.s);
                dummy.updateMatrix();
                petals.setMatrixAt(i, dummy.matrix);
            }
            petals.instanceMatrix.needsUpdate = true;

            // shooting stars
            nextShooter -= dt;
            if (nextShooter <= 0 && nightV > 0.6) { launchShooter(); nextShooter = 3 + Math.random() * 5; }
            for (const m of shooters) {
                const u = m.userData;
                if (u.life > 0) {
                    u.life -= dt * 0.9;
                    m.position.x += u.vx * dt; m.position.y += u.vy * dt;
                    m.material.opacity = Math.sin(Math.max(u.life, 0) * Math.PI) * nightV;
                } else m.material.opacity = 0;
            }

            renderer.clear();
            renderer.render(bgScene, bgCam);
            renderer.render(scene, camera);
            if (running && !reduce) raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);

        const onVis = () => {
            running = !document.hidden;
            if (running && !reduce) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
        };
        document.addEventListener('visibilitychange', onVis);

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('click', onClick);
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', onVis);
            scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); });
            cloudTex.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);

    return <div ref={mount} className="sky3d" aria-hidden="true" />;
}

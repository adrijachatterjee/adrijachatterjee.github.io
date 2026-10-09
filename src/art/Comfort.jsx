// Build-your-own drink, ramen and dessert illustrations, plus the polaroid they get printed on.
// Everything uses inline SVG attributes (no CSS) so a polaroid can be saved as a PNG.

const mix = (a, b, t) => {
    const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const [x, y] = [p(a), p(b)];
    return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
};

// ---------- drinks ----------

export const DRINK = {
    base: [['matcha', '#86b84f'], ['latte', '#b07d55'], ['chai', '#bf7840'], ['hojicha', '#9a6340'], ['mocha', '#6e4532']],
    milk: [['whole', '#fff4e6', 0.32], ['oat', '#f1e2c6', 0.36], ['almond', '#f6eadb', 0.3], ['coconut', '#fffaf2', 0.42], ['no milk', '#ffffff', 0]],
    temp: ['hot', 'iced'],
    toppings: ['latte art', 'whipped cream', 'cinnamon', 'boba', 'sakura', 'honey'],
};

export function DrinkArt({ base = 'matcha', milk = 'oat', temp = 'hot', toppings = [], id = 'd' }) {
    const b = DRINK.base.find(([n]) => n === base)[1];
    const [, mc, mt] = DRINK.milk.find(([n]) => n === milk);
    const liquid = mix(b, mc, mt);
    const has = (t) => toppings.includes(t);
    const iced = temp === 'iced';
    const topY = iced ? 82 : 92;

    const foam = has('latte art') && (
        <path d="M100 99 C93 93 86 92 88 87 C90 83 96 84 100 89 C104 84 110 83 112 87 C114 92 107 93 100 99 Z"
            transform={iced ? 'translate(0 -10)' : undefined} fill="#fff8ee" />
    );
    const cream = has('whipped cream') && (
        <g fill="#fffdf8" stroke="#efe3d2" strokeWidth="1.5">
            <ellipse cx="100" cy={topY - 6} rx="44" ry="12" />
            <ellipse cx="100" cy={topY - 16} rx="30" ry="11" />
            <ellipse cx="100" cy={topY - 26} rx="16" ry="9" />
            <path d={`M100 ${topY - 38} q6 4 0 8`} />
        </g>
    );
    const creamTop = has('whipped cream') ? topY - 34 : topY - 4;
    const cinnamon = has('cinnamon') && (
        <g fill="#8a5a33">{[[-18, 0], [-6, -3], [8, 1], [20, -2], [0, 4], [-12, 5], [14, 6]].map(([x, y], i) => <circle key={i} cx={100 + x} cy={creamTop + 6 + y} r="1.6" />)}</g>
    );
    const sakura = has('sakura') && (
        <g transform={`translate(${has('whipped cream') ? 104 : 124} ${creamTop})`}>
            {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-6" rx="4" ry="6" fill="#ffb3c7" transform={`rotate(${a})`} />)}
            <circle r="2.6" fill="#ffd36b" />
        </g>
    );
    const honey = has('honey') && (
        <path d={`M72 ${creamTop + 4} q8 10 16 0 q8 -10 16 0 q8 10 16 0 q8 -10 16 0`} stroke="#f2b33d" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    );

    if (iced) {
        return (
            <g>
                <defs>
                    <clipPath id={`${id}-glass`}><path d="M53 84 L147 84 L139 212 Q100 221 61 212 Z" /></clipPath>
                    <linearGradient id={`${id}-liq`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={mix(liquid, '#ffffff', 0.25)} /><stop offset="100%" stopColor={liquid} />
                    </linearGradient>
                </defs>
                <rect x="112" y="18" width="10" height="120" rx="4" fill="#ff8fb1" transform="rotate(12 117 78)" />
                <g clipPath={`url(#${id}-glass)`}>
                    <rect x="40" y="84" width="120" height="140" fill={`url(#${id}-liq)`} />
                    {has('boba') && <g fill="#3a2418">{[[70, 204], [86, 208], [102, 205], [118, 208], [132, 203], [78, 194], [96, 196], [112, 195], [126, 193]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" />)}</g>}
                    <g fill="#ffffff" opacity="0.55" stroke="#ffffff" strokeWidth="1">
                        <rect x="66" y="92" width="24" height="22" rx="5" transform="rotate(-12 78 103)" />
                        <rect x="104" y="98" width="24" height="22" rx="5" transform="rotate(14 116 109)" />
                        <rect x="84" y="124" width="22" height="20" rx="5" transform="rotate(6 95 134)" />
                    </g>
                </g>
                <path d="M50 60 L150 60 L140 214 Q100 224 60 214 Z" fill="rgba(255,255,255,0.18)" stroke="#d6e8f2" strokeWidth="3" />
                <path d="M62 72 L58 190" stroke="#ffffff" strokeWidth="4" opacity="0.6" strokeLinecap="round" />
                {cream}{foam}{cinnamon}{sakura}{honey}
            </g>
        );
    }
    return (
        <g>
            <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85">
                <path d="M80 70 q-6 -10 0 -20 q6 -10 0 -20" /><path d="M100 64 q-6 -10 0 -20 q6 -10 0 -20" /><path d="M120 70 q-6 -10 0 -20 q6 -10 0 -20" />
            </g>
            <path d="M156 110 C192 110 192 172 152 172" stroke="#e9dccb" strokeWidth="16" fill="none" />
            <path d="M156 110 C192 110 192 172 152 172" stroke="#fff8ef" strokeWidth="10" fill="none" />
            <path d="M40 90 L160 90 L150 206 Q100 222 50 206 Z" fill="#fff8ef" stroke="#e9dccb" strokeWidth="3" />
            <path d="M44 120 L156 120" stroke="#ffb3c7" strokeWidth="6" opacity="0.6" />
            <ellipse cx="100" cy="92" rx="60" ry="13" fill="#e9dccb" />
            <ellipse cx="100" cy="93" rx="55" ry="10" fill={liquid} />
            {cream}{foam}{cinnamon}{sakura}{honey}
        </g>
    );
}

export const drinkName = ({ base, milk, temp, toppings }) => {
    const m = milk === 'no milk' ? '' : `${milk} `;
    const tops = toppings.length ? ` with ${toppings.slice(0, 2).join(' & ')}` : '';
    return `${temp} ${m}${base}${tops}`;
};

// ---------- ramen ----------

export const RAMEN = {
    broth: [['tonkotsu', '#f1dfc0'], ['shoyu', '#b9733a'], ['miso', '#d49a52'], ['spicy', '#d4573e'], ['shio', '#f2d690']],
    noodles: ['thin', 'thick', 'curly'],
    toppings: ['ajitama egg', 'narutomaki', 'nori', 'chashu', 'tofu', 'corn', 'bok choy', 'scallions', "ponyo's ham"],
};

export function RamenArt({ broth = 'miso', noodles = 'curly', toppings = [], id = 'r' }) {
    const bc = RAMEN.broth.find(([n]) => n === broth)[1];
    const has = (t) => toppings.includes(t);
    const amp = noodles === 'curly' ? 6 : 2.5;
    const sw = noodles === 'thick' ? 6 : noodles === 'thin' ? 2.6 : 4;
    const lines = noodles === 'thick' ? 6 : 9;
    return (
        <g>
            <defs>
                <clipPath id={`${id}-broth`}><ellipse cx="130" cy="102" rx="100" ry="22" /></clipPath>
            </defs>
            <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8">
                <path d="M96 66 q-6 -10 0 -20 q6 -10 0 -20" /><path d="M130 58 q-6 -10 0 -20 q6 -10 0 -20" /><path d="M164 66 q-6 -10 0 -20 q6 -10 0 -20" />
            </g>
            {has('nori') && <rect x="186" y="54" width="24" height="46" rx="2" fill="#2f3b2f" transform="rotate(14 198 77)" />}
            <path d="M18 100 Q22 196 130 206 Q238 196 242 100 Z" fill="#e45b4f" />
            <path d="M30 136 Q130 178 230 136" stroke="#fff6ea" strokeWidth="5" fill="none" strokeDasharray="12 9" />
            <rect x="104" y="200" width="52" height="10" rx="4" fill="#c8483e" />
            <ellipse cx="130" cy="100" rx="112" ry="27" fill="#fff6ea" />
            <ellipse cx="130" cy="102" rx="100" ry="22" fill={bc} />
            <g clipPath={`url(#${id}-broth)`}>
                <g stroke="#f6dc8a" strokeWidth={sw} fill="none" strokeLinecap="round">
                    {Array.from({ length: lines }, (_, i) => {
                        const y = 88 + i * (28 / lines);
                        return <path key={i} d={`M40 ${y} q12 ${-amp} 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0`} />;
                    })}
                </g>
                {has('tofu') && <g fill="#fff4dc" stroke="#e6d3ae">{[[52, 96], [64, 104], [50, 108]].map(([x, y], i) => <rect key={i} x={x} y={y} width="11" height="11" rx="2" />)}</g>}
                {has('bok choy') && <path d="M66 90 C80 78 96 84 96 94 C90 104 76 104 66 90 Z" fill="#7cbf6a" stroke="#4f8f45" strokeWidth="1.5" />}
                {has('chashu') && <g fill="#c98a6a" stroke="#8a4f34" strokeWidth="2">{[[116, 106], [140, 108]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="14" ry="9" />)}</g>}
                {has("ponyo's ham") && <g fill="#f7a8b4" stroke="#e57d8e" strokeWidth="2">{[[100, 92], [116, 88], [132, 92]].map(([x, y], i) => <path key={i} d={`M${x - 10} ${y} A10 8 0 0 1 ${x + 10} ${y} Z`} />)}</g>}
                {has('corn') && <g fill="#ffd34d">{[[176, 106], [182, 110], [188, 105], [178, 114], [186, 115], [192, 111]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" />)}</g>}
                {has('scallions') && <g fill="none" stroke="#6fb768" strokeWidth="2.2">{[[78, 112], [150, 96], [170, 118], [96, 118], [124, 96], [196, 98]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" />)}</g>}
            </g>
            {has('ajitama egg') && (
                <g>
                    <ellipse cx="86" cy="98" rx="17" ry="11" fill="#fffaf0" stroke="#e8dcc0" strokeWidth="1.5" />
                    <ellipse cx="86" cy="98" rx="8" ry="6" fill="#f6a23a" />
                </g>
            )}
            {has('narutomaki') && (
                <g>
                    <circle cx="164" cy="94" r="12" fill="#fffaf0" stroke="#e8dcc0" strokeWidth="1.5" />
                    <path d="M164 94 m-5 0 a5 5 0 1 1 5 5 a3 3 0 1 1 -3 -3" stroke="#f17ca0" strokeWidth="2" fill="none" />
                </g>
            )}
            <g stroke="#a8784a" strokeWidth="5" strokeLinecap="round">
                <path d="M188 40 L238 108" /><path d="M200 34 L246 102" />
            </g>
        </g>
    );
}

export const ramenName = ({ broth, noodles, toppings }) => {
    const tops = toppings.length ? ` with ${toppings.slice(0, 3).join(', ')}` : '';
    return `${broth} ramen, ${noodles} noodles${tops}`;
};

// ---------- desserts ----------

export const DESSERT = {
    base: ['shortcake', 'purin', 'mochi', 'parfait'],
    flavor: [['strawberry', '#f6a5b9'], ['matcha', '#a8d672'], ['chocolate', '#8a5a44'], ['mango', '#ffc35c'], ['taro', '#c3a6e6']],
    toppings: ['whipped cream', 'strawberry', 'cherry', 'sprinkles', 'mint leaf', 'choco drizzle', 'calcifer spark'],
};

export function DessertArt({ base = 'shortcake', flavor = 'strawberry', toppings = [], id = 'x' }) {
    const fc = DESSERT.flavor.find(([n]) => n === flavor)[1];
    const has = (t) => toppings.includes(t);
    const top = { shortcake: 112, purin: 116, mochi: 140, parfait: 70 }[base];

    let body;
    if (base === 'shortcake') {
        body = (
            <g>
                <rect x="66" y="118" width="128" height="76" rx="6" fill="#f8e3b0" />
                <rect x="66" y="140" width="128" height="9" fill="#fffdf6" />
                <rect x="66" y="149" width="128" height="7" fill={fc} />
                <rect x="66" y="170" width="128" height="8" fill="#fffdf6" />
                <rect x="62" y="110" width="136" height="14" rx="7" fill={mix(fc, '#ffffff', 0.45)} />
            </g>
        );
    } else if (base === 'purin') {
        body = (
            <g>
                <path d="M86 194 L174 194 L160 122 Q130 112 100 122 Z" fill={mix('#ffe2a0', fc, 0.35)} />
                <path d="M100 122 Q130 110 160 122 L162 132 Q130 124 98 132 Z" fill="#8a4f24" />
                <path d="M104 130 q4 12 0 18 M152 130 q3 10 0 14" stroke="#8a4f24" strokeWidth="5" strokeLinecap="round" fill="none" />
            </g>
        );
    } else if (base === 'mochi') {
        body = (
            <g>
                {[[92, 172, fc], [130, 166, mix(fc, '#ffffff', 0.5)], [168, 172, mix(fc, '#2a2440', 0.15)]].map(([x, y, c], i) => (
                    <g key={i}>
                        <ellipse cx={x} cy={y} rx="26" ry="22" fill={c} />
                        <ellipse cx={x - 8} cy={y - 8} rx="7" ry="4" fill="#ffffff" opacity="0.6" />
                    </g>
                ))}
            </g>
        );
    } else {
        body = (
            <g>
                <path d="M88 70 L172 70 L158 168 L102 168 Z" fill="rgba(255,255,255,0.35)" stroke="#d6e8f2" strokeWidth="3" />
                <path d="M92 90 L168 90 L165 112 L95 112 Z" fill={fc} />
                <path d="M95 112 L165 112 L162 130 L98 130 Z" fill="#fffdf6" />
                <path d="M98 130 L162 130 L160 146 L100 146 Z" fill="#e3b46a" />
                <path d="M100 146 L160 146 L158 166 L102 166 Z" fill={mix(fc, '#ffffff', 0.4)} />
                <rect x="122" y="168" width="16" height="22" fill="#d6e8f2" />
                <ellipse cx="130" cy="192" rx="30" ry="6" fill="#d6e8f2" />
            </g>
        );
    }

    return (
        <g>
            <ellipse cx="130" cy="198" rx="112" ry="22" fill="#ffffff" stroke="#bfe0f2" strokeWidth="4" />
            <ellipse cx="130" cy="198" rx="80" ry="13" fill="none" stroke="#e6f3fa" strokeWidth="2" />
            {body}
            {has('choco drizzle') && <path d={`M80 ${top + 6} q10 12 20 0 q10 -12 20 0 q10 12 20 0 q10 -12 20 0 q10 12 20 0`} stroke="#5a3424" strokeWidth="4" fill="none" strokeLinecap="round" />}
            {has('whipped cream') && (
                <g fill="#fffdf8" stroke="#efe3d2" strokeWidth="1.5">
                    <ellipse cx="130" cy={top - 2} rx="24" ry="9" /><ellipse cx="130" cy={top - 11} rx="15" ry="8" /><ellipse cx="130" cy={top - 19} rx="7" ry="6" />
                </g>
            )}
            {has('strawberry') && (
                <g transform={`translate(98 ${top - 8})`}>
                    <path d="M0 -8 C-12 -8 -12 6 0 14 C12 6 12 -8 0 -8 Z" fill="#e8445a" />
                    <path d="M-6 -9 L0 -14 L6 -9 Z" fill="#6fb768" />
                    {[[-4, -1], [4, 0], [0, 6], [-3, 4], [3, 7]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0.9" fill="#ffe08a" />)}
                </g>
            )}
            {has('cherry') && (
                <g>
                    <path d={`M130 ${top - 26} q6 -14 14 -18`} stroke="#5a8f45" strokeWidth="2" fill="none" />
                    <circle cx="130" cy={top - 22} r="8" fill="#d6283f" />
                    <circle cx="127" cy={top - 25} r="2.4" fill="#fff" opacity="0.7" />
                </g>
            )}
            {has('mint leaf') && <path d={`M150 ${top - 8} C160 ${top - 22} 176 ${top - 18} 176 ${top - 10} C168 ${top - 2} 156 ${top - 2} 150 ${top - 8} Z`} fill="#5fbf7a" />}
            {has('sprinkles') && (
                <g strokeWidth="3" strokeLinecap="round">
                    {[[-30, 0, '#ff8fb1'], [-16, -6, '#a9dcff'], [0, 2, '#ffe08a'], [18, -4, '#b9f0d2'], [32, 2, '#cdb8ff'], [-6, -12, '#ffc9a8'], [10, -14, '#ff8fb1']].map(([x, y, c], i) => (
                        <path key={i} d={`M${130 + x} ${top + y} l4 3`} stroke={c} />
                    ))}
                </g>
            )}
            {has('calcifer spark') && (
                <g transform={`translate(172 ${top - 26})`}>
                    <path d="M0 -14 C5 -6 12 -2 12 6 C12 14 6 18 0 18 C-6 18 -12 14 -12 6 C-12 0 -6 -2 -5 -8 C-3 -4 -2 -3 -1 -2 C-1 -8 -1 -11 0 -14 Z" fill="#ff8a3d" />
                    <circle cx="-4" cy="6" r="2.2" fill="#fffbe8" /><circle cx="4" cy="6" r="2.2" fill="#fffbe8" />
                </g>
            )}
        </g>
    );
}

export const dessertName = ({ base, flavor, toppings }) => {
    const tops = toppings.length ? ` with ${toppings.slice(0, 2).join(' & ')}` : '';
    return `${flavor} ${base}${tops}`;
};

// ---------- polaroid ----------

export function PolaroidSVG({ svgRef, caption, sub, bg = ['#ffe6ef', '#e6f0ff'], children }) {
    return (
        <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" width="360" height="440" viewBox="0 0 360 440" className="made-polaroid" role="img" aria-label={caption}>
            <defs>
                <linearGradient id="pol-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={bg[0]} /><stop offset="100%" stopColor={bg[1]} />
                </linearGradient>
            </defs>
            <rect x="0" y="0" width="360" height="440" rx="8" fill="#fffdf8" />
            <rect x="20" y="20" width="320" height="320" rx="3" fill="url(#pol-bg)" />
            {[[48, 52], [300, 70], [70, 300], [290, 290], [180, 40]].map(([x, y], i) => (
                <path key={i} d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z`} fill="#ffffff" opacity="0.8" />
            ))}
            {children}
            <text x="180" y="382" textAnchor="middle" fontFamily="Caveat, 'Bradley Hand', 'Comic Sans MS', cursive" fontSize="25" fill="#3b2f55">{caption}</text>
            <text x="180" y="414" textAnchor="middle" fontFamily="Quicksand, 'Trebuchet MS', sans-serif" fontSize="12" fill="#8a7fa6" letterSpacing="0.5"
                {...(sub.length > 46 ? { textLength: 312, lengthAdjust: 'spacingAndGlyphs' } : {})}>{sub}</text>
        </svg>
    );
}

// Turn a rendered polaroid <svg> into a PNG download.
export function downloadPolaroid(svg, filename) {
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
    const img = new Image();
    img.onload = () => {
        const c = document.createElement('canvas');
        c.width = 720; c.height = 880;
        c.getContext('2d').drawImage(img, 0, 0, 720, 880);
        URL.revokeObjectURL(url);
        c.toBlob((blob) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            a.click();
            setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        }, 'image/png');
    };
    img.src = url;
}

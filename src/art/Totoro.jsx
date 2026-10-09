// Big Totoro, drawn after Adrija's reference still: sitting with his padded feet forward,
// the little white Totoro perched on his head, and a pink flower tucked between his ears.
// Smooth vector shapes so he can sway and breathe without jagged edges.
const FUR = '#707c6e';
const FUR_DARK = '#5d685c';
const LINE = '#3a423c';
const BELLY = '#efe2b9';

const chevrons = [[232, 296, 1.15], [322, 302, 1.05], [132, 350, 1], [204, 344, 1], [278, 344, 1], [352, 350, 1]];

export default function Totoro({ size = 180, className = '' }) {
    return (
        <svg viewBox="0 0 480 700" width={size} height={(size * 700) / 480} className={`totoro ${className}`} aria-hidden="true">
            <g className="totoro-tail">
                <path d="M196 560 C188 640 214 690 242 690 C272 690 292 640 284 560 Z" fill={FUR} stroke={LINE} strokeWidth="3" />
            </g>

            <g className="totoro-body">
                <g className="totoro-ear-l">
                    <path d="M142 134 C130 84 150 28 172 26 C194 28 202 82 204 122 Z" fill={FUR} stroke={LINE} strokeWidth="3" strokeLinejoin="round" />
                </g>
                <g className="totoro-ear-r">
                    <path d="M294 120 C296 80 306 28 328 28 C350 32 358 84 346 136 Z" fill={FUR} stroke={LINE} strokeWidth="3" strokeLinejoin="round" />
                </g>

                <path d="M240 92 C340 92 402 162 430 262 C462 362 462 472 410 532 C360 588 120 588 70 532 C18 472 18 362 50 262 C78 162 140 92 240 92 Z"
                    fill={FUR} stroke={LINE} strokeWidth="3.5" />
                <path d="M62 300 C46 360 44 430 66 486 M418 300 C434 360 436 430 414 486" stroke={FUR_DARK} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.6" />
                <path d="M240 246 C342 246 412 320 412 420 C412 512 332 562 240 562 C148 562 68 512 68 420 C68 320 138 246 240 246 Z" fill={BELLY} />
                {chevrons.map(([x, y, s]) => (
                    <path key={x} d={`M${x - 30 * s} ${y + 10 * s} Q${x} ${y - 18 * s} ${x + 30 * s} ${y + 10 * s} Q${x} ${y - 2 * s} ${x - 30 * s} ${y + 10 * s} Z`} fill={FUR} />
                ))}

                <g className="totoro-eyes">
                    <circle cx="172" cy="176" r="21" fill="#fff" stroke={LINE} strokeWidth="3" />
                    <circle cx="310" cy="176" r="21" fill="#fff" stroke={LINE} strokeWidth="3" />
                    <circle cx="175" cy="177" r="8.5" fill="#1f2422" />
                    <circle cx="307" cy="177" r="8.5" fill="#1f2422" />
                    <circle cx="172" cy="173" r="2.6" fill="#fff" />
                    <circle cx="304" cy="173" r="2.6" fill="#fff" />
                </g>
                <path d="M226 180 Q242 170 258 180 Q242 190 226 180 Z" fill="#1f2422" />
                <path className="totoro-smile" d="M234 236 Q242 241 250 236" stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round" />
                <g className="totoro-grin">
                    <path d="M150 214 Q242 300 334 214 Q242 236 150 214 Z" fill="#3b2a30" />
                    <path d="M162 219 Q242 240 322 219" stroke="#fff8ec" strokeWidth="7" fill="none" strokeLinecap="round" />
                </g>
                <g stroke={LINE} strokeWidth="3" strokeLinecap="round">
                    <path d="M142 192 L36 178" /><path d="M140 204 L28 206" /><path d="M146 216 L52 232" />
                    <path d="M338 192 L444 178" /><path d="M340 204 L452 206" /><path d="M334 216 L428 232" />
                </g>

                <g className="totoro-flower" transform="translate(250 140)">
                    <path d="M4 4 Q22 -4 34 -18" stroke="#6a8f4a" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <ellipse cx="30" cy="-20" rx="9" ry="5" fill="#8cc474" transform="rotate(-30 30 -20)" />
                    {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-9" rx="6" ry="9" fill="#f08aa8" transform={`rotate(${a})`} />)}
                    <circle r="4.5" fill="#ffd36b" />
                </g>
            </g>

            <g className="totoro-chibi">
                <path d="M232 52 L230 30 L240 44 Z M262 52 L266 30 L256 44 Z" fill="#fbfbf6" stroke="#b9bdb4" strokeWidth="2" strokeLinejoin="round" />
                <ellipse cx="248" cy="76" rx="22" ry="30" fill="#fbfbf6" stroke="#b9bdb4" strokeWidth="2" />
                <circle cx="240" cy="66" r="3" fill="#2a2a2a" /><circle cx="256" cy="66" r="3" fill="#2a2a2a" />
                <path d="M245 73 Q248 71 251 73" stroke="#2a2a2a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </g>

            <g className="totoro-foot-l">
                <ellipse cx="140" cy="560" rx="62" ry="72" fill={FUR} stroke={LINE} strokeWidth="3.5" transform="rotate(-8 140 560)" />
                <ellipse cx="132" cy="606" rx="24" ry="14" fill="#8ea2bf" stroke={LINE} strokeWidth="2.5" />
                <g stroke="#f4efe2" strokeWidth="5" strokeLinecap="round">
                    <path d="M112 548 l-6 18" /><path d="M132 542 l-2 20" /><path d="M152 546 l2 18" />
                </g>
            </g>
            <g className="totoro-foot-r">
                <ellipse cx="338" cy="560" rx="62" ry="72" fill={FUR} stroke={LINE} strokeWidth="3.5" transform="rotate(8 338 560)" />
                <ellipse cx="346" cy="606" rx="24" ry="14" fill="#8ea2bf" stroke={LINE} strokeWidth="2.5" />
                <g stroke="#f4efe2" strokeWidth="5" strokeLinecap="round">
                    <path d="M326 546 l-2 18" /><path d="M346 542 l2 20" /><path d="M366 548 l6 18" />
                </g>
            </g>
        </svg>
    );
}

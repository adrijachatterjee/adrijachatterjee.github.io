// A puffy Ghibli-style cumulus cloud.
export default function Cloud({ width = 220, className = '', style }) {
    return (
        <svg viewBox="0 0 220 110" width={width} height={width / 2} className={className} style={style} aria-hidden="true">
            <ellipse cx="110" cy="92" rx="96" ry="14" fill="var(--cloud-shadow)" />
            <g fill="var(--cloud)">
                <circle cx="60" cy="70" r="28" />
                <circle cx="96" cy="50" r="38" />
                <circle cx="140" cy="58" r="32" />
                <circle cx="172" cy="74" r="22" />
                <rect x="36" y="66" width="158" height="26" rx="13" />
            </g>
            <circle cx="88" cy="40" r="14" fill="#fff" opacity="0.6" />
        </svg>
    );
}

// Hand-drawn line icons, so the site doesn't need any emoji.
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

function Icon({ size = 24, className = '', children, viewBox = '0 0 24 24' }) {
    return <svg viewBox={viewBox} width={size} height={size} className={className} aria-hidden="true" {...base}>{children}</svg>;
}

export const GitHub = (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} aria-hidden="true" fill="currentColor">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
);
export const LinkedIn = (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M8 10.5v6M8 7.5v.01M12 16.5v-6M12 13.5a2.5 2.5 0 0 1 5 0v3" /></Icon>;
export const Instagram = (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></Icon>;
export const Mail = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></Icon>;
export const Quill = (p) => <Icon {...p}><path d="M20 3C12 4 7 9 5 17l-1 4" /><path d="M20 3c-1 6-5 10-11 11" /><path d="M9 14l-2 2" /></Icon>;
export const Palette = (p) => <Icon {...p}><path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2 0-1.5-1.5-2 0-3.5 1-1 3-.5 4-.5a3 3 0 0 0 3-3C21 7 17 3 12 3Z" /><circle cx="7.5" cy="11" r="1.2" /><circle cx="10" cy="7" r="1.2" /><circle cx="15" cy="7.5" r="1.2" /></Icon>;
export const Vinyl = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5" opacity=".6" /></Icon>;
export const Book = (p) => <Icon {...p}><path d="M3 5c3-1 6-1 9 1v14c-3-2-6-2-9-1Z" /><path d="M21 5c-3-1-6-1-9 1v14c3-2 6-2 9-1Z" /></Icon>;
export const Manga = (p) => <Icon {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 10h9V3M13 10v11M13 15h7" /><path d="M16.5 5.5l.7 1.6 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2Z" /></Icon>;
export const Wand = (p) => <Icon {...p}><path d="M4 20 15 9" /><path d="M17 3v3M15.5 4.5h3M20 8v2M19 9h2M12 4v1.5M11.25 4.75h1.5" /></Icon>;
export const Camera = (p) => <Icon {...p}><path d="M4 8h3l2-3h6l2 3h3v11H4Z" /><circle cx="12" cy="13" r="3.5" /></Icon>;
export const Plane = (p) => <Icon {...p}><path d="M3 11 21 4l-7 17-3-7Z" /><path d="m11 14 10-10" /></Icon>;
export const Sun = (p) => <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Icon>;
export const Moon = (p) => <Icon {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" /></Icon>;
export const Pin = (p) => <Icon {...p}><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11Z" /><circle cx="12" cy="10" r="2" /></Icon>;
export const Trophy = (p) => <Icon {...p}><path d="M8 4h8v5a4 4 0 0 1-8 0Z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6" /></Icon>;
export const Rocket = (p) => <Icon {...p}><path d="M12 3c4 2 6 6 5 11l-2 2H9l-2-2C6 9 8 5 12 3Z" /><circle cx="12" cy="10" r="1.6" /><path d="M9 16l-2 4M15 16l2 4" /></Icon>;
export const Sparkle = ({ size = 14, className = '' }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M12 2 C13 9 15 11 22 12 C15 13 13 15 12 22 C11 15 9 13 2 12 C9 11 11 9 12 2 Z" fill="currentColor" />
    </svg>
);

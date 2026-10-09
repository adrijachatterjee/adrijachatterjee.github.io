import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Totoro from '../art/Totoro';

// Tap Totoro to play "The Path of the Wind" from My Neighbor Totoro (Joe Hisaishi) via Spotify's
// embed. Nothing loads from Spotify until someone taps.
const TRACK = 'spotify:track:3XxnYdibSlBhiq2wGlQ6ie';

function loadSpotify() {
    if (window.__spotifyApi) return Promise.resolve(window.__spotifyApi);
    return new Promise((resolve) => {
        window.onSpotifyIframeApiReady = (api) => { window.__spotifyApi = api; resolve(api); };
        const s = document.createElement('script');
        s.src = 'https://open.spotify.com/embed/iframe-api/v1';
        s.async = true;
        document.body.appendChild(s);
    });
}

const Note = ({ d }) => (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d={d} fill="currentColor" /></svg>
);
const NOTES = ['M9 18a3 3 0 1 1-2-2.8V4l11-2v12a3 3 0 1 1-2-2.8V6.5L9 7.8Z', 'M12 17a3 3 0 1 1-2-2.8V3h6v3h-4Z'];

export default function TotoroTune({ children }) {
    const [open, setOpen] = useState(false);
    const [playing, setPlaying] = useState(false);
    const host = useRef(null);
    const ctrl = useRef(null);

    useEffect(() => {
        if (!open || ctrl.current) return;
        loadSpotify().then((api) => {
            api.createController(host.current, { uri: TRACK, width: '100%', height: 80, theme: 'dark' }, (c) => {
                ctrl.current = c;
                c.addListener('ready', () => c.play());
                c.addListener('playback_update', (e) => setPlaying(!e.data.isPaused));
            });
        });
    }, [open]);

    const tap = () => {
        if (!open) setOpen(true);
        else ctrl.current?.togglePlay();
    };

    return (
        <>
            <div className="bus-stop">
            {children}
            <button className={`totoro-btn ${playing ? 'dancing' : ''}`} onClick={tap}
                aria-label={playing ? 'Pause the Totoro theme' : 'Play the Totoro theme'}>
                <Totoro size={170} className="contact-totoro" />
                <AnimatePresence>
                    {playing && [0, 1, 2, 3].map((i) => (
                        <motion.span key={i} className="music-note" style={{ left: `${20 + i * 20}%` }}
                            initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: -90, x: (i % 2 ? 1 : -1) * 18 }}
                            exit={{ opacity: 0 }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}>
                            <Note d={NOTES[i % 2]} />
                        </motion.span>
                    ))}
                </AnimatePresence>
            </button>
            </div>
            <p className="hand totoro-hint">{playing ? 'tap Totoro to pause' : 'tap Totoro for his song'}</p>
            <div className={`totoro-player ${open ? 'open' : ''}`}><div ref={host} /></div>
        </>
    );
}

import { useEffect, useState } from 'react';
import Sky from './components/Sky';
import CursorTrail from './components/CursorTrail';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Cafe from './components/Cafe';
import Work from './components/Work';
import Travel from './components/Travel';
import JijiGame from './components/JijiGame';
import Readings from './components/Readings';
import Learning from './components/Learning';
import Beyond from './components/Beyond';
import Contact from './components/Contact';
import Footer from './components/Footer';
import JijiCompanion from './components/JijiCompanion';

export default function App() {
    const [night, setNight] = useState(() => localStorage.getItem('theme') === 'night');

    useEffect(() => {
        document.documentElement.dataset.theme = night ? 'night' : 'day';
        localStorage.setItem('theme', night ? 'night' : 'day');
    }, [night]);

    return (
        <>
            <Sky night={night} />
            <div className="grain" aria-hidden="true" />
            <CursorTrail />
            <Nav night={night} onToggle={() => setNight((v) => !v)} />
            <main>
                <Hero />
                <Marquee />
                <About />
                <Cafe />
                <Readings />
                <Work />
                <JijiGame night={night} />
                <Travel />
                <Learning />
                <Beyond />
                <Contact />
            </main>
            <Footer />
            <JijiCompanion />
        </>
    );
}

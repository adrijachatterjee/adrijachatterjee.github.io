import { Moon, Sun } from './Icons';

const items = [['about', 'about'], ['cafe', 'café'], ['readings', 'readings'], ['work', 'work'], ['play', 'play'], ['travels', 'travels'], ['side-quests', 'quests'], ['hello', 'say hi']];

export default function Nav({ night, onToggle }) {
    return (
        <nav className="nav">
            <a href="#top" className="nav-logo">adrija</a>
            <div className="nav-links">
                {items.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
            </div>
            <button className="theme-toggle" onClick={onToggle} aria-label={night ? 'Switch to day mode' : 'Switch to night mode'}>
                <span className={`toggle-knob ${night ? 'on' : ''}`}>{night ? <Moon size={16} /> : <Sun size={16} />}</span>
            </button>
        </nav>
    );
}

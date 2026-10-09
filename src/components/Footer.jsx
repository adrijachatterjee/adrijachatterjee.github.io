import Calcifer from '../art/Calcifer';

export default function Footer() {
    return (
        <footer className="footer">
            <Calcifer size={54} />
            <p className="hand">kept warm by Calcifer, brewed with matcha, latte &amp; chai</p>
            <p>no soot sprites were harmed in the making of this site · © {new Date().getFullYear()} Adrija Chatterjee</p>
        </footer>
    );
}

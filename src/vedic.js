// ✦ A small Jyotish (Vedic astrology) sketch: sidereal Sun and Moon signs, nakshatra, and the
// lunar nodes Rahu and Ketu, using low-precision astronomy (good to well under a degree)
// and the Lahiri ayanamsa. No ascendant, since that needs an exact birth location.

const rad = (d) => (d * Math.PI) / 180;
const norm = (d) => ((d % 360) + 360) % 360;

// Julian Day for a UTC date/time
function julianDay(y, m, d, hours) {
    if (m <= 2) { y -= 1; m += 12; }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + hours / 24 + B - 1524.5;
}

function positions(jd) {
    const T = (jd - 2451545.0) / 36525;
    const M = norm(357.5291092 + 35999.0502909 * T);
    const L0 = norm(280.46646 + 36000.76983 * T);
    const C = (1.914602 - 0.004817 * T) * Math.sin(rad(M)) + 0.019993 * Math.sin(rad(2 * M)) + 0.000289 * Math.sin(rad(3 * M));
    const sun = norm(L0 + C);

    const Lp = norm(218.3164477 + 481267.88123421 * T);
    const D = norm(297.8501921 + 445267.1114034 * T);
    const Mp = norm(134.9633964 + 477198.8675055 * T);
    const F = norm(93.272095 + 483202.0175233 * T);
    const moon = norm(Lp
        + 6.288774 * Math.sin(rad(Mp)) + 1.274027 * Math.sin(rad(2 * D - Mp)) + 0.658314 * Math.sin(rad(2 * D))
        + 0.213618 * Math.sin(rad(2 * Mp)) - 0.185116 * Math.sin(rad(M)) - 0.114332 * Math.sin(rad(2 * F))
        + 0.058793 * Math.sin(rad(2 * D - 2 * Mp)) + 0.057066 * Math.sin(rad(2 * D - M - Mp))
        + 0.053322 * Math.sin(rad(2 * D + Mp)) + 0.045758 * Math.sin(rad(2 * D - M)));

    const rahu = norm(125.04452 - 1934.136261 * T);
    const ayanamsa = 23.853 + 1.3969 * T;
    const sid = (x) => norm(x - ayanamsa);
    return { sun: sid(sun), moon: sid(moon), rahu: sid(rahu), ketu: sid(rahu + 180) };
}

export const RASHIS = [
    { name: 'Mesha', en: 'Aries', lord: 'Mangal (Mars)', nature: 'fiery, brave and quick to begin', brew: 'a spicy masala chai' },
    { name: 'Vrishabha', en: 'Taurus', lord: 'Shukra (Venus)', nature: 'steady, sensual and deeply loyal', brew: 'a slow, creamy oat latte' },
    { name: 'Mithuna', en: 'Gemini', lord: 'Budh (Mercury)', nature: 'curious, witty and endlessly chatty', brew: 'two drinks, obviously' },
    { name: 'Karka', en: 'Cancer', lord: 'Chandra (Moon)', nature: 'nurturing, intuitive and tender', brew: "chai, just like Ma's" },
    { name: 'Simha', en: 'Leo', lord: 'Surya (Sun)', nature: 'radiant, generous and a little dramatic', brew: 'a golden turmeric latte' },
    { name: 'Kanya', en: 'Virgo', lord: 'Budh (Mercury)', nature: 'thoughtful, precise and quietly kind', brew: 'a perfectly whisked ceremonial matcha' },
    { name: 'Tula', en: 'Libra', lord: 'Shukra (Venus)', nature: 'charming, fair and full of taste', brew: 'a rose latte with pretty foam art' },
    { name: 'Vrishchika', en: 'Scorpio', lord: 'Mangal (Mars)', nature: 'intense, magnetic and deep', brew: 'a double espresso, no questions' },
    { name: 'Dhanu', en: 'Sagittarius', lord: 'Guru (Jupiter)', nature: 'adventurous, honest and free', brew: 'whatever the local café is famous for' },
    { name: 'Makara', en: 'Capricorn', lord: 'Shani (Saturn)', nature: 'ambitious, grounded and wise', brew: 'a no-nonsense filter coffee' },
    { name: 'Kumbha', en: 'Aquarius', lord: 'Shani (Saturn)', nature: 'original, dreamy and free-spirited', brew: 'an iced lavender matcha' },
    { name: 'Meena', en: 'Pisces', lord: 'Guru (Jupiter)', nature: 'dreamy, empathic and artistic', brew: 'a honey chai in the rain' },
];

export const NAKSHATRAS = [
    ['Ashwini', 'Ketu'], ['Bharani', 'Shukra'], ['Krittika', 'Surya'], ['Rohini', 'Chandra'], ['Mrigashira', 'Mangal'],
    ['Ardra', 'Rahu'], ['Punarvasu', 'Guru'], ['Pushya', 'Shani'], ['Ashlesha', 'Budh'], ['Magha', 'Ketu'],
    ['Purva Phalguni', 'Shukra'], ['Uttara Phalguni', 'Surya'], ['Hasta', 'Chandra'], ['Chitra', 'Mangal'], ['Swati', 'Rahu'],
    ['Vishakha', 'Guru'], ['Anuradha', 'Shani'], ['Jyeshtha', 'Budh'], ['Mula', 'Ketu'], ['Purva Ashadha', 'Shukra'],
    ['Uttara Ashadha', 'Surya'], ['Shravana', 'Chandra'], ['Dhanishta', 'Mangal'], ['Shatabhisha', 'Rahu'], ['Purva Bhadrapada', 'Guru'],
    ['Uttara Bhadrapada', 'Shani'], ['Revati', 'Budh'],
];

export const TIMEZONES = [
    ['+05:30', 'India (IST)'], ['+00:00', 'UK (GMT)'], ['+01:00', 'Central Europe (CET)'], ['+02:00', 'CEST / EET'],
    ['-05:00', 'US Eastern'], ['-08:00', 'US Pacific'], ['+04:00', 'UAE'], ['+08:00', 'Singapore'], ['+09:00', 'Korea / Japan'],
    ['+10:00', 'Sydney'],
];

// date "YYYY-MM-DD", time "HH:MM" (local), tz "+05:30"
export function kundli(date, time, tz) {
    const [y, m, d] = date.split('-').map(Number);
    const [hh, mm] = (time || '12:00').split(':').map(Number);
    const sign = tz.startsWith('-') ? -1 : 1;
    const [th, tm] = tz.slice(1).split(':').map(Number);
    const utcHours = hh + mm / 60 - sign * (th + tm / 60);
    const p = positions(julianDay(y, m, d, utcHours));
    const rashiOf = (lon) => Math.floor(lon / 30);
    const nIdx = Math.floor(p.moon / (360 / 27));
    const pada = Math.floor((p.moon % (360 / 27)) / (360 / 108)) + 1;
    return {
        planets: [
            { key: 'Su', name: 'Surya', rashi: rashiOf(p.sun) },
            { key: 'Mo', name: 'Chandra', rashi: rashiOf(p.moon) },
            { key: 'Ra', name: 'Rahu', rashi: rashiOf(p.rahu) },
            { key: 'Ke', name: 'Ketu', rashi: rashiOf(p.ketu) },
        ],
        moonRashi: RASHIS[rashiOf(p.moon)],
        sunRashi: RASHIS[rashiOf(p.sun)],
        nakshatra: { name: NAKSHATRAS[nIdx][0], lord: NAKSHATRAS[nIdx][1], pada },
        timeKnown: Boolean(time),
    };
}

// South Indian chart: the signs sit in fixed boxes around a 4×4 grid.
// [row, col] for Mesha..Meena
export const SOUTH_GRID = [[0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 3], [3, 2], [3, 1], [3, 0], [2, 0], [1, 0], [0, 0]];

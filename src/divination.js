// ✦ Everything for the readings section. ✦
// Glyphs use the text variation selector (︎) so phones don't turn them into emoji.

export const SIGNS = [
    { name: 'Aries', glyph: '♈︎', from: [3, 21], element: 'fire', planet: 'Mars', traits: ['bold', 'spontaneous', 'brave'], brew: 'a spicy masala chai' },
    { name: 'Taurus', glyph: '♉︎', from: [4, 20], element: 'earth', planet: 'Venus', traits: ['steady', 'sensual', 'loyal'], brew: 'a slow, creamy oat latte' },
    { name: 'Gemini', glyph: '♊︎', from: [5, 21], element: 'air', planet: 'Mercury', traits: ['curious', 'witty', 'chatty'], brew: 'two drinks, obviously' },
    { name: 'Cancer', glyph: '♋︎', from: [6, 21], element: 'water', planet: 'the Moon', traits: ['nurturing', 'intuitive', 'tender'], brew: "chai, just like Ma's" },
    { name: 'Leo', glyph: '♌︎', from: [7, 23], element: 'fire', planet: 'the Sun', traits: ['radiant', 'generous', 'dramatic'], brew: 'a golden turmeric latte' },
    { name: 'Virgo', glyph: '♍︎', from: [8, 23], element: 'earth', planet: 'Mercury', traits: ['thoughtful', 'precise', 'kind'], brew: 'a perfectly whisked ceremonial matcha' },
    { name: 'Libra', glyph: '♎︎', from: [9, 23], element: 'air', planet: 'Venus', traits: ['charming', 'fair', 'aesthetic'], brew: 'a rose latte with pretty foam art' },
    { name: 'Scorpio', glyph: '♏︎', from: [10, 23], element: 'water', planet: 'Pluto', traits: ['intense', 'magnetic', 'deep'], brew: 'a double espresso, no questions' },
    { name: 'Sagittarius', glyph: '♐︎', from: [11, 22], element: 'fire', planet: 'Jupiter', traits: ['adventurous', 'honest', 'free'], brew: 'whatever the local café is famous for' },
    { name: 'Capricorn', glyph: '♑︎', from: [12, 22], element: 'earth', planet: 'Saturn', traits: ['ambitious', 'grounded', 'wise'], brew: 'a no-nonsense filter coffee' },
    { name: 'Aquarius', glyph: '♒︎', from: [1, 20], element: 'air', planet: 'Uranus', traits: ['original', 'dreamy', 'free-spirited'], brew: 'an iced lavender matcha' },
    { name: 'Pisces', glyph: '♓︎', from: [2, 19], element: 'water', planet: 'Neptune', traits: ['dreamy', 'empathic', 'artistic'], brew: 'a honey chai under the rain' },
];

export function signFor(month, day) {
    // walk backwards through the start dates to find which sign the date falls in
    const order = [...SIGNS].sort((a, b) => a.from[0] - b.from[0] || a.from[1] - b.from[1]);
    let found = order[order.length - 1];
    for (const s of order) {
        if (month > s.from[0] || (month === s.from[0] && day >= s.from[1])) found = s;
    }
    return found;
}

const THEMES = [
    'a small, brave beginning', 'softness that is actually strength', 'an unexpected message', 'letting something old go',
    'a conversation that clears the air', 'creative sparks after sunset', 'rest as a quiet kind of progress', 'a door you forgot was open',
];
const ADVICE = [
    'Say yes to the slower path today.', 'Write it down before it floats away.', 'Trust the first instinct, then double-check the details.',
    'Reach out to someone you have been thinking about.', 'Leave room in your schedule for a little magic.', 'Tidy one small corner and watch your mind follow.',
    'Ask the question you have been sitting on.', 'Take the long way home and look up at the sky.',
];
const COLORS = ['moonlit silver', 'matcha green', 'rose quartz pink', 'sunset gold', 'twilight lavender', 'sea-glass blue', 'cinnamon brown', 'cloud white'];

function seeded(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}

// A light, for-fun daily reading that stays the same for a sign on a given day.
export function dailyReading(sign, date = new Date()) {
    const r = seeded(`${sign.name}-${date.toDateString()}`);
    const pick = (arr) => arr[Math.floor(r() * arr.length)];
    return { theme: pick(THEMES), advice: pick(ADVICE), color: pick(COLORS), number: 1 + Math.floor(r() * 9) };
}

export const TAROT = [
    { name: 'The Star', motif: 'star', message: 'Hope is returning. Heal gently, dream generously.' },
    { name: 'The Moon', motif: 'moon', message: 'Not everything needs to be clear yet. Follow your intuition through the mist.' },
    { name: 'The Sun', motif: 'sun', message: 'Warmth, joy and a yes. Let yourself be seen.' },
    { name: 'Wheel of Fortune', motif: 'wheel', message: 'Things are turning in your favour. Ride the change.' },
    { name: 'The Magician', motif: 'infinity', message: 'You already have every tool you need. Begin.' },
    { name: 'The Lovers', motif: 'hearts', message: 'A choice made from the heart. Alignment over perfection.' },
    { name: 'The Hermit', motif: 'lantern', message: 'Step back, sip something warm, and listen inward.' },
    { name: 'The World', motif: 'laurel', message: 'A cycle completes. Celebrate how far you have come.' },
    { name: 'Strength', motif: 'flower', message: 'Quiet courage. Kindness is your superpower today.' },
    { name: 'The High Priestess', motif: 'eye', message: 'You know more than you think. Trust the inner whisper.' },
];

export const PALM_LINES = [
    { id: 'heart', name: 'heart line', text: 'Runs under your fingers and speaks of love, emotions and how you connect with people.' },
    { id: 'head', name: 'head line', text: 'Cuts across the middle of the palm and shows how you think, learn and make decisions.' },
    { id: 'life', name: 'life line', text: 'Curves around the thumb. It is about vitality and big life changes, not how long you live.' },
    { id: 'fate', name: 'fate line', text: 'Rises up the centre toward the middle finger, tracing career, purpose and the path you choose.' },
];

export const READING_TYPES = [
    { id: 'chart', label: 'birth chart reading', needs: 'birth' },
    { id: 'palm', label: 'palm reading', needs: 'palm' },
    { id: 'both', label: 'stars + palm combo', needs: 'both' },
];

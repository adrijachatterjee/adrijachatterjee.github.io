// ✿ Everything on the site lives here. Edit freely. ✿

export const links = {
    email: 'adrijacodes@gmail.com',
    linkedin: 'https://www.linkedin.com/in/adrija-chatterjee-820735186/',
    github: 'https://github.com/adrijachatterjee',
    instagram: 'https://www.instagram.com/_adrija_chatterjee',
    musings: 'https://www.instagram.com/musings_by_adrija',
};

// Drop images into /public/art and put their paths here (e.g. '/art/me.webp').
// Anything left as null shows a hand-drawn illustration instead.
export const art = {
    portrait: '/art/jiji-bath.jpg',
    cafes: [null, null, null],
};

export const currentRole = {
    role: 'Software Development Engineer',
    company: 'Amazon',
    location: 'Bengaluru',
    blurb: 'building things at Amazon by day. then the laptop closes and the café map opens.',
};

export const projects = [
    { name: 'StoryWall', blurb: 'a cosy little home for writing blogs, powered by a live JSON server.', tags: ['React', 'JSON Server'], url: 'https://github.com/adrijachatterjee/StoryWall' },
    { name: 'Scribble Notes', blurb: 'an android notes app for my chaotic brain: add, prioritise, sort, delete.', tags: ['Java', 'Android'], url: 'https://github.com/adrijachatterjee/Scribble-TheUltimateNotesJunction' },
    { name: 'EasyBank', blurb: 'a bank landing page that looks cute on every screen size (yes, i tested them all).', tags: ['HTML', 'SCSS', 'JavaScript'], url: 'https://github.com/adrijachatterjee/EasyBank-UI' },
    { name: 'Birthday Wish', blurb: 'an animated birthday card i made just for fun. it\'s live, go wish someone.', tags: ['HTML', 'CSS', 'Animation'], url: 'https://happy-birthday-wish.vercel.app' },
];

export const education = {
    degree: { date: '2019 — 2023', title: 'B.Tech, Computer Science & Engineering', school: 'Government College of Engineering & Ceramic Technology, Kolkata', grade: '9.75', gradeNote: 'CGPA · perfect 10 SGPA in sems 2, 7 & 8' },
    schools: [
        { date: '2017 — 2019', name: "St. Agnes' Convent School", grade: 'ISC · 91.75%' },
        { date: '2015 — 2017', name: 'Agrasain Balika Siksha Sadan', grade: 'ICSE · 95%' },
    ],
    wins: [
        '<b>Xiaomi Ode2Code 2.0</b> finalist',
        'Ranked <b>343 (top 3%)</b> in GeeksforGeeks Job-a-thon 10',
    ],
    certs: [
        'Programming in Java · IIT Kharagpur', 'Joy of Computing with Python · IIT Ropar', 'Soft Skill Development · IIT Kharagpur',
        'MATLAB · Vanderbilt University', 'InsighT Python · TCS', 'Full Stack Development · MyCaptain', 'Graphic Design · MyCaptain',
        'JavaScript · SoloLearn', 'Java · SoloLearn', 'SQL · SoloLearn', 'Jina AI Bootcamp · all 3 tracks',
        'Winning with Walmart Bootcamp', 'CUDA & Parallel Programming · NVIDIA',
    ],
    stack: ['Java', 'C', 'C++', 'Kotlin', 'Python', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Spring Boot', 'SQL', 'Linux', 'Bash', 'Android', 'ROS', 'AWS', 'Figma'],
};

// Howl's door: each colour on the dial opens onto a different place.
export const places = [
    { color: '#e05a4f', label: 'Kolkata', kind: 'home, always', text: 'where i grew up, went to school and college, and fell in love with chai, books and long adda sessions.' },
    { color: '#5fa65a', label: 'Bengaluru', kind: 'home, now', text: 'cafés, surprise rain and a new corner of the city every weekend. i wander all over it.' },
    {
        color: '#f2a03b', label: 'India', kind: '20 states & UTs, counting',
        text: 'From Kashmir and Sikkim in the mountains, through Delhi and Uttar Pradesh, to Kerala and Tamil Nadu in the south, all across the Northeast, and out to the Andaman & Nicobar Islands. and yes, i have a list.',
        list: ['West Bengal', 'Delhi', 'Uttar Pradesh', 'Kashmir', 'Himachal Pradesh', 'Uttarakhand', 'Rajasthan', 'Maharashtra', 'Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Odisha', 'Sikkim', 'Arunachal Pradesh', 'Assam', 'Meghalaya', 'Jharkhand', 'Tripura', 'Andaman & Nicobar'],
    },
    { color: '#3c5ba8', label: 'United Kingdom', kind: 'across the seas', text: 'a whole new kind of rainy day. tea in hand, obviously.' },
    { color: '#6f8ff0', label: 'France', kind: 'bonjour', text: 'the Eiffel Tower on the skyline and a café on every corner. basically a theme park for café hoppers.' },
    { color: '#4fb3c8', label: 'Switzerland', kind: 'grüezi', text: 'snowy peaks, chalets and lakes so blue they look like a ghibli background painting. unreal.' },
    { color: '#a8652e', label: 'Germany', kind: 'hallo', text: 'storybook old towns, timber-framed houses and pretzels i still think about.' },
    { color: '#9b6bff', label: 'Belgium', kind: 'bonjour · hallo', text: 'waffles, chocolate and the Atomium looking like it flew in from a sci-fi anime.' },
];

// Café hopping! Add your favourite Bengaluru spots here and they'll show up on the loyalty card.
export const cafes = [
    // { name: 'Café name', area: 'Indiranagar', order: 'iced matcha' },
];

export const languages = [
    { hello: 'নমস্কার', name: 'Bengali', level: 'native' },
    { hello: 'नमस्ते', name: 'Hindi', level: 'fluent' },
    { hello: 'hello', name: 'English', level: 'fluent' },
    { hello: '안녕하세요', name: 'Korean', level: 'learning', learning: true },
];

export const now = [
    ['building', 'software (and a lot of side quests)'],
    ['learning', 'Korean, one hangul letter at a time'],
    ['sipping', 'matcha (this week, at least)'],
    ['exploring', 'a new café every weekend'],
];

export const jijiLines = [
    'psst. she codes, writes poetry AND travels. i am just a cat.',
    'Kiki delivers bread. Adrija delivers features.',
    'feed the soot sprites some konpeito. they get grumpy otherwise.',
    'matcha, coffee or chai? she will say "yes".',
    'try night mode. that is when we fly.',
    'Kiki has a cold. scroll down and help me with the deliveries?',
    'mrrp. hire her.',
    'she reads palms AND birth charts. i read the room. book one!',
    'tap Totoro at the bus stop. he has a song.',
    '안녕! she is learning Korean, so i am too.',
    'i have read her code reviews. she is kinder than Yubaba.',
    'Calcifer keeps this site warm. please do not pour water on him.',
];

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
    portrait: null,
    cafes: [null, null, null],
};

export const experience = [
    {
        date: 'Apr 2025 — present',
        type: 'full time',
        current: true,
        role: 'Software Development Engineer',
        company: 'Amazon',
        location: 'Bengaluru',
        points: ['Back where it all started, now as a full-time SDE building at Amazon scale.'],
        tags: [],
        note: 'the broom came back home',
    },
    {
        date: 'Oct 2023 — Mar 2025',
        type: 'full time',
        role: 'Software Development Engineer',
        company: 'Altair Engineering',
        points: [
            'Worked on core development and maintenance of <b>PBS Pro</b> in C and C++, improving system stability and cutting downtime by 25%.',
            'Built a React frontend for PBS Pro\'s workload manager on top of REST APIs.',
            'Wrote Shell and Bash CLI scripts that simplified end-user workflows by 80%.',
            'Fixed Linux performance bottlenecks for a 20% boost in responsiveness, and used Python automation to improve cross-platform compatibility by 30%.',
        ],
        tags: ['C', 'C++', 'Python', 'Linux', 'Bash', 'PBS Pro', 'React'],
        note: 'kept HPC clusters burning bright, Calcifer style',
    },
    {
        date: 'Jul 2023 — Sep 2023',
        type: 'full time',
        role: 'SDE, Embedded Systems',
        company: 'Spacewalk Automation',
        points: [
            'Designed and simulated robotic systems in ROS and Gazebo using URDF and STL models.',
            'Optimised C++ and XML launch files to streamline simulation workflows on Linux.',
        ],
        tags: ['ROS', 'Gazebo', 'C++', 'CMake', 'Python'],
        note: 'built robots gentler than the ones in Laputa',
    },
    {
        date: 'Jan 2023 — Jun 2023',
        type: 'internship',
        role: 'SDE Intern',
        company: 'Amazon',
        location: 'Bengaluru · Amazon Music',
        points: [
            'Fixed UI issues in the <b>Amazon Music</b> Android app with Kotlin and Java, improving user experience by 19%.',
            'Helped build the <b>Lyrics Sharing</b> feature and launched it behind a feature gate to 5% of users.',
        ],
        tags: ['Kotlin', 'Java', 'Android'],
        note: 'my first flight on the broom',
    },
    {
        date: 'Feb 2022 — Jul 2022',
        type: 'internship',
        role: 'Full-Stack Developer',
        company: 'Steel Authority of India (ISP)',
        points: [
            'Designed RMM portal screens in Figma and built them in ASP.NET and VB.NET.',
            'Optimised the Oracle DB schema, cutting query response times by 20%.',
        ],
        tags: ['Figma', 'ASP.NET', 'VB.NET', 'Oracle'],
        note: 'nerves of steel (literally)',
    },
    {
        date: 'Dec 2021 — Mar 2022',
        type: 'internship',
        role: 'Front End Developer',
        company: 'Techwishes Solutions',
        points: [
            'Redesigned the <b>Wonderhood</b> website with React, Next.js and GraphQL, increasing page reach by 70%.',
            'Built Shopify store features in JavaScript and jQuery, hosted on AWS.',
        ],
        tags: ['React', 'Next.js', 'GraphQL', 'Shopify', 'AWS'],
        note: 'first real delivery',
    },
    {
        date: 'Sep 2020 — Dec 2020',
        type: 'campus',
        role: 'Campus Ambassador',
        company: 'Internshala',
        points: ['Introduced fellow students to Internshala courses (with discounts!) and picked up some goodies along the way.'],
        tags: [],
        note: 'where it all began',
    },
];

export const projects = [
    { name: 'StoryWall', blurb: 'A web app for writing and managing blogs, backed by a live JSON server.', tags: ['React', 'JSON Server'], url: 'https://github.com/adrijachatterjee/StoryWall' },
    { name: 'Scribble Notes', blurb: 'An Android notes app where you can add, prioritise, sort and delete notes.', tags: ['Java', 'Android'], url: 'https://github.com/adrijachatterjee/Scribble-TheUltimateNotesJunction' },
    { name: 'EasyBank', blurb: 'A responsive, interactive bank landing page that works well on mobile and desktop.', tags: ['HTML', 'SCSS', 'JavaScript'], url: 'https://github.com/adrijachatterjee/EasyBank-UI' },
    { name: 'Birthday Wish', blurb: 'An animated birthday card made just for fun, live on Vercel.', tags: ['HTML', 'CSS', 'Animation'], url: 'https://happy-birthday-wish.vercel.app' },
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
    { color: '#e05a4f', label: 'Kolkata', kind: 'home, always', text: 'Where I grew up, went to school and college, and first fell in love with chai and books.' },
    { color: '#5fa65a', label: 'Bengaluru', kind: 'home, now', text: 'Cafés, weekend rains and new corners of the city to explore. I wander all over it.' },
    {
        color: '#f2a03b', label: 'India', kind: '18 states & UTs, counting',
        text: 'From Kashmir and Sikkim in the mountains to Kerala and Tamil Nadu in the south, all across the Northeast, and out to the Andaman & Nicobar Islands.',
        list: ['West Bengal', 'Kashmir', 'Himachal Pradesh', 'Uttarakhand', 'Rajasthan', 'Maharashtra', 'Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Odisha', 'Sikkim', 'Arunachal Pradesh', 'Assam', 'Meghalaya', 'Jharkhand', 'Tripura', 'Andaman & Nicobar'],
    },
    { color: '#3c5ba8', label: 'United Kingdom', kind: 'across the seas', text: 'A whole new kind of rainy day, with tea in hand, of course.' },
    { color: '#6f8ff0', label: 'France', kind: 'bonjour', text: 'The Eiffel Tower on the skyline and café terraces on every corner. A café hopper\'s dream.' },
    { color: '#4fb3c8', label: 'Switzerland', kind: 'grüezi', text: 'Snowy peaks, chalets and lakes so blue they look like a Ghibli background painting.' },
    { color: '#a8652e', label: 'Germany', kind: 'hallo', text: 'Storybook old towns, timber-framed houses and very good pretzels.' },
    { color: '#9b6bff', label: 'Belgium', kind: 'bonjour · hallo', text: 'Waffles, chocolate and the Atomium shining like something out of a sci-fi anime.' },
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
    ['building', 'software at Amazon, Bengaluru'],
    ['learning', 'Korean, one hangul letter at a time'],
    ['sipping', 'matcha (this week, at least)'],
    ['exploring', 'a new café every weekend'],
];

export const jijiLines = [
    'psst. she codes, writes poetry AND travels. i am just a cat.',
    'Kiki delivers bread. Adrija delivers features.',
    'feed the soot sprites some konpeito. they get grumpy otherwise.',
    'matcha, latte or chai? she will say "yes".',
    'try night mode. that is when we fly.',
    'Kiki has a cold. scroll down and help me with the deliveries?',
    'mrrp. hire her.',
    '안녕! she is learning Korean, so i am too.',
    'i have read her code reviews. she is kinder than Yubaba.',
    'Calcifer keeps this site warm. please do not pour water on him.',
];

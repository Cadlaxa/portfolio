const paletteBtn = document.querySelector('.palette-btn');
const paletteOptions = document.querySelector('.palette-options');
const palettes = document.querySelectorAll('.palette');

const sfxSelects = [
    new Audio('resources/sfx/color.mp3'),
    new Audio('resources/sfx/color1.mp3')
];

function playSound(audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.play().catch(e => console.log("Audio playback failed:", e));
}

// Palette variable sets
const themes = {
    orange: {
        "--yellow": "#ffef5b",
        "--orange": "#ffa600",
        "--orangeL": "#ffdb65",
        "--orangeL1": "#fbce3d",
        "--orangeHL": "#ffeed0",
        "--orangeD": "#fa8b4b",
        "--ptext": "#4a3101",
        "--light-gray": "#f2f2f2",
        "--dark-gray": "#4a3101",
        "--icon-drop-shadow": "#be976b",
        "--light-orange": "#fff6e7",
        "--light-orange1": "#fffbf4",
        "--dark-orange": "#6e4800",
        "--dark-orange1": "#cb682e",
        "--mobile-icon-item": "#ffeed0c5"
    },
    blue: {
        "--yellow": "#e0f2fe",
        "--orange": "#3b82f6",     // Primary Blue
        "--orangeL": "#60a5fa",    // Lighter Blue
        "--orangeL1": "#93c5fd",   // Even Lighter Blue
        "--orangeHL": "#c2dcff",   // Blue Highlight/Accent
        "--orangeD": "#2563eb",    // Darker Blue
        "--ptext": "#1e3a8a",
        "--light-gray": "#f0f9ff",
        "--dark-gray": "#1e293b",
        "--icon-drop-shadow": "#60a5fa",
        "--light-orange": "#e0f2fe",
        "--light-orange1": "#f0f9ff",
        "--dark-orange": "#1e3a8a", // Dark Blue
        "--dark-orange1": "#2563eb",
        "--mobile-icon-item": "#c2dcffc5" // Transparent Blue Highlight
    },
    green: {
        "--yellow": "#e6f9df",
        "--orange": "#10b981",     // Primary Green
        "--orangeL": "#34d399",    // Lighter Green
        "--orangeL1": "#86efac",   // Even Lighter Green
        "--orangeHL": "#c5fcd8",   // Green Highlight/Accent
        "--orangeD": "#059669",    // Darker Green
        "--ptext": "#053427",
        "--light-gray": "#f7fff9",
        "--dark-gray": "#063e2f",
        "--icon-drop-shadow": "rgba(52, 211, 153, 0.22)",
        "--light-orange": "#f0fff7",
        "--light-orange1": "#f0fff7",
        "--dark-orange": "#053427", // Dark Green
        "--dark-orange1": "#059669",
        "--mobile-icon-item": "#c5fcd8c5" // Transparent Green Highlight
    },

    pink: {
        "--yellow": "#fdf2f8",
        "--orange": "#ec4899",     // Primary Pink
        "--orangeL": "#f472b6",    // Lighter Pink
        "--orangeL1": "#f9a8d4",   // Even Lighter Pink
        "--orangeHL": "#fccce8",   // Pink Highlight/Accent
        "--orangeD": "#be185d",    // Darker Pink
        "--ptext": "#831843",
        "--light-gray": "#fff0f7",
        "--dark-gray": "#500724",
        "--icon-drop-shadow": "#f472b6",
        "--light-orange": "#fdf2f8",
        "--light-orange1": "#fff0f7",
        "--dark-orange": "#831843", // Dark Pink
        "--dark-orange1": "#be185d",
        "--mobile-icon-item": "#fccce8c5" // Transparent Pink Highlight
    },
    purple: {
        "--yellow": "#f5e1ff",
        "--orange": "#8b5cf6",     // Primary Purple
        "--orangeL": "#a78bfa",    // Lighter Purple
        "--orangeL1": "#c4b5fd",   // Even Lighter Purple
        "--orangeHL": "#d8cffc",   // Purple Highlight/Accent
        "--orangeD": "#7c3aed",    // Darker Purple
        "--ptext": "#2e1065",
        "--light-gray": "#faf5ff",
        "--dark-gray": "#4c1d95",
        "--icon-drop-shadow": "rgba(139, 92, 246, 0.25)",
        "--light-orange": "#f3e8ff",
        "--light-orange1": "#faf5ff",
        "--dark-orange": "#3b0764", // Dark Purple
        "--dark-orange1": "#7c3aed",
        "--mobile-icon-item": "#d8cffcc5" // Transparent Purple Highlight
    },
    red: {
        "--yellow": "#ffeeee",      // Lightest accent
        "--orange": "#fc5656",      // Primary Red
        "--orangeL": "#f87171",     // Lighter Red
        "--orangeL1": "#fca5a5",    // Even Lighter Red
        "--orangeHL": "#fabebe",    // Red Highlight/Accent
        "--orangeD": "#dc2626",     // Darker Red
        "--ptext": "#7f1d1d",       // Dark text (dark red)
        "--light-gray": "#fffafa",  // Very light background
        "--dark-gray": "#450a0a",   // Dark background/text
        "--icon-drop-shadow": "#f87171",
        "--light-orange": "#ffeeee",
        "--light-orange1": "#fffafa",
        "--dark-orange": "#7f1d1d", // Dark Red
        "--dark-orange1": "#dc2626",
        "--mobile-icon-item": "#fabebec5" // Transparent Red Highlight
    }
};

// Toggle palette menu
paletteBtn.addEventListener('click', () => {
    paletteOptions.classList.toggle('show');
});

// Apply palette + save to cookies
palettes.forEach(palette => {
    palette.addEventListener('click', () => {
        const choice = palette.dataset.palette;
        applyTheme(choice);
        const randomSFX = sfxSelects[Math.floor(Math.random() * sfxSelects.length)];
        playSound(randomSFX);
        document.cookie = `theme=${choice}; path=/; max-age=31536000`; // 1 year
        paletteOptions.classList.remove('show');
    });
});

// Load theme from cookies on startup
window.addEventListener('load', () => {
    const saved = document.cookie.split('; ').find(row => row.startsWith('theme='));
    if (saved) {
        const theme = saved.split('=')[1];
        applyTheme(theme);
    }
});

function applyTheme(name) {
    const themeVars = themes[name];
    for (let key in themeVars) {
        document.documentElement.style.setProperty(key, themeVars[key]);
    }
}
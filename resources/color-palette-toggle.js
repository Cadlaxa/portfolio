const paletteBtn = document.querySelector('.palette-btn');
const paletteOptions = document.querySelector('.palette-options');
const palettes = document.querySelectorAll('.palette');

// Palette variable sets
const themes = {
    orange: {
        "--yellow": "#ffef5b",
        "--orange": "#ffa600",
        "--orangeL": "#ffdb65",
        "--orangeL1": "#fbce3d",
        "--orangeHL": "#ffeed0",
        "--orangeD": "#fa8b4b",
        "--p": "#3d3d3d",
        "--light-gray": "#f2f2f2",
        "--dark-gray": "#424242",
        "--icon-drop-shadow": "#be976b",
        "--light-orange": "#fff6e7",
        "--light-orange1": "#fffbf4",
        "--dark-orange": "#6e4800",
        "--dark-orange1": "#cb682e"
    },
    blue: {
        "--yellow": "#e0f2fe",
        "--orange": "#3b82f6",
        "--orangeL": "#60a5fa",
        "--orangeL1": "#93c5fd",
        "--orangeHL": "#dbeafe",
        "--orangeD": "#2563eb",
        "--p": "#1e3a8a",
        "--light-gray": "#f0f9ff",
        "--dark-gray": "#1e293b",
        "--icon-drop-shadow": "#60a5fa",
        "--light-orange": "#e0f2fe",
        "--light-orange1": "#f0f9ff",
        "--dark-orange": "#1e3a8a",
        "--dark-orange1": "#2563eb"
    },
    green: {
        "--yellow": "#e6f9df",
        "--orange": "#10b981",
        "--orangeL": "#34d399",
        "--orangeL1": "#86efac",
        "--orangeHL": "#dcfce7",
        "--orangeD": "#059669",
        "--p": "#053427",
        "--light-gray": "#f7fff9",
        "--dark-gray": "#063e2f",
        "--icon-drop-shadow": "rgba(52, 211, 153, 0.22)",
        "--light-orange": "#e6f9df",
        "--light-orange1": "#f0fff7",
        "--dark-orange": "#053427",
        "--dark-orange1": "#059669"
    },

    pink: {
        "--yellow": "#fdf2f8",
        "--orange": "#ec4899",
        "--orangeL": "#f472b6",
        "--orangeL1": "#f9a8d4",
        "--orangeHL": "#fce7f3",
        "--orangeD": "#be185d",
        "--p": "#831843",
        "--light-gray": "#fff0f7",
        "--dark-gray": "#500724",
        "--icon-drop-shadow": "#f472b6",
        "--light-orange": "#fdf2f8",
        "--light-orange1": "#fff0f7",
        "--dark-orange": "#831843",
        "--dark-orange1": "#be185d"
    },
    purple: {
        "--yellow": "#f5e1ff", 
        "--orange": "#8b5cf6", 
        "--orangeL": "#a78bfa", 
        "--orangeL1": "#c4b5fd", 
        "--orangeHL": "#ede9fe", 
        "--orangeD": "#7c3aed", 
        "--p": "#2e1065", 
        "--light-gray": "#faf5ff", 
        "--dark-gray": "#4c1d95", 
        "--icon-drop-shadow": "rgba(139, 92, 246, 0.25)", 
        "--light-orange": "#f3e8ff", 
        "--light-orange1": "#faf5ff", 
        "--dark-orange": "#3b0764", 
        "--dark-orange1": "#7c3aed" 
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
    paletteBtn.style.background = themeVars["--orange"];
}
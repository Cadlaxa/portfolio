const paletteBtn = document.querySelector('.palette-btn');
const paletteOptions = document.querySelector('.palette-options');
const palettes = document.querySelectorAll('.palette');

const sfxSelects = [
    new Audio('resources/sfx/color.mp3'),
    new Audio('resources/sfx/color1.mp3')
];

// Palette variable sets
const themes = {
    base: {
        "--yellow": "#F5DA66",        // hsl(50, 95%, 65%)
        "--orange": "#FF9A1F",        // hsl(38, 95%, 55%)
        "--orangeL": "#F4C76C",       // hsl(45, 90%, 70%)
        "--orangeL1": "#E6A44D",      // hsl(30, 85%, 65%)
        "--orangeHL": "#F3EACB",      // hsl(60, 80%, 92%)
        "--orangeD": "#CE6729",       // hsl(20, 90%, 45%)
        "--ptext": "#5F3511",         // hsl(25, 70%, 20%)
        "--light-gray": "#F7F5ED",    // hsl(40, 20%, 95%)
        "--dark-gray": "#2B1D11",     // hsl(30, 30%, 15%)
        "--icon-drop-shadow": "#C07B43", // hsl(28, 45%, 50%)
        "--light-orange": "#FBF6E8",  // hsl(45, 85%, 97%)
        "--light-orange1": "#FFF9F0", // hsl(55, 85%, 98%)
        "--dark-orange": "#402513",   // hsl(18, 75%, 30%)
        "--dark-orange1": "#A15524",  // hsl(25, 80%, 45%)
        "--mobile-icon-item": "#F3EACBC0", // hsla(50, 85%, 92%, 0.75)
        "--cursor": "#F3EACB50"      // hsla(50, 85%, 92%, 0.3)
    },
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
        "--mobile-icon-item": "#ffeed0c5",
        "--cursor": "#ffeed050"
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
        "--mobile-icon-item": "#c2dcffc5", // Transparent Blue Highlight
        "--cursor": "#c2dcff50"
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
        "--icon-drop-shadow": "#64bd9c",
        "--light-orange": "#f0fff7",
        "--light-orange1": "#f0fff7",
        "--dark-orange": "#053427", // Dark Green
        "--dark-orange1": "#059669",
        "--mobile-icon-item": "#c5fcd8c5", // Transparent Green Highlight
        "--cursor": "#c5fcd850"
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
        "--mobile-icon-item": "#fccce8c5", // Transparent Pink Highlight
        "--cursor": "#fccce850"
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
        "--icon-drop-shadow": "#8f6fd6",
        "--light-orange": "#f3e8ff",
        "--light-orange1": "#faf5ff",
        "--dark-orange": "#3b0764", // Dark Purple
        "--dark-orange1": "#7c3aed",
        "--mobile-icon-item": "#d8cffcc5", // Transparent Purple Highlight
        "--cursor": "#d8cffc50"
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
        "--mobile-icon-item": "#fabebec5", // Transparent Red Highlight
        "--cursor": "#fabebe50"
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
        const paletteIcon = paletteBtn.querySelector("i");
        paletteIcon.classList.add("switching");

        if (choice === "hue-shift") {
            const newHue = Math.floor(Math.random() * 360);

            // Cache both theme + hue
            document.cookie = `theme=hue-shift; path=/; max-age=31536000`;
            document.cookie = `hueShift=${newHue}; path=/; max-age=31536000`;

            applyHueShiftTheme(newHue);
        } else {
            document.cookie = `theme=${choice}; path=/; max-age=31536000`;
            applyTheme(choice);
        }

        setTimeout(() => {
            paletteIcon.classList.remove("switching");
        }, 800);

        const randomSFX = sfxSelects[Math.floor(Math.random() * sfxSelects.length)];
        playSound(randomSFX);

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
    if (name === "hue-shift") {
        let hueValue = parseInt(
            document.cookie.split("; ")
                .find(r => r.startsWith("hueShift="))
                ?.split("=")[1] ?? Math.floor(Math.random() * 360)
        );
        applyHueShiftTheme(hueValue);
        return;
    }


    // Normal theme mode
    const themeVars = themes[name];
    for (let key in themeVars) {
        document.documentElement.style.setProperty(key, themeVars[key]);
    }
}

function applyHueShiftTheme(deg) {
    const base = themes.base; // baseline palette

    for (let key in base) {
        const shifted = hueShiftColor(base[key], deg);
        document.documentElement.style.setProperty(key, shifted);
    }
}

/* Convert hex → HSL → shift Hue → back to hex */
function shiftHue(deg) {
    const styles = getComputedStyle(document.documentElement);

    for (let varName in themes.base) { 
        let original = styles.getPropertyValue(varName).trim();
        if (!original.startsWith("#")) continue;

        let shifted = hueShiftColor(original, deg);
        document.documentElement.style.setProperty(varName, shifted);
    }
}

function hueShiftColor(hex, deg) {
    let { h, s, l } = hexToHSL(hex);

    h = (h + deg) % 360;

    // saturation & brightness
    s = Math.min(90, s * 0.6);
    l = Math.min(100, Math.max(10, l)); 

    return HSLToHex(h, s, l);
}

function hexToHSL(H) {
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }

    r /= 255; g /= 255; b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin;

    let h = 0, s = 0, l = 0;

    if (delta !== 0) {
        if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
    }

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

function HSLToHex(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = x =>
        `0${Math.round(x * 255).toString(16)}`.slice(-2).toUpperCase();
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

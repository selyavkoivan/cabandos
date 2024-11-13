import colorData from './colors.json'; 

export function getRandomColor() {
    const colorKeys = Object.keys(colorData);
    const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    const randomColor = colorData[randomKey];
    return { randomColor, colorKey: randomKey };
}

export function getDarkColor(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 7) {
        r = Math.round(parseInt(hex.substring(1, 3), 16) / 2);
        g = Math.round(parseInt(hex.substring(3, 5), 16) / 2);
        b = Math.round(parseInt(hex.substring(5, 7), 16) / 2);
    }
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}
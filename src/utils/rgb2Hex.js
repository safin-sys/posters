export const rgb2Hex = (rgb) => {
    if (!rgb) return "";
    const [r, g, b] = rgb.replace(/[^\d,]/g, "").split(",");
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

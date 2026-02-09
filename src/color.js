/**
 * Color Utilities
 * Manipulate arrays, hex, and RGB.
 */

/**
 * Convert Hex to RGB
 * @param {string} hex
 * @returns {{r: number, g: number, b: number} | null}
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Convert RGB to Hex
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 */
export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Lighten a color by percentage
 * @param {string} color - Hex color
 * @param {number} percent - -100 to 100
 * @returns {string}
 */
export const lighten = (color, percent) => {
  let num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

/**
 * Darken a color (alias for lighten with negative percent)
 * @param {string} color
 * @param {number} percent
 * @returns {string}
 */
export const darken = (color, percent) => {
  return lighten(color, -percent);
};

/**
 * Generate a random hex color
 * @returns {string}
 */
export const randomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

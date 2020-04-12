import { colors } from '@nksaraf/colors';
// const Color = require("color");

function fontStack(fonts) {
  return fonts
    .map(font => (font.includes(" ") ? `"${font}"` : font))
    .join(", ");
}

const sizes = [0, 4, 8, 16, 32, 64, 128, 256, 512];

export const baseTheme = {
  breakpoints: ["544px", "768px", "1012px", "1280px"],
  colors,
  fontSizes: [11, 12, 14, 16, 20, 24, 28, 32, 40, 48],
  lineHeights: {
    condensedUltra: 1,
    condensed: 1.25,
    default: 1.5,
  },
  maxWidths: {
    small: "544px",
    medium: "768px",
    large: "1012px",
    xlarge: "1280px"
  },
  fonts: {
    normal: fontStack([
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Helvetica",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol"
    ]),
    mono: fontStack([
      "SF Mono",
      "Consolas",
      "Liberation Mono",
      "Menlo",
      "Courier",
      "monospace"
    ])
  },
  shadows: {
    none: "rgba(0,0,0,0) 0 0px 0px 0",
    small: "rgba(0,0,0,0.15) 0 3px 6px 0",
    large: "rgba(0,0,0,0.30) 0 4px 10px 0"
  },
  fontWeights: {
    lighter: 300,
    normal: 400,
    bold: 500,
    bolder: 600
  },
  borders: [0, "1px solid"],
  radii: [0, 3, 6, 12, 150],
  space: sizes,
  sizes: sizes,
};



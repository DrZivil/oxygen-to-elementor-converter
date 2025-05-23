/**
 * Oxygen to Bricks Converter - Typography Mapping
 * Maps Oxygen typography properties to Bricks typography properties
 */

// Typography patterns for automatic class detection
const TYPOGRAPHY_PATTERNS = {
  // Text colors
  text: {
    property: "_typography",
    valueMap: {
      // Colors
      red: { color: { hex: "#f44336" } },
      blue: { color: { hex: "#2196f3" } },
      green: { color: { hex: "#4caf50" } },
      yellow: { color: { hex: "#ffeb3b" } },
      purple: { color: { hex: "#9c27b0" } },
      orange: { color: { hex: "#ff9800" } },
      teal: { color: { hex: "#009688" } },
      cyan: { color: { hex: "#00bcd4" } },
      pink: { color: { hex: "#e91e63" } },
      indigo: { color: { hex: "#3f51b5" } },
      lime: { color: { hex: "#cddc39" } },
      gray: { color: { hex: "#9e9e9e" } },
      black: { color: { hex: "#000000" } },
      white: { color: { hex: "#ffffff" } },
      
      // Font sizes
      xs: { "font-size": "12px" },
      sm: { "font-size": "14px" },
      base: { "font-size": "16px" },
      lg: { "font-size": "18px" },
      xl: { "font-size": "20px" },
      "2xl": { "font-size": "24px" },
      "3xl": { "font-size": "30px" },
      "4xl": { "font-size": "36px" },
      "5xl": { "font-size": "48px" }
    }
  },
  
  // Text alignment
  align: {
    property: "_typography",
    valueMap: {
      left: { "text-align": "left" },
      center: { "text-align": "center" },
      right: { "text-align": "right" },
      justify: { "text-align": "justify" }
    }
  },
  
  // Font weight
  font: {
    property: "_typography",
    valueMap: {
      thin: { "font-weight": "100" },
      light: { "font-weight": "300" },
      normal: { "font-weight": "400" },
      medium: { "font-weight": "500" },
      semibold: { "font-weight": "600" },
      bold: { "font-weight": "700" },
      extrabold: { "font-weight": "800" },
      black: { "font-weight": "900" }
    }
  }
};

/**
 * Maps Oxygen typography properties to Bricks typography properties
 * @param {Object} original - Original Oxygen properties
 * @returns {Object} - Mapped typography properties for Bricks
 */
function mapTypographyProperties(original = {}) {
  const typographyProps = {};
  
  // Extract typography properties
  const typographyProperties = [
    "font-size", "font-family", "font-weight", "line-height", 
    "text-align", "text-decoration", "letter-spacing", "text-transform"
  ];
  
  for (const prop of typographyProperties) {
    if (original[prop] != null) {
      typographyProps[prop] = original[prop];
    }
  }
  
  // Handle color property
  if (original["color"]?.startsWith("#")) {
    typographyProps.color = { hex: original["color"] };
  }
  
  return typographyProps;
}

export { TYPOGRAPHY_PATTERNS, mapTypographyProperties };

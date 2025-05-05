/**
 * Oxygen to Bricks Converter - Typography Mappings
 * Typography-specific property patterns and transformations
 */

// Typography-specific CSS property patterns for automatic class detection
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
 * Maps typography properties from Oxygen format to Bricks format
 * @param {Object} properties - Original typography properties
 * @returns {Object} - Mapped typography properties in Bricks format
 */
function mapTypographyProperties(properties) {
  const result = {};
  
  // Handle color conversion
  if (properties["color"] && properties["color"].startsWith('#')) {
    result.color = { hex: properties["color"] };
  }
  
  // Copy direct properties
  const directProperties = [
    "font-family", "font-size", "font-weight", "font-style",
    "line-height", "letter-spacing", "text-align", "text-decoration",
    "text-transform"
  ];
  
  for (const prop of directProperties) {
    if (properties[prop] != null) {
      result[prop] = properties[prop];
    }
  }
  
  return result;
}

export { TYPOGRAPHY_PATTERNS, mapTypographyProperties };

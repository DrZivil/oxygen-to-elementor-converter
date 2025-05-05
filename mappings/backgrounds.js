/**
 * Oxygen to Bricks Converter - Background Mappings
 * Background-specific property patterns and transformations
 */

// Background-specific CSS property patterns for automatic class detection
const BACKGROUND_PATTERNS = {
  // Background colors
  bg: {
    property: "_background",
    valueMap: {
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
      transparent: { color: { hex: "transparent" } }
    }
  }
};

/**
 * Maps background properties from Oxygen format to Bricks format
 * @param {Object} properties - Original background properties
 * @returns {Object} - Mapped background properties in Bricks format
 */
function mapBackgroundProperties(properties) {
  const result = {};
  
  // Handle background-color conversion
  if (properties["background-color"] && properties["background-color"].startsWith('#')) {
    result.color = { hex: properties["background-color"] };
  }
  
  // Handle other background properties
  const directProperties = [
    "background-image", "background-position", "background-repeat",
    "background-size", "background-attachment"
  ];
  
  for (const prop of directProperties) {
    if (properties[prop] != null) {
      // Convert property name from background-image to backgroundImage
      const bricksProp = prop.replace(/background-(.)/g, (match, letter) => `background${letter.toUpperCase()}`);
      result[bricksProp] = properties[prop];
    }
  }
  
  return result;
}

export { BACKGROUND_PATTERNS, mapBackgroundProperties };

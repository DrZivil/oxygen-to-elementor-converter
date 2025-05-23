/**
 * Oxygen to Bricks Converter - Background Mapping
 * Maps Oxygen background properties to Bricks background properties
 */

// Background patterns for automatic class detection
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
 * Maps Oxygen background properties to Bricks background properties
 * @param {Object} original - Original Oxygen properties
 * @returns {Object} - Mapped background properties for Bricks
 */
function mapBackgroundProperties(original = {}) {
  const backgroundProps = {};
  
  // Extract background properties
  const backgroundProperties = [
    "background-image", "background-position", "background-size", 
    "background-repeat", "background-attachment"
  ];
  
  for (const prop of backgroundProperties) {
    if (original[prop] != null) {
      backgroundProps[prop] = original[prop];
    }
  }
  
  // Handle background-color property
  if (original["background-color"]?.startsWith("#")) {
    backgroundProps.color = { hex: original["background-color"] };
  }
  
  return backgroundProps;
}

export { BACKGROUND_PATTERNS, mapBackgroundProperties };

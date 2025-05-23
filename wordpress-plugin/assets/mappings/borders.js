/**
 * Oxygen to Bricks Converter - Border Mapping
 * Maps Oxygen border properties to Bricks border properties
 */

// Border patterns for automatic class detection
const BORDER_PATTERNS = {
  // Border radius
  rounded: {
    property: "_border",
    valueMap: {
      none: { "border-radius": "0" },
      sm: { "border-radius": "4px" },
      md: { "border-radius": "8px" },
      lg: { "border-radius": "16px" },
      xl: { "border-radius": "24px" },
      full: { "border-radius": "9999px" }
    }
  },
  
  // Border
  border: {
    property: "_border",
    // Handle numeric border width (border-2, border-3, etc.)
    valuePattern: /^border-(\d+)$/,
    valueTransform: (match) => ({ "border-width": `${match[1]}px` }),
    // Handle border colors (border-red, border-blue, etc.)
    valueMap: {
      red: { "border-color": "#f44336" },
      blue: { "border-color": "#2196f3" },
      green: { "border-color": "#4caf50" },
      yellow: { "border-color": "#ffeb3b" },
      purple: { "border-color": "#9c27b0" },
      orange: { "border-color": "#ff9800" },
      teal: { "border-color": "#009688" },
      gray: { "border-color": "#9e9e9e" },
      black: { "border-color": "#000000" },
      white: { "border-color": "#ffffff" }
    }
  }
};

/**
 * Maps Oxygen border properties to Bricks border properties
 * @param {Object} original - Original Oxygen properties
 * @returns {Object} - Mapped border properties for Bricks
 */
function mapBorderProperties(original = {}) {
  const borderProps = {};
  
  // Extract border width properties
  const borderWidthProps = [
    "border-width", "border-top-width", "border-right-width", 
    "border-bottom-width", "border-left-width"
  ];
  
  for (const prop of borderWidthProps) {
    if (original[prop] != null) {
      borderProps[prop] = original[prop];
    }
  }
  
  // Extract border radius properties
  const borderRadiusProps = [
    "border-radius", "border-top-left-radius", "border-top-right-radius", 
    "border-bottom-left-radius", "border-bottom-right-radius"
  ];
  
  for (const prop of borderRadiusProps) {
    if (original[prop] != null) {
      borderProps[prop] = original[prop];
    }
  }
  
  // Extract border color
  if (original["border-color"]) {
    borderProps["border-color"] = original["border-color"];
  }
  
  // Extract border style
  if (original["border-style"]) {
    borderProps["border-style"] = original["border-style"];
  }
  
  return borderProps;
}

export { BORDER_PATTERNS, mapBorderProperties };

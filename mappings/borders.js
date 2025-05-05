/**
 * Oxygen to Bricks Converter - Border Mappings
 * Border-specific property patterns and transformations
 */

// Border-specific CSS property patterns for automatic class detection
const BORDER_PATTERNS = {
  // Border radius
  rounded: {
    property: "_border",
    valueMap: {
      none: { radius: { top: "0", right: "0", bottom: "0", left: "0" } },
      sm: { radius: { top: "4px", right: "4px", bottom: "4px", left: "4px" } },
      md: { radius: { top: "8px", right: "8px", bottom: "8px", left: "8px" } },
      lg: { radius: { top: "16px", right: "16px", bottom: "16px", left: "16px" } },
      xl: { radius: { top: "24px", right: "24px", bottom: "24px", left: "24px" } },
      full: { radius: { top: "9999px", right: "9999px", bottom: "9999px", left: "9999px" } }
    }
  },
  
  // Border
  border: {
    property: "_border",
    // Handle numeric border width (border-2, border-3, etc.)
    valuePattern: /^border-(\d+)$/,
    valueTransform: (match) => ({ 
      width: {
        top: `${match[1]}px`,
        right: `${match[1]}px`,
        bottom: `${match[1]}px`,
        left: `${match[1]}px`
      } 
    }),
    // Handle border colors (border-red, border-blue, etc.)
    valueMap: {
      red: { color: { hex: "#f44336" } },
      blue: { color: { hex: "#2196f3" } },
      green: { color: { hex: "#4caf50" } },
      yellow: { color: { hex: "#ffeb3b" } },
      purple: { color: { hex: "#9c27b0" } },
      orange: { color: { hex: "#ff9800" } },
      teal: { color: { hex: "#009688" } },
      gray: { color: { hex: "#9e9e9e" } },
      black: { color: { hex: "#000000" } },
      white: { color: { hex: "#ffffff" } }
    }
  }
};

/**
 * Maps border properties from Oxygen format to Bricks format
 * @param {Object} properties - Original border properties
 * @returns {Object} - Mapped border properties in Bricks format
 */
function mapBorderProperties(properties) {
  const result = {};
  
  // Handle border width
  if (properties["border-width"]) {
    const width = properties["border-width"];
    result.width = {
      top: width,
      right: width, 
      bottom: width,
      left: width
    };
  }
  
  // Handle individual border widths
  const sides = ["top", "right", "bottom", "left"];
  for (const side of sides) {
    const prop = `border-${side}-width`;
    if (properties[prop]) {
      result.width = result.width || {};
      result.width[side] = properties[prop];
    }
  }
  
  // Handle border color
  if (properties["border-color"] && properties["border-color"].startsWith('#')) {
    result.color = { hex: properties["border-color"] };
  }
  
  // Handle border style
  if (properties["border-style"]) {
    result.style = properties["border-style"];
  }
  
  // Handle border radius
  if (properties["border-radius"]) {
    const radius = properties["border-radius"];
    result.radius = {
      top: radius,
      right: radius,
      bottom: radius,
      left: radius
    };
  }
  
  // Handle individual border radiuses
  const corners = ["top-left", "top-right", "bottom-right", "bottom-left"];
  for (const corner of corners) {
    const prop = `border-${corner}-radius`;
    if (properties[prop]) {
      result.radius = result.radius || {};
      result.radius[corner.replace('-', '')] = properties[prop];
    }
  }
  
  return result;
}

export { BORDER_PATTERNS, mapBorderProperties };

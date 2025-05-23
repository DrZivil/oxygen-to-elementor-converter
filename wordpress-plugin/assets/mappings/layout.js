/**
 * Oxygen to Bricks Converter - Layout Mapping
 * Maps Oxygen layout properties to Bricks layout properties
 */

// Layout patterns for automatic class detection
const LAYOUT_PATTERNS = {
  // Width
  w: {
    property: "_layout",
    valuePattern: /^w-(\d+)$/,
    valueTransform: (match) => ({ "width": `${match[1]}px` })
  },
  
  // Height
  h: {
    property: "_layout",
    valuePattern: /^h-(\d+)$/,
    valueTransform: (match) => ({ "height": `${match[1]}px` })
  },
  
  // Flex layout
  flex: {
    property: "_layout",
    valueMap: {
      row: { "display": "flex", "flex-direction": "row" },
      col: { "display": "flex", "flex-direction": "column" },
      wrap: { "display": "flex", "flex-wrap": "wrap" },
      nowrap: { "display": "flex", "flex-wrap": "nowrap" }
    }
  },
  
  // Justify content
  justify: {
    property: "_layout",
    valueMap: {
      start: { "justify-content": "flex-start" },
      end: { "justify-content": "flex-end" },
      center: { "justify-content": "center" },
      between: { "justify-content": "space-between" },
      around: { "justify-content": "space-around" },
      evenly: { "justify-content": "space-evenly" }
    }
  },
  
  // Align items
  items: {
    property: "_layout",
    valueMap: {
      start: { "align-items": "flex-start" },
      end: { "align-items": "flex-end" },
      center: { "align-items": "center" },
      baseline: { "align-items": "baseline" },
      stretch: { "align-items": "stretch" }
    }
  }
};

/**
 * Maps Oxygen layout properties to Bricks layout properties
 * @param {Object} original - Original Oxygen properties
 * @returns {Object} - Mapped layout properties for Bricks
 */
function mapLayoutProperties(original = {}) {
  const layoutProps = {};
  
  // Direct-mapping properties (matching root version)
  const directProps = [
    "display", "flex-direction", "flex-wrap", "justify-content",
    "align-items", "align-self", "flex-grow", "flex-shrink",
    "flex-basis", "position", "top", "right", "bottom", "left", "z-index",
    "gap", "row-gap", "column-gap", "order",

    // New grid-specific keys (as in root version)
    "grid-column-count", "grid-column-gap", "grid-column-min-width", "grid-column-max-width",
    "grid-align-items", "grid-justify-items", "grid-template-columns", "grid-template-rows",
    "grid-auto-flow", "grid-row-gap", "grid-row-behavior", "grid-columns-auto-fit"
  ];
  
  for (const prop of directProps) {
    if (original[prop] != null) {
      layoutProps[prop] = original[prop];
    }
  }
  
  // Handle width/height with units (matching root version)
  if (original["width"]) {
    const width = original["width"];
    if (typeof width === "string" && width.includes("%")) {
      layoutProps.width = width;
      layoutProps["width-unit"] = "%";
    } else {
      layoutProps.width = width;
    }
  }
  
  if (original["height"]) {
    const height = original["height"];
    if (typeof height === "string" && height.includes("%")) {
      layoutProps.height = height;
      layoutProps["height-unit"] = "%";
    } else {
      layoutProps.height = height;
    }
  }
  
  return layoutProps;
}

export { LAYOUT_PATTERNS, mapLayoutProperties };

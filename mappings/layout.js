/**
 * Maps layout properties from Oxygen format to Bricks format
 * @param {Object} properties - Original layout properties
 * @returns {Object} - Mapped layout properties in Bricks format
 */
function mapLayoutProperties(properties) {
  const result = {};
  
  // Direct-mapping properties
  const directProps = [
    "display", "flex-direction", "flex-wrap", "justify-content",
    "align-items", "align-self", "flex-grow", "flex-shrink",
    "flex-basis", "position", "top", "right", "bottom", "left", "z-index",
    "gap", "row-gap", "column-gap", "order",

    // New grid-specific keys
    "grid-column-count", "grid-column-gap", "grid-column-min-width", "grid-column-max-width",
    "grid-align-items", "grid-justify-items"
  ];

  
  for (const prop of directProps) {
    if (properties[prop] != null) {
      result[prop] = properties[prop];
    }
  }
  
  // Handle width/height with units
  if (properties["width"]) {
    const width = properties["width"];
    if (typeof width === "string" && width.includes("%")) {
      result.width = width;
      result["width-unit"] = "%";
    } else {
      result.width = width;
    }
  }
  
  if (properties["height"]) {
    const height = properties["height"];
    if (typeof height === "string" && height.includes("%")) {
      result.height = height;
      result["height-unit"] = "%";
    } else {
      result.height = height;
    }
  }
  
  return result;
}

export { mapLayoutProperties };

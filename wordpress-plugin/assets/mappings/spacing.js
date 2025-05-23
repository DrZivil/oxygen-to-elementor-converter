/**
 * Oxygen to Bricks Converter - Spacing Mapping
 * Maps Oxygen spacing properties to Bricks spacing properties
 */

// Spacing patterns for automatic class detection
const SPACING_PATTERNS = {
  // Padding (all sides)
  p: {
    property: "_spacing",
    valuePattern: /^p-(\d+)$/,
    valueTransform: (match) => ({ "padding": `${match[1]}px` })
  },
  
  // Padding specific sides
  pt: {
    property: "_spacing",
    valuePattern: /^pt-(\d+)$/,
    valueTransform: (match) => ({ "padding-top": `${match[1]}px` })
  },
  pr: {
    property: "_spacing",
    valuePattern: /^pr-(\d+)$/,
    valueTransform: (match) => ({ "padding-right": `${match[1]}px` })
  },
  pb: {
    property: "_spacing",
    valuePattern: /^pb-(\d+)$/,
    valueTransform: (match) => ({ "padding-bottom": `${match[1]}px` })
  },
  pl: {
    property: "_spacing",
    valuePattern: /^pl-(\d+)$/,
    valueTransform: (match) => ({ "padding-left": `${match[1]}px` })
  },
  px: {
    property: "_spacing",
    valuePattern: /^px-(\d+)$/,
    valueTransform: (match) => ({ 
      "padding-left": `${match[1]}px`,
      "padding-right": `${match[1]}px` 
    })
  },
  py: {
    property: "_spacing",
    valuePattern: /^py-(\d+)$/,
    valueTransform: (match) => ({ 
      "padding-top": `${match[1]}px`,
      "padding-bottom": `${match[1]}px` 
    })
  },
  
  // Margin (all sides)
  m: {
    property: "_spacing",
    valuePattern: /^m-(\d+)$/,
    valueTransform: (match) => ({ "margin": `${match[1]}px` })
  },
  
  // Margin specific sides
  mt: {
    property: "_spacing",
    valuePattern: /^mt-(\d+)$/,
    valueTransform: (match) => ({ "margin-top": `${match[1]}px` })
  },
  mr: {
    property: "_spacing",
    valuePattern: /^mr-(\d+)$/,
    valueTransform: (match) => ({ "margin-right": `${match[1]}px` })
  },
  mb: {
    property: "_spacing",
    valuePattern: /^mb-(\d+)$/,
    valueTransform: (match) => ({ "margin-bottom": `${match[1]}px` })
  },
  ml: {
    property: "_spacing",
    valuePattern: /^ml-(\d+)$/,
    valueTransform: (match) => ({ "margin-left": `${match[1]}px` })
  },
  mx: {
    property: "_spacing",
    valuePattern: /^mx-(\d+)$/,
    valueTransform: (match) => ({ 
      "margin-left": `${match[1]}px`,
      "margin-right": `${match[1]}px` 
    })
  },
  my: {
    property: "_spacing",
    valuePattern: /^my-(\d+)$/,
    valueTransform: (match) => ({ 
      "margin-top": `${match[1]}px`,
      "margin-bottom": `${match[1]}px` 
    })
  }
};

/**
 * Maps Oxygen padding properties to Bricks spacing properties
 * @param {Object} original - Original Oxygen properties
 * @returns {Object} - Mapped padding properties for Bricks
 */
function mapPaddingProperties(original = {}) {
  const paddingProps = {};
  
  // Extract padding properties
  const paddingProperties = [
    "padding", "padding-top", "padding-right", "padding-bottom", "padding-left"
  ];
  
  for (const prop of paddingProperties) {
    if (original[prop] != null) {
      paddingProps[prop] = original[prop];
    }
  }
  
  return paddingProps;
}

/**
 * Maps Oxygen margin properties to Bricks spacing properties
 * @param {Object} original - Original Oxygen properties
 * @returns {Object} - Mapped margin properties for Bricks
 */
function mapMarginProperties(original = {}) {
  const marginProps = {};
  
  // Extract margin properties
  const marginProperties = [
    "margin", "margin-top", "margin-right", "margin-bottom", "margin-left"
  ];
  
  for (const prop of marginProperties) {
    if (original[prop] != null) {
      marginProps[prop] = original[prop];
    }
  }
  
  return marginProps;
}

export { 
  SPACING_PATTERNS, 
  mapPaddingProperties, 
  mapMarginProperties 
};

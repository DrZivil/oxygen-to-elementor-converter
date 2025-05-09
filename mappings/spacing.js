/**
 * Oxygen to Bricks Converter - Spacing Mappings
 * Spacing-specific property patterns and transformations
 */

// Spacing-specific CSS property patterns for automatic class detection
const SPACING_PATTERNS = {
  // Padding (all sides)
  p: {
    property: "_spacing",
    valuePattern: /^p-(\d+)$/,
    valueTransform: (match) => ({ 
      padding: {
        top: `${match[1]}px`,
        right: `${match[1]}px`,
        bottom: `${match[1]}px`,
        left: `${match[1]}px`
      }
    })
  },
  
  // Padding specific sides
  pt: {
    property: "_spacing",
    valuePattern: /^pt-(\d+)$/,
    valueTransform: (match) => ({ 
      padding: { top: `${match[1]}px` }
    })
  },
  pr: {
    property: "_spacing",
    valuePattern: /^pr-(\d+)$/,
    valueTransform: (match) => ({ 
      padding: { right: `${match[1]}px` }
    })
  },
  pb: {
    property: "_spacing",
    valuePattern: /^pb-(\d+)$/,
    valueTransform: (match) => ({ 
      padding: { bottom: `${match[1]}px` }
    })
  },
  pl: {
    property: "_spacing",
    valuePattern: /^pl-(\d+)$/,
    valueTransform: (match) => ({ 
      padding: { left: `${match[1]}px` }
    })
  },
  px: {
    property: "_spacing",
    valuePattern: /^px-(\d+)$/,
    valueTransform: (match) => ({ 
      padding: {
        left: `${match[1]}px`,
        right: `${match[1]}px`
      }
    })
  },
  py: {
    property: "_spacing",
    valuePattern: /^py-(\d+)$/,
    valueTransform: (match) => ({ 
      padding: {
        top: `${match[1]}px`,
        bottom: `${match[1]}px`
      }
    })
  },
  
  // Margin (all sides)
  m: {
    property: "_spacing",
    valuePattern: /^m-(\d+)$/,
    valueTransform: (match) => ({ 
      margin: {
        top: `${match[1]}px`,
        right: `${match[1]}px`,
        bottom: `${match[1]}px`,
        left: `${match[1]}px`
      }
    })
  },
  
  // Margin specific sides
  mt: {
    property: "_spacing",
    valuePattern: /^mt-(\d+)$/,
    valueTransform: (match) => ({ 
      margin: { top: `${match[1]}px` }
    })
  },
  mr: {
    property: "_spacing",
    valuePattern: /^mr-(\d+)$/,
    valueTransform: (match) => ({ 
      margin: { right: `${match[1]}px` }
    })
  },
  mb: {
    property: "_spacing",
    valuePattern: /^mb-(\d+)$/,
    valueTransform: (match) => ({ 
      margin: { bottom: `${match[1]}px` }
    })
  },
  ml: {
    property: "_spacing",
    valuePattern: /^ml-(\d+)$/,
    valueTransform: (match) => ({ 
      margin: { left: `${match[1]}px` }
    })
  },
  mx: {
    property: "_spacing",
    valuePattern: /^mx-(\d+)$/,
    valueTransform: (match) => ({ 
      margin: {
        left: `${match[1]}px`,
        right: `${match[1]}px`
      }
    })
  },
  my: {
    property: "_spacing",
    valuePattern: /^my-(\d+)$/,
    valueTransform: (match) => ({ 
      margin: {
        top: `${match[1]}px`,
        bottom: `${match[1]}px`
      }
    })
  }
};

/**
 * Maps padding properties from Oxygen format to Bricks format
 * @param {Object} properties - Original padding properties
 * @returns {Object} - Mapped padding properties in Bricks format
 */
function mapPaddingProperties(properties) {
  let result = {};
  
  // Handle all-side padding
  if (properties["padding"]) {
    result = {
      top: properties["padding"],
      right: properties["padding"],
      bottom: properties["padding"],
      left: properties["padding"]
    };
    return result;
  }
  
  // Handle individual padding sides
  const sides = ["top", "right", "bottom", "left"];
  let hasPadding = false;
  
  for (const side of sides) {
    const prop = `padding-${side}`;
    if (properties[prop]) {
      result = result || {};
      result[side] = properties[prop];
      hasPadding = true;
    }
  }
  
  return hasPadding ? result : {};
}

/**
 * Maps margin properties from Oxygen format to Bricks format
 * @param {Object} properties - Original margin properties
 * @returns {Object} - Mapped margin properties in Bricks format
 */
function mapMarginProperties(properties) {
  let result = {};
  
  // Handle all-side margin
  if (properties["margin"]) {
    result = {
      top: properties["margin"],
      right: properties["margin"],
      bottom: properties["margin"],
      left: properties["margin"]
    };
    return result;
  }
  
  // Handle individual margin sides
  const sides = ["top", "right", "bottom", "left"];
  let hasMargin = false;
  
  for (const side of sides) {
    const prop = `margin-${side}`;
    if (properties[prop]) {
      result = result || {};
      result[side] = properties[prop];
      hasMargin = true;
    }
  }
  
  return hasMargin ? result : {};
}

export { 
  SPACING_PATTERNS, 
  mapPaddingProperties, 
  mapMarginProperties 
};

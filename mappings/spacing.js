/**
 * Oxygen to Bricks Converter - Spacing Mappings
 * Spacing-specific property patterns and transformations
 */
import {applyUnits} from "../utils/utilities.js";

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
  // First apply units to all padding properties
  const paddingProps = [
    "padding", "padding-top", "padding-right", "padding-bottom", "padding-left"
  ];

  // Filter and apply units
  const propsWithUnits = Object.fromEntries(
    Object.entries(properties)
      .filter(([key]) => paddingProps.includes(key) || key.endsWith('-unit'))
  );

  const withUnits = applyUnits(propsWithUnits);
  let result = {};

  // Handle all-side padding
  if (withUnits["padding"]) {
    result = {
      top: withUnits["padding"],
      right: withUnits["padding"],
      bottom: withUnits["padding"],
      left: withUnits["padding"]
    };
    return result;
  }

  // Map Oxygen padding-* to Bricks top, right, bottom, left
  const mapping = {
    "padding-top": "top",
    "padding-right": "right",
    "padding-bottom": "bottom",
    "padding-left": "left"
  };

  let hasPadding = false;

  for (const [oxyProp, bricksProp] of Object.entries(mapping)) {
    if (withUnits[oxyProp]) {
      result[bricksProp] = withUnits[oxyProp];
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
  // First apply units to all margin properties
  const marginProps = [
    "margin", "margin-top", "margin-right", "margin-bottom", "margin-left"
  ];

  // Filter and apply units
  const propsWithUnits = Object.fromEntries(
    Object.entries(properties)
      .filter(([key]) => marginProps.includes(key) || key.endsWith('-unit'))
  );

  const withUnits = applyUnits(propsWithUnits);
  let result = {};

  // Handle all-side margin
  if (withUnits["margin"]) {
    result = {
      top: withUnits["margin"],
      right: withUnits["margin"],
      bottom: withUnits["margin"],
      left: withUnits["margin"]
    };
    return result;
  }

  // Special handling for auto units
  const checkForAuto = (prop) => {
    const unitProp = `${prop}-unit`;
    if (properties[unitProp] === "auto") {
      return "auto";
    }
    return withUnits[prop];
  };

  // Map Oxygen margin-* to Bricks top, right, bottom, left
  const mapping = {
    "margin-top": "top",
    "margin-right": "right",
    "margin-bottom": "bottom",
    "margin-left": "left"
  };

  let hasMargin = false;

  for (const [oxyProp, bricksProp] of Object.entries(mapping)) {
    // Check if the property exists in withUnits or has auto unit
    if (withUnits[oxyProp] || properties[`${oxyProp}-unit`] === "auto") {
      result[bricksProp] = checkForAuto(oxyProp);
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

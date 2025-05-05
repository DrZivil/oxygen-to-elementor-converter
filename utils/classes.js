/**
 * Oxygen to Bricks Converter - Class Utilities
 * Utilities for handling class conversion and management
 */

import { generateId } from './generators.js';
import { TYPOGRAPHY_PATTERNS } from '../mappings/typography.js';
import { BACKGROUND_PATTERNS } from '../mappings/backgrounds.js';
import { BORDER_PATTERNS } from '../mappings/borders.js';
import { SPACING_PATTERNS } from '../mappings/spacing.js';
// import { LAYOUT_PATTERNS } from '../mappings/layout.js';
import { mapTypographyProperties } from '../mappings/typography.js';
import { mapBackgroundProperties } from '../mappings/backgrounds.js';
import { mapBorderProperties } from '../mappings/borders.js';
import { mapPaddingProperties, mapMarginProperties } from '../mappings/spacing.js';
import { mapLayoutProperties } from '../mappings/layout.js';

// Combine all property patterns
const CSS_PROPERTY_PATTERNS = {
  ...TYPOGRAPHY_PATTERNS,
  ...BACKGROUND_PATTERNS,
  ...BORDER_PATTERNS,
  ...SPACING_PATTERNS,
  // ...LAYOUT_PATTERNS
};

/**
 * Process a class definition from Oxygen to Bricks format
 * @param {Object} classDefinition - The Oxygen class definition
 * @returns {Object} - The processed style settings for Bricks
 */
function processClassDefinition(classDefinition) {
  const settings = {};
  
  // Extract original styles from the class definition
  let original = {};
  
  // Handle different formats of original properties
  if (classDefinition.original) {
    // Handle array format (convert to object if needed)
    if (Array.isArray(classDefinition.original)) {
      // Empty array, try to find properties in the classDefinition itself
      original = { ...classDefinition };
      delete original.original;
      delete original.key;
      delete original.media;
    } else {
      // Object format (most common)
      original = classDefinition.original;
    }
  }
  
  // Categorize and map properties by their groups
  const typographyProps = mapTypographyProperties(original);
  const backgroundProps = mapBackgroundProperties(original);
  const borderProps = mapBorderProperties(original);
  const paddingProps = mapPaddingProperties(original);
  const marginProps = mapMarginProperties(original);
  const layoutProps = mapLayoutProperties(original);
  
  // Add non-empty property groups to the settings
  if (Object.keys(typographyProps).length > 0) {
    settings._typography = typographyProps;
  }
  
  if (Object.keys(backgroundProps).length > 0) {
    settings._background = backgroundProps;
  }
  
  if (Object.keys(borderProps).length > 0) {
    settings._border = borderProps;
  }
  
  if (Object.keys(paddingProps).length > 0) {
    settings._spacing = {
      ...settings._spacing,
      ...paddingProps
    };
  }
  
  if (Object.keys(marginProps).length > 0) {
    settings._spacing = {
      ...settings._spacing,
      ...marginProps
    };
  }
  
  if (Object.keys(layoutProps).length > 0) {
    settings._layout = layoutProps;
  }
  
  return settings;
}

/**
 * Parses a class name to determine its style settings
 * @param {string} className - The class name to parse
 * @param {Object|null} classDefinition - Optional class definition from Oxygen
 * @returns {Object} - Style settings for the class
 */
function parseClassStyle(className, classDefinition = null) {
  // If we have a class definition with styles, use it
  if (classDefinition) {
    return processClassDefinition(classDefinition);
  }
  
  // Otherwise, try to detect from class name patterns
  // Check for common patterns like bg-color, text-color, etc.
  for (const [prefix, config] of Object.entries(CSS_PROPERTY_PATTERNS)) {
    // Check for prefix-value patterns (e.g., bg-red, text-blue)
    if (className.startsWith(`${prefix}-`)) {
      const value = className.substring(prefix.length + 1);
      
      // Handle direct value mapping
      if (config.valueMap && config.valueMap[value]) {
        return {
          [config.property]: config.valueMap[value]
        };
      }
      
      // Handle regex pattern matching
      if (config.valuePattern && config.valueTransform) {
        const match = className.match(config.valuePattern);
        if (match) {
          return {
            [config.property]: config.valueTransform(match)
          };
        }
      }
    }
  }
  
  // Check for utility classes based on common frameworks
  const commonUtilityMappings = {
    // Display properties
    'flex': { _layout: { display: 'flex' } },
    'grid': { _layout: { display: 'grid' } },
    'block': { _layout: { display: 'block' } },
    'inline': { _layout: { display: 'inline' } },
    'inline-block': { _layout: { display: 'inline-block' } },
    'hidden': { _layout: { display: 'none' } },
    
    // Common text utilities
    'uppercase': { _typography: { 'text-transform': 'uppercase' } },
    'lowercase': { _typography: { 'text-transform': 'lowercase' } },
    'capitalize': { _typography: { 'text-transform': 'capitalize' } },
    'underline': { _typography: { 'text-decoration': 'underline' } },
    'no-underline': { _typography: { 'text-decoration': 'none' } },
    'line-through': { _typography: { 'text-decoration': 'line-through' } },
    
    // Position utilities
    'relative': { _layout: { position: 'relative' } },
    'absolute': { _layout: { position: 'absolute' } },
    'fixed': { _layout: { position: 'fixed' } },
    'sticky': { _layout: { position: 'sticky' } },
    'static': { _layout: { position: 'static' } },
  };
  
  if (commonUtilityMappings[className]) {
    return commonUtilityMappings[className];
  }
  
  // For classes we can't automatically parse, return a default empty setting
  return {}; 
}

/**
 * Creates a global class object for Bricks
 * @param {string} className - The class name
 * @param {Object|null} classDefinition - Optional class definition from Oxygen
 * @returns {Object} - A global class object for Bricks
 */
function createGlobalClass(className, classDefinition = null) {
  const id = generateId();
  const settings = parseClassStyle(className, classDefinition);
  
  return {
    id,
    name: className,
    settings
  };
}

export { 
  parseClassStyle, 
  createGlobalClass
};

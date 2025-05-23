/**
 * Oxygen to Bricks Converter - Class Utilities
 * Utilities for handling class conversion and management
 */

import { generateId } from './generators.js';
import { transformClassSettings } from '../transformers/settings.js';
import { TYPOGRAPHY_PATTERNS } from '../mappings/typography.js';
import { BACKGROUND_PATTERNS } from '../mappings/backgrounds.js';
import { BORDER_PATTERNS } from '../mappings/borders.js';
import { SPACING_PATTERNS } from '../mappings/spacing.js';

// Combine all property patterns
const CSS_PROPERTY_PATTERNS = {
  ...TYPOGRAPHY_PATTERNS,
  ...BACKGROUND_PATTERNS,
  ...BORDER_PATTERNS,
  ...SPACING_PATTERNS,
};

/**
 * Parses a class name to determine its style settings
 * @param {string} className - The class name to parse
 * @param {Object|null} classDefinition - Optional class definition from Oxygen
 * @returns {Object} - Style settings for the class
 */
function parseClassStyle(className, classDefinition = null) {
  // If we have a class definition with styles, use the new transformer
  if (classDefinition) {
    return transformClassSettings(classDefinition);
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

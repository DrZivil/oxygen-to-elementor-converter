/**
 * Oxygen to Bricks Converter - Element Mappings
 * Maps Oxygen element types to Bricks element types
 */

import { ELEMENT_MAPPING } from '../config/constants.js';

/**
 * Maps an Oxygen element name to its Bricks equivalent
 * @param {string} oxygenElementName - The Oxygen element type name
 * @returns {string} - The corresponding Bricks element type name
 */
function mapElementType(oxygenElementName, nodeOptions = {}, classDefinitions = []) {
  const allStyles = { ...(nodeOptions.original || {}) };

  console.log(oxygenElementName);

  // Merge in styles from class definitions
  for (const classDef of classDefinitions) {
    if (classDef?.original && typeof classDef.original === 'object') {
      Object.assign(allStyles, classDef.original);
    }
  }

  // If flex/grid detected, force container type
  if(oxygenElementName === "ct_section" || oxygenElementName === "ct_div_block") {
    if (allStyles["display"] === "flex" || allStyles["display"] === "grid") {
      return "container";
    }
  }

  return ELEMENT_MAPPING[oxygenElementName] || "div";
}

export { mapElementType };
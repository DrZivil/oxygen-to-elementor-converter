/**
 * Oxygen to Elementor Converter - Tree Transformer
 * Handles the transformation of Oxygen element tree to Elementor format
 */

import { mapOxygenToElementorElementType } from '../mappings/elementorElements.js';
import { transformOxygenToElementorSettings } from '../mappings/elementorSettings.js';
import { generateId } from '../utils/generators.js';
// import { createGlobalClass } from '../utils/classes.js'; // Removed as Elementor class handling is different
import { APP_INFO } from '../config/constants.js'; // May be used for some metadata if needed, or removed later

/**
 * Converts an Oxygen tree node to Elementor format.
 * @param {Object} oxygenNode - Oxygen node.
 * @param {string} parentId - Parent ID in Elementor tree.
 * @param {Map} idMap - Map of Oxygen IDs to Elementor IDs.
 * @param {Array} globalClasses - Array of global classes (currently unused for Elementor, kept for potential future use with oxygenRootClasses).
 * @param {Object} oxygenRootClasses - Root-level class definitions from Oxygen.
 * @returns {Object|null} - Converted Elementor node, or null if node is invalid.
 */
function convertOxygenToElementorTree(oxygenNode, parentId = "0", idMap = new Map(), globalClasses = [], oxygenRootClasses = {}) {
  if (!oxygenNode || !oxygenNode.name) {
    // console.warn('Skipping invalid Oxygen node:', oxygenNode);
    return null;
  }

  const oxygenNodeId = oxygenNode.id || generateId(); // Ensure Oxygen node has an ID for mapping, even if temporary
  const elementorId = generateId();
  idMap.set(oxygenNodeId, elementorId);

  // classDefs can be used by mapOxygenToElementorElementType or transformOxygenToElementorSettings if needed in future for complex logic.
  const nodeClasses = oxygenNode.options?.classes || [];
  const classDefs = nodeClasses.map(cls => oxygenRootClasses[cls]).filter(Boolean);

  const elementTypeInfo = mapOxygenToElementorElementType(oxygenNode.name, oxygenNode.options, classDefs);
  const elementSettings = transformOxygenToElementorSettings(oxygenNode, oxygenRootClasses, elementTypeInfo.widgetType);

  const elementorNode = {
    id: elementorId,
    elType: elementTypeInfo.elType,
    isInner: parentId !== "0",
    settings: { ...elementTypeInfo.settings, ...elementSettings },
    elements: [] // Children will be pushed here
  };

  if (elementorNode.elType === 'widget') {
    elementorNode.widgetType = elementTypeInfo.widgetType;
  }

  // Set element label (navigator name) if available
  if (oxygenNode.options?.nicename) {
    elementorNode.settings._element_name = oxygenNode.options.nicename;
  }

  // Process children recursively
  for (const child of oxygenNode.children ?? []) {
    const childElement = convertOxygenToElementorTree(child, elementorNode.id, idMap, globalClasses, oxygenRootClasses);
    if (childElement) {
      elementorNode.elements.push(childElement);
    }
  }

  return elementorNode;
}

/**
 * Builds the final Elementor JSON structure from an Oxygen JSON export.
 * @param {Object} oxygenRootJson - Oxygen root JSON object.
 * @returns {Array} - Elementor content array.
 */
function buildElementorJson(oxygenRootJson) {
  const content = [];
  const idMap = new Map();
  // globalClasses array is not used for Elementor's direct output structure.
  // const globalClasses = []; 

  // Check if oxygenRootJson has a "component" property, use that as the root if it exists
  const actualRoot = oxygenRootJson.component || oxygenRootJson;
  
  // Extract classes from the root level of Oxygen JSON
  const oxygenRootClasses = oxygenRootJson.classes || {};
  
  // If actualRoot itself is an array of elements (e.g. multiple sections at root)
  if (Array.isArray(actualRoot)) {
      for (const rootChild of actualRoot) {
          const elementorElement = convertOxygenToElementorTree(rootChild, "0", idMap, [], oxygenRootClasses);
          if (elementorElement) {
            content.push(elementorElement);
          }
      }
  } 
  // If actualRoot has children (standard Oxygen structure for a single page/component export)
  else if (actualRoot?.children && Array.isArray(actualRoot.children)) {
    for (const rootChild of actualRoot.children) {
      const elementorElement = convertOxygenToElementorTree(rootChild, "0", idMap, [], oxygenRootClasses);
      if (elementorElement) {
        content.push(elementorElement);
      }
    }
  } 
  // If actualRoot itself is a single convertible element (e.g. a single section without a top-level 'component' wrapper)
  else if (actualRoot && actualRoot.name) { 
    const elementorElement = convertOxygenToElementorTree(actualRoot, "0", idMap, [], oxygenRootClasses);
    if (elementorElement) {
      content.push(elementorElement);
    }
  } else {
    console.warn("Could not determine root elements from Oxygen JSON:", oxygenRootJson);
  }
  
  return content; // Elementor typically expects an array of elements for pasting.
}

export { convertOxygenToElementorTree, buildElementorJson };

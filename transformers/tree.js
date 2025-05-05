/**
 * Oxygen to Bricks Converter - Tree Transformer
 * Handles the transformation of Oxygen element tree to Bricks format
 */

import { mapElementType } from '../mappings/elements.js';
import { transformSettings } from './settings.js';
import { generateId } from '../utils/generators.js';
import { createGlobalClass } from '../utils/classes.js';
import { APP_INFO } from '../config/constants.js';

/**
 * Converts an Oxygen tree to Bricks format with class support
 * @param {Object} node - Oxygen node
 * @param {string} parentId - Parent ID in Bricks tree
 * @param {Array} bricks - Array of Bricks elements
 * @param {Map} idMap - Map of Oxygen IDs to Bricks IDs
 * @param {Map} classMap - Map of class names to class IDs
 * @param {Array} globalClasses - Array of global classes
 * @param {Object} rootClasses - Root-level class definitions
 * @returns {Object} - Converted Bricks node
 */
function convertTree(node, parentId = "0", bricks = [], idMap = new Map(), classMap = new Map(), globalClasses = [], rootClasses = {}) {
  const id = generateId();
  idMap.set(node.id, id);

  const nodeClasses = node.options?.classes || [];
  const classDefs = nodeClasses.map(cls => rootClasses[cls]).filter(Boolean);

  const children = [];
  const bricksNode = {
    id,
    name: mapElementType(node.name, node.options, classDefs),
    parent: parentId,
    children,
    settings: transformSettings(node, rootClasses)
  };

  // Handle classes from Oxygen element
  if (node.options?.classes) {
    // Handle classes array format
    if (Array.isArray(node.options.classes) && node.options.classes.length > 0) {
      const classIds = [];
      
      // Process each class
      for (const className of node.options.classes) {
        // Check if we've already processed this class name
        if (!classMap.has(className)) {
          // Get class definition from root classes if available
          const classDefinition = rootClasses[className] || null;
          
          // Create a global class with the definition
          const globalClass = createGlobalClass(className, classDefinition);
          globalClasses.push(globalClass);
          classMap.set(className, globalClass.id);
        }
        
        // Add this class ID to the element
        classIds.push(classMap.get(className));
      }
      
      // Add the class IDs to the element's settings
      if (classIds.length > 0) {
        bricksNode.settings._cssGlobalClasses = classIds;
      }
    }
    // Handle object format (legacy or non-standard)
    else if (typeof node.options.classes === 'object' && !Array.isArray(node.options.classes)) {
      const classIds = [];
      
      for (const [className, classValue] of Object.entries(node.options.classes)) {
        // Skip if not a proper class reference
        if (!className || typeof classValue !== 'object') continue;
        
        // Check if we've already processed this class name
        if (!classMap.has(className)) {
          // Create a global class
          const globalClass = createGlobalClass(className, classValue);
          globalClasses.push(globalClass);
          classMap.set(className, globalClass.id);
        }
        
        // Add this class ID to the element
        classIds.push(classMap.get(className));
      }
      
      // Add the class IDs to the element's settings
      if (classIds.length > 0) {
        bricksNode.settings._cssGlobalClasses = classIds;
      }
    }
  }

  // Set element label if available
  if (node.options?.nicename) {
    bricksNode.label = node.options.nicename;
  }

  bricks.push(bricksNode);

  // Process children recursively
  for (const child of node.children ?? []) {
    const result = convertTree(child, id, bricks, idMap, classMap, globalClasses, rootClasses);
    children.push(result.id);
  }

  return bricksNode;
}

/**
 * Builds the final Bricks JSON structure with global classes
 * @param {Object} root - Oxygen root node
 * @returns {Object} - Complete Bricks JSON
 */
function buildBricksJson(root) {
  const content = [];
  const globalClasses = [];
  const idMap = new Map();
  const classMap = new Map();
  
  // Check if root has a "component" property, use that as the root if it exists
  const actualRoot = root.component || root;
  
  // Extract classes from the root level
  const rootClasses = root.classes || {};
  
  // Process classes from the root level first
  for (const [className, classDef] of Object.entries(rootClasses)) {
    const globalClass = createGlobalClass(className, classDef);
    globalClasses.push(globalClass);
    classMap.set(className, globalClass.id);
  }
  
  // Convert the tree to Bricks format
  convertTree(actualRoot, "0", content, idMap, classMap, globalClasses, rootClasses);
  
  return {
    content,
    source: "bricksCopiedElements",
    sourceUrl: APP_INFO.sourceUrl,
    version: APP_INFO.bricksVersion,
    globalClasses,
    globalElements: []
  };
}

export { convertTree, buildBricksJson };

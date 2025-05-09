/**
 * Oxygen to Bricks Converter - Settings Transformer
 * Handles the transformation of Oxygen settings to Bricks format
 * Fixed version that avoids duplicating class styles
 */

import { STYLE_GROUPS } from '../config/propertyGroups.js';
import { mapTypographyProperties } from '../mappings/typography.js';
import { mapBackgroundProperties } from '../mappings/backgrounds.js';
import { mapBorderProperties } from '../mappings/borders.js';
import { mapPaddingProperties, mapMarginProperties } from '../mappings/spacing.js';
import { mapLayoutProperties } from '../mappings/layout.js';
import { mapGridProperties, mapToBricksUIProps } from '../mappings/bricksLayoutUI.js';

/**
 * Extracts only the inline styles from a node, excluding styles from classes
 * @param {Object} nodeStyles - Direct inline styles from the element
 * @param {Object} classStyles - Merged styles from all classes
 * @returns {Object} - Only the styles that are truly inline (not from classes)
 */
function extractInlineOnlyStyles(nodeStyles, classStyles) {
  const inlineOnly = {};
  
  for (const [key, value] of Object.entries(nodeStyles)) {
    // Only include if the value is different from class styles or not in class styles
    if (!classStyles.hasOwnProperty(key) || classStyles[key] !== value) {
      inlineOnly[key] = value;
    }
  }
  
  return inlineOnly;
}

/**
 * Transforms Oxygen settings to Bricks settings, excluding class styles
 * @param {Object} node - Oxygen node with options
 * @param {Object} rootClasses - Global class definitions
 * @returns {Object} - Bricks settings object with only inline styles
 */
function transformSettings(node, rootClasses = {}) {
  const opts = node.options ?? {};
  let nodeStyles = {};

  // Get inline styles from the node
  if (opts.original) {
    if (Array.isArray(opts.original)) {
      nodeStyles = { ...opts };
      delete nodeStyles.original;
      delete nodeStyles.ct_content;
      delete nodeStyles.classes;
      delete nodeStyles.activeselector;
      delete nodeStyles.selector;
      delete nodeStyles.ct_id;
      delete nodeStyles.ct_parent;
      delete nodeStyles.nicename;
      delete nodeStyles.media;
    } else {
      nodeStyles = opts.original;
    }
  }

  // Get styles from classes
  const classNames = Array.isArray(opts.classes) ? opts.classes : [];
  const classDefs = classNames
    .map(cls => rootClasses?.[cls])
    .filter(Boolean);

  let classStyles = {};
  for (const def of classDefs) {
    if (def?.original && typeof def.original === 'object') {
      classStyles = { ...classStyles, ...def.original };
    }
  }

  // Extract only the inline styles (excluding class styles)
  const inlineOnly = extractInlineOnlyStyles(nodeStyles, classStyles);

  const settings = {};

  // Handle text content
  if (opts.ct_content) {
    settings.text = opts.ct_content;
  }

  // Handle code content
  if (node.name === "ct_code_block" && inlineOnly["code-php"]) {
    settings.text = inlineOnly["code-php"];
  }

  // Typography - only include if there are inline overrides
  const typographyProps = mapTypographyProperties(inlineOnly);
  if (Object.keys(typographyProps).length > 0) {
    settings._typography = typographyProps;
  }

  // Background - only include if there are inline overrides
  const backgroundProps = mapBackgroundProperties(inlineOnly);
  if (Object.keys(backgroundProps).length > 0) {
    settings._background = backgroundProps;
  }

  // Border - only include if there are inline overrides
  const borderProps = mapBorderProperties(inlineOnly);
  if (Object.keys(borderProps).length > 0) {
    settings._border = borderProps;
  }

  // Spacing - only include if there are inline overrides
  const paddingProps = mapPaddingProperties(inlineOnly);
  if (Object.keys(paddingProps).length > 0) {
    settings._padding = paddingProps;
  }

  const marginProps = mapMarginProperties(inlineOnly);
  if (Object.keys(marginProps).length > 0) {
    settings._margin = marginProps;
  }

  // Layout - only include if there are inline overrides
  const layoutProps = mapLayoutProperties(inlineOnly);
  if (Object.keys(layoutProps).length > 0) {
    settings._layout = layoutProps;

    // Bricks-native layout UI props
    const uiProps = mapToBricksUIProps(layoutProps);
    Object.assign(settings, uiProps);
  }

  // Grid properties - only if display is grid and there are inline overrides
  if (inlineOnly["display"] === "grid") {
    const gridUI = mapGridProperties(inlineOnly);
    Object.assign(settings, gridUI);
  }

  return settings;
}

/**
 * Transforms class definition styles to Bricks global class format
 * @param {Object} classDefinition - Oxygen class definition
 * @returns {Object} - Bricks global class settings
 */
function transformClassSettings(classDefinition) {
  if (!classDefinition?.original) return {};

  const original = classDefinition.original;
  const settings = {};

  // Typography
  const typographyProps = mapTypographyProperties(original);
  if (Object.keys(typographyProps).length > 0) {
    settings._typography = typographyProps;
  }

  // Background
  const backgroundProps = mapBackgroundProperties(original);
  if (Object.keys(backgroundProps).length > 0) {
    settings._background = backgroundProps;
  }

  // Border
  const borderProps = mapBorderProperties(original);
  if (Object.keys(borderProps).length > 0) {
    settings._border = borderProps;
  }

  // Spacing - only include if there are inline overrides
  const paddingProps = mapPaddingProperties(original);
  if (Object.keys(paddingProps).length > 0) {
    settings._padding = paddingProps;
  }

  const marginProps = mapMarginProperties(original);
  if (Object.keys(marginProps).length > 0) {
    settings._margin = marginProps;
  }

  // Layout
  const layoutProps = mapLayoutProperties(original);
  if (Object.keys(layoutProps).length > 0) {
    settings._layout = layoutProps;

    // Bricks-native layout UI props
    const uiProps = mapToBricksUIProps(layoutProps);
    Object.assign(settings, uiProps);
  }

  // Grid properties
  if (original["display"] === "grid") {
    const gridUI = mapGridProperties(original);
    Object.assign(settings, gridUI);
  }

  return settings;
}

export { transformSettings, transformClassSettings, extractInlineOnlyStyles };

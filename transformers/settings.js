/**
 * Oxygen to Bricks Converter - Settings Transformer
 * Handles the transformation of Oxygen settings to Bricks format
 */

import { STYLE_GROUPS } from '../config/propertyGroups.js';
import { mapTypographyProperties } from '../mappings/typography.js';
import { mapBackgroundProperties } from '../mappings/backgrounds.js';
import { mapBorderProperties } from '../mappings/borders.js';
import { mapPaddingProperties, mapMarginProperties } from '../mappings/spacing.js';
import { mapLayoutProperties } from '../mappings/layout.js';
import { mapToBricksUIProps } from '../mappings/bricksLayoutUI.js';

/**
 * Maps Oxygen styles to Bricks style groups
 * @param {Object} original - Original Oxygen properties
 * @returns {Object} - Properties organized by Bricks style groups
 */
function mapStyleToGroups(original = {}) {
  const settings = {};

  // Map properties to their respective groups
  for (const [group, keys] of Object.entries(STYLE_GROUPS)) {
    for (const key of keys) {
      if (original[key] != null) {
        settings[group] ??= {};
        settings[group][key] = original[key];
      }
    }
  }

  // Handle color fields as Bricks expects them
  if (original["color"]?.startsWith("#")) {
    settings._typography ??= {};
    settings._typography.color = { hex: original["color"] };
  }

  if (original["background-color"]?.startsWith("#")) {
    settings._background ??= {};
    settings._background.color = { hex: original["background-color"] };
  }

  return settings;
}

/**
 * Transforms Oxygen settings to Bricks settings with more accurate property mapping
 * @param {Object} node - Oxygen node with options
 * @returns {Object} - Bricks settings object
 */
function transformSettings(node, rootClasses = {}) {
  const opts = node.options ?? {};
  let nodeStyles = {};

  // Determine inline styles from Oxygen node
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

  // Merge styles from class definitions
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

  // Final merged style object (node wins over class styles)
  const merged = { ...classStyles, ...nodeStyles };

  const settings = {};

  // Handle text content
  if (opts.ct_content) {
    settings.text = opts.ct_content;
  }

  // Handle code content
  if (node.name === "ct_code_block" && merged["code-php"]) {
    settings.text = merged["code-php"];
  }

  // Typography
  const typographyProps = mapTypographyProperties(merged);
  if (Object.keys(typographyProps).length > 0) {
    settings._typography = typographyProps;
  }

  // Background
  const backgroundProps = mapBackgroundProperties(merged);
  if (Object.keys(backgroundProps).length > 0) {
    settings._background = backgroundProps;
  }

  // Border
  const borderProps = mapBorderProperties(merged);
  if (Object.keys(borderProps).length > 0) {
    settings._border = borderProps;
  }

  // Spacing
  const paddingProps = mapPaddingProperties(merged);
  const marginProps = mapMarginProperties(merged);
  if (Object.keys(paddingProps).length > 0 || Object.keys(marginProps).length > 0) {
    settings._spacing = {
      ...paddingProps,
      ...marginProps
    };
  }

  // Layout
  const layoutProps = mapLayoutProperties(merged);
  console.log("Layout props", layoutProps);
  if (Object.keys(layoutProps).length > 0) {
    settings._layout = layoutProps;


    // Bricks-native layout UI props
    const uiProps = mapToBricksUIProps(layoutProps);
    Object.assign(settings, uiProps);
  }

  return settings;
}

export { mapStyleToGroups, transformSettings };

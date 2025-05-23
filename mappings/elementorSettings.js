// Helper functions (to be implemented or imported)
function getUnit(valueWithUnit, defaultValue = 'px') {
  if (typeof valueWithUnit !== 'string') return defaultValue;
  const match = valueWithUnit.match(/[a-zA-Z%]+/);
  return match ? match[0] : defaultValue;
}

function getValue(valueWithUnit, defaultValue = 0) {
  if (typeof valueWithUnit === 'number') return valueWithUnit;
  if (typeof valueWithUnit !== 'string') return defaultValue;
  const match = valueWithUnit.match(/-?\d*\.?\d+/);
  return match ? parseFloat(match[0]) : defaultValue;
}

function parseFourValueShorthand(value) {
    if (!value) return { top: '', right: '', bottom: '', left: '', isLinked: true };
    const parts = String(value).trim().split(/\s+/);
    let top, right, bottom, left;
    const unit = getUnit(parts[0] || '0px'); // Assume all have same unit or parse individually

    if (parts.length === 1) {
        top = right = bottom = left = getValue(parts[0]);
    } else if (parts.length === 2) {
        top = bottom = getValue(parts[0]);
        right = left = getValue(parts[1]);
    } else if (parts.length === 3) {
        top = getValue(parts[0]);
        right = left = getValue(parts[1]);
        bottom = getValue(parts[2]);
    } else if (parts.length === 4) {
        top = getValue(parts[0]);
        right = getValue(parts[1]);
        bottom = getValue(parts[2]);
        left = getValue(parts[3]);
    } else {
        return { unit, top: '', right: '', bottom: '', left: '', isLinked: true };
    }
    const isLinked = (top === right && top === bottom && top === left);
    return { unit, top, right, bottom, left, isLinked };
}


/**
 * Transforms Oxygen node options and class styles into Elementor settings.
 *
 * @param {object} oxygenNode - The Oxygen node.
 * @param {object} oxygenRootClasses - Definitions of Oxygen classes.
 * @param {string} elementorWidgetType - The determined Elementor widget type (e.g., 'heading', 'text-editor').
 * @return {object} Elementor settings object.
 */
function transformOxygenToElementorSettings(oxygenNode, oxygenRootClasses, elementorWidgetType) {
  const settings = {};
  const styles = { ...oxygenNode.options?.original }; // Start with inline styles

  // TODO: Incorporate styles from classes in oxygenRootClasses (similar to Bricks version)

  // Content
  if (oxygenNode.options?.ct_content) {
    if (elementorWidgetType === 'heading') {
      settings.title = oxygenNode.options.ct_content;
    } else if (elementorWidgetType === 'text-editor') {
      settings.editor = oxygenNode.options.ct_content; // Elementor uses 'editor' for rich text
    } else if (elementorWidgetType === 'button') {
      settings.text = oxygenNode.options.ct_content;
    }
  }
  if (styles.src && elementorWidgetType === 'image') {
    settings.image = { url: styles.src, id: '' }; // TODO: Potentially get ID if available
  }
  if (styles.href) { // For buttons or text links
    settings.link = { url: styles.href, is_external: '', nofollow: '' }; // TODO: Determine is_external, nofollow
  }

  // Typography
  if (styles.color) settings.text_color = styles.color;
  if (styles['font-family']) settings.typography_font_family = styles['font-family'];
  if (styles['font-size']) {
    settings.typography_font_size = {
      unit: getUnit(styles['font-size'], 'px'),
      size: getValue(styles['font-size']),
      sizes: [],
    };
  }
  if (styles['font-weight']) settings.typography_font_weight = styles['font-weight'];
  if (styles['text-align']) settings.align = styles['text-align']; // Common for widgets like heading, text-editor
  if (styles['line-height']) {
    settings.typography_line_height = {
      unit: getUnit(styles['line-height'], 'em'),
      size: getValue(styles['line-height']),
      sizes: [],
    };
  }
  if (styles['letter-spacing']) {
    settings.typography_letter_spacing = {
      unit: getUnit(styles['letter-spacing'], 'px'),
      size: getValue(styles['letter-spacing']),
      sizes: [],
    };
  }
  if (styles['text-transform']) settings.typography_text_transform = styles['text-transform'];
  if (styles['font-style']) settings.typography_font_style = styles['font-style'];


  // Layout & Dimensions (Advanced Tab - often prefixed with _)
  const padding = {
    unit: 'px',
    top: getValue(styles['padding-top'], ''),
    right: getValue(styles['padding-right'], ''),
    bottom: getValue(styles['padding-bottom'], ''),
    left: getValue(styles['padding-left'], ''),
    isLinked: false, // TODO: Determine if linked
  };
  if (padding.top || padding.right || padding.bottom || padding.left) {
    settings._padding = padding;
  }

  const margin = {
    unit: 'px',
    top: getValue(styles['margin-top'], ''),
    right: getValue(styles['margin-right'], ''),
    bottom: getValue(styles['margin-bottom'], ''),
    left: getValue(styles['margin-left'], ''),
    isLinked: false, // TODO: Determine if linked
  };
  if (margin.top || margin.right || margin.bottom || margin.left) {
    settings._margin = margin;
  }

  if (styles.width) {
    settings._width = { // Or custom_width, depends on element
      unit: getUnit(styles.width, '%'),
      size: getValue(styles.width),
      sizes: [],
    };
  }
  if (styles.height) {
    settings._height = { // Or custom_height
      unit: getUnit(styles.height, 'px'),
      size: getValue(styles.height),
      sizes: [],
    };
  }

  // Background (Advanced Tab)
  if (styles['background-color']) settings.background_background = 'classic'; // Required to show color picker
  if (styles['background-color']) settings.background_color = styles['background-color'];
  if (styles['background-image'] && styles['background-image'] !== 'none') {
    settings.background_background = 'classic'; // Required to show image settings
    settings.background_image = { url: styles['background-image'].replace(/url\(['"]?(.*?)['"]?\)/, '$1'), id: '' };
  }
  if (styles['background-size']) settings.background_size = styles['background-size'];
  if (styles['background-position']) settings.background_position = styles['background-position'];
  if (styles['background-repeat']) settings.background_repeat = styles['background-repeat'];

  // Border (Advanced Tab)
  if (styles['border-style'] || styles['border-top-style']) { // Assuming one style for all or top if specific
      settings.border_border = styles['border-style'] || styles['border-top-style']; // Elementor often uses a single value
  }

  const borderWidth = {
    unit: 'px',
    top: getValue(styles['border-top-width'], ''),
    right: getValue(styles['border-right-width'], ''),
    bottom: getValue(styles['border-bottom-width'], ''),
    left: getValue(styles['border-left-width'], ''),
    isLinked: false, // TODO: Determine if linked
  };
  if (styles['border-width'] && !borderWidth.top && !borderWidth.right && !borderWidth.bottom && !borderWidth.left) {
      const parsedShorthand = parseFourValueShorthand(styles['border-width']);
      borderWidth.top = parsedShorthand.top;
      borderWidth.right = parsedShorthand.right;
      borderWidth.bottom = parsedShorthand.bottom;
      borderWidth.left = parsedShorthand.left;
      borderWidth.isLinked = parsedShorthand.isLinked;
      borderWidth.unit = parsedShorthand.unit;
  }
  if (borderWidth.top || borderWidth.right || borderWidth.bottom || borderWidth.left) {
    settings.border_width = borderWidth;
  }

  if (styles['border-color'] || styles['border-top-color']) {
    settings.border_color = styles['border-color'] || styles['border-top-color'];
  }

  if (styles['border-radius']) {
    const br = parseFourValueShorthand(styles['border-radius']);
    settings.border_radius = {
        unit: br.unit,
        top: br.top,
        right: br.right,
        bottom: br.bottom,
        left: br.left,
        isLinked: br.isLinked
    };
  }

  return settings;
}

export { transformOxygenToElementorSettings };

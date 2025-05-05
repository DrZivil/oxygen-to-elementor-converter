/**
 * Oxygen to Bricks Converter - Constants
 * Defines core configuration constants for the converter
 */

// App information
const APP_INFO = {
  name: 'Oxygen to Bricks Converter',
  version: '1.0.0',
  bricksVersion: '1.12.3',
  sourceUrl: 'https://yourdomain.dev',
};

// Element mapping from Oxygen to Bricks
const ELEMENT_MAPPING = {
  ct_div_block: "div",
  ct_section: "section",
  ct_headline: "heading",
  ct_text_block: "text-basic",
  ct_button: "button",
  ct_fancy_icon: "icon",
  ct_image: "image",
  ct_code_block: "code",
  oxy_rich_text: "text"
};

// Export constants
export {
  APP_INFO,
  ELEMENT_MAPPING
};

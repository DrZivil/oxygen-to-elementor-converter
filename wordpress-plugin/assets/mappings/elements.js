/**
 * Oxygen to Bricks Converter - Element Mapping
 * Maps Oxygen element types to Bricks element types
 */

// Element type mapping
const ELEMENT_MAP = {
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

/**
 * Maps an Oxygen element type to a Bricks element type
 * @param {string} type - Oxygen element type
 * @param {Object} options - Oxygen element options
 * @param {Array} classes - Class definitions that apply to this element
 * @returns {string} - Corresponding Bricks element type
 */
function mapElementType(type, options = {}, classes = []) {
  return ELEMENT_MAP[type] || "div";
}

export { mapElementType, ELEMENT_MAP };

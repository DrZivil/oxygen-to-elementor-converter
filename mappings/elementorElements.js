/**
 * Maps Oxygen component names to Elementor element types.
 *
 * @param {string} oxygenElementName - The name of the Oxygen element.
 * @param {object} oxygenNodeOptions - The options of the Oxygen node.
 * @param {object} oxygenClassDefs - Definitions of Oxygen classes.
 * @return {object} Elementor element type and settings.
 */
function mapOxygenToElementorElementType(oxygenElementName, oxygenNodeOptions, oxygenClassDefs) {
  switch (oxygenElementName) {
    case 'ct_section':
      return { elType: 'container', settings: { html_tag: 'section' } };
    case 'ct_div_block':
      // Further checks for display:flex or grid can be added later
      return { elType: 'container', settings: { html_tag: 'div' } };
    case 'oxy_rich_text':
      return { elType: 'widget', widgetType: 'text-editor' };
    case 'ct_headline':
      return { elType: 'widget', widgetType: 'heading' };
    case 'ct_image':
      return { elType: 'widget', widgetType: 'image' };
    case 'ct_button':
      return { elType: 'widget', widgetType: 'button' };
    case 'ct_link_text':
      return { elType: 'widget', widgetType: 'text-editor' }; // Or a more specific link widget if available
    case 'ct_span':
      return { elType: 'container', settings: { html_tag: 'span' } }; // Elementor might treat spans as text/html widgets too
    case 'ct_code_block':
      return { elType: 'widget', widgetType: 'html' }; // Or 'code' if a specific code widget exists
    default:
      return { elType: 'container' }; // Default fallback
  }
}

export { mapOxygenToElementorElementType };

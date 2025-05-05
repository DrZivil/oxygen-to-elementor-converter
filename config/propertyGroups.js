/**
 * Oxygen to Bricks Converter - Property Groups
 * Defines style groups and their respective properties
 */

// Style group definitions for Bricks format
const STYLE_GROUPS = {
  _typography: [
    "font-size", "font-family", "font-weight", "line-height", "text-align",
    "text-decoration", "letter-spacing", "text-transform", "font-style",
    "color"
  ],
  _background: [
    "background-color", "background-image", "background-position",
    "background-repeat", "background-size", "background-attachment"
  ],
  _border: [
    "border-width", "border-top-width", "border-bottom-width",
    "border-left-width", "border-right-width", "border-color",
    "border-top-left-radius", "border-top-right-radius",
    "border-bottom-left-radius", "border-bottom-right-radius",
    "border-radius", "border-style"
  ],
  _spacing: [
    "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
    "margin", "margin-top", "margin-right", "margin-bottom", "margin-left"
  ],
  _layout: [
    "display", "flex-direction", "flex-wrap", "justify-content", "align-items",
    "align-self", "flex-grow", "flex-shrink", "flex-basis", "width", "width-unit",
    "height", "height-unit", "position", "top", "right", "bottom", "left", "z-index"
  ]
};

export { STYLE_GROUPS };

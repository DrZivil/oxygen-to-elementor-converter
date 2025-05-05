const BRICKS_UI_LAYOUT_PROPS = {
  "display": "_display",
  "flex-direction": "_direction",
  "flex-wrap": "_flexWrap",
  "justify-content": "_justifyContent",
  "align-items": "_alignItems",
  "align-self": "_alignSelf",
  "flex-grow": "_flexGrow",
  "flex-shrink": "_flexShrink",
  "flex-basis": "_flexBasis",
  "order": "_order",
  "row-gap": "_rowGap",
  "column-gap": "_columnGap"
};

/**
 * Maps certain _layout props to Bricks-specific UI props
 * @param {Object} layout - _layout settings object
 * @returns {Object} - Bricks UI props like _direction, _rowGap, etc.
 */
function mapToBricksUIProps(layout = {}) {
  console.log("Mapping layout to Bricks UI props:", layout);
  const uiProps = {};
  for (const [cssProp, uiKey] of Object.entries(BRICKS_UI_LAYOUT_PROPS)) {
    if (layout[cssProp] !== undefined) {
      uiProps[uiKey] = layout[cssProp];
    }
  }
  return uiProps;
}

export { mapToBricksUIProps };

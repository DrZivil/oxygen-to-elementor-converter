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
  "column-gap": "_columnGap",
};

/**
 * Maps certain _layout props to Bricks-specific UI props
 * @param {Object} layout - _layout settings object
 * @returns {Object} - Bricks UI props like _direction, _rowGap, etc.
 */
function mapToBricksUIProps(layout = {}) {
  console.log("Mapping layout to Bricks UI props:", layout, layout["gap"]);
  const uiProps = {};
  for (const [cssProp, uiKey] of Object.entries(BRICKS_UI_LAYOUT_PROPS)) {
    if (layout[cssProp] !== undefined) {
      uiProps[uiKey] = layout[cssProp];
    }
  }

  // Handle generic "gap" and split into rowGap + columnGap
  if (layout["gap"] !== undefined) {
    uiProps["_rowGap"] = layout["gap"];
    uiProps["_columnGap"] = layout["gap"];
  }

  if (layout["grid-column-count"]) {
    uiProps["_gridTemplateColumns"] = layout["grid-column-count"];
  }
  if (layout["grid-column-gap"]) {
    uiProps["_columnGap"] = layout["grid-column-gap"];
    uiProps["_gridGap"] = layout["grid-column-gap"];
  }
  if (layout["grid-align-items"]) {
    uiProps["_alignItemsGrid"] = layout["grid-align-items"];
  }
  if (layout["grid-justify-items"]) {
    uiProps["_justifyItemsGrid"] = layout["grid-justify-items"];
  }

  if (layout["display"] === "grid") {
    uiProps["_display"] = "grid";
  }


  return uiProps;
}

function mapGridProperties(layout = {}) {
  const uiProps = {};

  if (layout.display === "grid") {
    uiProps._display = "grid";
    uiProps._gridAutoFlow = "column"; // Bricks default
  }

  if (
    layout["grid-column-max-width"] &&
    layout["grid-columns-auto-fit"] === false
  ) {
    uiProps._gridTemplateColumns = layout["grid-column-max-width"];
  }

  if (layout["grid-column-gap"]) {
    uiProps._columnGap = layout["grid-column-gap"];
    uiProps._gridGap = layout["grid-column-gap"];
  }

  if (layout["grid-row-gap"]) {
    uiProps._rowGap = layout["grid-row-gap"];
  }

  if (layout["grid-align-items"]) {
    uiProps._alignItemsGrid = layout["grid-align-items"];
  }

  if (layout["grid-justify-items"]) {
    uiProps._justifyItemsGrid = layout["grid-justify-items"];
  }

  if (layout["grid-row-behavior"] === "Explicit" && layout["grid-row-count"]) {
    uiProps._gridTemplateRows = layout["grid-row-count"];
  }

  return uiProps;
}

export { mapToBricksUIProps, mapGridProperties };
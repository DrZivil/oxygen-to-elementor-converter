export function applyUnits(properties) {
  const result = {};

  for (const [key, value] of Object.entries(properties)) {
    // Skip unit properties - we'll handle them alongside their base property
    if (key.endsWith('-unit')) continue;

    // Check if this property has a corresponding unit property
    const unitKey = `${key}-unit`;

    if (properties[unitKey] !== undefined) {
      // Special case for "auto"
      if (properties[unitKey] === "auto") {
        result[key] = "auto";
      } else {
        // Normal case - combine value with unit
        result[key] = `${value}${properties[unitKey]}`;
      }
    } else {
      // No unit - copy the value directly
      result[key] = value;
    }
  }

  return result;
}
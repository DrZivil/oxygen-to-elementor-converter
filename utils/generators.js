/**
 * Oxygen to Bricks Converter - Generator Utilities
 * Utility functions for generating IDs and handling common data operations
 */

/**
 * Generates a random ID string for Bricks elements
 * @returns {string} - A random alphanumeric ID (6 characters)
 */
function generateId() {
  return Math.random().toString(36).substring(2, 8);
}

/**
 * Safely returns a value or fallback if value is not a string or number
 * @param {any} val - The value to check
 * @param {string|number} fallback - Fallback value if val is invalid
 * @returns {string|number} - The original value or fallback
 */
function safeValue(val, fallback = "") {
  return (typeof val === "string" || typeof val === "number") ? val : fallback;
}

/**
 * Converts an object to a JSON string with proper formatting
 * @param {Object} obj - The object to stringify
 * @returns {string} - Formatted JSON string
 */
function formatJson(obj) {
  return JSON.stringify(obj, null, 2);
}

export { generateId, safeValue, formatJson };

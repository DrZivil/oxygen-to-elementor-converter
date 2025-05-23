/**
 * Oxygen to Elementor Converter - UI Handlers
 * Handles UI interactions and events
 */

import { buildElementorJson } from '../transformers/tree.js';
import { showNotification } from './notifications.js';
import { formatJson } from '../utils/generators.js';

/**
 * Initializes the current year in the footer
 */
function initializeFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Handles the convert button click
 * @param {Event} event - The click event
 */
function handleConvertClick(event) {
  const inputEl = document.getElementById("input");
  const outputEl = document.getElementById("output");
  
  try {
    const inputData = JSON.parse(inputEl.value);
    const elementorJsonArray = buildElementorJson(inputData); // Returns an array

    // Elementor JSON is an array of elements, no parent validation needed here in the same way as Bricks.
    // Elementor also doesn't have a separate globalClasses structure in the output JSON.
    // So, the class display logic is removed.
    const classListEl = document.getElementById("class-list");
    if (classListEl) {
        classListEl.innerHTML = "<p>Class styles from Oxygen are merged into Elementor element settings directly. There is no separate global class list in Elementor's JSON format.</p>";
    }
    
    outputEl.value = formatJson(elementorJsonArray);
    showNotification("Conversion to Elementor JSON successful!", "success");
  } catch (err) {
    showNotification("Invalid JSON or conversion error: " + err.message, "error");
  }
}

// The displayClassInfo function is no longer needed as Elementor conversion
// doesn't produce a separate globalClasses list in the same way Bricks does.
// Styles from Oxygen classes are intended to be merged into the Elementor elements directly.

/**
 * Handles the load example button click
 * @param {Event} event - The click event
 */
function handleLoadExampleClick(event) {
  fetch("example.json")
    .then(res => res.json())
    .then(json => {
      document.getElementById("input").value = formatJson(json);
      showNotification("Example loaded!", "success");
    })
    .catch(err => {
      showNotification("Error loading example: " + err.message, "error");
    });
}

/**
 * Handles the copy to clipboard button click
 * @param {Event} event - The click event
 */
function handleCopyClick(event) {
  const outputEl = document.getElementById("output");
  
  if (!outputEl.value) {
    showNotification("Nothing to copy", "warning");
    return;
  }
  
  navigator.clipboard.writeText(outputEl.value)
    .then(() => {
      showNotification("Copied to clipboard!", "success");
    })
    .catch(err => {
      showNotification("Failed to copy: " + err.message, "error");
    });
}

/**
 * Handles the download JSON button click
 * @param {Event} event - The click event
 */
function handleDownloadClick(event) {
  const outputEl = document.getElementById("output");
  
  if (!outputEl.value) {
    showNotification("Nothing to download", "warning");
    return;
  }
  
  const blob = new Blob([outputEl.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  
  a.href = url;
  a.download = "elementor-converted-" + new Date().getTime() + ".json";
  document.body.appendChild(a);
  a.click();
  
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
  
  showNotification("JSON downloaded!", "success");
}

/**
 * Sets up all UI event handlers
 */
function setupEventHandlers() {
  // Initialize current year in footer
  initializeFooterYear();
  
  // Handle convert button click
  document.getElementById("convert")?.addEventListener("click", handleConvertClick);
  
  // Handle load example button click
  document.getElementById("load-example")?.addEventListener("click", handleLoadExampleClick);
  
  // Handle copy to clipboard button click
  document.getElementById("copy")?.addEventListener("click", handleCopyClick);
  
  // Handle download JSON button click
  document.getElementById("download")?.addEventListener("click", handleDownloadClick);
}

export { setupEventHandlers };

/**
 * Oxygen to Bricks Converter - UI Handlers
 * Handles UI interactions and events
 */

import { buildBricksJson } from '../transformers/tree.js';
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
    const input = JSON.parse(inputEl.value);
    const bricksJson = buildBricksJson(input);

    // Validate parent references
    const allParentsValid = bricksJson.content.every(
      b => b.parent === "0" || bricksJson.content.some(p => p.id === b.parent)
    );

    if (!allParentsValid) {
      showNotification("⚠️ Some elements reference missing parents. Bricks structure tree may not work.", "warning");
    }

    // Check if classes were converted
    if (bricksJson.globalClasses.length > 0) {
      showNotification(`Converted ${bricksJson.globalClasses.length} classes`, "success");
      
      // Display class information
      displayClassInfo(bricksJson.globalClasses);
    } else {
      document.getElementById("class-list").innerHTML = "<p>No classes were found or converted.</p>";
    }
    
    outputEl.value = formatJson(bricksJson);
    showNotification("Conversion successful!", "success");
  } catch (err) {
    showNotification("Invalid JSON: " + err.message, "error");
  }
}

/**
 * Displays class information in the UI
 * @param {Array} globalClasses - Array of global classes
 */
function displayClassInfo(globalClasses) {
  const classListEl = document.getElementById("class-list");
  if (!classListEl) return;
  
  classListEl.innerHTML = "";
  
  // Create a table to display class information
  const table = document.createElement("table");
  table.className = "class-table";
  
  // Add header row
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Oxygen Class</th>
      <th>Bricks Class ID</th>
      <th>Properties</th>
    </tr>
  `;
  table.appendChild(thead);
  
  // Add rows for each converted class
  const tbody = document.createElement("tbody");
  globalClasses.forEach(cls => {
    const tr = document.createElement("tr");
    
    // Class name
    const tdName = document.createElement("td");
    tdName.textContent = cls.name;
    
    // Class ID
    const tdId = document.createElement("td");
    tdId.textContent = cls.id;
    
    // Class properties
    const tdProps = document.createElement("td");
    const props = Object.keys(cls.settings).map(key => {
      return `${key}: ${JSON.stringify(cls.settings[key]).substring(0, 30)}...`;
    }).join(", ") || "None";
    tdProps.textContent = props;
    
    tr.appendChild(tdName);
    tr.appendChild(tdId);
    tr.appendChild(tdProps);
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  classListEl.appendChild(table);
}

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
  a.download = "bricks-converted-" + new Date().getTime() + ".json";
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

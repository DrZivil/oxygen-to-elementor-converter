// Oxygen to Bricks Converter - Fixed for Oxygen 4.9 class structure

// Element type mapping
const map = {
  ct_div_block: "div",
  ct_section: "section",
  ct_headline: "heading",
  ct_text_block: "text-basic", // Fixed mapping to text-basic
  ct_button: "button",
  ct_fancy_icon: "icon",
  ct_image: "image",
  ct_code_block: "code",
  oxy_rich_text: "text"
};

// Common CSS property patterns for automatic class detection
const cssPropertyPatterns = {
  // Background colors
  bg: {
    property: "_background",
    valueMap: {
      red: { color: { hex: "#f44336" } },
      blue: { color: { hex: "#2196f3" } },
      green: { color: { hex: "#4caf50" } },
      yellow: { color: { hex: "#ffeb3b" } },
      purple: { color: { hex: "#9c27b0" } },
      orange: { color: { hex: "#ff9800" } },
      teal: { color: { hex: "#009688" } },
      cyan: { color: { hex: "#00bcd4" } },
      pink: { color: { hex: "#e91e63" } },
      indigo: { color: { hex: "#3f51b5" } },
      lime: { color: { hex: "#cddc39" } },
      gray: { color: { hex: "#9e9e9e" } },
      black: { color: { hex: "#000000" } },
      white: { color: { hex: "#ffffff" } },
      transparent: { color: { hex: "transparent" } }
    }
  },
  
  // Rest of property patterns...
  // (other CSS patterns not included for brevity)
};

// Helper functions
function genId() {
  return Math.random().toString(36).substring(2, 8);
}

function safe(val, fallback = "") {
  return typeof val === "string" || typeof val === "number" ? val : fallback;
}

// Maps Oxygen styles to Bricks style groups
function mapStyleToGroups(original = {}) {
  const styleGroups = {
    _typography: [
      "font-size", "font-family", "font-weight", "line-height", "text-align",
      "text-decoration", "letter-spacing"
    ],
    _background: [
      "background-color"
    ],
    _border: [
      "border-width", "border-top-width", "border-bottom-width",
      "border-left-width", "border-right-width",
      "border-top-left-radius", "border-top-right-radius",
      "border-bottom-left-radius", "border-bottom-right-radius"
    ],
    _spacing: [
      "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
      "margin", "margin-top", "margin-right", "margin-bottom", "margin-left"
    ],
    _layout: [
      "display", "flex-direction", "flex-wrap", "justify-content", "align-items",
      "align-self", "flex-grow", "flex-shrink", "flex-basis", "width", "width-unit",
      "height", "height-unit"
    ]
  };

  const settings = {};

  for (const [group, keys] of Object.entries(styleGroups)) {
    for (const key of keys) {
      if (original[key] != null) {
        settings[group] ??= {};
        settings[group][key] = original[key];
      }
    }
  }

  // Color fields as Bricks expects them
  if (original["color"]?.startsWith("#")) {
    settings._typography ??= {};
    settings._typography.color = { hex: original["color"] };
  }

  if (original["background-color"]?.startsWith("#")) {
    settings._background ??= {};
    settings._background.color = { hex: original["background-color"] };
  }

  return settings;
}

// Transform Oxygen settings to Bricks settings
function transformSettings(node) {
  const opts = node.options ?? {};
  const original = opts.original ?? {};
  const settings = {};

  // Handle text content
  if (opts.ct_content) {
    settings.text = opts.ct_content;
  }

  // Handle code content
  if (node.name === "ct_code_block" && original["code-php"]) {
    settings.text = original["code-php"];
  }

  const grouped = mapStyleToGroups(original);
  Object.assign(settings, grouped);

  return settings;
}

// Parse a class name to determine its style settings
function parseClassStyle(className, classDefinition) {
  // If we have a class definition with styles, use it
  if (classDefinition && classDefinition.original) {
    const settings = {};
    
    // Process background color
    if (classDefinition.original["background-color"]) {
      settings._background = settings._background || {};
      settings._background.color = { 
        hex: classDefinition.original["background-color"] 
      };
    }
    
    // Process other style properties
    // Add more property handling as needed
    
    return settings;
  }
  
  // Otherwise, try to detect from class name patterns
  // Check for common patterns like bg-color, text-color, etc.
  for (const [prefix, config] of Object.entries(cssPropertyPatterns)) {
    // Check for prefix-value patterns (e.g., bg-red, text-blue)
    if (className.startsWith(`${prefix}-`)) {
      const value = className.substring(prefix.length + 1);
      
      // Handle direct value mapping
      if (config.valueMap && config.valueMap[value]) {
        return {
          [config.property]: config.valueMap[value]
        };
      }
      
      // Handle regex pattern matching
      if (config.valuePattern && config.valueTransform) {
        const match = className.match(config.valuePattern);
        if (match) {
          return {
            [config.property]: config.valueTransform(match)
          };
        }
      }
    }
  }
  
  // Check for utility classes based on common frameworks
  const commonUtilityMappings = {
    // Display properties
    'flex': { _layout: { display: 'flex' } },
    'grid': { _layout: { display: 'grid' } },
    'block': { _layout: { display: 'block' } },
    'inline': { _layout: { display: 'inline' } },
    'inline-block': { _layout: { display: 'inline-block' } },
    'hidden': { _layout: { display: 'none' } },
    
    // Common text utilities
    'uppercase': { _typography: { 'text-transform': 'uppercase' } },
    'lowercase': { _typography: { 'text-transform': 'lowercase' } },
    'capitalize': { _typography: { 'text-transform': 'capitalize' } },
    'underline': { _typography: { 'text-decoration': 'underline' } },
    'no-underline': { _typography: { 'text-decoration': 'none' } },
    'line-through': { _typography: { 'text-decoration': 'line-through' } },
    
    // Position utilities
    'relative': { _layout: { position: 'relative' } },
    'absolute': { _layout: { position: 'absolute' } },
    'fixed': { _layout: { position: 'fixed' } },
    'sticky': { _layout: { position: 'sticky' } },
    'static': { _layout: { position: 'static' } },
  };
  
  if (commonUtilityMappings[className]) {
    return commonUtilityMappings[className];
  }
  
  // For classes we can't automatically parse, return a default empty setting
  return {}; 
}

// Create global class objects for Bricks with extended class definition support
function createGlobalClass(className, classDefinition = null) {
  const id = genId();
  const settings = parseClassStyle(className, classDefinition);
  
  return {
    id,
    name: className,
    settings
  };
}

// Convert Oxygen tree to Bricks format with class support
function convertTree(node, parentId = "0", bricks = [], idMap = new Map(), classMap = new Map(), globalClasses = [], rootClasses = {}) {
  const id = genId();
  idMap.set(node.id, id);

  const children = [];
  const bricksNode = {
    id,
    name: map[node.name] ?? "div",
    parent: parentId,
    children,
    settings: transformSettings(node)
  };

  // Handle classes from Oxygen element
  if (node.options?.classes && Array.isArray(node.options.classes) && node.options.classes.length > 0) {
    const classIds = [];
    
    // Process each class
    for (const className of node.options.classes) {
      // Check if we've already processed this class name
      if (!classMap.has(className)) {
        // Get class definition from root classes if available
        const classDefinition = rootClasses[className] || null;
        
        // Create a global class with the definition
        const globalClass = createGlobalClass(className, classDefinition);
        globalClasses.push(globalClass);
        classMap.set(className, globalClass.id);
      }
      
      // Add this class ID to the element
      classIds.push(classMap.get(className));
    }
    
    // Add the class IDs to the element's settings
    if (classIds.length > 0) {
      bricksNode.settings._cssGlobalClasses = classIds;
    }
  }

  // Set element label if available
  if (node.options?.nicename) {
    bricksNode.label = node.options.nicename;
  }

  bricks.push(bricksNode);

  // Process children recursively
  for (const child of node.children ?? []) {
    const result = convertTree(child, id, bricks, idMap, classMap, globalClasses, rootClasses);
    children.push(result.id);
  }

  return bricksNode;
}

// Build the final Bricks JSON with global classes
function buildBricksJson(root) {
  const content = [];
  const globalClasses = [];
  const idMap = new Map();
  const classMap = new Map();
  
  // Check if root has a "component" property, and use that as the root if it exists
  const actualRoot = root.component || root;
  
  // Extract classes from the root level
  const rootClasses = root.classes || {};
  
  // Process classes from the root level
  for (const [className, classDef] of Object.entries(rootClasses)) {
    const globalClass = createGlobalClass(className, classDef);
    globalClasses.push(globalClass);
    classMap.set(className, globalClass.id);
  }
  
  // Convert the tree to Bricks format
  convertTree(actualRoot, "0", content, idMap, classMap, globalClasses, rootClasses);
  
  return {
    content,
    source: "bricksCopiedElements",
    sourceUrl: "https://yourdomain.dev",
    version: "1.12.3",
    globalClasses,
    globalElements: []
  };
}

// UI Functions
document.addEventListener("DOMContentLoaded", function() {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Handle convert button click
  document.getElementById("convert").addEventListener("click", () => {
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
        const classListEl = document.getElementById("class-list");
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
        bricksJson.globalClasses.forEach(cls => {
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
      } else {
        document.getElementById("class-list").innerHTML = "<p>No classes were found or converted.</p>";
      }
      
      outputEl.value = JSON.stringify(bricksJson, null, 2);
      showNotification("Conversion successful!", "success");
    } catch (err) {
      showNotification("Invalid JSON: " + err.message, "error");
    }
  });

  // Handle load example button click
  document.getElementById("load-example").addEventListener("click", () => {
    fetch("example.json")
      .then(res => res.json())
      .then(json => {
        document.getElementById("input").value = JSON.stringify(json, null, 2);
        showNotification("Example loaded!", "success");
      })
      .catch(err => {
        showNotification("Error loading example: " + err.message, "error");
      });
  });

  // Handle copy to clipboard button click
  document.getElementById("copy").addEventListener("click", () => {
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
  });

  // Handle download JSON button click
  document.getElementById("download").addEventListener("click", () => {
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
  });
});

// Helper for showing notifications
function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification styles dynamically
const style = document.createElement("style");
style.textContent = `
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 6px;
    background-color: #333;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    transform: translateY(100px);
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
  }
  
  .notification.show {
    transform: translateY(0);
    opacity: 1;
  }
  
  .notification.success {
    background-color: #45B96F;
  }
  
  .notification.error {
    background-color: #E54D4D;
  }
  
  .notification.warning {
    background-color: #F7984B;
  }
`;
document.head.appendChild(style);

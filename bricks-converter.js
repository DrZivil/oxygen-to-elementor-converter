// Oxygen to Bricks Converter

// Element type mapping
const map = {
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
  
  // Text colors
  text: {
    property: "_typography",
    valueMap: {
      // Colors
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
      
      // Font sizes
      xs: { "font-size": "12px" },
      sm: { "font-size": "14px" },
      base: { "font-size": "16px" },
      lg: { "font-size": "18px" },
      xl: { "font-size": "20px" },
      "2xl": { "font-size": "24px" },
      "3xl": { "font-size": "30px" },
      "4xl": { "font-size": "36px" },
      "5xl": { "font-size": "48px" }
    }
  },
  
  // Text alignment
  align: {
    property: "_typography",
    valueMap: {
      left: { "text-align": "left" },
      center: { "text-align": "center" },
      right: { "text-align": "right" },
      justify: { "text-align": "justify" }
    }
  },
  
  // Font weight
  font: {
    property: "_typography",
    valueMap: {
      thin: { "font-weight": "100" },
      light: { "font-weight": "300" },
      normal: { "font-weight": "400" },
      medium: { "font-weight": "500" },
      semibold: { "font-weight": "600" },
      bold: { "font-weight": "700" },
      extrabold: { "font-weight": "800" },
      black: { "font-weight": "900" }
    }
  },
  
  // Border radius
  rounded: {
    property: "_border",
    valueMap: {
      none: { "border-radius": "0" },
      sm: { "border-radius": "4px" },
      md: { "border-radius": "8px" },
      lg: { "border-radius": "16px" },
      xl: { "border-radius": "24px" },
      full: { "border-radius": "9999px" }
    }
  },
  
  // Border
  border: {
    property: "_border",
    // Handle numeric border width (border-2, border-3, etc.)
    valuePattern: /^border-(\d+)$/,
    valueTransform: (match) => ({ "border-width": `${match[1]}px` }),
    // Handle border colors (border-red, border-blue, etc.)
    valueMap: {
      red: { "border-color": "#f44336" },
      blue: { "border-color": "#2196f3" },
      green: { "border-color": "#4caf50" },
      yellow: { "border-color": "#ffeb3b" },
      purple: { "border-color": "#9c27b0" },
      orange: { "border-color": "#ff9800" },
      teal: { "border-color": "#009688" },
      gray: { "border-color": "#9e9e9e" },
      black: { "border-color": "#000000" },
      white: { "border-color": "#ffffff" }
    }
  },
  
  // Padding (all sides)
  p: {
    property: "_spacing",
    valuePattern: /^p-(\d+)$/,
    valueTransform: (match) => ({ "padding": `${match[1]}px` })
  },
  
  // Padding specific sides
  pt: {
    property: "_spacing",
    valuePattern: /^pt-(\d+)$/,
    valueTransform: (match) => ({ "padding-top": `${match[1]}px` })
  },
  pr: {
    property: "_spacing",
    valuePattern: /^pr-(\d+)$/,
    valueTransform: (match) => ({ "padding-right": `${match[1]}px` })
  },
  pb: {
    property: "_spacing",
    valuePattern: /^pb-(\d+)$/,
    valueTransform: (match) => ({ "padding-bottom": `${match[1]}px` })
  },
  pl: {
    property: "_spacing",
    valuePattern: /^pl-(\d+)$/,
    valueTransform: (match) => ({ "padding-left": `${match[1]}px` })
  },
  px: {
    property: "_spacing",
    valuePattern: /^px-(\d+)$/,
    valueTransform: (match) => ({ 
      "padding-left": `${match[1]}px`,
      "padding-right": `${match[1]}px` 
    })
  },
  py: {
    property: "_spacing",
    valuePattern: /^py-(\d+)$/,
    valueTransform: (match) => ({ 
      "padding-top": `${match[1]}px`,
      "padding-bottom": `${match[1]}px` 
    })
  },
  
  // Margin (all sides)
  m: {
    property: "_spacing",
    valuePattern: /^m-(\d+)$/,
    valueTransform: (match) => ({ "margin": `${match[1]}px` })
  },
  
  // Margin specific sides
  mt: {
    property: "_spacing",
    valuePattern: /^mt-(\d+)$/,
    valueTransform: (match) => ({ "margin-top": `${match[1]}px` })
  },
  mr: {
    property: "_spacing",
    valuePattern: /^mr-(\d+)$/,
    valueTransform: (match) => ({ "margin-right": `${match[1]}px` })
  },
  mb: {
    property: "_spacing",
    valuePattern: /^mb-(\d+)$/,
    valueTransform: (match) => ({ "margin-bottom": `${match[1]}px` })
  },
  ml: {
    property: "_spacing",
    valuePattern: /^ml-(\d+)$/,
    valueTransform: (match) => ({ "margin-left": `${match[1]}px` })
  },
  mx: {
    property: "_spacing",
    valuePattern: /^mx-(\d+)$/,
    valueTransform: (match) => ({ 
      "margin-left": `${match[1]}px`,
      "margin-right": `${match[1]}px` 
    })
  },
  my: {
    property: "_spacing",
    valuePattern: /^my-(\d+)$/,
    valueTransform: (match) => ({ 
      "margin-top": `${match[1]}px`,
      "margin-bottom": `${match[1]}px` 
    })
  },
  
  // Width
  w: {
    property: "_layout",
    valuePattern: /^w-(\d+)$/,
    valueTransform: (match) => ({ "width": `${match[1]}px` })
  },
  
  // Height
  h: {
    property: "_layout",
    valuePattern: /^h-(\d+)$/,
    valueTransform: (match) => ({ "height": `${match[1]}px` })
  },
  
  // Flex layout
  flex: {
    property: "_layout",
    valueMap: {
      row: { "display": "flex", "flex-direction": "row" },
      col: { "display": "flex", "flex-direction": "column" },
      wrap: { "display": "flex", "flex-wrap": "wrap" },
      nowrap: { "display": "flex", "flex-wrap": "nowrap" }
    }
  },
  
  // Justify content
  justify: {
    property: "_layout",
    valueMap: {
      start: { "justify-content": "flex-start" },
      end: { "justify-content": "flex-end" },
      center: { "justify-content": "center" },
      between: { "justify-content": "space-between" },
      around: { "justify-content": "space-around" },
      evenly: { "justify-content": "space-evenly" }
    }
  },
  
  // Align items
  items: {
    property: "_layout",
    valueMap: {
      start: { "align-items": "flex-start" },
      end: { "align-items": "flex-end" },
      center: { "align-items": "center" },
      baseline: { "align-items": "baseline" },
      stretch: { "align-items": "stretch" }
    }
  }
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

  if (opts.ct_content)
    settings.text = opts.ct_content;

  if (node.name === "ct_code_block" && original["code-php"])
    settings.text = original["code-php"];

  const grouped = mapStyleToGroups(original);
  Object.assign(settings, grouped);

  return settings;
}

// Parse a class name to determine its style settings
function parseClassStyle(className) {
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
  
  // Check for special patterns that don't use prefix-value format
  
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
  // This still creates a global class, but without predefined styling
  return {}; 
}

// Create global class objects for Bricks
function createGlobalClass(className) {
  const id = genId();
  const settings = parseClassStyle(className);
  
  return {
    id,
    name: className,
    settings
  };
}

// Convert Oxygen tree to Bricks format with class support
function convertTree(node, parentId = "0", bricks = [], idMap = new Map(), classMap = new Map(), globalClasses = []) {
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
        const globalClass = createGlobalClass(className);
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

  if (node.options?.nicename) {
    bricksNode.label = node.options.nicename;
  }

  bricks.push(bricksNode);

  for (const child of node.children ?? []) {
    const result = convertTree(child, id, bricks, idMap, classMap, globalClasses);
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
  
  convertTree(root, "0", content, idMap, classMap, globalClasses);
  
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

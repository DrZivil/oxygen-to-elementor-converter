// Oxygen to Bricks Converter - WordPress Version

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

// Convert Oxygen tree to Bricks format
function convertTree(node, parentId = "0", bricks = [], idMap = new Map()) {
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

  if (node.options?.nicename)
    bricksNode.label = node.options.nicename;

  bricks.push(bricksNode);

  for (const child of node.children ?? []) {
    const result = convertTree(child, id, bricks, idMap);
    children.push(result.id);
  }

  return bricksNode;
}

// Build the final Bricks JSON
function buildBricksJson(root) {
  const content = [];
  const idMap = new Map();
  convertTree(root, "0", content, idMap);
  return {
    content,
    source: "bricksCopiedElements",
    sourceUrl: "https://yourdomain.dev",
    version: "1.12.3",
    globalClasses: [],
    globalElements: []
  };
}

// UI Functions
jQuery(document).ready(function($) {
  // Handle convert button click
  $("#otb-convert").on("click", function() {
    const inputEl = $("#otb-input");
    const outputEl = $("#otb-output");
    
    try {
      const input = JSON.parse(inputEl.val());
      const bricksJson = buildBricksJson(input);

      // Validate parent references
      const allParentsValid = bricksJson.content.every(
        b => b.parent === "0" || bricksJson.content.some(p => p.id === b.parent)
      );

      if (!allParentsValid) {
        showNotification("⚠️ Some elements reference missing parents. Bricks structure tree may not work.", "warning");
      }

      outputEl.val(JSON.stringify(bricksJson, null, 2));
      showNotification("Conversion successful!", "success");
    } catch (err) {
      showNotification("Invalid JSON: " + err.message, "error");
    }
  });

  // Handle load example button click
  $("#otb-load-example").on("click", function() {
    const exampleJson = $("#otb-example-json").text();
    
    try {
      const jsonObj = JSON.parse(exampleJson);
      $("#otb-input").val(JSON.stringify(jsonObj, null, 2));
      showNotification("Example loaded!", "success");
    } catch (err) {
      showNotification("Error loading example: " + err.message, "error");
    }
  });

  // Handle copy to clipboard button click
  $("#otb-copy").on("click", function() {
    const outputEl = $("#otb-output");
    
    if (!outputEl.val()) {
      showNotification("Nothing to copy", "warning");
      return;
    }
    
    // Create temporary textarea element to copy from
    const tempTextarea = $("<textarea>");
    $("body").append(tempTextarea);
    tempTextarea.val(outputEl.val()).select();
    document.execCommand("copy");
    tempTextarea.remove();
    
    showNotification("Copied to clipboard!", "success");
  });

  // Handle download JSON button click
  $("#otb-download").on("click", function() {
    const outputEl = $("#otb-output");
    
    if (!outputEl.val()) {
      showNotification("Nothing to download", "warning");
      return;
    }
    
    // Create a blob and download link
    const blob = new Blob([outputEl.val()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.href = url;
    a.download = "bricks-converted-" + new Date().getTime() + ".json";
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
    
    showNotification("JSON downloaded!", "success");
  });
  
  // Helper for showing notifications
  function showNotification(message, type = "info") {
    // Remove any existing notifications
    $(".otb-notification").remove();
    
    // Create notification element
    const notification = $('<div class="otb-notification ' + type + '">' + message + '</div>');
    $("body").append(notification);
    
    // Show notification
    setTimeout(function() {
      notification.addClass("show");
    }, 10);
    
    // Hide and remove notification after delay
    setTimeout(function() {
      notification.removeClass("show");
      setTimeout(function() {
        notification.remove();
      }, 300);
    }, 3000);
  }
});

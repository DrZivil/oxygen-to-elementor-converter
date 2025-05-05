/**
 * Simple Node.js script to run tests for the Oxygen to Bricks converter
 */

// Import the buildBricksJson function
import { buildBricksJson } from './transformers/tree.js';

// First test case - simple text block with background class
const test1 = {
  name: "Basic Text Block with Class",
  input: {
    "component": {
      "id": 13,
      "name": "ct_text_block",
      "options": {
        "ct_id": 13,
        "ct_parent": 0,
        "selector": "text_block-13-128",
        "original": {},
        "nicename": "Text (#13)",
        "ct_content": "This is a block of text. Double-click this text to edit it.",
        "classes": ["test-my-bg"],
        "activeselector": "test-my-bg"
      },
      "depth": 1
    },
    "classes": {
      "test-my-bg": {
        "original": {
          "background-color": "#b50707"
        },
        "key": "test-my-bg"
      }
    }
  }
};

// Second test case - rich text with typography properties
const test2 = {
  name: "Rich Text with Typography Properties",
  input: {
    "component": {
      "id": 9,
      "name": "oxy_rich_text",
      "figma_id": "135:4878",
      "children": [],
      "options": {
        "ct_id": 9,
        "ct_parent": 5,
        "original": [],
        "nicename": "Title",
        "selector": "_rich_text-9-128",
        "classes": ["ptn-card__title"],
        "media": {"phone-landscape": {"original": {}}},
        "ct_content": "Bundespräsident Alexander Van der Bellen zu Besuch bei PlayTogetherNow",
        "activeselector": "ptn-card__title"
      },
      "depth": 4
    },
    "classes": {
      "ptn-card__title": {
        "key": "ptn-card__title",
        "media": {"phone-landscape": {"original": {}}},
        "original": {
          "font-family": "Roboto",
          "line-height-unit": "%",
          "letter-spacing-unit": "%",
          "font-size": "32",
          "font-weight": "700",
          "line-height": "1.2",
          "letter-spacing": "0",
          "text-align": "left",
          "text-decoration": "none",
          "flex-grow": "0",
          "border-width": "1",
          "color": "#090404",
          "flex-shrink": "1",
          "flex-basis": "auto"
        }
      }
    }
  }
};

// Run both test cases and display results
console.log("🧪 Running Oxygen to Bricks converter tests...\n");

// Test 1
console.log(`\n📋 Test: ${test1.name}`);
try {
  const result1 = buildBricksJson(test1.input);
  console.log(JSON.stringify(result1, null, 2));
  
  // Check key properties
  const element1 = result1.content[0];
  console.log(`\nElement type: ${element1.name}`);
  console.log(`Text content: ${element1.settings.text}`);
  console.log(`Classes: ${JSON.stringify(element1.settings._cssGlobalClasses)}`);
  console.log(`Global classes count: ${result1.globalClasses.length}`);
  
  if (result1.globalClasses.length > 0) {
    console.log(`Class styles: ${JSON.stringify(result1.globalClasses[0].settings)}`);
  }
} catch (err) {
  console.error(`Test 1 failed with error: ${err.message}`);
  console.error(err);
}

// Test 2
console.log(`\n📋 Test: ${test2.name}`);
try {
  const result2 = buildBricksJson(test2.input);
  console.log(JSON.stringify(result2, null, 2));
  
  // Check key properties
  const element2 = result2.content[0];
  console.log(`\nElement type: ${element2.name}`);
  console.log(`Text content: ${element2.settings.text}`);
  console.log(`Classes: ${JSON.stringify(element2.settings._cssGlobalClasses)}`);
  console.log(`Global classes count: ${result2.globalClasses.length}`);
  
  if (result2.globalClasses.length > 0) {
    console.log(`Class styles: ${JSON.stringify(result2.globalClasses[0].settings)}`);
  }
} catch (err) {
  console.error(`Test 2 failed with error: ${err.message}`);
  console.error(err);
}

console.log("\n🏁 Tests completed");

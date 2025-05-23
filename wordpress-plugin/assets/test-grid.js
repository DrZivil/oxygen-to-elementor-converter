/**
 * Grid Test for WordPress Plugin
 */

import { buildBricksJson } from './transformers/tree.js';

// Test case with grid layout
const gridTest = {
  name: "Grid Layout Test",
  input: {
    "component": {
      "id": 1,
      "name": "ct_section",
      "options": {
        "ct_id": 1,
        "ct_parent": 0,
        "original": {
          "display": "grid",
          "grid-template-columns": "repeat(3, 1fr)",
          "grid-column-gap": "20px",
          "grid-row-gap": "20px",
          "grid-align-items": "stretch",
          "grid-justify-items": "start"
        },
        "classes": ["grid-container"],
        "nicename": "Grid Container"
      },
      "children": []
    },
    "classes": {
      "grid-container": {
        "original": {
          "display": "grid",
          "grid-template-columns": "repeat(auto-fit, minmax(250px, 1fr))",
          "grid-column-gap": "30px",
          "grid-row-gap": "30px",
          "padding": "20px"
        }
      }
    }
  }
};

// Run the test
console.log('🧪 Testing Grid Layout in WordPress Plugin...\n');

try {
  const result = buildBricksJson(gridTest.input);
  
  console.log('Full result:');
  console.log(JSON.stringify(result, null, 2));
  
  // Check the element
  const element = result.content[0];
  console.log(`\nElement: ${element.name}`);
  console.log('Element settings:');
  console.log(JSON.stringify(element.settings, null, 2));
  
  // Check for grid properties
  console.log(`\nHas _layout property: ${!!element.settings._layout}`);
  console.log(`Has _display property: ${!!element.settings._display}`);
  console.log(`Has _gridTemplateColumns: ${!!element.settings._gridTemplateColumns}`);
  console.log(`Has _columnGap property: ${!!element.settings._columnGap}`);
  console.log(`Has _rowGap property: ${!!element.settings._rowGap}`);
  
  // Check the global class
  console.log(`\nGlobal classes count: ${result.globalClasses.length}`);
  if (result.globalClasses.length > 0) {
    console.log('Global class settings:');
    console.log(JSON.stringify(result.globalClasses[0].settings, null, 2));
  }
  
  console.log('\n✓ Test completed');
} catch (err) {
  console.error(`❌ Test failed with error: ${err.message}`);
  console.error(err);
}

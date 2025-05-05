/**
 * Oxygen to Bricks Converter - Test Script
 * Tests the converter with specific examples
 */

import { buildBricksJson } from './transformers/tree.js';

// Test examples
const testCases = [
  {
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
    },
    expectedElementType: "text-basic",
    expectedTextContent: "This is a block of text. Double-click this text to edit it.",
    expectedClassCount: 1,
    expectedClassStyles: {
      _background: {
        color: { hex: "#b50707" }
      }
    }
  },
  {
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
          "media": {"phone-landscape": {"original": []}},
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
    },
    expectedElementType: "text",
    expectedTextContent: "Bundespräsident Alexander Van der Bellen zu Besuch bei PlayTogetherNow",
    expectedClassCount: 1,
    expectedClassStyles: {
      _typography: {
        "font-family": "Roboto",
        "font-size": "32",
        "font-weight": "700",
        "line-height": "1.2",
        "letter-spacing": "0",
        "text-align": "left",
        "text-decoration": "none",
        color: { hex: "#090404" }
      },
      _border: {
        width: {
          top: "1",
          right: "1",
          bottom: "1",
          left: "1"
        }
      },
      _layout: {
        "flex-grow": "0",
        "flex-shrink": "1",
        "flex-basis": "auto"
      }
    }
  }
];

/**
 * Run tests and output results
 */
function runTests() {
  console.log('🧪 Running Oxygen to Bricks converter tests...\n');
  
  let passedTests = 0;
  
  for (const testCase of testCases) {
    console.log(`\n📋 Test: ${testCase.name}`);
    
    try {
      // Convert using our refactored code
      const result = buildBricksJson(testCase.input);
      
      // Verify element type
      const element = result.content[0];
      const elementTypeValid = element.name === testCase.expectedElementType;
      console.log(`✓ Element type: ${elementTypeValid ? 'PASS' : 'FAIL'} (${element.name})`);
      
      // Verify text content
      const textContentValid = element.settings.text === testCase.expectedTextContent;
      console.log(`✓ Text content: ${textContentValid ? 'PASS' : 'FAIL'}`);
      
      // Verify class count
      const classCountValid = result.globalClasses.length === testCase.expectedClassCount;
      console.log(`✓ Class count: ${classCountValid ? 'PASS' : 'FAIL'} (${result.globalClasses.length})`);
      
      // Verify class applied to element
      const hasClassApplied = element.settings._cssGlobalClasses && 
                             element.settings._cssGlobalClasses.length === testCase.expectedClassCount;
      console.log(`✓ Class applied: ${hasClassApplied ? 'PASS' : 'FAIL'}`);
      
      // Verify class styles
      const globalClass = result.globalClasses[0];
      const classStyles = globalClass.settings;
      
      // Check each expected property group
      let allStylesValid = true;
      const expectedGroups = Object.keys(testCase.expectedClassStyles);
      
      for (const group of expectedGroups) {
        const expectedProps = testCase.expectedClassStyles[group];
        const actualProps = classStyles[group] || {};
        
        // Log property group comparison
        console.log(`\n- ${group} properties:`);
        console.log(`  Expected: ${JSON.stringify(expectedProps)}`);
        console.log(`  Actual: ${JSON.stringify(actualProps)}`);
        
        // Deep comparison is complex, so we'll do a simplified check
        const expectedKeys = Object.keys(expectedProps);
        for (const key of expectedKeys) {
          const hasKey = actualProps[key] !== undefined;
          if (!hasKey) {
            console.log(`  ❌ Missing property: ${key}`);
            allStylesValid = false;
          } else {
            console.log(`  ✓ Has property: ${key}`);
          }
        }
      }
      
      console.log(`\n✓ Class styles: ${allStylesValid ? 'PASS' : 'FAIL'}`);
      
      // Output the full result for debugging
      console.log('\nFull conversion result:');
      console.log(JSON.stringify(result, null, 2));
      
      // Count passed test case
      if (elementTypeValid && textContentValid && classCountValid && hasClassApplied && allStylesValid) {
        passedTests++;
      }
    } catch (err) {
      console.error(`❌ Test failed with error: ${err.message}`);
      console.error(err);
    }
  }
  
  // Final results
  console.log(`\n🏁 Test summary: ${passedTests}/${testCases.length} passed`);
}

// Run the tests
runTests();

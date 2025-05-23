/**
 * Oxygen to Bricks Converter - Main Entry
 * Main entry point for the converter application
 */

import { setupEventHandlers } from './ui/handlers.js';
import { addNotificationStyles } from './ui/notifications.js';
import { buildBricksJson } from './transformers/tree.js';

/**
 * Initialize the application
 */
function initialize() {
  // Add notification styles
  addNotificationStyles();
  
  // Set up UI event handlers
  setupEventHandlers();
  
  console.log('Oxygen to Bricks Converter initialized');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initialize);

// Export public API
export { buildBricksJson };

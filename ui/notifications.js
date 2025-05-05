/**
 * Oxygen to Bricks Converter - Notifications
 * Handles UI notifications and visual feedback
 */

/**
 * Shows a notification message with a specific type
 * @param {string} message - The notification message
 * @param {string} type - Notification type (info, success, error, warning)
 */
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

/**
 * Add notification styles to the document
 * This is called once when the page loads
 */
function addNotificationStyles() {
  // Check if styles already exist
  if (document.getElementById("notification-styles")) {
    return;
  }
  
  const style = document.createElement("style");
  style.id = "notification-styles";
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
}

export { showNotification, addNotificationStyles };

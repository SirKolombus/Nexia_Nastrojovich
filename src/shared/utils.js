/* Shared Utility Functions for Nástrojovič */

/**
 * Show notification to user
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success', 'error', 'info', 'warning'
 */
export function showNotification(message, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${message}`);
  
  // Create notification element if it doesn't exist
  let notification = document.getElementById('notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = 'notification';
    document.body.appendChild(notification);
  }
  
  // Set notification style based on type
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.classList.remove('hidden');
  
  // Auto-hide after 4 seconds
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 4000);
}

/**
 * Navigate back to launcher
 */
export function navigateToLauncher() {
  const baseUrl = window.location.origin + '/';
  window.location.href = baseUrl + 'launcher.html';
}

/**
 * Format number with Czech locale
 * @param {number} value - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

/**
 * Parse Czech formatted number
 * @param {string} str - String to parse
 * @returns {number} Parsed number
 */
export function parseNumber(str) {
  if (typeof str === 'number') return str;
  return parseFloat(str.replace(/\s/g, '').replace(',', '.'));
}

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {boolean} True if valid
 */
export function validateRequired(value, fieldName) {
  if (!value || value.trim() === '') {
    showNotification(`Pole "${fieldName}" je povinné`, 'error');
    return false;
  }
  return true;
}

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

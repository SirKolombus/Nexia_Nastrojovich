/* global Office */

import { showNotification, navigateToLauncher } from '../shared/utils.js';

Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").classList.remove("hidden");
    
    // Initialize
    initialize();
  }
});

/**
 * Initialize the Klient tool
 */
function initialize() {
  // Back to launcher button
  document.getElementById("btn-back-launcher").onclick = () => {
    navigateToLauncher();
  };
}

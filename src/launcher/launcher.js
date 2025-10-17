/* global Office */

Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").classList.remove("hidden");
    
    // Initialize button handlers
    initializeButtons();
  }
});

/**
 * Initialize click handlers for tool selection buttons
 */
function initializeButtons() {
  // Sampler button
  document.getElementById("btn-sampler").onclick = () => {
    navigateToTool("sampler");
  };

  // Terminology button
  document.getElementById("btn-terminology").onclick = () => {
    navigateToTool("terminology");
  };

  // Client Review button
  document.getElementById("btn-client").onclick = () => {
    navigateToTool("client");
  };
}

/**
 * Navigate to selected tool
 * @param {string} toolName - Name of the tool to navigate to
 */
function navigateToTool(toolName) {
  console.log(`Navigating to tool: ${toolName}`);
  
  // Get the current taskpane URL and modify it to point to the selected tool
  const baseUrl = window.location.origin + window.location.pathname.replace('launcher.html', '');
  
  let targetUrl;
  switch (toolName) {
    case "sampler":
      targetUrl = baseUrl.replace('/launcher/', '/sampler/') + 'sampler.html';
      break;
    case "terminology":
      targetUrl = baseUrl.replace('/launcher/', '/terminologie/') + 'terminologie.html';
      break;
    case "client":
      targetUrl = baseUrl.replace('/launcher/', '/klient/') + 'klient.html';
      break;
    default:
      console.error("Unknown tool:", toolName);
      return;
  }
  
  // Navigate to the tool
  window.location.href = targetUrl;
}

/**
 * Show error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
  console.error(message);
  // You can add a proper notification UI here
  alert(message);
}

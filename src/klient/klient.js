/* global Office, Excel */

import { showNotification, formatNumber } from '../shared/utils.js';

let evaluationResults = null;
let yearDataStore = {
  y2: null,
  y1: null,
  y0: null
};
let currentEditingYear = null;

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
    window.location.href = 'launcher.html';
  };
  
  // Evaluate button
  document.getElementById("btn-evaluate").onclick = evaluateData;
  
  // Print button
  document.getElementById("btn-print").onclick = printParameters;
  
  // Update year labels when year changes
  document.getElementById("reporting-year").addEventListener('input', updateYearLabels);
  
  // Set current year as default
  const currentYear = new Date().getFullYear();
  document.getElementById("reporting-year").value = currentYear;
  updateYearLabels();
  
  // Year button handlers
  document.getElementById("btn-year-2").onclick = () => openYearModal('y2');
  document.getElementById("btn-year-1").onclick = () => openYearModal('y1');
  document.getElementById("btn-year-0").onclick = () => openYearModal('y0');
  
  // Modal handlers
  document.getElementById("modal-close").onclick = closeYearModal;
  document.getElementById("modal-cancel").onclick = closeYearModal;
  document.getElementById("modal-save").onclick = saveYearData;
  
  // Close modal on overlay click
  document.getElementById("year-modal").onclick = (e) => {
    if (e.target.id === 'year-modal') {
      closeYearModal();
    }
  };
}

/**
 * Update year labels in the year buttons
 */
function updateYearLabels() {
  const yearInput = document.getElementById("reporting-year");
  const year = parseInt(yearInput.value) || new Date().getFullYear();
  
  document.getElementById("year-label-2").textContent = `${year - 2}`;
  document.getElementById("year-label-1").textContent = `${year - 1}`;
  document.getElementById("year-label-0").textContent = `${year}`;
  
  // Clear stored data when year changes
  yearDataStore = { y2: null, y1: null, y0: null };
  updateButtonStates();
  updateDataSummary();
}

/**
 * Open modal to enter year data
 */
function openYearModal(yearKey) {
  currentEditingYear = yearKey;
  const yearInput = document.getElementById("reporting-year");
  const year = parseInt(yearInput.value) || new Date().getFullYear();
  
  let yearValue;
  if (yearKey === 'y2') yearValue = year - 2;
  else if (yearKey === 'y1') yearValue = year - 1;
  else yearValue = year;
  
  document.getElementById("modal-year-title").textContent = `Vyplnit údaje pro rok ${yearValue}`;
  
  // Load existing data if available
  if (yearDataStore[yearKey]) {
    document.getElementById("modal-aktiva").value = yearDataStore[yearKey].aktiva || '';
    document.getElementById("modal-obrat").value = yearDataStore[yearKey].obrat || '';
    document.getElementById("modal-zamestnanci").value = yearDataStore[yearKey].zamestnanci || '';
    document.getElementById("modal-zdroj").value = yearDataStore[yearKey].zdroj || '';
  } else {
    // Clear fields
    document.getElementById("modal-aktiva").value = '';
    document.getElementById("modal-obrat").value = '';
    document.getElementById("modal-zamestnanci").value = '';
    document.getElementById("modal-zdroj").value = '';
  }
  
  document.getElementById("year-modal").classList.remove("hidden");
}

/**
 * Close modal
 */
function closeYearModal() {
  document.getElementById("year-modal").classList.add("hidden");
  currentEditingYear = null;
}

/**
 * Save year data from modal
 */
function saveYearData() {
  if (!currentEditingYear) return;
  
  const aktiva = parseFloat(document.getElementById("modal-aktiva").value) || 0;
  const obrat = parseFloat(document.getElementById("modal-obrat").value) || 0;
  const zamestnanci = parseFloat(document.getElementById("modal-zamestnanci").value) || 0;
  const zdroj = document.getElementById("modal-zdroj").value.trim();
  
  if (aktiva === 0 && obrat === 0 && zamestnanci === 0) {
    showNotification("Prosím vyplňte alespoň jeden údaj", "warning");
    return;
  }
  
  if (!zdroj) {
    showNotification("Prosím vyplňte zdroj dat", "warning");
    return;
  }
  
  yearDataStore[currentEditingYear] = {
    aktiva: aktiva,
    obrat: obrat,
    zamestnanci: zamestnanci,
    zdroj: zdroj
  };
  
  updateButtonStates();
  updateDataSummary();
  closeYearModal();
  
  showNotification("Údaje byly úspěšně uloženy", "success");
}

/**
 * Update button states based on stored data
 */
function updateButtonStates() {
  ['y2', 'y1', 'y0'].forEach((yearKey, index) => {
    const button = document.getElementById(`btn-year-${2 - index}`);
    const status = document.getElementById(`year-status-${2 - index}`);
    
    if (yearDataStore[yearKey]) {
      button.classList.add('filled');
      status.textContent = '✓ Vyplněno';
    } else {
      button.classList.remove('filled');
      status.textContent = 'Nevyplněno';
    }
  });
}

/**
 * Update data summary display
 */
function updateDataSummary() {
  const yearInput = document.getElementById("reporting-year");
  const year = parseInt(yearInput.value) || new Date().getFullYear();
  
  const hasData = yearDataStore.y2 || yearDataStore.y1 || yearDataStore.y0;
  
  if (!hasData) {
    document.getElementById("data-summary").classList.add("hidden");
    return;
  }
  
  let summaryHtml = '';
  
  [
    { key: 'y2', year: year - 2 },
    { key: 'y1', year: year - 1 },
    { key: 'y0', year: year }
  ].forEach(({ key, year: yearNum }) => {
    if (yearDataStore[key]) {
      const data = yearDataStore[key];
      summaryHtml += `
        <div class="summary-item">
          <div class="summary-year">Rok ${yearNum}:</div>
          <div class="summary-values">
            Aktiva: ${formatNumber(data.aktiva, 0)} tis. Kč | 
            Obrat: ${formatNumber(data.obrat, 0)} tis. Kč | 
            Zaměstnanci: ${formatNumber(data.zamestnanci, 0)}<br>
            <small><em>Zdroj: ${data.zdroj}</em></small>
          </div>
        </div>
      `;
    }
  });
  
  document.getElementById("summary-content").innerHTML = summaryHtml;
  document.getElementById("data-summary").classList.remove("hidden");
}

/**
 * Get form values
 */
function getFormValues() {
  const month = document.getElementById("reporting-month").value;
  const year = parseInt(document.getElementById("reporting-year").value);
  
  const data = {
    month: parseInt(month),
    year: year,
    years: {
      y2: year - 2,
      y1: year - 1,
      y0: year
    },
    aktiva: {
      y2: yearDataStore.y2 ? yearDataStore.y2.aktiva : 0,
      y1: yearDataStore.y1 ? yearDataStore.y1.aktiva : 0,
      y0: yearDataStore.y0 ? yearDataStore.y0.aktiva : 0
    },
    obrat: {
      y2: yearDataStore.y2 ? yearDataStore.y2.obrat : 0,
      y1: yearDataStore.y1 ? yearDataStore.y1.obrat : 0,
      y0: yearDataStore.y0 ? yearDataStore.y0.obrat : 0
    },
    zamestnanci: {
      y2: yearDataStore.y2 ? yearDataStore.y2.zamestnanci : 0,
      y1: yearDataStore.y1 ? yearDataStore.y1.zamestnanci : 0,
      y0: yearDataStore.y0 ? yearDataStore.y0.zamestnanci : 0
    },
    zdroje: {
      y2: yearDataStore.y2 ? yearDataStore.y2.zdroj : '',
      y1: yearDataStore.y1 ? yearDataStore.y1.zdroj : '',
      y0: yearDataStore.y0 ? yearDataStore.y0.zdroj : ''
    }
  };
  
  return data;
}

/**
 * Validate form data
 */
function validateData(data) {
  if (!data.month || data.month < 1 || data.month > 12) {
    showNotification("Prosím vyberte měsíc", "error");
    return false;
  }
  
  if (!data.year || data.year < 2000 || data.year > 2099) {
    showNotification("Prosím zadejte platný rok", "error");
    return false;
  }
  
  // Check if at least some data is filled
  const hasData = yearDataStore.y2 || yearDataStore.y1 || yearDataStore.y0;
  
  if (!hasData) {
    showNotification("Prosím vyplňte údaje alespoň pro jeden rok", "error");
    return false;
  }
  
  return true;
}

/**
 * Evaluate client data based on Czech accounting thresholds
 */
function evaluateData() {
  const data = getFormValues();
  
  if (!validateData(data)) {
    return;
  }
  
  // Calculate averages for the two preceding years
  const avgAktiva = (data.aktiva.y1 + data.aktiva.y2) / 2;
  const avgObrat = (data.obrat.y1 + data.obrat.y2) / 2;
  const avgZamestnanci = (data.zamestnanci.y1 + data.zamestnanci.y2) / 2;
  
  // Thresholds according to Czech Accounting Act (Zákon o účetnictví)
  // Micro entity (mikro účetní jednotka)
  const microThresholds = {
    aktiva: 9000, // 9 mil. Kč
    obrat: 18000, // 18 mil. Kč
    zamestnanci: 10
  };
  
  // Small entity (malá účetní jednotka)
  const smallThresholds = {
    aktiva: 100000, // 100 mil. Kč
    obrat: 200000, // 200 mil. Kč
    zamestnanci: 50
  };
  
  // Medium entity (střední účetní jednotka)
  const mediumThresholds = {
    aktiva: 500000, // 500 mil. Kč
    obrat: 1000000, // 1 mld. Kč
    zamestnanci: 250
  };
  
  // Evaluate size category (need to exceed 2 out of 3 criteria for two consecutive years)
  let category = "Velká účetní jednotka";
  let exceededCriteria = 0;
  
  // Check micro entity
  if (avgAktiva <= microThresholds.aktiva) exceededCriteria++;
  if (avgObrat <= microThresholds.obrat) exceededCriteria++;
  if (avgZamestnanci <= microThresholds.zamestnanci) exceededCriteria++;
  
  if (exceededCriteria >= 2) {
    category = "Mikro účetní jednotka";
  } else {
    // Check small entity
    exceededCriteria = 0;
    if (avgAktiva <= smallThresholds.aktiva) exceededCriteria++;
    if (avgObrat <= smallThresholds.obrat) exceededCriteria++;
    if (avgZamestnanci <= smallThresholds.zamestnanci) exceededCriteria++;
    
    if (exceededCriteria >= 2) {
      category = "Malá účetní jednotka";
    } else {
      // Check medium entity
      exceededCriteria = 0;
      if (avgAktiva <= mediumThresholds.aktiva) exceededCriteria++;
      if (avgObrat <= mediumThresholds.obrat) exceededCriteria++;
      if (avgZamestnanci <= mediumThresholds.zamestnanci) exceededCriteria++;
      
      if (exceededCriteria >= 2) {
        category = "Střední účetní jednotka";
      }
    }
  }
  
  // Store results
  evaluationResults = {
    data: data,
    averages: { aktiva: avgAktiva, obrat: avgObrat, zamestnanci: avgZamestnanci },
    category: category
  };
  
  // Display results
  displayResults(evaluationResults);
  
  showNotification("Údaje byly úspěšně vyhodnoceny", "success");
}

/**
 * Display evaluation results
 */
function displayResults(results) {
  const monthNames = ["", "Leden", "Únor", "Březen", "Duben", "Květen", "Červen", 
                      "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
  
  const html = `
    <div class="result-item">
      <span class="result-label">Rozhodný den:</span>
      <span class="result-value">${monthNames[results.data.month]} ${results.data.year}</span>
    </div>
    
    <div class="result-item">
      <span class="result-label">Průměrná aktiva (${results.data.years.y2}-${results.data.years.y1}):</span>
      <span class="result-value">${formatNumber(results.averages.aktiva, 0)} tis. Kč</span>
    </div>
    
    <div class="result-item">
      <span class="result-label">Průměrný obrat (${results.data.years.y2}-${results.data.years.y1}):</span>
      <span class="result-value">${formatNumber(results.averages.obrat, 0)} tis. Kč</span>
    </div>
    
    <div class="result-item">
      <span class="result-label">Průměrný počet zaměstnanců (${results.data.years.y2}-${results.data.years.y1}):</span>
      <span class="result-value">${formatNumber(results.averages.zamestnanci, 1)}</span>
    </div>
    
    <div class="result-item">
      <span class="result-label">Kategorie:</span>
      <span class="result-value result-success">${results.category}</span>
    </div>
  `;
  
  document.getElementById("results-content").innerHTML = html;
  document.getElementById("results-section").classList.remove("hidden");
  document.getElementById("print-section").classList.remove("hidden");
}

/**
 * Print parameters to Excel
 */
async function printParameters() {
  if (!evaluationResults) {
    showNotification("Nejprve vyhodnoťte údaje", "warning");
    return;
  }
  
  try {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      
      const monthNames = ["", "Leden", "Únor", "Březen", "Duben", "Květen", "Červen", 
                          "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
      
      const data = evaluationResults.data;
      const avg = evaluationResults.averages;
      
      // Prepare data for printing
      const parameters = [
        ["PROVĚRKA KLIENTA - PARAMETRY", "", "", ""],
        ["", "", "", ""],
        ["Rozhodný den:", `${monthNames[data.month]} ${data.year}`, "", ""],
        ["", "", "", ""],
        ["FINANČNÍ ÚDAJE", "", "", ""],
        ["", data.years.y2, data.years.y1, data.years.y0],
        ["Aktiva (tis. Kč)", data.aktiva.y2, data.aktiva.y1, data.aktiva.y0],
        ["Obrat (tis. Kč)", data.obrat.y2, data.obrat.y1, data.obrat.y0],
        ["Průměrný počet zaměstnanců", data.zamestnanci.y2, data.zamestnanci.y1, data.zamestnanci.y0],
        ["", "", "", ""],
        ["ZDROJE DAT", "", "", ""],
        [`Rok ${data.years.y2}:`, data.zdroje.y2 || 'N/A', "", ""],
        [`Rok ${data.years.y1}:`, data.zdroje.y1 || 'N/A', "", ""],
        [`Rok ${data.years.y0}:`, data.zdroje.y0 || 'N/A', "", ""],
        ["", "", "", ""],
        ["VYHODNOCENÍ", "", "", ""],
        ["Průměrná aktiva:", formatNumber(avg.aktiva, 0) + " tis. Kč", "", ""],
        ["Průměrný obrat:", formatNumber(avg.obrat, 0) + " tis. Kč", "", ""],
        ["Průměrný počet zaměstnanců:", formatNumber(avg.zamestnanci, 1), "", ""],
        ["", "", "", ""],
        ["Kategorie:", evaluationResults.category, "", ""],
        ["", "", "", ""],
        ["Datum vytvoření:", new Date().toLocaleString("cs-CZ"), "", ""]
      ];
      
      // Find a good place to insert (first empty row)
      const usedRange = sheet.getUsedRange();
      usedRange.load("rowCount");
      await context.sync();
      
      const startRow = usedRange.rowCount + 2;
      
      // Insert data
      const range = sheet.getRangeByIndexes(startRow, 0, parameters.length, 4);
      range.values = parameters;
      
      // Format header
      const headerRange = sheet.getRangeByIndexes(startRow, 0, 1, 2);
      headerRange.format.font.bold = true;
      headerRange.format.font.size = 14;
      headerRange.format.fill.color = "#667eea";
      headerRange.format.font.color = "white";
      
      // Format section headers
      const sectionHeaders = [startRow + 4, startRow + 10];
      sectionHeaders.forEach(row => {
        const sectionRange = sheet.getRangeByIndexes(row, 0, 1, 1);
        sectionRange.format.font.bold = true;
        sectionRange.format.fill.color = "#f0f0f0";
      });
      
      // Format data table header
      const tableHeaderRange = sheet.getRangeByIndexes(startRow + 5, 0, 1, 4);
      tableHeaderRange.format.font.bold = true;
      tableHeaderRange.format.fill.color = "#e0e0e0";
      
      // Auto-fit columns
      range.format.autofitColumns();
      
      await context.sync();
      
      showNotification("Parametry byly úspěšně vytištěny do listu", "success");
    });
  } catch (error) {
    console.error("Error printing parameters:", error);
    showNotification("Chyba při tisku parametrů: " + error.message, "error");
  }
}

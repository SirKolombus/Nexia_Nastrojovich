/**
 * Restart the tool - clear all data and reset to initial state
 */
function restartTool() {
  // Clear year data store
  yearDataStore = {
    y3: null,
    y2: null,
    y1: null,
    y0: null
  };
  // Clear evaluation results
  evaluationResults = null;
  selectedStartCell = null;
  // Reset accounting period to current year
  const currentYear = new Date().getFullYear();
  document.getElementById("accounting-period-start").value = `${currentYear}-01-01`;
  // Clear unit info fields
  document.getElementById("unit-name").value = "";
  document.getElementById("unit-ico").value = "";
  document.getElementById("unit-type").value = "";
  // Update year labels
  updateYearLabels();
  // Update button states
  updateButtonStates();
  // Hide data summary
  document.getElementById("data-summary").classList.add("hidden");
  // Hide results section
  document.getElementById("results-section").classList.add("hidden");
  // Hide print section
  document.getElementById("print-section").classList.add("hidden");
  // Hide print preview
  document.getElementById("print-preview").classList.add("hidden");
  showNotification("Kontrola byla restartována", "success");
}
/* global Office, Excel */

import { showNotification, formatNumber } from '../shared/utils.js';

let evaluationResults = null;
let yearDataStore = {
  y3: null,
  y2: null,
  y1: null,
  y0: null
};
let currentEditingYear = null;
let selectedStartCell = null; // Store the selected cell for printing

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
  // Restart button
  document.getElementById("btn-restart").onclick = restartTool;
  
  // Evaluate button
  document.getElementById("btn-evaluate").onclick = evaluateData;
  
  // Select cell button
  document.getElementById("btn-select-cell").onclick = selectCellForPrint;
  
  // Print button
  document.getElementById("btn-print").onclick = printParameters;
  
  // Update year labels when period start changes
  const periodInput = document.getElementById("accounting-period-start");
  if (periodInput) {
    periodInput.addEventListener('change', updateYearLabels);
    // Set default to current year 1.1.
    const currentYear = new Date().getFullYear();
    if (!periodInput.value) {
      periodInput.value = `${currentYear}-01-01`;
    }
    updateYearLabels();
  }
  
  // Year button handlers
  document.getElementById("btn-year-3").onclick = () => openYearModal('y3');
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
  
  // Add automatic number formatting to numeric fields
  setupNumberFormatting();
}

/**
 * Setup automatic number formatting for numeric input fields
 */
function setupNumberFormatting() {
  const numericFields = document.querySelectorAll('.formatted-number');
  
  numericFields.forEach(field => {
    field.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s/g, ''); // Remove spaces
      
      // Only allow digits
      value = value.replace(/\D/g, '');
      
      // Format with thousand separators
      if (value) {
        e.target.value = formatNumberWithSpaces(parseInt(value));
      } else {
        e.target.value = '';
      }
    });
    
    field.addEventListener('blur', function(e) {
      // Reformat on blur to ensure consistency
      let value = e.target.value.replace(/\s/g, '');
      if (value && !isNaN(value)) {
        e.target.value = formatNumberWithSpaces(parseInt(value));
      }
    });
  });
}

/**
 * Format number with spaces as thousand separators (Czech format)
 */
function formatNumberWithSpaces(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * Format ISO date (yyyy-mm-dd) to Czech format d.m.yyyy
 */
function formatDateCz(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(v => parseInt(v, 10));
  if (!y || !m || !d) return iso;
  return `${d}.${m}.${y}`;
}

/**
 * Update year labels in the year buttons based on accounting period start
 */
function updateYearLabels() {
  const periodInput = document.getElementById("accounting-period-start");
  if (!periodInput || !periodInput.value) return;
  
  const [year, month, day] = periodInput.value.split('-').map(v => parseInt(v, 10));
  if (!year) return;
  
  // Check if period starts on 1.1 (calendar year)
  const isCalendarYear = (month === 1 && day === 1);
  const prefix = isCalendarYear ? 'Rok ' : 'FY';
  
  document.getElementById("year-label-3").textContent = `${prefix}${year - 3}`;
  document.getElementById("year-label-2").textContent = `${prefix}${year - 2}`;
  document.getElementById("year-label-1").textContent = `${prefix}${year - 1}`;
  document.getElementById("year-label-0").textContent = `${prefix}${year}`;
  // Clear stored data when period changes
  yearDataStore = { y3: null, y2: null, y1: null, y0: null };
  updateButtonStates();
  updateDataSummary();
}

/**
 * Open modal to enter year data
 */
function openYearModal(yearKey) {
  currentEditingYear = yearKey;
  const periodInput = document.getElementById("accounting-period-start");
  if (!periodInput || !periodInput.value) {
    showNotification("Nejprve vyplňte první den účetního období", "warning");
    return;
  }
  
  const [year] = periodInput.value.split('-').map(v => parseInt(v, 10));
  
  let yearValue;
  if (yearKey === 'y3') yearValue = year - 3;
  else if (yearKey === 'y2') yearValue = year - 2;
  else if (yearKey === 'y1') yearValue = year - 1;
  else yearValue = year;
  
  document.getElementById("modal-year-title").textContent = `Vyplnit údaje pro rok ${yearValue}`;
  
  // Load existing data if available
  if (yearDataStore[yearKey]) {
    const data = yearDataStore[yearKey];
    document.getElementById("modal-aktiva").value = data.aktiva ? formatNumberWithSpaces(data.aktiva) : '';
    document.getElementById("modal-obrat").value = data.obrat ? formatNumberWithSpaces(data.obrat) : '';
    document.getElementById("modal-zamestnanci").value = data.zamestnanci ? formatNumberWithSpaces(data.zamestnanci) : '';
    document.getElementById("modal-zdroj").value = data.zdroj || '';
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
  
  // Parse formatted numbers (remove spaces)
  const aktivaStr = document.getElementById("modal-aktiva").value.replace(/\s/g, '');
  const obratStr = document.getElementById("modal-obrat").value.replace(/\s/g, '');
  const zamestnanciStr = document.getElementById("modal-zamestnanci").value.replace(/\s/g, '');
  
  const aktiva = parseFloat(aktivaStr) || 0;
  const obrat = parseFloat(obratStr) || 0;
  const zamestnanci = parseFloat(zamestnanciStr) || 0;
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
  ['y3', 'y2', 'y1', 'y0'].forEach((yearKey, index) => {
    const button = document.getElementById(`btn-year-${3 - index}`);
    const status = document.getElementById(`year-status-${3 - index}`);
    if (button && status) {
      if (yearDataStore[yearKey]) {
        button.classList.add('filled');
        status.textContent = '✓ Vyplněno';
      } else {
        button.classList.remove('filled');
        status.textContent = 'Nevyplněno';
      }
    }
  });
}

/**
 * Update data summary display
 */
function updateDataSummary() {
  const periodInput = document.getElementById("accounting-period-start");
  if (!periodInput || !periodInput.value) return;
  
  const [year] = periodInput.value.split('-').map(v => parseInt(v, 10));
  
  const hasData = yearDataStore.y3 || yearDataStore.y2 || yearDataStore.y1 || yearDataStore.y0;
  if (!hasData) {
    document.getElementById("data-summary").classList.add("hidden");
    return;
  }
  let summaryHtml = '';
  [
    { key: 'y3', year: year - 3 },
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
            Aktiva: ${formatNumber(data.aktiva, 0)} Kč | 
            Obrat: ${formatNumber(data.obrat, 0)} Kč | 
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
  const accountingPeriodStart = document.getElementById("accounting-period-start").value;
  const unitName = document.getElementById("unit-name").value.trim();
  const unitType = document.getElementById("unit-type").value;
  const unitICO = document.getElementById("unit-ico").value.trim();
  let year = new Date().getFullYear();
  if (accountingPeriodStart) {
    [year] = accountingPeriodStart.split('-').map(v => parseInt(v, 10));
  }
  const data = {
    unitName,
    unitType,
    unitICO,
    accountingPeriodStart: accountingPeriodStart,
    years: {
      y3: year - 3,
      y2: year - 2,
      y1: year - 1,
      y0: year
    },
    aktiva: {
      y3: yearDataStore.y3 ? yearDataStore.y3.aktiva : 0,
      y2: yearDataStore.y2 ? yearDataStore.y2.aktiva : 0,
      y1: yearDataStore.y1 ? yearDataStore.y1.aktiva : 0,
      y0: yearDataStore.y0 ? yearDataStore.y0.aktiva : 0
    },
    obrat: {
      y3: yearDataStore.y3 ? yearDataStore.y3.obrat : 0,
      y2: yearDataStore.y2 ? yearDataStore.y2.obrat : 0,
      y1: yearDataStore.y1 ? yearDataStore.y1.obrat : 0,
      y0: yearDataStore.y0 ? yearDataStore.y0.obrat : 0
    },
    zamestnanci: {
      y3: yearDataStore.y3 ? yearDataStore.y3.zamestnanci : 0,
      y2: yearDataStore.y2 ? yearDataStore.y2.zamestnanci : 0,
      y1: yearDataStore.y1 ? yearDataStore.y1.zamestnanci : 0,
      y0: yearDataStore.y0 ? yearDataStore.y0.zamestnanci : 0
    },
    zdroje: {
      y3: yearDataStore.y3 ? yearDataStore.y3.zdroj : '',
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
  if (!data.unitName || !data.unitType || !data.unitICO) {
    showNotification("Vyplňte prosím název, typ a IČO účetní jednotky", "error");
    return false;
  }
  if (!data.accountingPeriodStart) {
    showNotification("Prosím vyplňte první den účetního období", "error");
    return false;
  }
  
  // Check if at least some data is filled
  const hasData = yearDataStore.y3 || yearDataStore.y2 || yearDataStore.y1 || yearDataStore.y0;
  
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
  
  // Thresholds according to Czech Accounting Act (Zákon o účetnictví)
  // Two versions: before 31.12.2023 and from 1.1.2024
  
  const oldThresholds = {
    micro: { aktiva: 9000, obrat: 18000, zamestnanci: 10 },
    small: { aktiva: 100000, obrat: 200000, zamestnanci: 50 },
    medium: { aktiva: 500000, obrat: 1000000, zamestnanci: 250 }
  };
  
  const newThresholds = {
    micro: { aktiva: 11000, obrat: 22000, zamestnanci: 10 },
    small: { aktiva: 120000, obrat: 240000, zamestnanci: 50 },
    medium: { aktiva: 600000, obrat: 1200000, zamestnanci: 250 }
  };
  
  // Helper to classify one year's values into a category
  function classifyOne(aktiva, obrat, zam, year) {
    if (aktiva == null && obrat == null && zam == null) return null;
    
    // Select thresholds based on the year being evaluated
    const thresholds = (year >= 2024) ? newThresholds : oldThresholds;
    
    // Inputs are in Kč; thresholds are in tis. Kč → convert
    const aktTis = typeof aktiva === 'number' ? aktiva / 1000 : 0;
    const obrTis = typeof obrat === 'number' ? obrat / 1000 : 0;
    const zamVal = typeof zam === 'number' ? zam : 0;
    
    let exceeds; // count of criteria that EXCEED the threshold
    
    // Check if exceeds Micro thresholds (if exceeds < 2, it's Micro)
    exceeds = 0;
    if (aktTis >= thresholds.micro.aktiva) exceeds++;
    if (obrTis >= thresholds.micro.obrat) exceeds++;
    if (zamVal >= thresholds.micro.zamestnanci) exceeds++;
    if (exceeds < 2) return "Mikro účetní jednotka";
    
    // Check if exceeds Small thresholds
    exceeds = 0;
    if (aktTis >= thresholds.small.aktiva) exceeds++;
    if (obrTis >= thresholds.small.obrat) exceeds++;
    if (zamVal >= thresholds.small.zamestnanci) exceeds++;
    if (exceeds < 2) return "Malá účetní jednotka";
    
    // Check if exceeds Medium thresholds
    exceeds = 0;
    if (aktTis >= thresholds.medium.aktiva) exceeds++;
    if (obrTis >= thresholds.medium.obrat) exceeds++;
    if (zamVal >= thresholds.medium.zamestnanci) exceeds++;
    if (exceeds < 2) return "Střední účetní jednotka";
    
    // Else large
    return "Velká účetní jednotka";
  }
  
  const categories = {
    y3: yearDataStore.y3 ? classifyOne(data.aktiva.y3, data.obrat.y3, data.zamestnanci.y3, data.years.y3) : null,
    y2: yearDataStore.y2 ? classifyOne(data.aktiva.y2, data.obrat.y2, data.zamestnanci.y2, data.years.y2) : null,
    y1: yearDataStore.y1 ? classifyOne(data.aktiva.y1, data.obrat.y1, data.zamestnanci.y1, data.years.y1) : null,
    y0: yearDataStore.y0 ? classifyOne(data.aktiva.y0, data.obrat.y0, data.zamestnanci.y0, data.years.y0) : null,
  };
  
  // Determine which thresholds to display (based on first day of accounting period)
  const periodStart = new Date(data.accountingPeriodStart);
  const thresholdChangeDate = new Date('2024-01-01');
  const useOldThresholds = periodStart < thresholdChangeDate;
  
  // Store results
  evaluationResults = {
    data: data,
    categories: categories,
    thresholdVersion: useOldThresholds ? 'do 31.12.2023' : 'od 1.1.2024',
    thresholds: useOldThresholds ? oldThresholds : newThresholds
  };
  
  // Display results
  displayResults(evaluationResults);
  
  showNotification("Údaje byly úspěšně vyhodnoceny", "success");
}

/**
 * Get official category for the current year based on the last two years' data
 */
function getOfficialCategory(categories) {
  // Nová logika: Kategorie pro kontrolovaný rok je ta, které účetní jednotka dosáhla ve dvou po sobě jdoucích letech z posledních tří let (y2, y1, y0).
  // Pokud změna nastala pouze v jednom roce, oficiální kategorie se nemění.
  // Pokud nejsou k dispozici tři roky, použije se poslední dostupná kategorie.
  const order = [
    'Mikro účetní jednotka',
    'Malá účetní jednotka',
    'Střední účetní jednotka',
    'Velká účetní jednotka'
  ];
  // Získáme kategorie za poslední tři roky (od nejstarší po nejnovější)
  const keys = ['y2', 'y1', 'y0'];
  const cats = keys.map(k => categories[k]).filter(Boolean);
  if (cats.length < 1) return 'Nedostatek dat';
  if (cats.length < 3) {
    // Pokud nejsou tři roky, použij poslední dostupnou kategorii
    return cats[cats.length - 1];
  }
  // Projdeme všechny možné kategorie od nejvyšší po nejnižší
  for (let i = order.length - 1; i >= 0; i--) {
    const cat = order[i];
    // Hledáme dvě po sobě jdoucí shody této kategorie v cats
    for (let j = 0; j < cats.length - 1; j++) {
      if (cats[j] === cat && cats[j + 1] === cat) {
        return cat;
      }
    }
  }
  // Pokud žádná kategorie nebyla dosažena ve dvou po sobě jdoucích letech, použij kategorii aktuálního roku
  return categories.y0 || 'Nedostatek dat';
}

/**
 * Evaluate audit obligation based on unit type and thresholds
 */
function evaluateAuditObligation(data) {
  // Limity pro audit
  const auditLimitsOld = { aktiva: 40000000, obrat: 80000000, zamestnanci: 50 };
  const auditLimitsNew = { aktiva: 120000000, obrat: 240000000, zamestnanci: 50 };
  // Typy jednotek, které stačí splnit 1 kritérium
  const oneCriteriaTypes = ["Akciová společnost", "Svěřenský fond"];
  // Pro každý rok
  const results = {};
  ["y3", "y2", "y1", "y0"].forEach((key) => {
    const year = data.years[key];
    // Vyber správné limity
    const limits = year >= 2026 ? auditLimitsNew : auditLimitsOld;
    // Zjisti počet splněných kritérií
    let count = 0;
    if (data.aktiva[key] >= limits.aktiva) count++;
    if (data.obrat[key] >= limits.obrat) count++;
    if (data.zamestnanci[key] >= limits.zamestnanci) count++;
    // Podle typu jednotky
    if (oneCriteriaTypes.includes(data.unitType)) {
      results[key] = count >= 1 ? "ANO" : "NE";
    } else {
      results[key] = count >= 2 ? "ANO" : "NE";
    }
  });
  return results;
}

/**
 * Display evaluation results
 */
function displayResults(results) {
  const auditObligation = evaluateAuditObligation(results.data);
  const html = `
    <div class="result-item">
      <span class="result-label">První den účetního období:</span>
      <span class="result-value">${formatDateCz(results.data.accountingPeriodStart)}</span>
    </div>
    <div class="result-item">
      <span class="result-label">Použité limity:</span>
      <span class="result-value">${results.thresholdVersion}</span>
    </div>
    <div class="result-item">
      <span class="result-label">Rok ${results.data.years.y3}:</span>
      <span class="result-value result-success">${results.categories.y3 ?? '—'}</span>
      <span class="result-label ml-12">Audit:</span>
      <span class="result-value">${auditObligation.y3}</span>
    </div>
    <div class="result-item">
      <span class="result-label">Rok ${results.data.years.y2}:</span>
      <span class="result-value result-success">${results.categories.y2 ?? '—'}</span>
      <span class="result-label ml-12">Audit:</span>
      <span class="result-value">${auditObligation.y2}</span>
    </div>
    <div class="result-item">
      <span class="result-label">Rok ${results.data.years.y1}:</span>
      <span class="result-value result-success">${results.categories.y1 ?? '—'}</span>
      <span class="result-label ml-12">Audit:</span>
      <span class="result-value">${auditObligation.y1}</span>
    </div>
    <div class="result-item">
      <span class="result-label">Rok ${results.data.years.y0}:</span>
      <span class="result-value result-success">${results.categories.y0 ?? '—'}</span>
      <span class="result-label ml-12">Audit:</span>
      <span class="result-value">${auditObligation.y0}</span>
    </div>
        <div class="result-item result-official">
      <span class="result-label">Pro kontrolovaný rok účetní jednotka je vnímána za:</span>
      <span class="result-value result-success">${getOfficialCategory(results.categories)}</span>
    </div>
    <div class="result-item result-official">
      <span class="result-label">Pro kontrolovaný rok účetní jednotka je povinna k auditu?:</span>
      <span class="result-value result-success">${auditObligation.y0}</span>
    </div>
  `;
  
  document.getElementById("results-content").innerHTML = html;
  document.getElementById("results-section").classList.remove("hidden");
  document.getElementById("print-section").classList.remove("hidden");
}

/**
 * Select cell for printing parameters
 */
async function selectCellForPrint() {
  if (!evaluationResults) {
    showNotification("Nejprve vyhodnoťte údaje", "warning");
    return;
  }
  
  try {
    await Excel.run(async (context) => {
      const range = context.workbook.getSelectedRange();
      range.load("address, rowIndex, columnIndex");
      await context.sync();
      
      selectedStartCell = {
        address: range.address,
        rowIndex: range.rowIndex,
        columnIndex: range.columnIndex
      };
      
  // Calculate end range (parameters array length = 25 rows, 5 columns)
  const parametersRowCount = 25;  // 4 roky + sekce
  const parametersColumnCount = 5;
  const endRowIndex = selectedStartCell.rowIndex + parametersRowCount - 1;
  const endColumnIndex = selectedStartCell.columnIndex + parametersColumnCount - 1;
      
      // Convert column index to letter
      const startCol = getColumnLetter(selectedStartCell.columnIndex);
      const endCol = getColumnLetter(endColumnIndex);
      
      const rangeText = `${startCol}${selectedStartCell.rowIndex + 1}:${endCol}${endRowIndex + 1}`;
      
      // Show preview
      document.getElementById("print-range-text").textContent = rangeText;
      document.getElementById("print-preview").classList.remove("hidden");
      
      showNotification("Buňka vybrána: " + selectedStartCell.address, "success");
    });
  } catch (error) {
    console.error("Error selecting cell:", error);
    showNotification("Chyba při výběru buňky: " + error.message, "error");
  }
}

/**
 * Convert column index to Excel column letter
 */
function getColumnLetter(columnIndex) {
  let letter = '';
  let index = columnIndex;
  
  while (index >= 0) {
    letter = String.fromCharCode(65 + (index % 26)) + letter;
    index = Math.floor(index / 26) - 1;
  }
  
  return letter;
}

/**
 * Print parameters to Excel
 */
async function printParameters() {
  if (!evaluationResults) {
    showNotification("Nejprve vyhodnoťte údaje", "warning");
    return;
  }
  
  if (!selectedStartCell) {
    showNotification("Nejprve vyberte buňku pro tisk", "warning");
    return;
  }
  
  try {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      
      const data = evaluationResults.data;
      
      // Evaluate audit obligation
      const auditObligation = evaluateAuditObligation(data);
      
      // Prepare data for printing
      const parameters = [
        ["PROVĚRKA KLIENTA - PARAMETRY", "", "", "", ""],
        ["", "", "", "", ""],
        ["První den účetního období:", formatDateCz(data.accountingPeriodStart), "", "", ""],
        ["Použité limity:", evaluationResults.thresholdVersion, "", "", ""],
        ["", "", "", "", ""],
        ["FINANČNÍ ÚDAJE", "", "", "", ""],
        ["", data.years.y3, data.years.y2, data.years.y1, data.years.y0],
        ["Aktiva (Kč)", data.aktiva.y3, data.aktiva.y2, data.aktiva.y1, data.aktiva.y0],
        ["Obrat (Kč)", data.obrat.y3, data.obrat.y2, data.obrat.y1, data.obrat.y0],
        ["Průměrný počet zaměstnanců", data.zamestnanci.y3, data.zamestnanci.y2, data.zamestnanci.y1, data.zamestnanci.y0],
        ["", "", "", "", ""],
        ["ZDROJE DAT", "", "", "", ""],
        [`Rok ${data.years.y3}:`, data.zdroje.y3 || 'N/A', "", "", ""],
        [`Rok ${data.years.y2}:`, data.zdroje.y2 || 'N/A', "", "", ""],
        [`Rok ${data.years.y1}:`, data.zdroje.y1 || 'N/A', "", "", ""],
        [`Rok ${data.years.y0}:`, data.zdroje.y0 || 'N/A', "", "", ""],
        ["", "", "", "", ""],
        ["VYHODNOCENÍ (kategorie dle roku)", "Velikost účetní jednotky", "Povinnost auditu:", "", ""],
        ["Rok " + data.years.y3 + ":", evaluationResults.categories.y3 || '—', auditObligation.y3, "", ""],
        ["Rok " + data.years.y2 + ":", evaluationResults.categories.y2 || '—', auditObligation.y2, "", ""],
        ["Rok " + data.years.y1 + ":", evaluationResults.categories.y1 || '—', auditObligation.y1, "", ""],
        ["Rok " + data.years.y0 + ":", evaluationResults.categories.y0 || '—', auditObligation.y0, "", ""],
        ["", "", "", "", ""],
        ["Datum vytvoření:", new Date().toLocaleString("cs-CZ"), "", "", ""]
      ];
      // Determine official audit obligation for the controlled year
      const officialAudit = auditObligation.y0; // Current year audit obligation
      
      // Insert official category and audit rows
      parameters.push(["", "", "", "", ""]);
      parameters.push(["Pro kontrolovaný rok účetní jednotka je vnímána za:", getOfficialCategory(evaluationResults.categories), officialAudit, "", ""]);
      // Add unit info rows
      parameters.unshift(["", "", "", "", ""]);
      parameters.unshift(["KONTROLOVANÁ ÚČETNÍ JEDNOTKA", "", "", "", ""]);
      parameters.unshift(["Typ:", data.unitType, "", "", ""]);
      parameters.unshift(["IČO:", data.unitICO, "", "", ""]);
      parameters.unshift(["Název:", data.unitName, "", "", ""]);
      // Use selected cell as starting point
      const startRow = selectedStartCell.rowIndex;
      const startCol = selectedStartCell.columnIndex;
      // Insert data
      const range = sheet.getRangeByIndexes(startRow, startCol, parameters.length, 5);
      range.values = parameters;
      // Format section header (KONTROLOVANÁ ÚČETNÍ JEDNOTKA)
      const unitHeaderRange = sheet.getRangeByIndexes(startRow + 3, startCol, 1, 2);
      unitHeaderRange.format.font.bold = true;
      unitHeaderRange.format.fill.color = "#e0e0e0";
      
      // Format section headers (PROVĚRKA KLIENTA, FINANČNÍ ÚDAJE, ZDROJE DAT, VYHODNOCENÍ)
      const proverkaHeader = sheet.getRangeByIndexes(startRow + 5, startCol, 1, 5);
      proverkaHeader.format.font.bold = true;
      proverkaHeader.format.font.size = 14;
      proverkaHeader.format.fill.color = "#1CB5A6";
      proverkaHeader.format.font.color = "white";
      
      const financialHeader = sheet.getRangeByIndexes(startRow + 10, startCol, 1, 5);
      financialHeader.format.font.bold = true;
      financialHeader.format.font.size = 14;
      financialHeader.format.fill.color = "#1CB5A6";
      financialHeader.format.font.color = "white";
      
      const zdrojeHeader = sheet.getRangeByIndexes(startRow + 16, startCol, 1, 5);
      zdrojeHeader.format.font.bold = true;
      zdrojeHeader.format.font.size = 14;
      zdrojeHeader.format.fill.color = "#1CB5A6";
      zdrojeHeader.format.font.color = "white";
      
      const vyhodnoceniHeader = sheet.getRangeByIndexes(startRow + 22, startCol, 1, 3);
      vyhodnoceniHeader.format.font.bold = true;
      vyhodnoceniHeader.format.font.size = 14;
      vyhodnoceniHeader.format.fill.color = "#1CB5A6";
      vyhodnoceniHeader.format.font.color = "white";
      
      // Format data table header (Years row)
      const tableHeaderRange = sheet.getRangeByIndexes(startRow + 11, startCol, 1, 5);
      tableHeaderRange.format.font.bold = true;
      tableHeaderRange.format.fill.color = "#e0e0e0";
      
      // Format Aktiva row (accounting format without decimals)
      const aktivaRange = sheet.getRangeByIndexes(startRow + 12, startCol + 1, 1, 4);
      aktivaRange.numberFormat = [["#,##0"]];
      
      // Format Obrat row (accounting format without decimals)
      const obratRange = sheet.getRangeByIndexes(startRow + 13, startCol + 1, 1, 4);
      obratRange.numberFormat = [["#,##0"]];
      
      // Format Zaměstnanci row (accounting format without decimals)
      const zamestnanciRange = sheet.getRangeByIndexes(startRow + 14, startCol + 1, 1, 4);
      zamestnanciRange.numberFormat = [["#,##0"]];
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

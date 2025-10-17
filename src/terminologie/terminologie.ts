/*
 * Terminology Add-in for Financial Auditing
 * Hierarchical terminology browser with search functionality
 */

/* global console, document, Office */

import { terminologyData, TerminologyEntry, TerminologyCategory, TerminologySubcategory, searchTerminology, getTerminologyById } from "../data/terminology";

declare var Office: any;

let currentSearchResults: TerminologyEntry[] = [];

Office.onReady((info: any) => {
  if (info.host === Office.HostType.Excel) {
    document.getElementById("sideload-msg")!.style.display = "none";
    document.getElementById("app-body")!.style.display = "flex";
    
    initializeTerminologyTree();
    setupSearchFunctionality();
    setupModal();
  }
});

function initializeTerminologyTree(): void {
  const treeContainer = document.getElementById("tree-container");
  if (!treeContainer) return;

  treeContainer.innerHTML = "";

  terminologyData.categories.forEach(category => {
    const categoryElement = createCategoryElement(category);
    treeContainer.appendChild(categoryElement);
  });
}

function createCategoryElement(category: TerminologyCategory): HTMLElement {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "tree-category";

  const categoryHeader = document.createElement("div");
  categoryHeader.className = "tree-category-header";
  categoryHeader.innerHTML = `
    <i class="ms-Icon ms-Icon--ChevronRight category-icon"></i>
    <span class="category-name ms-font-m-plus">${category.name}</span>
  `;

  const categoryContent = document.createElement("div");
  categoryContent.className = "tree-category-content";
  categoryContent.style.display = "none";

  categoryHeader.addEventListener("click", () => {
    const isExpanded = categoryContent.style.display !== "none";
    categoryContent.style.display = isExpanded ? "none" : "block";
    const icon = categoryHeader.querySelector(".category-icon");
    if (icon) {
      icon.className = isExpanded 
        ? "ms-Icon ms-Icon--ChevronRight category-icon"
        : "ms-Icon ms-Icon--ChevronDown category-icon";
    }
  });

  // Add subcategories
  if (category.subcategories) {
    category.subcategories.forEach(subcategory => {
      const subcategoryElement = createSubcategoryElement(subcategory);
      categoryContent.appendChild(subcategoryElement);
    });
  }

  // Add direct entries (if any)
  if (category.entries) {
    category.entries.forEach(entry => {
      const entryElement = createEntryElement(entry);
      categoryContent.appendChild(entryElement);
    });
  }

  categoryDiv.appendChild(categoryHeader);
  categoryDiv.appendChild(categoryContent);
  
  return categoryDiv;
}

function createSubcategoryElement(subcategory: TerminologySubcategory): HTMLElement {
  const subcategoryDiv = document.createElement("div");
  subcategoryDiv.className = "tree-subcategory";

  const subcategoryHeader = document.createElement("div");
  subcategoryHeader.className = "tree-subcategory-header";
  subcategoryHeader.innerHTML = `
    <i class="ms-Icon ms-Icon--ChevronRight subcategory-icon"></i>
    <span class="subcategory-name ms-font-m">${subcategory.name}</span>
  `;

  const subcategoryContent = document.createElement("div");
  subcategoryContent.className = "tree-subcategory-content";
  subcategoryContent.style.display = "none";

  subcategoryHeader.addEventListener("click", () => {
    const isExpanded = subcategoryContent.style.display !== "none";
    subcategoryContent.style.display = isExpanded ? "none" : "block";
    const icon = subcategoryHeader.querySelector(".subcategory-icon");
    if (icon) {
      icon.className = isExpanded 
        ? "ms-Icon ms-Icon--ChevronRight subcategory-icon"
        : "ms-Icon ms-Icon--ChevronDown subcategory-icon";
    }
  });

  // Add entries
  subcategory.entries.forEach(entry => {
    const entryElement = createEntryElement(entry);
    subcategoryContent.appendChild(entryElement);
  });

  subcategoryDiv.appendChild(subcategoryHeader);
  subcategoryDiv.appendChild(subcategoryContent);
  
  return subcategoryDiv;
}

function createEntryElement(entry: TerminologyEntry): HTMLElement {
  const entryDiv = document.createElement("div");
  entryDiv.className = "tree-entry";
  entryDiv.innerHTML = `
    <i class="ms-Icon ms-Icon--Dictionary entry-icon"></i>
    <span class="entry-name ms-font-m">${entry.term}</span>
  `;

  entryDiv.addEventListener("click", () => {
    showTerminologyModal(entry);
  });

  return entryDiv;
}

function setupSearchFunctionality(): void {
  const searchInput = document.getElementById("search-input") as HTMLInputElement;
  const searchClear = document.getElementById("search-clear");
  const searchResults = document.getElementById("search-results");
  const terminologyTree = document.getElementById("terminology-tree");

  if (!searchInput || !searchClear || !searchResults || !terminologyTree) return;

  let searchTimeout: number;

  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = window.setTimeout(() => {
      const query = searchInput.value.trim();
      
      if (query.length === 0) {
        // Show tree, hide search results
        searchResults.style.display = "none";
        terminologyTree.style.display = "block";
        searchClear.style.display = "none";
        return;
      }

      if (query.length < 2) return; // Wait for at least 2 characters

      performSearch(query);
      searchClear.style.display = "block";
    }, 300);
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchResults.style.display = "none";
    terminologyTree.style.display = "block";
    searchClear.style.display = "none";
  });
}

function performSearch(query: string): void {
  const searchResults = document.getElementById("search-results");
  const searchResultsList = document.getElementById("search-results-list");
  const terminologyTree = document.getElementById("terminology-tree");

  if (!searchResults || !searchResultsList || !terminologyTree) return;

  currentSearchResults = searchTerminology(query, terminologyData);

  searchResultsList.innerHTML = "";

  if (currentSearchResults.length === 0) {
    searchResultsList.innerHTML = '<p class="ms-font-m">Žádné výsledky nenalezeny.</p>';
  } else {
    currentSearchResults.forEach(entry => {
      const resultElement = document.createElement("div");
      resultElement.className = "search-result-item";
      resultElement.innerHTML = `
        <div class="result-term ms-font-m-plus">${entry.term}</div>
        <div class="result-definition ms-font-s">${entry.definition}</div>
      `;

      resultElement.addEventListener("click", () => {
        showTerminologyModal(entry);
      });

      searchResultsList.appendChild(resultElement);
    });
  }

  // Show search results, hide tree
  searchResults.style.display = "block";
  terminologyTree.style.display = "none";
}

function setupModal(): void {
  const modal = document.getElementById("terminology-modal");
  const modalClose = document.getElementById("modal-close");

  if (!modal || !modalClose) return;

  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
}

function convertUrlsToLinks(text: string): string {
  // Regex pro detekci URL (HTTP, HTTPS, a SharePoint odkazy)
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/g;
  
  return text.replace(urlRegex, (url) => {
    // Zkrácený text pro zobrazení (max 50 znaků)
    const displayText = url.length > 50 ? url.substring(0, 47) + '...' : url;
    
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="terminology-link">${displayText}</a>`;
  });
}

function showTerminologyModal(entry: TerminologyEntry): void {
  const modal = document.getElementById("terminology-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDefinition = document.getElementById("modal-definition");
  const modalDescription = document.getElementById("modal-description");
  const modalDescriptionSection = document.getElementById("modal-description-section");
  const modalExamples = document.getElementById("modal-examples");
  const modalExamplesSection = document.getElementById("modal-examples-section");
  const modalRelated = document.getElementById("modal-related");
  const modalRelatedSection = document.getElementById("modal-related-section");

  if (!modal || !modalTitle || !modalDefinition) return;

  modalTitle.textContent = entry.term;
  modalDefinition.innerHTML = convertUrlsToLinks(entry.definition);

  // Handle description
  if (entry.description && modalDescription && modalDescriptionSection) {
    modalDescription.innerHTML = convertUrlsToLinks(entry.description);
    modalDescriptionSection.style.display = "block";
  } else if (modalDescriptionSection) {
    modalDescriptionSection.style.display = "none";
  }

  // Handle examples
  if (entry.examples && entry.examples.length > 0 && modalExamples && modalExamplesSection) {
    modalExamples.innerHTML = "";
    entry.examples.forEach(example => {
      const li = document.createElement("li");
      // If the example contains a URL, make it clickable
      li.innerHTML = convertUrlsToLinks(example);
      modalExamples.appendChild(li);
    });
    modalExamplesSection.style.display = "block";
  } else if (modalExamplesSection) {
    modalExamplesSection.style.display = "none";
  }

  // Handle related terms
  if (entry.relatedTerms && entry.relatedTerms.length > 0 && modalRelated && modalRelatedSection) {
    modalRelated.innerHTML = "";
    entry.relatedTerms.forEach(relatedId => {
      const relatedEntry = getTerminologyById(relatedId, terminologyData);
      if (relatedEntry) {
        const relatedButton = document.createElement("button");
        relatedButton.className = "related-term-btn ms-Button ms-Button--primary";
        relatedButton.textContent = relatedEntry.term;
        relatedButton.addEventListener("click", () => {
          showTerminologyModal(relatedEntry);
        });
        modalRelated.appendChild(relatedButton);
      }
    });
    modalRelatedSection.style.display = "block";
  } else if (modalRelatedSection) {
    modalRelatedSection.style.display = "none";
  }

  modal.classList.remove("hidden");
}

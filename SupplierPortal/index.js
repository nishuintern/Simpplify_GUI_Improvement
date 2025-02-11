// const toggleSidebarButton = document.getElementById("toggle-sidebar");
// const sidebar = document.querySelector(".sidebar");

// toggleSidebarButton.addEventListener("click", () => {
//   if (sidebar.classList.contains("collapsed")) {
//     sidebar.classList.toggle("expanded");
//   } else if (sidebar.classList.contains("collapsed")) {
//     sidebar.classList.toggle("collapsed");
//   } else {
//     sidebar.classList.toggle("collapsed");
//   }
// });

//Po Search
// function searchPoNumber(event) {
//   event.preventDefault(); // Prevent form submission

//   // Get form elements
//   const customer = document.getElementById("customer-input").value.trim(); // Customer input field
//   const searchBy = document.querySelector('input[name="searchBy"]:checked'); // Selected radio button
//   const errorMessage = document.getElementById("error-message"); // Error message container
//   let queryParams = "";

//   // Reset any previous error message
//   if (errorMessage) errorMessage.textContent = "";

//   // Validate Customer
//   if (!customer) {
//     errorMessage.textContent = "Please select or type a customer.";
//     return;
//   }

//   // Validate SearchBy
//   if (!searchBy) {
//     errorMessage.textContent = "Please select a search type.";
//     return;
//   }

//   // Validate fields based on SearchBy selection
//   if (searchBy.value === "po-no") {
//     const poNumber = document.getElementById("po-number-input").value.trim();
//     if (!poNumber) {
//       errorMessage.textContent = "Please select or type a PO Number.";
//       return;
//     }
//     queryParams = `?type=po-no&custName=${encodeURIComponent(
//       customer
//     )}&ponum=${encodeURIComponent(poNumber)}`;
//   } else if (searchBy.value === "date") {
//     const fromDate = document.getElementById("from-date-input").value.trim();
//     const toDate = document.getElementById("to-date-input").value.trim();

//     if (!fromDate || !toDate) {
//       errorMessage.textContent = "Please select both From Date and To Date.";
//       return;
//     }
//     if (new Date(fromDate) > new Date(toDate)) {
//       errorMessage.textContent = "From Date cannot be later than To Date.";
//       return;
//     }
//     queryParams = `?type=date&custName=${encodeURIComponent(
//       customer
//     )}&fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(
//       toDate
//     )}`;
//   }

//   // Redirect to the search results page with query parameters
//   const searchUrl = `/html/Dashboard/DashboardSearchRes/SearchRes.html${queryParams}`;
//   window.location.href = searchUrl;
// }

// const profileLink=document.getElementById('profile-link').addEventListener('click',function(e){
//   e.preventDefault();
// });

function searchPoNumber(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form values
  const customer = document.getElementById("customer-input").value.trim();
  const searchBy = document.querySelector(
    'input[name="searchBy"]:checked'
  ).value;
  const dynamicInput = document
    .getElementById("dynamic-input")
    .querySelector("input");
  const searchValue = dynamicInput ? dynamicInput.value.trim() : "";

  // Error message element
  const errorMessage = document.getElementById("error-message");

  // Validation
  if (!customer) {
    errorMessage.textContent = "Please select or type a customer.";
    return;
  }

  if (!searchValue) {
    errorMessage.textContent = `Please enter a valid ${
      searchBy === "po-no" ? "PO Number" : "Date"
    }.`;
    return;
  }

  // Clear error message if validation passes
  errorMessage.textContent = "";

  // Save data to local storage
  const formData = {
    customer,
    searchBy,
    searchValue,
  };

  localStorage.setItem("poSearchData", JSON.stringify(formData));

  // Notify the user and optionally render the table or navigate to another page
  console.log("Form data saved to local storage:", formData);

  // (Optional) Render the table dynamically or redirect
  // renderTable(formData); // Uncomment if table rendering is on the same page
  window.location.href =
    "/SupplierPortal/Dashboard/DashboardSearchRes/SearchRes.html"; // Uncomment if navigation to another page is required
}

function renderTable(data) {
  const tableSection = document.getElementById("tableSection");
  const mainTableBody = document.getElementById("mainTableBody");

  // Clear any existing rows in the table
  mainTableBody.innerHTML = "";

  // Create table rows dynamically
  const mainRowId = `collapseRow0`;
  const mainRow = `
    <tr>
      <td>
        <span
          class="toggle-sign fs-6 me-2"
          data-bs-toggle="collapse"
          href="#${mainRowId}"
          role="button"
          aria-expanded="false"
          aria-controls="${mainRowId}"
        >
          +
        </span>
        ${data.searchValue}
      </td>
      <td>${data.customer}</td>
      <td>${data.searchBy === "date" ? data.searchValue : "N/A"}</td>
      <td>$1000.00</td>
    </tr>
  `;

  const expandedRow = `
    <tr class="collapse" id="${mainRowId}">
      <td colspan="5">
        <table style="width: 100%">
          <thead class="table-secondary">
            <tr>
              <th>Item Code</th>
              <th>Order Quantity</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ExampleItemCode</td>
              <td>10</td>
              <td>$100</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  `;

  // Append rows to the main table body
  mainTableBody.innerHTML = mainRow + expandedRow;

  // Scroll to the table section
  tableSection.scrollIntoView({ behavior: "smooth" });
}

// Dynamically update input field based on 'Search By' selection
document.addEventListener("DOMContentLoaded", () => {
  const dynamicInputContainer = document.getElementById("dynamic-input");
  const searchByInputs = document.querySelectorAll('input[name="searchBy"]');

  searchByInputs.forEach((input) => {
    input.addEventListener("change", () => {
      dynamicInputContainer.innerHTML = "";

      if (input.value === "po-no") {
        dynamicInputContainer.innerHTML = `
          <label for="poNumber" class="label-text card-inside-text">
            Enter PO Number:
          </label>
          <input type="text" id="poNumber" class="form-control" placeholder="Enter PO Number" />
        `;
      } else if (input.value === "date") {
        dynamicInputContainer.innerHTML = `
          <label for="searchDate" class="label-text card-inside-text">
            Select Date:
          </label>
          <input type="date" id="searchDate" class="form-control" />
        `;
      }
    });
  });
  // Trigger initial change event to render the default input field
  searchByInputs[0].dispatchEvent(new Event("change"));
  // const searchUrl = `/html/Dashboard/DashboardSearchRes/SearchRes.html${queryParams}`;
  // window.location.href = `/html/Dashboard/DashboardSearchRes/SearchRes.html`;
});

document.addEventListener("DOMContentLoaded", function () {
  const searchByRadios = document.querySelectorAll('input[name="searchBy"]');
  const dynamicInputContainer = document.getElementById("dynamic-input");

  // Render PO Number UI by default
  renderPoNumberUI();

  // Add event listener for radio button changes
  searchByRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (radio.value === "po-no") {
        renderPoNumberUI();
      } else if (radio.value === "date") {
        renderDateUI();
      }
    });
  });

  function renderPoNumberUI() {
    dynamicInputContainer.innerHTML = `
      <label for="PO No" class="d-lg-flex d-sm-block d-md-block">
        <span class="ms-sm-4 ms-lg-1 me-lg-1 ms-md-1 card-inside-text label-text d-lg-flex align-items-center">PO Number</span>
        <input
          id="po-number-input"
          class="ms-sm-4 px-sm-5 py-sm-1 ms-lg-3 px-lg-5 py-lg-1 py-sm-1 customer-input ms-md-3"
          list="po-number-list"
          placeholder="Select or type PO Number" />
        <datalist id="po-number-list">
          <option value="PO-001"></option>
          <option value="PO-002"></option>
          <option value="PO-003"></option>
        </datalist>
      </label>`;
  }

  function renderDateUI() {
    dynamicInputContainer.innerHTML = `
      <label for="From Date" class="d-lg-flex d-sm-block d-md-block">
        <span class="ms-sm-4 ms-lg-1 me-lg-1 ms-md-1 card-inside-text label-text d-lg-flex align-items-center">From Date</span>
        <input id="from-date-input" class="ms-sm-4 px-sm-5 py-sm-1 ms-lg-3 px-lg-5 py-lg-1 py-sm-1 customer-input ms-md-3" type="date" />
      </label>
      <hr/>
      <label for="To Date" class="d-lg-flex d-sm-block d-md-block mt-2">
        <span class="ms-sm-4 ms-lg-4 label-text ms-lg-2 d-flex align-items-center">To Date</span>
        <input id="to-date-input" class="ms-sm-4 px-sm-5 py-sm-1 ms-lg-3 px-lg-5 py-lg-1 py-sm-1 customer-input ms-md-3" type="date" />
      </label>`;
  }
});

function activateLink(event, subSidebarId) {
  // event.preventDefault();
  // event.preventDefault();
  const clickedLink = event.target;

  // Check if the clicked link is already active
  const isAlreadyActive = clickedLink.classList.contains("active");

  // Get all links and sub-sidebars
  const links = document.querySelectorAll(".nav-link");
  const subSidebars = document.querySelectorAll(".sub-sidebar");

  // Remove active state from all links and sub-sidebars
  links.forEach((link) => link.classList.remove("active"));
  subSidebars.forEach((sidebar) => {
    if (sidebar.id === subSidebarId) {
      // Toggle the current sub-sidebar
      sidebar.style.display =
        sidebar.style.display === "block" ? "none" : "block";
      sidebar.classList.remove("active");
    } else {
      // Ensure other sub-sidebars are hidden
      sidebar.style.display = "none";
    }
  });

  // Toggle state for clicked link and associated sub-sidebar
  if (!isAlreadyActive) {
    clickedLink.classList.add("active");

    const activeSubSidebar = document.getElementById(subSidebarId);
    if (activeSubSidebar) {
      activeSubSidebar.classList.add("active");
    }
  } else {
    // If the clicked link was active, reset the layout
    activeSubSidebar.classList.remove("active");
  }
}

// function loadContent(page) {
//     const mainContent = document.getElementById("mainContent");
//     mainContent.style.width = '90%';
//     mainContent.style.height = 'auto';

//     // Fetch the content
//     fetch(page)
//         .then((response) => response.text())
//         .then((html) => {
//             mainContent.innerHTML = html;

//             // Update the URL without reloading the page
//             const currentUrl = window.location.href;
//             const newUrl = currentUrl.includes('?page=') ? currentUrl.split('?page=')[0] : currentUrl;
//             history.pushState(null, '', `${newUrl}?page=${page}`);
//         })
//         .catch((err) => {
//             mainContent.innerHTML = "<p>Error loading content.</p>";
//         });
// }
function loadContent(page) {
  const mainContent = document.getElementById("mainContent");
  mainContent.style.width = "90%";
  mainContent.style.height = "auto";

  // Fetch the content
  fetch(page)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch page: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      mainContent.innerHTML = html;

      // Load and execute inline scripts in the fetched content
      const scripts = mainContent.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src; // External script
        } else {
          newScript.textContent = script.textContent; // Inline script
        }
        document.body.appendChild(newScript);
        document.body.removeChild(newScript); // Cleanup after execution
      });

      // Update the URL without reloading the page
      const currentUrl = window.location.href;
      const newUrl = currentUrl.includes("?page=")
        ? currentUrl.split("?page=")[0]
        : currentUrl;
      history.pushState(null, "", `${newUrl}?page=${page}`);
    })
    .catch((err) => {
      mainContent.innerHTML = "<p>Error loading content.</p>";
      console.error(err);
    });
}
window.onpopstate = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  if (page) {
    loadContent(page);
  }
};

function refreshPage() {
  window.location.reload();
}

function activateIcon(clickedElement) {
  // Remove 'active' class and hide all toggle images
  const allLinks = document.querySelectorAll(".icons-link");
  const allToggleImgs = document.querySelectorAll(".toggle-img");

  allLinks.forEach((link) => link.classList.remove("active"));
  allToggleImgs.forEach((img) => img.classList.add("d-none"));

  // Add 'active' class to clicked link and show corresponding toggle image
  clickedElement.classList.add("active");

  const parentLi = clickedElement.parentElement;
  const toggleImg = parentLi.querySelector(".toggle-img");
  if (toggleImg) {
    toggleImg.classList.remove("d-none");
  }
}

i18next.init({
  fallbackLng: "en",
  debug: true,
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
      },
    },
    hi: {
      translation: {
        welcome: "स्वागत",
      },
    },
    // es: {
    //     translation: {
    //         welcome: "Bienvenido"
    //     }
    // }
  },
});

function changeLanguage(lang) {
  document.getElementById("lang-text").value = lang;
  alert("Language changed to " + (lang === "en" ? "English" : "Hindi"));
}

// document.getElementById('language-selector').addEventListener('change', function () {
//     i18next.changeLanguage(this.value, function (err, t) {
//         if (err) return console.error('Error loading language:', err);

//         document.querySelectorAll('[data-i18n]').forEach(function (el) {
//             el.textContent = i18next.t(el.dataset.i18n);
//         });
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//     // Fetch the external JSON file
//     fetch('/js/tableConfigs.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Network response was not ok: ${response.statusText}`);
//             }
//             return response.json();
//         })
//         .then(tableConfigs => {
//             // Convert the configuration and initialize tables
//             const convertedConfigs = convertTableConfig(tableConfigs);

//             // Initialize all tables
//             convertedConfigs.forEach(config => {
//                 createDataTable(config);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading table configurations:', error);
//         });

//     // Function to convert table configurations
//     function convertTableConfig(input) {
//         return input.map(table => {
//             return {
//                 containerId: table.tableId.replace('#', ''), // Remove '#' for containerId
//                 headers: table.columns.map(column => ({
//                     key: column.data,
//                     label: column.title
//                 })),
//                 data: table.data,
//                 pageSizeOptions: [5, 10, 15], // Default page size options
//                 defaultPageSize: 5 // Default page size
//             };
//         });
//     }

//     // Example createDataTable function (provided earlier)
//     function createDataTable({
//         containerId,
//         headers,
//         data,
//         pageSizeOptions = [5, 10, 15],
//         defaultPageSize = 5,
//     }) {
//         const container = document.getElementById(containerId);
//         let currentPage = 1;
//         let pageSize = defaultPageSize;
//         let sortColumn = null;
//         let sortOrder = "asc";

//         // Create table structure
//         // Create table structure
//         const table = document.createElement("table");
//         table.className = "table text-nowrap table-striped";
//         const thead = document.createElement("thead");
//         const tbody = document.createElement("tbody");
//         tbody.id = `${containerId}-tbody`;
//         table.appendChild(thead);
//         table.appendChild(tbody);

//         // Create a row for the table headers
//         const headerRow = document.createElement("tr");

//         // Add table headers with sorting
//         headers.forEach((header) => {
//             const th = document.createElement("th");
//             th.className = "sortable-header";
//             th.style.display = "flexbox"; // Use flex layout for header
//             th.style.alignItems = "center";
//             th.style.justifyContent = "space-between"; // Push icons to the right

//             const textSpan = document.createElement("span");
//             textSpan.textContent = header.label;
//             textSpan.style.marginRight='20px';

//             const sortIcons = document.createElement("span");
//             sortIcons.className = "sort-icons";
//             sortIcons.style.display = "flex";
//             sortIcons.style.flexDirection = "column";
//             sortIcons.style.marginLeft = "8px"; // Add gap between text and icons
//             sortIcons.paddingLeft = "5px";
//             const ascIcon = document.createElement("span");
//             ascIcon.className = "sort-icon sort-asc";
//             ascIcon.dataset.column = header.key;
//             ascIcon.dataset.order = "asc";
//             ascIcon.title = "Sort Ascending";
//             ascIcon.innerHTML = "&#9650;"; // Up arrow

//             const descIcon = document.createElement("span");
//             descIcon.className = "sort-icon sort-desc";
//             descIcon.dataset.column = header.key;
//             descIcon.dataset.order = "desc";
//             descIcon.title = "Sort Descending";
//             descIcon.innerHTML = "&#9660;"; // Down arrow

//             sortIcons.appendChild(ascIcon);
//             sortIcons.appendChild(descIcon);

//             th.appendChild(textSpan);
//             th.appendChild(sortIcons);

//             th.addEventListener("click", (event) => {
//                 const target = event.target.closest(".sort-icon");
//                 if (!target) return; // Ignore clicks outside icons
//                 const column = target.dataset.column || header.key;
//                 const order = target.dataset.order || (sortOrder === "asc" ? "desc" : "asc");
//                 sortColumn = column;
//                 sortOrder = order;
//                 renderTable();
//             });

//             headerRow.appendChild(th);
//         });

//         // Append the header row to thead
//         thead.appendChild(headerRow);

//         // Controls container (top)
//         const topControls = document.createElement("div");
//         topControls.className = "d-flex justify-content-between align-items-center mb-3";
//         topControls.innerHTML = `
//           <div class='d-flex justify-content-between text-nowrap page-size-container'>
//             <label for="${containerId}-pageSize" class='mt-2 me-2'>Page Size:</label>
//             <select id="${containerId}-pageSize" class="px-2">
//               ${pageSizeOptions
//                 .map(
//                   (size) =>
//                     `<option value="${size}" ${
//                       size === pageSize ? "selected" : ""
//                     }>${size}</option>`
//                 )
//                 .join("")}
//             </select>
//           </div>
//           <div class='d-flex justify-content-between text-nowrap search-div'>
//             <label for="${containerId}-search" class='mt-2 me-2'>Search:</label>
//             <input type="search" id="${containerId}-search" class="search-box" placeholder="Search...">
//           </div>
//         `;

//         // Controls container (bottom)
//         const bottomControls = document.createElement("div");
//         bottomControls.className = "d-flex justify-content-between align-items-center mt-3 pag-div";
//         bottomControls.innerHTML = `
//           <!-- Summary -->
//           <div id="${containerId}-summary" class="text-muted"></div>
//           <!-- Pagination -->
//           <nav>
//             <ul class="pagination" id="${containerId}-pagination"></ul>
//           </nav>
//         `;

//         container.appendChild(topControls);
//         container.appendChild(table);
//         container.appendChild(bottomControls);

//         // Function to sort data
//         function sortData(data) {
//             if (!sortColumn) return data;
//             return [...data].sort((a, b) => {
//                 const valA = a[sortColumn];
//                 const valB = b[sortColumn];
//                 if (valA < valB) return sortOrder === "asc" ? -1 : 1;
//                 if (valA > valB) return sortOrder === "asc" ? 1 : -1;
//                 return 0;
//             });
//         }

//         // Function to render table
//         function renderTable() {
//             const searchValue = document
//                 .getElementById(`${containerId}-search`)
//                 .value.toLowerCase();
//             let filteredData = data.filter((row) => {
//                 return Object.values(row).some((value) =>
//                     value.toString().toLowerCase().includes(searchValue)
//                 );
//             });

//             filteredData = sortData(filteredData);

//             const startIndex = (currentPage - 1) * pageSize;
//             const endIndex = Math.min(startIndex + pageSize, filteredData.length);
//             const paginatedData = filteredData.slice(startIndex, endIndex);

//             tbody.innerHTML = paginatedData
//                 .map(
//                     (row) =>
//                     `<tr>${headers.map((header) => `<td>${row[header.key]}</td>`).join("")}</tr>`
//                 )
//                 .join("");

//             updatePagination(filteredData.length, startIndex + 1, endIndex);
//         }

//         // Function to update pagination and summary
//         function updatePagination(totalItems, start, end) {
//             const summary = document.getElementById(`${containerId}-summary`);
//             const paginationList = document.getElementById(`${containerId}-pagination`);

//             // Update summary
//             summary.textContent = `Showing ${start} to ${end} of (${totalItems} Entries)`;

//             // Update pagination
//             const totalPages = Math.ceil(totalItems / pageSize);
//             paginationList.innerHTML = `
//             <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
//               <button class="page-link" onclick="changePage(${currentPage - 1})">Previous</button>
//             </li>
//             ${[...Array(totalPages).keys()]
//               .map(
//                 (i) => `
//               <li class="page-item ${i + 1 === currentPage ? "active" : ""}">
//                 <button class="page-link" onclick="changePage(${i + 1})">${i + 1}</button>
//               </li>`
//               )
//               .join("")}
//             <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
//               <button class="page-link" onclick="changePage(${currentPage + 1})">Next</button>
//             </li>
//           `;
//         }

//         // Change page
//         window.changePage = (page) => {
//             currentPage = page;
//             renderTable();
//         };

//         // Event listeners
//         document
//             .getElementById(`${containerId}-pageSize`)
//             .addEventListener("change", (event) => {
//                 pageSize = parseInt(event.target.value);
//                 currentPage = 1;
//                 renderTable();
//             });

//         document
//             .getElementById(`${containerId}-search`)
//             .addEventListener("input", () => {
//                 currentPage = 1;
//                 renderTable();
//             });

//         // Initial render
//         renderTable();
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const subsidebar = document.querySelector(".subsidebar-canvas");
  const mainContent = document.querySelector(".main-content");
  const toggleSidebarButton = document.getElementById("toggle-sidebar");
  const subsidebarToggleButton = document.querySelector(".toggle-img");

  // Function to adjust offcanvas position
  function adjustSubsidebarPosition() {
    if (subsidebar.classList.contains("show")) {
      subsidebar.style.left = sidebar.classList.contains("expanded")
        ? "250px"
        : "80px";
    }
  }

  // Sidebar Toggle Function
  toggleSidebarButton.addEventListener("click", () => {
    sidebar.classList.toggle("expanded");
    sidebar.classList.toggle("collapsed");

    // Adjust offcanvas position if it is open
    adjustSubsidebarPosition();
  });

  // Subsidebar (Offcanvas) Toggle Function
  subsidebarToggleButton.addEventListener("click", () => {
    subsidebar.classList.toggle("show");

    // Adjust position based on sidebar state
    adjustSubsidebarPosition();
  });
});

document.getElementsByClassName("mobile-nav").addEventListener("click", function() {
  debugger;
  document.querySelector(".sidebar").classList.toggle("show");
});

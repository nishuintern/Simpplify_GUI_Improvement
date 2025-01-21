function initializeTableManager(configUrl = "/js/tableConfigs.json") {
  const onDomReady = () => {
     fetch(configUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((tableConfigs) => {
        const convertedConfigs = convertTableConfig(tableConfigs);

        convertedConfigs.forEach((config) => {
          if (config.dataUrl) {
            // Fetch data dynamically if `dataUrl` is provided
            fetch(config.dataUrl)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Error fetching table data: ${response.statusText}`);
                }
                return response.json();
              })
              .then((apiData) => {
                config.data = apiData; // Set fetched data to the table configuration
                createDataTable(config);
              })
              .catch((error) =>
                console.error("Error fetching table data:", error)
              );
          } else {
            createDataTable(config); // Use static data from `tableConfigs`
          }
        });
      })
      .catch((error) => console.error("Error loading table configurations:", error));

    function convertTableConfig(input) {
      return input.map((table) => ({
        containerId: table.tableId.replace("#", ""), // Remove '#' for containerId
        headers: table.columns.map((column) => ({
          key: column.data,
          label: column.title,
        })),
        data: table.data || [], // Default to an empty array if no data is provided
        dataUrl: table.dataUrl || null, // Include optional `dataUrl`
        pageSizeOptions: [5, 10, 15], // Default page size options
        defaultPageSize: 5, // Default page size
      }));
    }

    function createDataTable({
      containerId,
      headers,
      data,
      dataUrl,
      pageSizeOptions = [5, 10, 15],
      defaultPageSize = 5,
    }) {
      const container = document.getElementById(containerId);

      if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return; // Exit the function if the container is not found
      }
      let currentPage = 1;
      let pageSize = defaultPageSize;
      let sortColumn = null;
      let sortOrder = "asc";

      // Create table structure
      const tableDiv = document.createElement("div");
      tableDiv.className = "table-responsive-lg table-responsive-md table-responsive-sm";
      const table = document.createElement("table");
      table.className = "table  text-nowrap";
      const thead = document.createElement("thead");
      thead.className = "table table-secondary";
      const tbody = document.createElement("tbody");
      tbody.id = `${containerId}-tbody`;
      tbody.className="table text-wrap overflow-x-auto";
      tbody.className="table text-wrap";
      const tfooter = document.createElement("tfoot");
      tfooter.className = "table table-secondary";
      table.appendChild(thead);
      table.appendChild(tbody);
      table.appendChild(tfooter);
      tableDiv.appendChild(table);

      // Create a row for the table headers
      const headerRow = document.createElement("tr");

      // Add table headers with sorting
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.className = "sortable-header";
        th.style.display = "flexbox"; // Use flex layout for header
        th.style.alignItems = "center";
        th.style.justifyContent = "space-between"; // Push icons to the right

        const textSpan = document.createElement("span");
        textSpan.textContent = header.label;
        textSpan.style.marginRight = "20px";

        const sortIcons = document.createElement("span");
        sortIcons.className = "sort-icons";
        sortIcons.style.display = "flex";
        sortIcons.style.flexDirection = "column";
        sortIcons.style.marginLeft = "8px"; // Add gap between text and icons
        sortIcons.paddingLeft = "5px";
        const ascIcon = document.createElement("span");
        ascIcon.className = "sort-icon sort-asc";
        ascIcon.dataset.column = header.key;
        ascIcon.dataset.order = "asc";
        ascIcon.title = "Sort Ascending";
        ascIcon.innerHTML = "&#9650;"; // Up arrow

        const descIcon = document.createElement("span");
        descIcon.className = "sort-icon sort-desc";
        descIcon.dataset.column = header.key;
        descIcon.dataset.order = "desc";
        descIcon.title = "Sort Descending";
        descIcon.innerHTML = "&#9660;"; // Down arrow

        sortIcons.appendChild(ascIcon);
        sortIcons.appendChild(descIcon);

        th.appendChild(textSpan);
        th.appendChild(sortIcons);

        th.addEventListener("click", (event) => {
          const target = event.target.closest(".sort-icon");
          if (!target) return; // Ignore clicks outside icons
          const column = target.dataset.column || header.key;
          const order =
            target.dataset.order || (sortOrder === "asc" ? "desc" : "asc");
          sortColumn = column;
          sortOrder = order;
          renderTable();
        });

        headerRow.appendChild(th);
      });

      // Append the header row to thead
      thead.appendChild(headerRow);

      // Controls container (top)
      const topControls = document.createElement("div");
      topControls.className =
        "d-flex justify-content-between align-items-center m-2";
      topControls.innerHTML = `
        <div class="page-size-container d-flex align-items-center">
          <label for="${containerId}-pageSize" class='me-1'>Page Size:</label>
          <select id="${containerId}-pageSize" class='px-3 py-1'>
            ${pageSizeOptions
              .map(
                (size) =>
                  `<option value="${size}" ${
                    size === pageSize ? "selected" : ""
                  }>${size}</option>`
              )
              .join("")}
          </select>
        </div>
        <div class="search-div d-flex">
          <label for="${containerId}-search" class='mt-2 me-2 py-1 d-flex'>Search:</label>
          <input type="search" id="${containerId}-search" placeholder="Search...">
        </div>
      `;

      // Controls container (bottom)
      const bottomControls = document.createElement("div");
      bottomControls.className =
        "d-flex justify-content-between align-items-center m-2 pag-div";
      bottomControls.innerHTML = `
        <!-- Summary -->
        <div id="${containerId}-summary" class="text-muted"></div>
        <!-- Pagination -->
        <nav>
            <ul class="pagination" id="${containerId}-pagination"></ul>
        </nav>
        `;

      container.appendChild(topControls);
      container.appendChild(tableDiv);
      container.appendChild(bottomControls);

      // Function to sort data
      function sortData(data) {
        if (!sortColumn) return data;
        return [...data].sort((a, b) => {
          const valA = a[sortColumn];
          const valB = b[sortColumn];
          if (valA < valB) return sortOrder === "asc" ? -1 : 1;
          if (valA > valB) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });
      }

      // Function to render table
      function renderTable() {
        const searchValue = document
          .getElementById(`${containerId}-search`)
          .value.toLowerCase();
        let filteredData = data.filter((row) => {
          return Object.values(row).some((value) =>
            value.toString().toLowerCase().includes(searchValue)
          );
        });

        filteredData = sortData(filteredData);

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, filteredData.length);
        const paginatedData = filteredData.slice(startIndex, endIndex);
        const buttonConfigs = [
          {
            class: 'btn-blue',
            text: 'Download',
            onClick: 'handleBlueButton();',
            backgroundColor: '#007bff',
          },
          {
            class: 'btn-orange',
            text: 'Dispatch',
            onClick: 'handleOrangeButton("Hello");',
            backgroundColor: '#fd7e14',
          },
          {
            class: 'btn-green',
            text: 'ASN',
            onClick: 'handleGreenButton("World");',
            backgroundColor: '#28a745',
          }
        ];
        tbody.innerHTML = paginatedData
          .map(
            (row) =>
              `<tr>${headers
                .map((header) => {
                  if (header.label === "Status" || header.label === "Action") {
                    return `<td>
                      ${buttonConfigs
                        .map(
                          (config) => `
                            <button
                              class='${config.class} text-white btn btn-sm btn-lg btn-md px-lg-2'
                              onclick='${config.onClick}(${row[header.value]})'
                              style='background-color: ${config.backgroundColor};'>
                              ${config.text}
                            </button>`
                        )
                        .join("")}
                    </td>`;
                  } else {
                    return `<td>${row[header.key]}</td>`;
                  }
                })
                .join("")}</tr>`
          )
          .join("");

        updatePagination(filteredData.length, startIndex + 1, endIndex);
      }

      // Function to update pagination and summary
      function updatePagination(totalItems, start, end) {
        const summary = document.getElementById(`${containerId}-summary`);
        const paginationList = document.getElementById(
          `${containerId}-pagination`
        );

        // Update summary
        summary.textContent = `Showing ${start} to ${end} of (${totalItems} Entries)`;

        // Update pagination
        const totalPages = Math.ceil(totalItems / pageSize);
        paginationList.innerHTML = `
            <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <button class="page-link" onclick="changePage(${
              currentPage - 1
            })">Previous</button>
            </li>
            ${[...Array(totalPages).keys()]
              .map(
                (i) => `
            <li class="page-item ${i + 1 === currentPage ? "active" : ""}">
                <button class="page-link" onclick="changePage(${i + 1})">${
                  i + 1
                }</button>
            </li>`
              )
              .join("")}
            <li class="page-item ${
              currentPage === totalPages ? "disabled" : ""
            }">
            <button class="page-link" onclick="changePage(${
              currentPage + 1
            })">Next</button>
            </li>
        `;
      }

      // Change page
      window.changePage = (page) => {
        currentPage = page;
        renderTable();
      };

      // Event listeners
      document
        .getElementById(`${containerId}-pageSize`)
        .addEventListener("change", (event) => {
          pageSize = parseInt(event.target.value);
          currentPage = 1;
          renderTable();
        });

      document
        .getElementById(`${containerId}-search`)
        .addEventListener("input", () => {
          currentPage = 1;
          renderTable();
        });

      // Initial render
      renderTable();
    }
  };

  // Check if DOM is already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onDomReady);
  } else {
    // If DOM is already loaded, call the function directly
    onDomReady();
  }
}

// Example functions for handling button clicks
function handleBlueButton(value) {
  try {
      // Ensure jsPDF is loaded
      if (!window.jspdf || !window.jspdf.jsPDF) {
          console.error("jsPDF library is not loaded. Please include it in your project.");
          return;
      }

      // Import jsPDF
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();

      // Add dynamic content to the PDF using the 'value' parameter
      const content = value || "This is your dynamically generated PDF file!";
      pdf.text(content, 10, 10);

      // Save the PDF with a dynamic filename
      const fileName = `document_${Date.now()}.pdf`; // Example: document_1677888800000.pdf
      pdf.save(fileName);

      console.log(`PDF '${fileName}' has been generated successfully.`);
  } catch (error) {
      console.error("An error occurred while generating the PDF:", error);
  }
}


function handleOrangeButton(value) {
  console.log('Dispatch button clicked with value:', value);
  // Add your functionality here
}

function handleGreenButton(value) {
  console.log('ASN button clicked with value:', value);
  // Add your functionality here
}

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
      tableDiv.className =
        "table-responsive-lg table-responsive-md table-responsive-sm custom-scrollbar";
      const table = document.createElement("table");
      table.className = "table text-nowrap";
      const thead = document.createElement("thead");
      thead.className = "table table-secondary p-3";
      const tbody = document.createElement("tbody");
      tbody.className = "table text-wrap";
      tbody.id = `${containerId}-tbody`;
      table.appendChild(thead);
      table.appendChild(tbody);
      tableDiv.appendChild(table);

      // Create a row for the table headers
      const headerRow = document.createElement("tr");
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header.label;
        th.className = "sortable-header";

        // Sorting event
        th.addEventListener("click", () => {
          sortColumn = header.key;
          sortOrder = sortOrder === "asc" ? "desc" : "asc";
          renderTable();
        });
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
            class: 'btn-show-img',
            text: 'Show Image',
            onClick: 'handleBlueButton',
            backgroundColor: '#ffff',
            color:'#424F9C',
          },
          {
            class: 'btn-blue',
            text: 'Map/Edit HSN',
            onClick: 'handleOrangeButton',
            backgroundColor: '#027EDC',
            color:'#FFFFFF',
          },
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
                              class='${config.class}'
                              onclick='${config.onClick}(${row[header.key]})'
                              style='background-color: ${config.backgroundColor}; color:${config.color}; background-image: ${config.backgroundImage};'>
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
  console.log('Download button clicked with value:', value);
  // Add your functionality here
}

function handleOrangeButton(value) {
  console.log('Dispatch button clicked with value:', value);
  // Add your functionality here
}

function handleGreenButton(value) {
  console.log('ASN button clicked with value:', value);
  // Add your functionality here
}

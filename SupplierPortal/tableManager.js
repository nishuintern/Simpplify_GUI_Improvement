function initializeTableManager(configUrl = "/js/tableConfigs.json") {
  const onDomReady = () => {
    fetch(configUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
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
                  throw new Error(
                    `Error fetching table data: ${response.statusText}`
                  );
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
      .catch((error) =>
        console.error("Error loading table configurations:", error)
      );

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
      dataUrl, // Remains for clarity but unused after fetching
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
        "table-container table-responsive-lg table-responsive-md table-responsive-sm custom-scrollbar";
      const table = document.createElement("table");
      table.className = "table text-nowrap";
      const thead = document.createElement("thead");
      thead.className = "table p-3";
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

        headerRow.appendChild(th);
      });

      // Append the header row to thead
      thead.appendChild(headerRow);

      // Add pagination, search, and controls
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

      const bottomControls = document.createElement("div");
      bottomControls.className =
        "d-flex justify-content-between align-items-center m-2";
      bottomControls.innerHTML = `
        <div id="${containerId}-summary" class="text-muted"></div>
        <nav>
          <ul class="pagination" id="${containerId}-pagination"></ul>
        </nav>
      `;

      container.appendChild(topControls);
      container.appendChild(tableDiv);
      container.appendChild(bottomControls);

      // Function to render table
      function renderTable() {
        const searchValue = document
          .getElementById(`${containerId}-search`)
          .value.toLowerCase();

        // Ensure data is valid
        let filteredData = Array.isArray(data) ? data : [];

        // Filter data based on search input
        filteredData = filteredData.filter((row) => {
          return Object.values(row).some((value) =>
            value.toString().toLowerCase().includes(searchValue)
          );
        });

        // Check if any row contains data for the headers, if not, set isEmpty to true
        const isEmpty = filteredData.every((row) =>
          headers.every(
            (header) =>
              !row[header.key] || row[header.key].toString().trim() === ""
          )
        );

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, filteredData.length);
        const paginatedData = filteredData.slice(startIndex, endIndex);

        tbody.innerHTML = "";
        const buyerCustomer =
          document.getElementById("buyer-customer")?.value || "";
        const buyerBank = document.getElementById("buyer-bank")?.value || "";
        if (isEmpty || paginatedData.length === 0) {
          // Show 'No data to display' message if data for headers is empty
          tbody.innerHTML = `<tr><td colspan="${
            headers.length || 1
          }" class="text-center">No data to display</td></tr>`;
          updatePagination(0, 0, 0); // No pagination items
        } else {
          // Populate table rows
          tbody.innerHTML = paginatedData
            .map((row) => {
              if (
                buyerCustomer === "Indoasian" ||
                buyerBank === "HDFC" ||
                buyerBank === "HDSC"
              ) {
                const matchesBuyerConditions =
                  (buyerCustomer && row.Customer === buyerCustomer) ||
                  (buyerBank && row.BankName === buyerBank);
                // If buyer conditions are provided, filter based on them
                return (
                  matchesSearch &&
                  ((!buyerCustomer && !buyerBank) || matchesBuyerConditions)
                );
              }
              const configs = [
                (success = {
                  color: "#FFFFFF",
                  background: "#008000",
                }),
                (leading = {
                  color: "#3C4059",
                  background: "#FFFF00",
                }),
                {
                  color: "#FFFFFF",
                  background: "#FF0000",
                },
              ];
              // Check if this table requires the row color logic
              let rowClass = "";

              if (containerId === "watchBids") {
                // Apply logic for this specific table
                if (row.Action === "win") {
                  rowClass = "table-success"; // Green background for "win"
                } else if (row.Action === "not sure") {
                  rowClass = "table-warning"; // Yellow background for "not sure"
                } else if (row.Action === "not win") {
                  rowClass = "table-danger"; // Red background for "not win"
                }
              }
              return `<tr class="${rowClass}">${headers
                .map((header) => `<td >${row[header.key] || ""}</td>`)
                .join("")}</tr>`;
            })
            .join("");

          updatePagination(filteredData.length, startIndex + 1, endIndex);
        }
      }

      // Pagination and search logic
      function updatePagination(totalItems, start, end) {
        const summary = document.getElementById(`${containerId}-summary`);
        const paginationList = document.getElementById(
          `${containerId}-pagination`
        );

        if (totalItems === 0) {
          // Update summary and pagination for no items
          summary.textContent = "Showing 0 to 0 of (0 Entries)";
          paginationList.innerHTML = ""; // No pagination buttons
          return;
        }

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

      window.changePage = (page) => {
        currentPage = page;
        renderTable();
      };

      document
        .getElementById(`${containerId}-pageSize`)
        .addEventListener("change", (e) => {
          pageSize = parseInt(e.target.value);
          renderTable();
        });

      document
        .getElementById(`${containerId}-search`)
        .addEventListener("input", renderTable);

      // Initial render
      renderTable();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onDomReady);
  } else {
    onDomReady();
  }
}

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
        convertedConfigs.forEach((config) => createDataTable(config));
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
        data: table.data,
        pageSizeOptions: [5, 10, 15], // Default page size options
        defaultPageSize: 5, // Default page size
      }));
    }

    function createDataTable({
      containerId,
      headers,
      data,
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
      // Create table structure
      const tableDiv = document.createElement("div");
      tableDiv.className =
        "table-responsive-lg table-responsive-md table-responsive-sm custom-scrollbar";
      const table = document.createElement("table");
      table.className = "table text-nowrap";
      const thead = document.createElement("thead");
      thead.className = "table table-secondary p-3";
      const tbody = document.createElement("tbody");
      tbody.className = "table table-responsive";
      tbody.id = `${containerId}-tbody`;
      const tfooter = document.createElement("tfoot");
      tfooter.className = "table table-secondary";
      tbody.className = "table text-wrap";
      table.appendChild(thead);
      table.appendChild(tbody);
      table.appendChild(tfooter);
      tableDiv.appendChild(table);

      // Create a row for the table headers
      const headerRow = document.createElement("tr");
      // const footerRow= document.createElement("tr");
      // tfooter.forEach((tfooter)=>{
      //     const th=document.createElement("th");
      //     footerRow.appendChild(th);
      // })

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
        "d-flex justify-content-between align-items-center m-3";
      topControls.innerHTML = `
        <div class='d-lg-flex d-md-block d-sm-block justify-content-lg-between text-nowrap page-size-container'>
            <label for="${containerId}-pageSize" class='mt-2 me-2 d-block'>Page Size:</label>
            <select id="${containerId}-pageSize" class="px-3 py-2 d-block">
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
        <div class='d-lg-flex d-md-block d-sm-block justify-content-lg-between text-nowrap search-div'>
            <label for="${containerId}-search" class='mt-2 me-lg-2  px-4 py-1 d-block'>Search:</label>
            <input type="search" id="${containerId}-search" class="search-box d-block" placeholder="Search...">
        </div>
        `;

      // Controls container (bottom)
      const bottomControls = document.createElement("div");
      bottomControls.className =
        "d-flex justify-content-between align-items-center mt-3 pag-div";
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
      //   function renderTable() {
      //     const searchValue = document
      //       .getElementById(`${containerId}-search`)
      //       .value.toLowerCase();
      //     let filteredData = data.filter((row) => {
      //       return Object.values(row).some((value) =>
      //         value.toString().toLowerCase().includes(searchValue)
      //       );
      //     });

      //     filteredData = sortData(filteredData);

      //     const startIndex = (currentPage - 1) * pageSize;
      //     const endIndex = Math.min(startIndex + pageSize, filteredData.length);
      //     const paginatedData = filteredData.slice(startIndex, endIndex);
      //     tbody.innerHTML = '';
      //     if (paginatedData.length === 0) {
      //     tbody.innerHTML =
      //         '<tr><td colspan="6" class="text-center">No data to display</td></tr>';
      //     } else {
      //     tbody.innerHTML = paginatedData
      //         .map(
      //         (row) =>
      //             `<tr>${headers
      //             .map((header) => `<td>${row[header.key]}</td>`)
      //             .join("")}</tr>`
      //         )
      //         .join("");
      //     }

      //     updatePagination(filteredData.length, startIndex + 1, endIndex);
      // }
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

      // Function to update pagination and summary
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

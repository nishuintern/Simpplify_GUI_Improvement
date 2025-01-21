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
      dataUrl,
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
      const tableDiv = document.createElement("div");
      tableDiv.className =
        "table-responsive-lg table-responsive-md table-responsive-sm custom-scrollbar";
      const table = document.createElement("table");
      table.className = "table  text-nowrap";
      const thead = document.createElement("thead");
      thead.className = "table table-secondary";
      const tbody = document.createElement("tbody");
      tbody.id = `${containerId}-tbody`;
      tbody.className = "table text-wrap";
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
        tbody.innerHTML = paginatedData
          .map((row) => {
            return `<tr>${headers
              .map((header) => {
                if (header.label === "Status" || header.label === "Action") {
                  if (header.label === "Action") {
                    // Special handling for Action column
                    const actionValue = row[header.key];
                    let actionHTML = "";
                    if (actionValue === "Download") {
                      // Create a link that triggers a download
                      actionHTML = `<a href='#' class='text-decoration-none text-primary bg-light' onclick='downloadFile()'>${actionValue}</a>`;
                    } else if (actionValue === "Download Views Bank") {
                      // Create a link that opens the modal
                      actionHTML = `<a href='#' class='text-decoration-none text-primary' onclick='openModal()'>${actionValue}</a>`;
                    } else {
                      actionHTML = `<a href='#' class='text-decoration-none text-primary'>${actionValue}</a>`;
                    }
                    return `<td>${actionHTML}</td>`;
                  } else {
                    return `<td>${row[header.key] || ""}</td>`;
                  }
                } else {
                  return `<td>${row[header.key] || ""}</td>`;
                }
              })
              .join("")}</tr>`;
          })
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

// Sample functions to handle the actions
function downloadFile(value) {
  // Here you can replace the logic with actual download logic
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

function openModal() {
  // Create the modal dynamically if it doesn't exist
  let modal = document.getElementById('invoiceModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'invoiceModal';
    modal.style.display = 'none'; // Initially hidden
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '9999';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    modal.innerHTML = `
      <div style="
        background: white;
        width: 400px;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      ">
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 15px;
          background: #f5f5f5;
          border-bottom: 1px solid #ddd;
        ">
          <h3 style="margin: 0; font-size: 18px;">Send Invoice</h3>
          <button onclick="closeModal()" style="
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #888;
          ">&times;</button>
        </div>
        <div style="padding: 15px;">
          <table style="
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          ">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Select one</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Bank Code</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Bank Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                  <input type="radio" name="bankSelection" />
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">001</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">HDFC</td>
              </tr>
            </tbody>
          </table>
          <button onclick="sendInvoice()" style="
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 3px;
            font-size: 14px;
            cursor: pointer;
          ">Send Invoice</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // Show the modal
  modal.style.display = 'flex';
}

// Function to close the modal
function closeModal() {
  document.getElementById('invoiceModal').style.display = 'none';
}

// Function to handle the "Send Invoice" button
function sendInvoice() {
  alert('Invoice sent successfully!');
  closeModal();
}
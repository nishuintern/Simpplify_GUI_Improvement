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
      // tableDiv.style.maxWidth = "100%";
      // tableDiv.style.maxHeight = "40vh";
      // tableDiv.style.overflowY = "scroll";
      // tableDiv.style.overflowX="Scroll";
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
            <label for="${containerId}-search" class='mt-2 me-2  py-1 d-block'>Search:</label>
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
            class: "btn-blue",
            text: "Download",
            onClick: "handleDownload1Button();",
            backgroundColor: "#027EDC",
          },
          {
            class: "btn-green-icon",
            text: "",
            onClick: "handlePOButton();",
            backgroundColor: "#3D9B3E",
            backgroundImage: 'url("/icons/flat-color-icons_ok (2).svg")',
          },
          {
            class: "btn-blue",
            text: "Download",
            onClick: "handleDownload2Button();",
            backgroundColor: "#027EDC",
            backgroundImage: 'url("/path/to/green-icon.png")',
          },
        ];
        tbody.innerHTML = paginatedData
          .map(
            (row) =>
              `<tr>${headers
                .map((header) => {
                  if (header.label === "Status" || header.label === "Action") {
                    return `<td>
                    <div class="btn-group">
                    ${buttonConfigs
                    .map(
                      (config) => `
                      <button
                      class='${
                        config.class
                        } text-white'
                        onclick='${config.onClick}(${row[header.value]})'
                        style='background-color: ${
                          config.backgroundColor
                          }; background-image: ${config.backgroundImage};'>
                          ${config.text}
                          </button>`
                        )
                        .join("")}
                        </div>
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

function handleDownload1Button(value) {
  try {
    // Ensure jsPDF is loaded
    if (!window.jspdf || !window.jspdf.jsPDF) {
      console.error(
        "jsPDF library is not loaded. Please include it in your project."
      );
      return;
    }

    // If 'value' is not provided, set a default value
    const content = value || "This is your dynamically generated PDF file!";

    // Import jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.text(content, 10, 10);

    // Save the PDF with a dynamic filename
    const fileName = `document_${Date.now()}.pdf`; // Example: document_1677888800000.pdf
    pdf.save(fileName);

    console.log(`PDF '${fileName}' has been generated successfully.`);
  } catch (error) {
    console.error("An error occurred while generating the PDF:", error);
  }

  // If you want to download an existing file (instead of generating one):
  // const existingPdfPath = 'path/to/your/pdf/file.pdf';
  // window.location.href = existingPdfPath; // Triggers download of the PDF file at the given path
}

function handlePOButton() {
  modalPO();
}

function handleDownload2Button(value) {
  try {
    // Ensure jsPDF is loaded
    if (!window.jspdf || !window.jspdf.jsPDF) {
      console.error(
        "jsPDF library is not loaded. Please include it in your project."
      );
      return;
    }

    // If 'value' is not provided, set a default value
    const content = value || "This is your dynamically generated PDF file!";

    // Import jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.text(content, 10, 10);

    // Save the PDF with a dynamic filename
    const fileName = `document_${Date.now()}.pdf`; // Example: document_1677888800000.pdf
    pdf.save(fileName);

    console.log(`PDF '${fileName}' has been generated successfully.`);
  } catch (error) {
    console.error("An error occurred while generating the PDF:", error);
  }
}
function modalPO() {
  // document.body.innerHTML = "";

  // Adding modal HTML and CSS via JavaScript
  const styleElement = document.createElement("style");
  styleElement.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
font-family: 'Roboto', Arial, sans-serif;
}

.modal {
display: none;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 90%;
max-width: 500px;
max-height: 65vh;
background: white;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
border-radius: 8px;
z-index: 1000;
}

.modal-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;
background-color: #f2f2f2;
border-bottom: 1px solid #ddd;
}

.modal-header h2 {
margin: 0;
font-size: 18px;
}

.modal-header .close {
cursor: pointer;
font-size: 20px;
color: #333;
}

.modal-body {
padding: 15px;
overflow-y: auto;
max-height: 60vh;
}

table {
width: 100%;
border-collapse: collapse;
margin-bottom: 15px;
}

table th, table td {
border: 1px solid #ddd;
padding: 8px;
text-align: left;
}

table th {
background-color: #f9f9f9;
}

.input-field {
width: 100%;
margin-bottom: 20px;
padding: 8px;
border: 1px solid #ddd;
border-radius: 4px;
}

.modal-footer {
display: flex;
justify-content: flex-end;
padding: 10px;
background-color: #f2f2f2;
border-top: 1px solid #ddd;
}

.modal-footer button {
padding: 8px 15px;
margin-left: 5px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 14px;
}

.btn-save { background-color: orange; color: white; }
.btn-accept { background-color: green; color: white; }
.btn-reject { background-color: red; color: white; }
.btn-query { background-color: blue; color: white; }

.btn-save:hover, .btn-accept:hover, .btn-reject:hover, .btn-query:hover {
opacity: 0.8;
}

.modal-overlay {
display: none;
position: fixed;
top: 0;
left: 0;
// width: 100%;
background: rgba(0, 0, 0, 0.5);
z-index: 999;
}

@media (max-height: 600px) {
.modal-body {
  max-height: 50vh;
}
}
`;
  document.head.appendChild(styleElement);

  const modalHTML = `
<div class="modal-overlay" id="modalOverlay"></div>

<div class="modal" id="poModal">
<div class="modal-header">
  <h2>PO Acceptance</h2>
  <span class="close" id="closeModal">&times;</span>
</div>
<div class="modal-body">
  <table>
    <thead>
      <tr>
        <th>Sr.No</th>
        <th>Term & Condition</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>TERM AND CONDITION 1</td>
      </tr>
      <tr>
        <td>2</td>
        <td>TERM AND CONDITION 2</td>
      </tr>
      <tr>
        <td>3</td>
        <td>TERM AND CONDITION 3</td>
      </tr>
      <tr>
        <td>4</td>
        <td>TERM AND CONDITION 4</td>
      </tr>
    </tbody>
  </table>

  <table id="queryTable" style="display: none;">
    <thead>
      <tr>
        <th>Sr.No</th>
        <th>Query</th>
        <th>Reply</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>

  <textarea id="queryField" class="input-field" placeholder="Enter query..."></textarea>
  <textarea id="remarksField" class="input-field" placeholder="Enter remarks..."></textarea>
</div>
<div class="modal-footer">
  <button class="btn-save" id="saveButton">SAVE</button>
  <button class="btn-accept" id="acceptButton">ACCEPT</button>
  <button class="btn-reject">REJECT</button>
  <button class="btn-query" id="queryButton">QUERY</button>
</div>
</div>
`;
  document.body.innerHTML += modalHTML;

  const modal = document.getElementById("poModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const queryField = document.getElementById("queryField");
  const remarksField = document.getElementById("remarksField");
  const queryTable = document.getElementById("queryTable");
  const queryTableBody = queryTable.querySelector("tbody");

  modal.style.display = "block";
  modalOverlay.style.display = "block";

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
  });

  modalOverlay.addEventListener("click", () => {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
  });

  document.getElementById("queryButton").addEventListener("click", () => {
    const queryValue = queryField.value.trim();
    const remarksValue = remarksField.value.trim();

    if (queryValue) {
      queryTable.style.display = "table";

      const row = queryTableBody.insertRow();
      row.insertCell(0).textContent = queryTableBody.rows.length;
      row.insertCell(1).textContent = queryValue;
      row.insertCell(2).textContent = remarksValue || "N/A";

      queryField.value = "";
      remarksField.value = "";
    }
  });

  document.getElementById("saveButton").addEventListener("click", () => {
    const queries = [];
    queryTableBody.querySelectorAll("tr").forEach((row) => {
      const cells = row.querySelectorAll("td");
      queries.push({
        srNo: cells[0].textContent,
        query: cells[1].textContent,
        reply: cells[2].textContent,
      });
    });

    localStorage.setItem("queries", JSON.stringify(queries));
    alert("Data saved to local storage!");
  });

  document.getElementById("acceptButton").addEventListener("click", () => {
    const acceptedTable = document.createElement("table");
    acceptedTable.innerHTML = `
<thead>
  <tr>
    <th>Sr.No</th>
    <th>Query</th>
    <th>Reply</th>
  </tr>
</thead>
<tbody>
</tbody>
`;

    const acceptedTableBody = acceptedTable.querySelector("tbody");
    const queries = JSON.parse(localStorage.getItem("queries")) || [];

    queries.forEach((query) => {
      const row = acceptedTableBody.insertRow();
      row.insertCell(0).textContent = acceptedTableBody.rows.length + 1;
      row.insertCell(1).textContent = query.query;
      row.insertCell(2).textContent = query.reply;
    });

    modal.querySelector(".modal-body").appendChild(acceptedTable);
    alert("Queries added to Accepted Terms table!");
  });
}

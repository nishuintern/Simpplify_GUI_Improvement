// HTML structure is assumed to be already in place.

// JavaScript implementation

document.addEventListener("DOMContentLoaded", () => {
    const customerSelect = document.querySelector(".cus-ban select:first-of-type");
    const bankSelect = document.querySelector(".cus-ban select:last-of-type");
    const invoiceDiv = document.getElementById("buyer-mapping");

    // Function to validate and manipulate table data
    const updateTableData = () => {
        const selectedCustomer = customerSelect.value;
        const selectedBank = bankSelect.value;

        // Clear previous table content
        invoiceDiv.innerHTML = "";

        // Validate selections
        if (selectedCustomer === "Customer") {
            alert("Please select a Customer.");
            return;
        }

        if (selectedBank === "bank") {
            alert("Please select a Bank.");
            return;
        }

        // Generate and display table content based on selections
        const table = document.createElement("table");
        table.classList.add("table", "table-bordered", "table-hover");

        // Table Header
        const thead = document.createElement("thead");
        thead.innerHTML = `
        <tr>
          <th>Customer</th>
          <th>Bank</th>
          <th>Transaction Details</th>
        </tr>
      `;
        table.appendChild(thead);

        // Table Body
        const tbody = document.createElement("tbody");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${selectedCustomer}</td>
        <td>${selectedBank}</td>
        <td>Sample Transaction Data</td>
      `;

        tbody.appendChild(row);
        table.appendChild(tbody);

        // Append table to the invoiceDiv
        invoiceDiv.appendChild(table);
    };

    // Event listeners for dropdown changes
    customerSelect.addEventListener("change", updateTableData);
    bankSelect.addEventListener("change", updateTableData);
});
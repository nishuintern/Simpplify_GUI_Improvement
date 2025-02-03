function fetchDataAndRenderTable() {
    // Select dropdowns for filtering
    const customerDropdown = document.querySelector("[data-dropdown='customer']");
    const bankDropdown = document.querySelector("[data-dropdown='bank']");

    if (!customerDropdown || !bankDropdown) {
        console.error("Dropdown elements not found.");
        return;
    }

    const selectedCustomer = customerDropdown.value;
    const selectedBank = bankDropdown.value;

    // Validate selections
    if (!selectedCustomer || selectedCustomer === "Customer" || !selectedBank || selectedBank === "Bank") {
        console.warn("Please select valid Customer and Bank values.");
        // You can clear the table or show a message here if needed
        return;
    }

    // Loop through all tables and trigger re-render
    document.querySelectorAll("[id$='-tbody']").forEach((tbody) => {
        const containerId = tbody.id.replace("-tbody", ""); // Extract containerId from tbody ID
        const tableElement = document.getElementById(containerId);

        if (!tableElement) {
            console.error(`Table container with ID "${containerId}" not found.`);
            return;
        }

        // Access table data stored during initialization
        const tableData = window.tableData[containerId];
        const headers = window.tableHeaders[containerId];
        if (!tableData || !headers) {
            console.error(`Data or headers for table "${containerId}" not found.`);
            return;
        }

        // Apply filters and search logic
        const filteredData = tableData.filter((row) => {
            return row.customer === selectedCustomer && row.bank === selectedBank;
        });

        // Sort logic (optional, based on headers or user interactions)
        // Example: Sort by first column
        filteredData.sort((a, b) => (a[headers[0].key] < b[headers[0].key] ? -1 : 1));

        // Render the table body with filtered data
        tbody.innerHTML = filteredData
            .map(
                (row) =>
                `<tr>${headers.map((header) => `<td>${row[header.key]}</td>`).join("")}</tr>`
            )
            .join("");
    });
}

// Add event listeners to dropdowns
document.addEventListener("DOMContentLoaded", () => {
    const customerDropdown = document.querySelector("[data-dropdown='customer']");
    const bankDropdown = document.querySelector("[data-dropdown='bank']");

    if (!customerDropdown || !bankDropdown) {
        console.error("Dropdown elements not found.");
        return;
    }

    // Trigger data fetching and rendering on dropdown change
    customerDropdown.addEventListener("change", fetchDataAndRenderTable);
    bankDropdown.addEventListener("change", fetchDataAndRenderTable);
});
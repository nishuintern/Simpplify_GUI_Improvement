function prefillFormDataFromLocalStorage(
  formsSelector,
  localStorageKey = "formData"
) {
  const savedData = localStorage.getItem(localStorageKey);
  if (savedData) {
    const formData = JSON.parse(savedData);
    const forms = document.querySelectorAll(formsSelector);

    forms.forEach((form) => {
      const inputs = form.querySelectorAll("input, select");
      inputs.forEach((input) => {
        if (formData[input.id]) {
          input.value = formData[input.id]; // Prefill field with saved data
        }
      });
    });

    console.log("Form data prefilled from local storage:", formData);
  }
}
prefillFormDataFromLocalStorage("#quotationForm");
document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("itemTableBody");
  const savedData = localStorage.getItem("tableData");

  if (savedData) {
    const rows = JSON.parse(savedData);
    rows.forEach((row) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
          ${row.map((cell) => `<td>${cell}</td>`).join("")}
          <td><button class="btn btn-danger btn-sm deleteRow">Delete</button></td>
        `;
      tableBody.appendChild(newRow);

      // Add delete functionality
      newRow.querySelector(".deleteRow").addEventListener("click", function () {
        this.closest("tr").remove();
        saveTableDataToLocalStorage(); // Update local storage
      });
    });
  }
});

// Example data for different indents




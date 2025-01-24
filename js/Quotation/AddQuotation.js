// class MultiFormHandler {
//   constructor(formsSelector, buttonSelector) {
//     this.formsSelector = formsSelector; // Selector for all forms
//     this.buttonSelector = buttonSelector; // Selector for the button
//     this.quotations = []; // Array to store all added quotations
//     this.init();
//   }

//   // Initialize event listeners
//   init() {
//     const button = document.querySelector(this.buttonSelector);
//     if (button) {
//       button.addEventListener("click", () => this.addQuotation());
//     } else {
//       console.error("Button not found");
//     }
//   }

//   // Collect data from all forms
//   getAllFormData() {
//     const forms = document.querySelectorAll(this.formsSelector); // Select all forms
//     const formData = {};

//     forms.forEach((form) => {
//       const inputs = form.querySelectorAll("input, select");
//       inputs.forEach((input) => {
//         formData[input.id] = input.value; // Collect data using the element's ID as the key
//       });
//     });

//     return formData;
//   }

//   // Add quotation and log all quotations
//   addQuotation() {
//     const newQuotation = this.getAllFormData();
//     this.quotations.push(newQuotation); // Add new data to the array
//     console.log("Current Quotations:", this.quotations);
//   }
// }

// Instantiate the MultiFormHandler
// class MultiFormHandler {
//   constructor(formsSelector, buttonSelector) {
//     this.formsSelector = formsSelector; // Selector for all forms
//     this.buttonSelector = buttonSelector; // Selector for the button
//     this.quotations = []; // Array to store all added quotations
//     this.init();
//   }

//   // Initialize event listeners
//   init() {
//     const button = document.querySelector(this.buttonSelector);
//     if (button) {
//       button.addEventListener("click", () => this.handleFormSubmission());
//     } else {
//       console.error("Button not found");
//     }
//   }

//   // Validate mandatory fields
//   validateMandatoryFields() {
//     const forms = document.querySelectorAll(this.formsSelector); // Select all forms
//     let isValid = true; // Validation flag

//     forms.forEach((form) => {
//       const labels = form.querySelectorAll("label");
//       labels.forEach((label) => {
//         if (label.textContent.includes("*") && label.htmlFor) {
//           const input = form.querySelector(`#${label.htmlFor}`);
//           const errorMessageId = `${label.htmlFor}-error`; // Unique error message ID

//           // Remove existing error message if present
//           let existingError = form.querySelector(`#${errorMessageId}`);
//           if (existingError) {
//             existingError.remove();
//           }

//           if (input && !input.value.trim()) {
//             // Mark as invalid if empty
//             isValid = false;
//             input.classList.add("is-invalid"); // Add Bootstrap's invalid class

//             // Create and display error message
//             const errorMessage = document.createElement("div");
//             errorMessage.id = errorMessageId;
//             errorMessage.className = "invalid-feedback";
//             errorMessage.textContent = "This field is required.";
//             input.insertAdjacentElement("afterend", errorMessage);
//           } else if (input) {
//             input.classList.remove("is-invalid"); // Remove invalid class if valid
//           }
//         }
//       });
//     });

//     if (!isValid) {
//       console.error(
//         "Mandatory fields are not filled. Please complete all required fields."
//       );
//     }

//     return isValid;
//   }

//   // Collect data from all forms
//   getAllFormData() {
//     const forms = document.querySelectorAll(this.formsSelector); // Select all forms
//     const formData = {};

//     forms.forEach((form) => {
//       const inputs = form.querySelectorAll("input, select");
//       inputs.forEach((input) => {
//         formData[input.id] = input.value; // Collect data using the element's ID as the key
//       });
//     });

//     return formData;
//   }

//   // Handle form submission
//   handleFormSubmission() {
//     if (this.validateMandatoryFields()) {
//       this.addQuotation(); // Proceed if validation passes
//     }
//   }

//   // Add quotation and log all quotations
//   addQuotation() {
//     const addNewTask = this.getAllFormData();
//     this.quotations.push(addNewTask); // Add new data to the array
//     console.log("Add New Task:", this.quotations);
//   }
// }

// class MultiFormHandler {
//   constructor(formsSelector, buttonSelector) {
//     this.formsSelector = formsSelector; // Selector for all forms
//     this.buttonSelector = buttonSelector; // Selector for the button
//     this.quotations = []; // Array to store all added quotations
//     this.init();
//   }

//   // Initialize event listeners
//   init() {
//     const button = document.querySelector(this.buttonSelector);
//     if (button) {
//       button.addEventListener("click", () => this.handleFormSubmission());
//     } else {
//       console.error("Button not found");
//     }
//   }

//   // Validate mandatory fields
//   validateMandatoryFields() {
//     const forms = document.querySelectorAll(this.formsSelector); // Select all forms
//     let isValid = true; // Validation flag

//     forms.forEach((form) => {
//       const labels = form.querySelectorAll("label");
//       labels.forEach((label) => {
//         if (label.textContent.includes("*") && label.htmlFor) {
//           const element = form.querySelector(`#${label.htmlFor}`);
//           const errorMessageId = `${label.htmlFor}-error`; // Unique error message ID

//           // Remove existing error message if present
//           let existingError = form.querySelector(`#${errorMessageId}`);
//           if (existingError) {
//             existingError.remove();
//           }

//           if (element) {
//             const isInvalid = this.isFieldInvalid(element);

//             if (isInvalid) {
//               isValid = false;
//               element.classList.add("is-invalid"); // Add Bootstrap's invalid class

//               // Create and display error message
//               const errorMessage = document.createElement("div");
//               errorMessage.id = errorMessageId;
//               errorMessage.className = "invalid-feedback";
//               errorMessage.textContent = "This field is required.";
//               element.insertAdjacentElement("afterend", errorMessage);
//             } else {
//               element.classList.remove("is-invalid"); // Remove invalid class if valid
//             }
//           }
//         }
//       });
//     });

//     if (!isValid) {
//       console.error("Mandatory fields are not filled. Please complete all required fields.");
//     }

//     return isValid;
//   }

//   // Helper function to check if a field is invalid
//   isFieldInvalid(field) {
//     if (field.tagName === "SELECT") {
//       return !field.value || field.value === ""; // Dropdown is invalid if no option is selected
//     }
//     return !field.value.trim(); // Other fields are invalid if empty
//   }

//   // Collect data from all forms
//   getAllFormData() {
//     const forms = document.querySelectorAll(this.formsSelector); // Select all forms
//     const formData = {};

//     forms.forEach((form) => {
//       const inputs = form.querySelectorAll("input, select");
//       inputs.forEach((input) => {
//         formData[input.id] = input.value; // Collect data using the element's ID as the key
//       });
//     });

//     return formData;
//   }

//   // Handle form submission
//   handleFormSubmission() {
//     if (this.validateMandatoryFields()) {
//       this.addQuotation(); // Proceed if validation passes
//     }
//   }

//   // Add quotation and log all quotations
//   addQuotation() {
//     const addNewTask = this.getAllFormData();
//     this.quotations.push(addNewTask); // Add new data to the array
//     console.log("Add New Task:", this.quotations);
//   }
// }

class MultiFormHandler {
  constructor(formsSelector, buttonSelector) {
    this.formsSelector = formsSelector; // Selector for all forms
    this.buttonSelector = buttonSelector; // Selector for the button
    this.localStorageKey = "formData"; // Key to save form data in local storage
    this.quotations = []; // Array to store all added quotations
    this.init();
  }

  // Initialize event listeners
  init() {
    const button = document.querySelector(this.buttonSelector);
    if (button) {
      button.addEventListener("click", () => this.handleFormSubmission());
    } else {
      console.error("Button not found");
    }

    this.addInputChangeListeners(); // Save to local storage on form changes
  }

  // Validate mandatory fields for both inputs and selects
  validateMandatoryFields() {
    const forms = document.querySelectorAll(this.formsSelector); // Select all forms
    let isValid = true; // Validation flag

    forms.forEach((form) => {
      const labels = form.querySelectorAll("label");
      labels.forEach((label) => {
        if (label.textContent.includes("*") && label.htmlFor) {
          const element = form.querySelector(`#${label.htmlFor}`);
          const errorMessageId = `${label.htmlFor}-error`; // Unique error message ID

          // Remove existing error message if present
          let existingError = form.querySelector(`#${errorMessageId}`);
          if (existingError) {
            existingError.remove();
          }

          // Validate input or select field
          if (element) {
            const isInvalid = this.isFieldInvalid(element);

            if (isInvalid) {
              isValid = false;
              element.classList.add("is-invalid"); // Add Bootstrap's invalid class

              // Create and display error message
              const errorMessage = document.createElement("div");
              errorMessage.id = errorMessageId;
              errorMessage.className = "invalid-feedback";
              errorMessage.textContent = "This field is required.";
              element.insertAdjacentElement("afterend", errorMessage);
            } else {
              element.classList.remove("is-invalid"); // Remove invalid class if valid
            }
          }
        }
      });
    });

    if (!isValid) {
      console.error(
        "Mandatory fields are not filled. Please complete all required fields."
      );
    }

    return isValid;
  }

  // Helper function to check if a field is invalid
  isFieldInvalid(field) {
    if (field.tagName === "SELECT") {
      return !field.value || field.value === ""; // Dropdown is invalid if no option is selected
    }
    return !field.value.trim(); // Input fields are invalid if empty
  }

  // Collect data from all forms
  getAllFormData() {
    const forms = document.querySelectorAll(this.formsSelector); // Select all forms
    const formData = {};

    forms.forEach((form) => {
      const inputs = form.querySelectorAll("input, select");
      inputs.forEach((input) => {
        formData[input.id] = input.value; // Collect data using the element's ID as the key
      });
    });

    return formData;
  }

  // Handle form submission
  handleFormSubmission() {
    if (this.validateMandatoryFields()) {
      this.addQuotation(); // Proceed if validation passes
      this.saveToLocalStorage(); // Save form data to local storage
    }
  }

  // Add quotation and log all quotations
  addQuotation() {
    const addNewTask = this.getAllFormData();
    this.quotations.push(addNewTask); // Add new data to the array
    console.log("Add New Task:", this.quotations);
  }

  // Save form data to local storage
  saveToLocalStorage() {
    const formData = this.getAllFormData();
    localStorage.setItem(this.localStorageKey, JSON.stringify(formData));
    console.log("Form data saved to local storage:", formData);
  }

  // Add event listeners to save data to local storage when fields change
  addInputChangeListeners() {
    const forms = document.querySelectorAll(this.formsSelector);

    forms.forEach((form) => {
      const inputs = form.querySelectorAll("input, select");
      inputs.forEach((input) => {
        input.addEventListener("input", () => this.saveToLocalStorage());
      });
    });
  }
}


// Usage example:
// new MultiFormHandler(".form-class", "#submit-button");

// Usage example:
// new MultiFormHandler(".form-class", "#submit-button");
function saveTableDataToLocalStorage() {
  const tableBody = document.getElementById("itemTableBody");
  const rows = tableBody.querySelectorAll("tr");

  const data = Array.from(rows).map((row) => {
    const cells = row.querySelectorAll("td");
    return Array.from(cells)
      .slice(0, -1)
      .map((cell) => cell.textContent); // Exclude the delete button cell
  });

  localStorage.setItem("tableData", JSON.stringify(data));
}
document.getElementById("submitAll").addEventListener("click", function () {
  // Collect values from form fields
  const indent = document.getElementById("indent").value;
  const itemCode = document.getElementById("itemCode").value;
  const hsnSac = document.getElementById("hsnSac").value;
  const qty = document.getElementById("qty").value;
  const cgst = document.getElementById("cgst").value;
  const cgstAmt = document.getElementById("cgstAmt").value;
  const igst = document.getElementById("igst").value;
  const igstAmt = document.getElementById("igstAmt").value;
  const sgst = document.getElementById("sgst").value;
  const sgstAmt = document.getElementById("sgstAmt").value;
  const approved = document.getElementById("approved").value;
  const purchaseUnit = document.getElementById("purchaseUnit").value;
  const rateUnit = document.getElementById("rateUnit").value;
  const packFlag = document.getElementById("packFlag").value;
  const disType = document.getElementById("disType").value;
  const discount = document.getElementById("discount").value;
  const total = document.getElementById("total").value;

  // Check if required fields are filled
  if (
    indent === "Select Indent" ||
    itemCode === "Select" ||
    approved === "Select Approved"
  ) {
    alert("Please fill all required fields.");
    return;
  }

  // Create a new table row
  const tableBody = document.getElementById("itemTableBody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${indent}</td>
    <td>${itemCode}</td>
    <td>${hsnSac || "-"}</td>
    <td>${qty || "-"}</td>
    <td>${packFlag || "-"}</td>
    <td>${discount || "-"}</td>
    <td>${approved}</td>
    <td>${disType || "-"}</td>
    <td>${discount || "-"}</td>
    <td>${purchaseUnit || "-"}</td>
    <td>${rateUnit || "-"}</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>${cgst || "-"}</td>
    <td>${cgstAmt || "-"}</td>
    <td>${igst || "-"}</td>
    <td>${igstAmt || "-"}</td>
    <td>${sgst || "-"}</td>
    <td>${sgstAmt || "-"}</td>
    <td>${total || "-"}</td>
    <td><button class="btn btn-danger btn-sm rounded-2 deleteRow">Delete</button></td>
  `;

  // Append the row to the table body
  tableBody.appendChild(newRow);

  // Save table data to local storage
  saveTableDataToLocalStorage();
  // Clear the form
  document.getElementById("quotationForm").reset();

  // Add event listener to delete button
  newRow.querySelector(".deleteRow").addEventListener("click", function () {
    this.closest("tr").remove();
    saveTableDataToLocalStorage(); // Update local storage
  });
});
document.addEventListener("DOMContentLoaded", () => {
  new MultiFormHandler("form", "#submitAll"); // Pass the form selector and button selector
});

new MultiFormHandler("form", "#submitAll");

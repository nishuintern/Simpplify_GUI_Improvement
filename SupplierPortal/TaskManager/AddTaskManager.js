const saveBtn = document.getElementById("saveData");
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
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
//     const addNewTask = this.getAllFormData();
//     this.quotations.push(addNewTask); // Add new data to the array
//     console.log("Add New Task:", this.quotations);
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
//         if (label.textContent.includes("*")) {
//           const input = form.querySelector(`${label.htmlFor}`);
//           if (input && !input.value.trim()) {
//             // Mark as invalid if empty
//             isValid = false;
//             input.classList.add("error"); // Add error class for styling
//           } else if (input) {
//             input.classList.remove("error"); // Remove error class if valid
//           }
//         }
//       });
//     });

//     if (!isValid) {
//       console.error("Mandatory fields are not filled. Please complete all required fields.");
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

// Usage example:
// new MultiFormHandler(".form-class", "#submit-button");

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
//           if (input && !input.value.trim()) {
//             // Mark as invalid if empty
//             isValid = false;
//             input.classList.add("error"); // Add error class for styling
//           } else if (input) {
//             input.classList.remove("error"); // Remove error class if valid
//           }
//         }
//       });
//     });

//     if (!isValid) {
//       console.error("Mandatory fields are not filled. Please complete all required fields.");
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

// Usage example:
// new MultiFormHandler(".form-class", "#submit-button");
class MultiFormHandler {
  constructor(formsSelector, buttonSelector) {
    this.formsSelector = formsSelector; // Selector for all forms
    this.buttonSelector = buttonSelector; // Selector for the button
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
  }

  // Validate mandatory fields
  validateMandatoryFields() {
    const forms = document.querySelectorAll(this.formsSelector); // Select all forms
    let isValid = true; // Validation flag

    forms.forEach((form) => {
      const labels = form.querySelectorAll("label");
      labels.forEach((label) => {
        if (label.textContent.includes("*") && label.htmlFor) {
          const input = form.querySelector(`#${label.htmlFor}`);
          const errorMessageId = `${label.htmlFor}-error`; // Unique error message ID

          // Remove existing error message if present
          let existingError = form.querySelector(`#${errorMessageId}`);
          if (existingError) {
            existingError.remove();
          }

          if (input && !input.value.trim()) {
            // Mark as invalid if empty
            isValid = false;
            input.classList.add("is-invalid"); // Add Bootstrap's invalid class

            // Create and display error message
            const errorMessage = document.createElement("div");
            errorMessage.id = errorMessageId;
            errorMessage.className = "invalid-feedback";
            errorMessage.textContent = "This field is required.";
            input.insertAdjacentElement("afterend", errorMessage);
          } else if (input) {
            input.classList.remove("is-invalid"); // Remove invalid class if valid
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
    }
  }

  // Add quotation and log all quotations
  addQuotation() {
    const addNewTask = this.getAllFormData();
    this.quotations.push(addNewTask); // Add new data to the array
    console.log("Add New Task:", this.quotations);
  }
}

// Usage example:
// new MultiFormHandler(".form-class", "#submit-button");

document.addEventListener("DOMContentLoaded", () => {
  new MultiFormHandler("form", "#saveData"); // Pass the form selector and button selector
});

new MultiFormHandler("form", "#saveData");

const saveBtn=document.getElementById('saveData');
saveBtn.addEventListener('click', (e)=>{
  e.preventDefault();
})
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
      button.addEventListener("click", () => this.addQuotation());
    } else {
      console.error("Button not found");
    }
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

  // Add quotation and log all quotations
  addQuotation() {
    const newQuotation = this.getAllFormData();
    this.quotations.push(newQuotation); // Add new data to the array
    console.log("Current Quotations:", this.quotations);
  }
}

// Instantiate the MultiFormHandler
document.addEventListener("DOMContentLoaded", () => {
  new MultiFormHandler("form", "#saveData"); // Pass the form selector and button selector
});


new MultiFormHandler("form", "#saveData");

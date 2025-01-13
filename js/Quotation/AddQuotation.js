document.getElementById("submitAll").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Get all forms on the page
  const forms = document.querySelectorAll("form");

  // Object to store combined form data
  const allFormData = {};

  // Iterate over each form
  forms.forEach((form) => {
    // Iterate over all form elements within each form
    const elements = form.elements;
    Array.from(elements).forEach((element) => {
      if (element.name) {
        // For dropdowns, get the selected value
        if (element.tagName === "SELECT") {
          allFormData[element.name] =
            element.options[element.selectedIndex].value;
        } else {
          // For other inputs, get the value
          allFormData[element.name] = element.value;
        }
      }
    });
  });

  // Log the combined data
  console.log("Combined Form Values:", allFormData);
});

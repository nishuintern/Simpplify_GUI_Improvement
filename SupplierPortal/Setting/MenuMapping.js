// Get the dropdown and checkboxes
const serviceTypeDropdown = document.getElementById("serviceType");
const checkboxes = document.querySelectorAll(".menu-checkbox");

// Add event listener to the dropdown
serviceTypeDropdown.addEventListener("change", () => {
  const selectedValue = serviceTypeDropdown.value;

  if (selectedValue === "1") {
    // Mark all checkboxes as checked
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
  } else if (selectedValue === "2") {
    // Uncheck all checkboxes
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
});

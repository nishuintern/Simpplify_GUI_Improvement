const toggleSidebarButton = document.getElementById("toggle-sidebar");
const sidebar = document.querySelector(".sidebar");

toggleSidebarButton.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.toggle("expanded");
  } else if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.toggle("collapsed");
  } else {
    sidebar.classList.toggle("collapsed");
  }
});

// subsidebar toggle

const subsidebarToggleButton = document.querySelector(".toggle-img");
const subsidebar = document.querySelector(".sub-sidebar");

subsidebarToggleButton.addEventListener("click", () => {
  if (subsidebar.classList.contains("d-none")) {
    subsidebar.classList.remove("d-none");
    subsidebar.classList.add("d-block");
  } else if (subsidebar.classList.contains("d-block")) {
    subsidebar.classList.add("d-none");
    subsidebar.classList.remove("d-block");
  } else {
    subsidebar.classList.add("d-none");
  }
});

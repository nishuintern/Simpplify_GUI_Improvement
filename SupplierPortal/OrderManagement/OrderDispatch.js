// const toggleSidebarButton = document.getElementById("toggle-sidebar");
// const sidebar = document.querySelector(".sidebar");

// const sidebar = document.querySelector(".sidebar");
// const subsidebar = document.getElementById("subSidebar0");

// sidebar.addEventListener("transitionend", () => {
//   if (sidebar.classList.contains("expanded")) {
//     subsidebar.style.left = "250px";  // Sidebar expanded hone pe adjust
//   } else {
//     subsidebar.style.left = "80px";   // Sidebar collapsed hone pe adjust
//   }
// });


// subsidebar toggle

// const subsidebarToggleButton = document.querySelector(".toggle-img");
// const subsidebar = document.getElementById("subSidebar0"); // Correct ID use karo

// subsidebarToggleButton.addEventListener("click", () => {
//   if (subsidebar.classList.contains("show")) {
//     subsidebar.classList.remove("show");
//     subsidebar.style.transform = "translateX(100%)"; // Hide when collapsed
//   } else {
//     subsidebar.classList.add("show");
//     subsidebar.style.transform = "translateX(0)"; // Show when expanded
//   }
// });

// function showSubsidebar() {
//   const subsidebarToggleButton = document.querySelector(".toggle-img");
//   const subsidebar = document.getElementById("subSidebar0");

//   subsidebarToggleButton.addEventListener("click", () => {
//     subsidebar.classList.toggle("show"); // Toggle class show
//   });
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const sidebar = document.querySelector(".sidebar");
//   const subsidebar = document.querySelector(".subsidebar-canvas");
//   const mainContent = document.querySelector(".main-content");
//   const toggleSidebarButton = document.getElementById("toggle-sidebar");
//   const subsidebarToggleButton = document.querySelector(".toggle-img");

//   // Function to adjust offcanvas position
//   function adjustSubsidebarPosition() {
//       if (subsidebar.classList.contains("show")) {
//           subsidebar.style.left = sidebar.classList.contains("expanded") ? "250px" : "80px";
//       }
//   }

//   // Sidebar Toggle Function
//   toggleSidebarButton.addEventListener("click", () => {
//       sidebar.classList.toggle("expanded");
//       sidebar.classList.toggle("collapsed");

//       // Adjust offcanvas position if it is open
//       adjustSubsidebarPosition();
//   });

//   // Subsidebar (Offcanvas) Toggle Function
//   subsidebarToggleButton.addEventListener("click", () => {
//       subsidebar.classList.toggle("show");

//       // Adjust position based on sidebar state
//       adjustSubsidebarPosition();
//   });
// });

// document.getElementById("sidebar-toggle").addEventListener("click", function() {
//     document.querySelector(".sidebar").classList.toggle("show-sidebar");
//   });
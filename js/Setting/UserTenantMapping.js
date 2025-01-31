document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const subsidebar = document.querySelector(".subsidebar-canvas");
    const mainContent = document.querySelector(".main-content");
    const toggleSidebarButton = document.getElementById("toggle-sidebar");
    const subsidebarToggleButton = document.querySelector(".toggle-img");
  
    // Function to adjust offcanvas position
    function adjustSubsidebarPosition() {
        if (subsidebar.classList.contains("show")) {
            subsidebar.style.left = sidebar.classList.contains("expanded") ? "250px" : "80px";
        }
    }
  
    // Sidebar Toggle Function
    toggleSidebarButton.addEventListener("click", () => {
        sidebar.classList.toggle("expanded");
        sidebar.classList.toggle("collapsed");
  
        // Adjust offcanvas position if it is open
        adjustSubsidebarPosition();
    });
  
    // Subsidebar (Offcanvas) Toggle Function
    subsidebarToggleButton.addEventListener("click", () => {
        subsidebar.classList.toggle("show");
  
        // Adjust position based on sidebar state
        adjustSubsidebarPosition();
    });
  });
  
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("/SupplierPortal/header.html", "header-container");
  loadComponent("/SupplierPortal/sidebar.html", "sidebar-container", activateSidebarLinks);
});

function loadComponent(url, containerId, callback) {
  fetch(url)
      .then(response => response.text())
      .then(data => {
          document.getElementById(containerId).innerHTML = data;
          if (callback) callback(); // Ensure callback runs after component loads
      })
      .catch(error => console.error("Error loading component:", error));
}

function activateSidebarLinks() {
  const menuItems = document.querySelectorAll(".sidebar nav ul li a");

  menuItems.forEach((item) => {
      let currentPath = window.location.pathname;

      if (item.getAttribute("href") === currentPath) {
          item.querySelector(".menu-item").classList.add("active");
      } else {
          item.querySelector(".menu-item").classList.remove("active");
      }
  });
}

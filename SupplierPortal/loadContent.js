document.addEventListener("DOMContentLoaded", function () {
  loadComponent("/SupplierPortal/header.html", "header-container", function () {
      activateSidebarLinks();
      activateSubSidebarLinks();
  });

  loadComponent("/SupplierPortal/sidebar.html", "sidebar-container", function () {
      activateSidebarLinks();
      activateSubSidebarLinks();
  });
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

// ✅ Function: Sidebar ke direct links activate kare
function activateSidebarLinks() {
  const menuItems = document.querySelectorAll(".sidebar nav ul li a");
  let currentPath = window.location.pathname;

  menuItems.forEach((item) => {
      let menuItem = item.querySelector(".menu-item");
      if (!menuItem) return;

      if (item.getAttribute("href") === currentPath) {
          menuItem.classList.add("active");
      } else {
          menuItem.classList.remove("active");
      }
  });
}

// ✅ Function: SubSidebar links ke basis par related Sidebar `.menu-item` activate kare
function activateSubSidebarLinks() {
  let navLinks = document.querySelectorAll(".subsidebar-canvas .nav-link");
  let sidebarLinks = document.querySelectorAll(".sidebar .menu-item a");
  let currentPath = window.location.pathname;

  navLinks.forEach((link) => {
      let subSidebar = link.closest(".subsidebar-canvas");
      let targetId = subSidebar ? subSidebar.getAttribute("id") : null;

      if (link.getAttribute("href") === currentPath) {
          link.classList.add("active");

          // Sidebar ka related menu-item activate karo
          sidebarLinks.forEach((sidebarItem) => {
              let sidebarMenuItem = sidebarItem.closest(".menu-item");
              let sidebarTarget = sidebarItem.nextElementSibling?.getAttribute("data-bs-target");

              if (sidebarTarget === `#${targetId}`) {
                  sidebarMenuItem.classList.add("active");
              } else {
                  sidebarMenuItem.classList.remove("active");
              }
          });
      } else {
          link.classList.remove("active");
      }
  });
}

const subSidebar = document.getElementById("subSidebar2");
const toggleBtn = document.getElementsByClassName("toggle-img");
toggleBtn.addEventListener("click", showSubSidebar());
function showSubSidebar() {
  if (subSidebar.style.display == "none") {
    subSidebar.style.display = "block";
  } else {
    subSidebar.style.display = "none";
  }
}


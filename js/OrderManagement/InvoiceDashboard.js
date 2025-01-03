// document.addEventListener("DOMContentLoaded", () => {
//       const financialYearSelect = document.getElementById("financial-year");
//       const searchBySelect = document.getElementById("search-by");
//       const searchButton = document.getElementById("search-btn");
//       const materialTransitButton = document.getElementById("material-transit-btn");
//       const historyButton = document.getElementById("history-btn");
//       // const additionalFilters = document.getElementById("additional-filters");
//       const locationContainer = document.getElementById("location-container");
//       const fromDateContainer = document.getElementById('fromDate-container');
//       const toDateContainer = document.getElementById('toDate-container');
//       const cardContainer = document.getElementById("card-container");
//       const tableContainer = document.getElementById("table-container");

//       const updateCards = (year) => {
//         const cards = cardContainer.querySelectorAll(".card-title");
//         cards.forEach((card, index) => {
//           card.textContent = year ? `${Math.floor(Math.random(index + 1))}` : "Default";
//         });
//       };

//       const showDynamicTable = () => {
//         tableContainer.innerHTML = `
//         <table class="table table-bordered">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>Sample</td>
//               <td>Dynamic Data</td>
//             </tr>
//           </tbody>
//         </table>`;
//       };

//       const handleSearchByChange = () => {
//         additionalFilters.innerHTML = "";
//         const selectedValue = searchBySelect.value;
//         if (selectedValue === "Location") {
//           // additionalFilters.innerHTML = `
//           //     <label for="location-dropdown" class="m-lg-3 m-sm-1"><span>Location</span></label>
//           //     <select id="location-dropdown" class="ms-lg-5 ps-2 pe-2 px-5 py-1">
//           //       <option value="Location1">Location 1</option>
//           //       <option value="Location2">Location 2</option>
//           //     </select>`;
//           locationContainer.style.display = "flex";
//         } else if (selectedValue === "Date") {
//           // additionalFilters.innerHTML = `<div class='d-flex '>
//           //     </div>`;
//           fromDateContainer.style.display = "flex";
//           toDateContainer.style.display = "flex";
//         }
//       };

//       financialYearSelect.addEventListener("change", (event) => {
//         const year = event.target.value;
//         updateCards(year);
//       });

//       searchBySelect.addEventListener("change", handleSearchByChange);

//       searchButton.addEventListener("click", () => {
//           if (searchBySelect.value === "ALL" && financialYearSelect.value === "2024"){
//           cardContainer.style.display = "flex";
//         }
//         showDynamicTable();
//       });

//     materialTransitButton.addEventListener("click", () => {
//       searchBySelect.value = "MaterialInTransits";
//       handleSearchByChange();
//     });

//     historyButton.addEventListener("click", () => {
//       window.location.href = "/history.html";
//     });
// });


// document.addEventListener("DOMContentLoaded", () => {
//   const financialYearSelect = document.getElementById("financial-year");
//   const searchBySelect = document.getElementById("search-by");
//   const searchButton = document.getElementById("search-btn");
//   const materialTransitButton = document.getElementById("material-transit-btn");
//   const historyButton = document.getElementById("history-btn");
//   const locationContainer = document.getElementById("search-container");
//   const fromDateContainer = document.getElementById("fromDate-container");
//   const toDateContainer = document.getElementById("toDate-container");
//   const cardContainer = document.getElementById("card-container");

//   const updateCards = (year) => {
//     const cards = cardContainer.querySelectorAll(".card-title");
//     cards.forEach((card, index) => {
//       card.textContent = year ? `${Math.floor(Math.random(index + 1))}` : "Default";
//     });
//   };

//   const handleSearchByChange = () => {
//     locationContainer.style.display = "d-none";
//     fromDateContainer.style.display = "d-none ";
//     toDateContainer.style.display = "d-none";

//     const selectedValue = searchBySelect.value;
//     if (selectedValue === "Location") {
//       locationContainer.style.display = "d-flex";
//     } else if (selectedValue === "Date") {
//       fromDateContainer.style.display = "d-flex";
//       toDateContainer.style.display = "d-flex";
//     }
//   };

//   const validateSelection = () => {
//     const yearSelected = financialYearSelect.value !== "default";
//     const searchBySelected = searchBySelect.value !== "default";
//     if (!yearSelected || !searchBySelected) {
//       alert("Please select both Financial Year and Search By options.");
//       return false;
//     }
//     return true;
//   };

//   financialYearSelect.addEventListener("change", (event) => {
//     const year = event.target.value;
//     updateCards(year);
//   });

//   searchBySelect.addEventListener("change", handleSearchByChange);

//   searchButton.addEventListener("click", () => {
//     if (!validateSelection()) return;

//     const searchBy = searchBySelect.value;
//     if (searchBy === "ALL" && financialYearSelect.value === "2024") {
//       cardContainer.style.display = "flex";
//     } else {
//       cardContainer.style.display = "flex";
//     }
//     // showDynamicTable();
//   });

//   materialTransitButton.addEventListener("click", () => {
//     searchBySelect.value = "MaterialInTransits";
//     handleSearchByChange();
//   });

//   historyButton.addEventListener("click", () => {
//     window.location.href = "/history.html";
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const financialYearSelect = document.getElementById("financial-year");
  const searchBySelect = document.getElementById("search-by");
  const searchButton = document.getElementById("search-btn");
  const materialTransitButton = document.getElementById("material-transit-btn");
  const historyButton = document.getElementById("history-btn");
  const locationContainer = document.getElementById("search-container"); // Updated ID
  const fromDateContainer = document.getElementById("fromDate-container");
  const toDateContainer = document.getElementById("toDate-container");
  const cardContainer = document.getElementById("card-container");
  const tableContainer = document.getElementById("table-container");

  // Update cards for the selected financial year
  const updateCards = (year) => {
    const cards = cardContainer.querySelectorAll(".card-title");
    cards.forEach((card, index) => {
      card.textContent = year ? `${Math.floor(Math.random(index + 1))}` : "Default";
    });
  };

  // Show dynamic table
  const showDynamicTable = () => {
    tableContainer.innerHTML = `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Sample</td>
            <td>Dynamic Data</td>
          </tr>
        </tbody>
      </table>`;
  };

  // Handle search-by changes
  const handleSearchByChange = () => {
    // Reset display for all containers
    locationContainer.classList.add("d-none");
    fromDateContainer.classList.add("d-none");
    toDateContainer.classList.add("d-none");

    const selectedValue = searchBySelect.value;

    // Show relevant containers based on the selected value
    if (selectedValue === "Location") {
      locationContainer.classList.remove("d-none");
    } else if (selectedValue === "Date") {
      fromDateContainer.classList.remove("d-none");
      toDateContainer.classList.remove("d-none");
    }
  };

  // Validate dropdown selections
  const validateSelection = () => {
    const yearSelected = financialYearSelect.value !== "default";
    const searchBySelected = searchBySelect.value !== "default";

    if (!yearSelected || !searchBySelected) {
      alert("Please select both Financial Year and Search By options.");
      return false;
    }
    return true;
  };

  // Event listeners
  financialYearSelect.addEventListener("change", (event) => {
    const year = event.target.value;
    updateCards(year);
  });

  searchBySelect.addEventListener("change", handleSearchByChange);

  searchButton.addEventListener("click", () => {
    if (!validateSelection()) return;

    // Show cards only if both dropdowns are valid
    const searchBy = searchBySelect.value;

    if (searchBy === "ALL" && financialYearSelect.value === "2024") {
      cardContainer.style.display = "flex";
    } else {
      cardContainer.style.display = "flex";
    }

    // Always show the table after validation
    showDynamicTable();
  });

  materialTransitButton.addEventListener("click", () => {
    searchBySelect.value = "MaterialInTransits";
    handleSearchByChange();
  });

  historyButton.addEventListener("click", () => {
    window.location.href = "/history.html";
  });
});
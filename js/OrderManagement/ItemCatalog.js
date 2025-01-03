const apiData = {
    customers: ["Indoasian", "Electrolux", "LG"],
    banks: ["HDFC", "ICICI", "SBI"],
    products: [{
            name: "Washing Machine",
            image: "/images/washing-machine.jfif",
            customer: "Indoasian",
            bank: "HDFC",
        },
        {
            name: "AR Pure Copper Wire",
            image: "/images/copper-wire.jfif",
            customer: "Indoasian",
            bank: "SBI",
        },
        {
            name: "Smart Wi-fi Plug",
            image: "/images/router.jfif",
            customer: "LG",
            bank: "HDFC",
        },
        {
            name: "Wiper Motor",
            image: "/images/wiper-motor.jfif",
            customer: "Electrolux",
            bank: "ICICI",
        },
    ],
};

// Function to populate dropdown options
function populateDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = `<option value="">All</option>`; // Default "All" option
    options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
}

// Function to update cards based on filtered data
function updateCards(products) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ""; // Clear existing cards

    if (products.length === 0) {
        const noResult = document.createElement("div");
        noResult.className = "col-12";
        noResult.innerHTML = "<p>No products found.</p>";
        cardContainer.appendChild(noResult);
        return;
    }

    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "col-lg-auto col-md-auto mb-4";

        card.innerHTML = `
        <div class="card" style="width: 263px; height: 257px;">
        <img src="${product.image}" class="card-img" alt="${product.name}" />
        <div class="card-img-overlay d-flex align-items-end p-0">
            <h5 class="card-title w-100 text-center m-0 p-2">${product.name}</h5>
        </div>
        </div>
    `;
        cardContainer.appendChild(card);
    });
}

// Function to handle the search button click
function handleSearch() {
    const selectedCustomer = document.getElementById("customerSelect").value;
    const selectedBank = document.getElementById("bankSelect").value;

    const filteredProducts = apiData.products.filter((product) => {
        return (
            (!selectedCustomer || product.customer === selectedCustomer) &&
            (!selectedBank || product.bank === selectedBank)
        );
    });

    updateCards(filteredProducts);
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
    // Populate dropdowns
    populateDropdown("customerSelect", apiData.customers);
    populateDropdown("bankSelect", apiData.banks);

    // Add event listener to the Search button
    document.getElementById("searchButton").addEventListener("click", handleSearch);

    // Show all cards by default
    updateCards(apiData.products);
});
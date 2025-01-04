document.addEventListener("DOMContentLoaded", function () {
  const userCodeSelect = document.getElementById("userCode");
  const partyCodeInput = document.getElementById("partyCode");
  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table-responsive", "mt-3");
  document.getElementById("mainContent").appendChild(tableContainer);

  const partyCodes = {
    "threegtech.12@gmail.com": "PC12345",
    "example1@gmail.com": "PC67890",
    "example2@gmail.com": "PC54321",
  };

  function displayTable() {
    const userCode = userCodeSelect.value;
    const partyCode = partyCodeInput.value;

    if (userCode && partyCode) {
      tableContainer.innerHTML = `
                <table class="table">
                    <thead class="table-secondary">
                        <tr>
                            <th>T Code</th>
                            <th>Company Url</th>
                            <th>Company Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${partyCode}</td>
                            <td>www.example.com</td>
                            <td>Example Company</td>
                            <td>
                                <input type="checkbox" name="check" id="check">
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;
      tableContainer.classList.remove("d-none");
    } else {
      tableContainer.classList.add("d-none");
    }
  }

  userCodeSelect.addEventListener("change", function () {
    const selectedUserCode = userCodeSelect.value;
    if (partyCodes[selectedUserCode]) {
      partyCodeInput.value = partyCodes[selectedUserCode];
    } else {
      partyCodeInput.value = "";
    }
    displayTable();
  });

  partyCodeInput.addEventListener("input", displayTable);
});

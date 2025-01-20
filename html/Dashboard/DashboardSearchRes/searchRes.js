// document.addEventListener('DOMContentLoaded', function () {
//     const purchaseOrders = [{
//         poNumber: '20180601NPO000001',
//         locationCode: '400004',
//         location: 'NEDSPL-MURTHAL-SWITCHGEAR',
//         date: '01/06/2018',
//         amount: '1280.00',
//         items: [{
//             itemCode: '105020100000010',
//             orderQuantity: '100.00',
//             rate: '10.00',
//         }],
//         dispatchDetails: [{
//             itemCode: '105020100000010',
//             docNo: '567567789',
//             date: '01/06/2018',
//             dispatchedQuantity: '10.00',
//             pendingQuantity: '90.00',
//             mrnStatus: 'Pending',
//             amount: '128.00',
//         }]
//     }];

//     function renderPurchaseOrders() {
//         const purchaseOrderTable = document.getElementById('purchaseOrderTable');
//         const itemTable = document.getElementById('itemTable');
//         const dispatchTable = document.getElementById('dispatchTable');
//         let totalQuantity = 0;
//         let totalAmount = 0;

//         purchaseOrders.forEach(order => {
//             const poRow = purchaseOrderTable.insertRow();
//             poRow.insertCell(0).innerText = order.poNumber;
//             poRow.insertCell(1).innerText = order.locationCode;
//             poRow.insertCell(2).innerText = order.location;
//             poRow.insertCell(3).innerText = order.date;
//             poRow.insertCell(4).innerText = order.amount;

//             order.items.forEach(item => {
//                 const itemRow = itemTable.insertRow();
//                 itemRow.insertCell(0).innerText = item.itemCode;
//                 itemRow.insertCell(1).innerText = item.orderQuantity;
//                 itemRow.insertCell(2).innerText = item.rate;
//                 totalQuantity += parseFloat(item.orderQuantity);
//             });

//             order.dispatchDetails.forEach(dispatch => {
//                 const dispatchRow = dispatchTable.insertRow();
//                 dispatchRow.insertCell(0).innerText = dispatch.itemCode;
//                 dispatchRow.insertCell(1).innerText = dispatch.docNo;
//                 dispatchRow.insertCell(2).innerText = dispatch.date;
//                 dispatchRow.insertCell(3).innerText = dispatch.dispatchedQuantity;
//                 dispatchRow.insertCell(4).innerText = dispatch.pendingQuantity;
//                 dispatchRow.insertCell(5).innerText = dispatch.mrnStatus;
//                 dispatchRow.insertCell(6).innerText = dispatch.amount;
//                 totalAmount += parseFloat(dispatch.amount);
//             });
//         });

//         document.getElementById('totalQuantity').innerText = totalQuantity;
//         document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
//     }

//     renderPurchaseOrders();
// });

function populateTableFromLocalStorage() {
  const tableSection = document.getElementById("tableSection");
  const mainTableBody = document.getElementById("mainTableBody");

  // Retrieve data from local storage
  const storedData = localStorage.getItem("poSearchData");

  if (!storedData) {
    console.log("No data found in local storage.");
    return;
  }

  const data = JSON.parse(storedData);

  if(data.length===0){
    mainTableBody.innerHTML =`<tr><td colspan="5">No data to display</td></tr>`
  }else{

  

  // Clear any existing rows in the table
  mainTableBody.innerHTML = "";
  // Generate main table row
  const mainRowId = `collapseRow0`;
  let mainRow = `
      <tr>
        <td>
          <span
            class="toggle-sign fs-6 me-2"
            data-bs-toggle="collapse"
            href="#${mainRowId}"
            role="button"
            aria-expanded="false"
            aria-controls="${mainRowId}"
          >
            +
          </span>
          ${data.poNumber || "PO001"}
        </td>
        <td>${data.locationCode || "400004"}</td>
        <td>${data.location || "NEDSPL-MURTHAL-SWITCHGEAR"}</td>
        <td>${data.date || "2022-05-10"}</td>
        <td>${data.amount || "1280.00"}</td>
      </tr>
    `;
  // Generate expandable sub-table row
  const expandedRow = `
      <tr class="collapse" id="${mainRowId}">
        <td colspan="5">
          <table style="width: 100%">
            <thead style="height:25px;background-color:"#ECEFF3">
              <tr>
                <th>Item Code</th>
                <th>Order Quantity</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${data.itemCode || "105020100000010"}</td>
                <td>${data.orderQuantity || "100.00"}</td>
                <td>${data.rate || "10.00"}</td>
              </tr>
            </tbody>
          </table>
  
          <!-- Inner expandable table -->
          <table style="width: 100%; margin-top: 10px;">
            <thead style="height:25px;background-color:"#ECEFF3">
              <tr>
                <th>ITEM CODE</th>
                <th>Doc No.</th>
                <th>Date</th>
                <th>Dispatched Quantity</th>
                <th>Pending Quantity</th>
                <th>MRN Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${data.itemCode || "105020100000010"}</td>
                <td>${data.docNo || "567567789"}</td>
                <td>${data.docDate || "2022-05-10"}</td>
                <td>${data.dispatchedQuantity || "10.00"}</td>
                <td>${data.pendingQuantity || "90.00"}</td>
                <td>${data.mrnStatus || "Pending"}</td>
                <td>${data.subAmount || "128.00"}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    `;

  // Append rows to the main table body
  mainTableBody.innerHTML = mainRow + expandedRow;
  }

  // Scroll to the table section
  tableSection.scrollIntoView({ behavior: "smooth" });
}

// Call this function after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", () => {
  populateTableFromLocalStorage();
});

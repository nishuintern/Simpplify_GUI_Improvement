document.addEventListener('DOMContentLoaded', function () {
    const purchaseOrders = [{
        poNumber: '20180601NPO000001',
        locationCode: '400004',
        location: 'NEDSPL-MURTHAL-SWITCHGEAR',
        date: '01/06/2018',
        amount: '1280.00',
        items: [{
            itemCode: '105020100000010',
            orderQuantity: '100.00',
            rate: '10.00',
        }],
        dispatchDetails: [{
            itemCode: '105020100000010',
            docNo: '567567789',
            date: '01/06/2018',
            dispatchedQuantity: '10.00',
            pendingQuantity: '90.00',
            mrnStatus: 'Pending',
            amount: '128.00',
        }]
    }];

    function renderPurchaseOrders() {
        const purchaseOrderTable = document.getElementById('purchaseOrderTable');
        const itemTable = document.getElementById('itemTable');
        const dispatchTable = document.getElementById('dispatchTable');
        let totalQuantity = 0;
        let totalAmount = 0;

        purchaseOrders.forEach(order => {
            const poRow = purchaseOrderTable.insertRow();
            poRow.insertCell(0).innerText = order.poNumber;
            poRow.insertCell(1).innerText = order.locationCode;
            poRow.insertCell(2).innerText = order.location;
            poRow.insertCell(3).innerText = order.date;
            poRow.insertCell(4).innerText = order.amount;

            order.items.forEach(item => {
                const itemRow = itemTable.insertRow();
                itemRow.insertCell(0).innerText = item.itemCode;
                itemRow.insertCell(1).innerText = item.orderQuantity;
                itemRow.insertCell(2).innerText = item.rate;
                totalQuantity += parseFloat(item.orderQuantity);
            });

            order.dispatchDetails.forEach(dispatch => {
                const dispatchRow = dispatchTable.insertRow();
                dispatchRow.insertCell(0).innerText = dispatch.itemCode;
                dispatchRow.insertCell(1).innerText = dispatch.docNo;
                dispatchRow.insertCell(2).innerText = dispatch.date;
                dispatchRow.insertCell(3).innerText = dispatch.dispatchedQuantity;
                dispatchRow.insertCell(4).innerText = dispatch.pendingQuantity;
                dispatchRow.insertCell(5).innerText = dispatch.mrnStatus;
                dispatchRow.insertCell(6).innerText = dispatch.amount;
                totalAmount += parseFloat(dispatch.amount);
            });
        });

        document.getElementById('totalQuantity').innerText = totalQuantity;
        document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
    }

    renderPurchaseOrders();
});
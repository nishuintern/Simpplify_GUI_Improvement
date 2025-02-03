const data = [
    { companyName: 'Indoasian', orderNo: '20240828NP000001', poDate: '8/28/2024', validityDate: '', orderAmount: '22800.00' },
    { companyName: 'Indoasian', orderNo: '20240828NP000002', poDate: '8/28/2024', validityDate: '', orderAmount: '22800.00' },
    { companyName: 'Indoasian', orderNo: '20240828NP000003', poDate: '8/28/2024', validityDate: '', orderAmount: '22800.00' },
    { companyName: 'Indoasian', orderNo: '20240828NP000003', poDate: '8/28/2024', validityDate: '', orderAmount: '22800.00' },
    { companyName: 'Indoasian', orderNo: '20240828NP000003', poDate: '8/28/2024', validityDate: '', orderAmount: '22800.00' },
    // Add more data as needed
];

let currentPage = 1;
let pageSize = 10;
let sortColumn = '';
let sortDirection = 'asc';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sizeOfPage').addEventListener('change', (e) => {
        pageSize = parseInt(e.target.value);
        currentPage = 1;
        renderTable();
    });

    document.getElementById('searchInput').addEventListener('input', () => {
        currentPage = 1;
        renderTable();
    });

    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-sort');
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'asc';
            }
            renderTable();
        });
    });

    renderTable();
});

function renderTable() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = data.filter(item => {
        return Object.values(item).some(value => value.toLowerCase().includes(searchQuery));
    });

    if (sortColumn) {
        filteredData.sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const totalEntries = filteredData.length;
    const totalPages = Math.ceil(totalEntries / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filteredData.slice(start, end);

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    paginatedData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.companyName}</td>
            <td>${item.orderNo}</td>
            <td>${item.poDate}</td>
            <td>${item.validityDate}</td>
            <td>${item.orderAmount}</td>
            <td>
                <div class="row">
                    <button class="col-sm-3 border-0 rounded-1 ms-2 btn-downloads">Download</button>
                    <button class="col-sm-3 border-0 rounded-1 ms-2 btn-dispatch"><img src="/icons/flat-color-icons_ok.svg" alt="" /></button>
                    <button class="col-sm-3 border-0 rounded-1 ms-2 btn-asn">Download</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('entriesInfo').textContent = `Showing ${start + 1} to ${Math.min(end, totalEntries)} of ${totalEntries} entries`;

    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderTable();
        });
        pagination.appendChild(pageItem);
    }

    document.querySelectorAll('.sortable').forEach(header => {
        header.classList.remove('asc', 'desc');
        if (header.getAttribute('data-sort') === sortColumn) {
            header.classList.add(sortDirection);
        }
    });
}









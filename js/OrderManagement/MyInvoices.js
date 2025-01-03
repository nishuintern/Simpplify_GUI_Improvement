document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove 'active' class from all tabs
        document.querySelectorAll('.tab-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add 'active' class to the clicked tab
        tab.classList.add('active');
    });
});
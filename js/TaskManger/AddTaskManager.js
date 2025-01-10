// Form validation example
document.getElementById('staff-name').addEventListener('blur', function () {
    if (this.value.trim() === '') {
      alert('Staff Name is required');
    }
  });

  // Dynamically update options based on Entity selection
  document.getElementById('entity').addEventListener('change', function () {
    const eventField = document.getElementById('event');
    eventField.innerHTML = ''; // Clear existing options

    if (this.value === 'task') {
      eventField.innerHTML = '<option value="task1">Task 1</option><option value="task2">Task 2</option>';
    } else if (this.value === 'meeting') {
      eventField.innerHTML = '<option value="meeting1">Meeting 1</option><option value="meeting2">Meeting 2</option>';
    }
  });

  // Example for priority validation
  document.getElementById('priority').addEventListener('change', function () {
    if (this.value === '') {
      alert('Priority is required');
    }
  });
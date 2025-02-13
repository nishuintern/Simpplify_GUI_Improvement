let isAuthenticated = false;
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Reset error states before validation
    usernameInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    let hasError = false;

    // Validate username
    if (!username) {
        usernameInput.classList.add('is-invalid');
        hasError = true;
    }

    // Validate password
    if (!password) {
        passwordInput.classList.add('is-invalid');
        hasError = true;
    }

    if (hasError) {
        return; // Exit if there are validation errors
    }

    if (username === "threegtech.12@gmail.com" && password === "123") {
        console.log('Login successful with email:', username);
        alert('Login successful!');
        sessionStorage.setItem('isAuthenticated', true);
        // Redirect to a new page
        window.location.href = '/html/index.html';
        // Reset form fields after successful login
        usernameInput.value = '';
        passwordInput.value = '';
    } else {
        alert('Incorrect username or password.');
    }
});

// Remove error state on focus
document.querySelectorAll('#loginForm .input-group').forEach(input => {
    input.addEventListener('focus', function () {
        input.classList.remove('is-invalid');
    });
});

window.addEventListener("popstate", function () {
  if (!isAuthenticated && !sessionStorage.getItem("isAuthenticated")) {
    alert("You must log in first!");
    window.location.href = "/html/index.html"; // Redirect to login page
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.getItem("isAuthenticated")) {
    isAuthenticated = true;
  }
});

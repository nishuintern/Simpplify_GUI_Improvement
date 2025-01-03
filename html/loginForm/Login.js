let isAuthenticated = false;
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "threegtech.12@gmail.com" && password === "123") {
        console.log('Login successful with email:', email);
        alert('Login successful!');
        isAuthenticated = true;
        sessionStorage.setItem('isAuthenticated', true);
        // You can add additional logic here, such as redirecting to a new page.
        window.location.href = '/html/index.html';
        // Reset form fields after successful login
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    } else {
        alert('Please fill in all fields.');
    }
});

window.addEventListener('popstate', function () {
    if (!isAuthenticated && !sessionStorage.getItem('isAuthenticated')) {
        alert('You must log in first!');
        window.location.href = '/html/index.html'; // Redirect to login page
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('isAuthenticated')) {
        isAuthenticated = true;
    }
});
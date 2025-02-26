// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Login functionality (without verification for testing purposes)
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission
            const userEmail = document.getElementById("login-email").value;
            localStorage.setItem("user", userEmail); // Save user to localStorage
            window.location.href = "index.html"; // Redirect to index.html
        });
    }

    // Registration functionality
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission
            const userName = document.getElementById("name").value;
            const userEmail = document.getElementById("email").value;
            const userPassword = document.getElementById("password").value;

            // Store user information in localStorage (for demo purposes)
            localStorage.setItem("user", userEmail);
            localStorage.setItem("password", userPassword);

            // Redirect to index.html after registration
            window.location.href = "index.html";
        });
    }

    // Check for user login on index.html
    const user = localStorage.getItem("user");
    if (user) {
        // User is logged in, show welcome message or content
        const welcomeMessage = document.createElement("p");
        welcomeMessage.textContent = `Welcome back, ${user}!`;
        document.querySelector("main").appendChild(welcomeMessage);
    } else {
        // User is not logged in, do not show any pop-up
    }
});


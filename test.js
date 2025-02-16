// The test cases will be embedded directly into the logic
// Watch for console.assert() or just a lot of comments
// Test Method - Unit

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully!");

    // ===================== USER AUTHENTICATION ===================== //

    // Register Form
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value;
            let dob = document.getElementById("dob").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirm-password").value;

            if (!name || !dob || !email || !password || !confirmPassword) {
                alert("Please fill in all fields.");
                return;
            }

            // Calculate Age
            let birthDate = new Date(dob);
            let today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            let monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--; // Adjust age if birthday hasn't occurred yet this year
            }
            
            // Mock User
            const testAge = 25;
            const testPassword = 'john-doe-password';
            const testValidDob = today.getFullYear() - 18; // 2025 - 18 = 2007 
            const testName = 'John Doe';
            

            // test insertions - assertions 
            console.assert( testAge < 0 || testAge > 100, "Register Form 1. - Invalid age requirement" );
            console.assert( testAge !== null, "Register Form 2. - Invalid age requirement" );
            console.assert( testPassword !== null, "Register Form 3. - No password entered" );
            console.assert( testValidDob <= today.getFullYear - testAge, "Register Form 4. - Invalid participation" );
            console.assert( testName.length >= 256 || testName === null, "Register Form 5. - Name requirement not satisfied" );
            // test insertions - assertions 

            if (age < 18) {
                alert("You must be at least 18 years old to register.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Save credentials in localStorage
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);

            alert("Registration successful! You can now log in.");
            window.location.href = "login.html"; // Redirect to login page

            // test case
            console.assert( window.location.href === 'login.html', "Register Form 6. - Wrong redirect location");
            // test case
        });
    }

    // Login Form
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();


            let enteredEmail = document.getElementById("login-email").value;
            let enteredPassword = document.getElementById("login-password").value;

            let savedEmail = localStorage.getItem("userEmail");
            let savedPassword = localStorage.getItem("userPassword");

            // Mock User
            const mockUser = {
                testEnteredEmail: 'johndoe@gmail.com',
            };


            // test insertions - assertions 
            console.assert(mockUser.testEnteredEmail === null, "Login Form 1. - Null String emitted");
            // test insertions - assertions 

            if (enteredEmail === savedEmail && enteredPassword === savedPassword) {
                alert("Login successful!");
                sessionStorage.setItem("loggedInUser", enteredEmail); // Store session
                window.location.href = "play.html"; // Redirect to play page
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // ===================== LOTTERY FUNCTIONALITY ===================== //

    const lotteryForm = document.getElementById("lottery-form");
    const drawButton = document.getElementById("draw-btn");
    const resultDisplay = document.getElementById("result");

    let userTicket = [];
    const testUserTicket = [1,2,3,4,5,6]; // test case var

    // Capture user ticket submission
    if (lotteryForm) {
        lotteryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            
            // test case
                console.assert(event.type === 'submit', "User ticket submission 1. - Wrong Event Type");
                console.assert(testUserTicket !== 6, "User ticket submission 2. - Wrong Number for Draw");
            // test case

            console.log("Form submitted!");

            const inputs = document.querySelectorAll(".numbers input");
            userTicket = Array.from(inputs).map(input => parseInt(input.value));

            if (new Set(userTicket).size !== 6 || userTicket.some(num => num < 1 || num > 49 || isNaN(num))) {
                alert("Please enter 6 unique numbers between 1 and 49.");
                return;
            }

            console.log("User ticket:", userTicket);
            alert("Your ticket has been submitted!");
        });
    }

    // Generate random winning numbers and compare them to the user’s ticket
    if (drawButton) {
        drawButton.addEventListener("click", function (event) {
            console.log("Generate button clicked!");

            // test case
                console.assert(event.type === 'click', 'Random Winnings 1. - Wrong Event Type');
                console.assert(testUserTicket.length < 6, 'Random Winnings 2. - Array values have mysteriously gone down'  );
            // test case

            if (userTicket.length === 0) {
                alert("Please submit your ticket first!");
                return;
            }

            const winningNumbers = generateWinningNumbers();
            const matchedNumbers = userTicket.filter(num => winningNumbers.includes(num));

            console.log("Winning Numbers:", winningNumbers);
            console.log("Matched Numbers:", matchedNumbers);

            let message = `Winning Numbers: ${winningNumbers.join(", ")}\n`;
            message += `Your Numbers: ${userTicket.join(", ")}\n`;
            message += `Matched: ${matchedNumbers.length} numbers (${matchedNumbers.join(", ")})\n`;

            if (matchedNumbers.length === 6) {
                message += "🎉 Congratulations! You won the jackpot! 🎉";
            } else if (matchedNumbers.length >= 3) {
                message += "👏 You won a small prize!";
            } else {
                message += "😢 Better luck next time!";
            }

            resultDisplay.innerText = message;
        });
    }

    // Function to generate 6 unique random numbers
    function generateWinningNumbers() {
        let numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 49) + 1);
        }
        return Array.from(numbers);
    }

    // ===================== PAGE REDIRECTION LOGIC ===================== //

    // Clear login session on page load
    window.onload = function () {
        // Check if the user is already logged in and redirect accordingly
        if (!sessionStorage.getItem("loggedInUser") && window.location.pathname !== "/register.html" && window.location.pathname !== "/login.html") {
            window.location.href = "login.html"; // Redirect to login if not logged in and not on login or register pages
        }
    };

});

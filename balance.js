// balance.js

// Function to display the user's balance
function displayBalance(balance) {
    const balanceElement = document.getElementById('user-balance');
    if (balanceElement) {
        balanceElement.textContent = `Your balance: $${balance} USD`;
    }
}

// Assuming you want to set the initial balance to $10,000 USD
let userBalance = 10000; 

// Call the function to display the initial balance
displayBalance(userBalance);

document.addEventListener("DOMContentLoaded", function () {
    const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
    const receiptList = document.getElementById("receipt-list");

    if (receipts.length === 0) {
        receiptList.innerHTML = "<p>No receipts available.</p>";
    } else {
        receipts.forEach(receipt => {
            const receiptDiv = document.createElement("div");
            receiptDiv.classList.add("receipt");
            receiptDiv.innerHTML = `
                <p>Numbers: ${receipt.numbers.join(", ")}</p>
                <p>Timestamp: ${receipt.timestamp}</p>
                <p>Total Spent: $${receipt.totalSpent}</p>
                <p>You ${receipt.isWinner ? "won!" : "lost."}</p>
            `;
            receiptList.appendChild(receiptDiv);
        });
    }

    // Back to Play button functionality
    document.getElementById("back-button").addEventListener("click", function() {
        window.location.href = "play.html"; // Redirect back to play page
    });
});

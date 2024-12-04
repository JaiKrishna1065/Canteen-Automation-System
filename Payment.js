// Function to generate the bill and handle navigation
function generateBill(paymentMethod) {
    const contactNumber = document.getElementById("contact").value.trim();
    if (!contactNumber) {
        alert("Please enter your contact number.");
        return;
    }

    const foodItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = foodItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const billDetails = {
        date: new Date(),
        canteenName: "Automeal Canteen",
        paymentMethod,
        items: foodItems,
        totalPrice: totalPrice.toFixed(2),
        userContact: contactNumber
    };

    localStorage.setItem("billDetails", JSON.stringify(billDetails)); // Store bill details locally

    // Updated fetch request to point to backend server
fetch('http://localhost:3000/Bill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(billDetails)
})
.then(response => {
    if (!response.ok) {
        console.error("Backend response not OK:", response.status, response.statusText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    console.log("Response data:", data); 
    if (data.ok || data.success) { 
        window.location.href = "Bill.html"; 
    } else {
        alert("Payment processing failed. Please try again.");
    }
})
.catch(error => {
    console.error('Error processing payment:', error);
    alert("An error occurred while processing your payment.");
});

}

// Event listeners for payment methods
document.querySelector(".btn").addEventListener("click", () => generateBill("Cash on Delivery"));
document.querySelector(".btn3").addEventListener("click", () => generateBill("PhonePe"));
document.querySelector(".btn4").addEventListener("click", () => generateBill("GPay"));
document.querySelector(".btn5").addEventListener("click", () => generateBill("Paytm"));

document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;

    // Function to render the cart items
    function renderCart() {
        cartItemsContainer.innerHTML = ""; // Clear current items
        totalPrice = 0; // Reset total price

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const itemRow = document.createElement("div");
            itemRow.className = "cart-item";
            itemRow.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>₹${item.price}</p>
                <input type="number" value="${item.quantity}" min="1" data-name="${item.name}" class="quantity-input">
                <button class="remove-item" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemRow);
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Update quantity
    cartItemsContainer.addEventListener("input", (e) => {
        if (e.target.classList.contains("quantity-input")) {
            const itemName = e.target.dataset.name;
            const newQuantity = parseInt(e.target.value);

            const cartItem = cart.find(item => item.name === itemName);
            if (cartItem && newQuantity > 0) {
                cartItem.quantity = newQuantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        }
    });

    // // Clear cart after successful checkout
    // const checkoutBtn = document.getElementById("checkout-btn");
    // if (checkoutBtn) {
    //     checkoutBtn.addEventListener("click", () => {
    //         // Assuming payment is successful, clear the cart
    //         localStorage.removeItem("cart"); // Clear cart data from localStorage
    //         cartItemsContainer.innerHTML = ""; // Clear cart items from page
    //         totalPriceElement.textContent = "0"; // Reset the total price to 0
    //     });
    // }

    // Remove item from cart
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const itemName = e.target.dataset.name;
            const itemIndex = cart.findIndex(item => item.name === itemName);
            if (itemIndex > -1) {
                cart.splice(itemIndex, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        }
    });

    document.querySelector("#checkout-btn").addEventListener("click", () => {
        window.location.href = "Payment.html";
    });

    // Render cart items initially
    renderCart();
});
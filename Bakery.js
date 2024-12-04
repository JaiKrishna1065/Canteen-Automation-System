// Add to Cart Function
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const itemName = item.querySelector('p').textContent;
        const itemPrice = parseFloat(item.querySelectorAll('p')[1].textContent.replace('₹', ''));
        const itemImage = item.querySelector('img').src;

        // Get the cart from localStorage or initialize an empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item already exists in the cart
        const existingItem = cart.find(cartItem => cartItem.name === itemName);

        if (existingItem) {
            // Increment quantity if item is already in the cart
            existingItem.quantity += 1;
        } else {
            // Add new item with quantity 1
            const cartItem = {
                name: itemName,
                price: itemPrice,
                image: itemImage,
                quantity: 1
            };
            cart.push(cartItem);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Alert the user
        alert(`${itemName} added to cart!`);
    });
});
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const container = document.querySelector(".container");

    sidebar.classList.toggle("open");
    container.classList.toggle("shift");
}
document.addEventListener("DOMContentLoaded", async () => {
    // Orders page code
    const ordersTableBody = document.getElementById("orders-list");
    const sortSelect = document.getElementById("sort");

    // Fetch orders from the database
    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:3000/Orders");
            if (!response.ok) {
                console.error(`Error: Received status ${response.status}`);
                throw new Error("Failed to fetch orders");
            }
            const orders = await response.json();
            return orders;
        } catch (error) {
            console.error("Error fetching orders:", error);
            return [];
        }
    };

    // Render orders in table with improved date handling
    const renderOrders = (orders) => {
        ordersTableBody.innerHTML = "";
        orders.forEach(order => {
            let formattedDate = new Date(order.date);

            if (order.date) {
                const orderDate = new Date(order.date);
                // Check if the date is valid before displaying
                formattedDate = !isNaN(orderDate) 
                    ? orderDate.toLocaleDateString() 
                    : "Invalid Date";
            }

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${order.items.map(item => item.name).join(", ")}</td>
                <td>₹${order.totalPrice}</td>
                <td>${order.paymentMethod}</td>
            `;
            ordersTableBody.appendChild(row);
        });
    };

    // Sort orders based on selection
    const sortOrders = (orders, sortBy) => {
        let sortedOrders = [...orders];
        if (sortBy === "date") {
            sortedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortBy === "month") {
            sortedOrders.sort((a, b) => new Date(b.date).getMonth() - new Date(a.date).getMonth());
        } else if (sortBy === "year") {
            sortedOrders.sort((a, b) => new Date(b.date).getFullYear() - new Date(a.date).getFullYear());
        }
        renderOrders(sortedOrders);
    };

    // Initial fetch and render
    const orders = await fetchOrders();
    renderOrders(orders);

    // Add event listener for sorting
    sortSelect.addEventListener("change", () => sortOrders(orders, sortSelect.value));
});
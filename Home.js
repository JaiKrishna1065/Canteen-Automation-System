// // Example food items
// const foodItems = [
//     { name: "Burger", link: "Burger.html" },
//     { name: "Fries", link: "Fries.html" },
//     { name: "Pizza", link: "Pizza.html" },
//     { name: "Dosa", link: "Breakfast.html" }
// ];

// function showRecommendations() {
//     const input = document.getElementById("search-input").value.toLowerCase();
//     const recommendationsList = document.getElementById("recommendations");

//     // Clear previous recommendations
//     recommendationsList.innerHTML = "";
    
//     if (input) {
//         const filteredItems = foodItems.filter(item => 
//             item.name.toLowerCase().includes(input)
//         );

//         filteredItems.forEach(item => {
//             const listItem = document.createElement("li");
//             listItem.textContent = item.name;
//             listItem.onclick = () => {
//                 window.location.href = item.link;
//             };
//             recommendationsList.appendChild(listItem);
//         });

//         recommendationsList.style.display = filteredItems.length ? "block" : "none";
//     } else {
//         recommendationsList.style.display = "none";
//     }
// }

// // Hide recommendations when clicking outside
// document.addEventListener("click", (event) => {
//     const recommendationsList = document.getElementById("recommendations");
//     if (!event.target.closest(".search-bar")) {
//         recommendationsList.style.display = "none";
//     }
// });

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const container = document.querySelector(".container");

    sidebar.classList.toggle("open");
    container.classList.toggle("shift");
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");

    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("collapsed");
}
document.addEventListener("DOMContentLoaded", function () {
    let stockData = JSON.parse(localStorage.getItem("stockData")) || {};
    let activities = JSON.parse(localStorage.getItem("activities")) || [];

    // Update Stock Display
    document.querySelectorAll(".stock-card").forEach(card => {
        let uniformName = card.querySelector("h3").textContent;
        let stockCount = stockData[uniformName] !== undefined ? stockData[uniformName] : 0;
        
        card.querySelector("span").textContent = stockCount;
        if (stockCount > 0) {
            card.classList.remove("out-of-stock");
            card.classList.add("in-stock");
            card.querySelector("p").textContent = "In Stock";
        } else {
            card.classList.remove("in-stock");
            card.classList.add("out-of-stock");
            card.querySelector("p").textContent = "Out of Stock";
        }
    });

    // Update Activity Log
    let activityLog = document.getElementById("activity-log");
    activityLog.innerHTML = ""; // Clear previous logs

    activities.forEach(activity => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${activity.date}</td>
            <td>${activity.action} ${activity.uniform}</td>
            <td>${activity.quantity}</td>
        `;
        activityLog.appendChild(row);
    });
});


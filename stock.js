// Load existing stock data or initialize it
let stockData = JSON.parse(localStorage.getItem("stockData")) || {
    "RSO UNIFORM": 0,
    "CORPO MALE": 0,
    "CORPO FEMALE": 0
};

// Function to update displayed stock when selecting a uniform
function updateStock() {
    let uniformSelect = document.getElementById("uniform");
    let stockCount = document.getElementById("stock-count");

    let selectedUniform = uniformSelect.options[uniformSelect.selectedIndex].text.trim(); // Ensure name matches

    if (stockData[selectedUniform] !== undefined) {
        stockCount.textContent = stockData[selectedUniform];
    } else {
        stockCount.textContent = "N/A";
    }
}

// Function to log activity in localStorage
function logActivity(action, uniform, quantity) {
    let activities = JSON.parse(localStorage.getItem("activities")) || [];

    let activity = {
        date: new Date().toLocaleString(),
        action: action,
        uniform: uniform,
        quantity: quantity
    };

    activities.unshift(activity);
    localStorage.setItem("activities", JSON.stringify(activities));
}

// Function to add stock
function addStock() {
    let uniformSelect = document.getElementById("uniform");
    let quantityInput = document.getElementById("quantity");
    let stockCount = document.getElementById("stock-count");

    let selectedUniform = uniformSelect.options[uniformSelect.selectedIndex].text.trim();
    let quantity = parseInt(quantityInput.value);

    if (!isNaN(quantity) && quantity > 0) {
        stockData[selectedUniform] = (stockData[selectedUniform] || 0) + quantity;
        stockCount.textContent = stockData[selectedUniform];
        quantityInput.value = "";
        localStorage.setItem("stockData", JSON.stringify(stockData));

        logActivity("Added", selectedUniform, quantity);
        alert(`${quantity} units added to ${selectedUniform}.`);
    } else {
        alert("Please enter a valid quantity!");
    }
}

// Function to remove stock
function decreaseStock() {
    let uniformSelect = document.getElementById("uniform");
    let quantityInput = document.getElementById("quantity");
    let stockCount = document.getElementById("stock-count");

    let selectedUniform = uniformSelect.options[uniformSelect.selectedIndex].text.trim();
    let quantity = parseInt(quantityInput.value);

    if (!isNaN(quantity) && quantity > 0) {
        if (stockData[selectedUniform] >= quantity) {
            stockData[selectedUniform] -= quantity;
            stockCount.textContent = stockData[selectedUniform];
            localStorage.setItem("stockData", JSON.stringify(stockData));

            logActivity("Removed", selectedUniform, quantity);
            alert(`${quantity} units removed from ${selectedUniform}.`);
        } else {
            alert("Not enough stock available!");
        }
        quantityInput.value = "";
    } else {
        alert("Please enter a valid quantity!");
    }
}

// Ensure stock updates when the page loads
window.onload = updateStock;

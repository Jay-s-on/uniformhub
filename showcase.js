document.addEventListener("DOMContentLoaded", function () {
    let stockData = JSON.parse(localStorage.getItem("stockData")) || {};

    // Update Stock Information in the Uniform List and Slideshow
    document.querySelectorAll(".slide").forEach(slide => {
        let uniformName = slide.querySelector("h2").textContent.trim();
        let stockDisplay = slide.querySelector("p:nth-child(4)"); // Stock paragraph
        if (stockData[uniformName] !== undefined) {
            stockDisplay.textContent = `Stock: ${stockData[uniformName]}`;
        }
    });

    document.querySelectorAll(".uniform-item").forEach(item => {
        let uniformName = item.querySelector("p").textContent.trim();
        let stockDisplay = document.createElement("p");
        stockDisplay.classList.add("stock-info");
        if (stockData[uniformName] !== undefined) {
            stockDisplay.textContent = `Stock: ${stockData[uniformName]}`;
        } else {
            stockDisplay.textContent = `Stock: N/A`;
        }
        item.appendChild(stockDisplay);
    });

    // Initialize the slider
    showSlide(currentIndex);
});

// **SLIDER FUNCTIONALITY**
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

// **UNIFORM SEARCH FUNCTIONALITY**
const uniforms = [
    { name: "RSO UNIFORM", category: "Event Uniform", stock: 0, size: "XS, S, M, L, XL, XXL, XXXL", price: 270 },
    { name: "CORPO FEMALE", category: "Corporate Uniform", stock: 0, size: "XS, S, M, L, XL, XXL", price: 500 },
    { name: "CORPO MALE", category: "Corporate Uniform", stock: 0, size: "XS, S, M, L, XL, XXL", price: 500 }
];

function searchUniform() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let uniformItems = document.querySelectorAll(".uniform-item");
    let category = document.getElementById("category");
    let stock = document.getElementById("stock");
    let size = document.getElementById("size");
    let price = document.getElementById("price");
    let found = false;

    uniformItems.forEach(item => {
        let name = item.innerText.toLowerCase();
        let uniform = uniforms.find(u => u.name.toLowerCase() === name);
        
        if (name.includes(input) && input !== "") {
            item.style.backgroundColor = "#ffff99"; // Highlight color
            item.style.border = "2px solid #ffcc00";

            if (uniform) {
                category.innerText = uniform.category;
                stock.innerText = uniform.stock;
                size.innerText = uniform.size;
                price.innerText = `₱${uniform.price}`;
                found = true;
            }
        } else {
            item.style.backgroundColor = "";
            item.style.border = "";
        }
    });

    // Reset values if no uniform is found
    if (!found) {
        category.innerText = "-";
        stock.innerText = "-";
        size.innerText = "-";
        price.innerText = "-";
    }
}

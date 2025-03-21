document.addEventListener("DOMContentLoaded", function() {
    fetch("sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar-container").innerHTML = data;
        });
});

function toggleSidebar() {
    let sidebar = document.getElementById("sidebar-container");
    sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
}

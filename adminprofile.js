document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const logoutBtn = document.getElementById("logout-btn");

    // Toggle sidebar menu and update icon color
    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("active");

        // Change hamburger icon color when sidebar is open
        if (sidebar.classList.contains("active")) {
            menuToggle.style.color = "#d1a308"; // Highlighted when open
        } else {
            menuToggle.style.color = "white"; // Default when closed
        }
    });

    // Logout functionality
    logoutBtn.addEventListener("click", function () {
        window.location.href = "logout.html";
    });

    // Profile picture change functionality
    const changeProfileBtn = document.getElementById("change-profile-btn");
    const fileInput = document.getElementById("file-input");
    const profilePic = document.getElementById("profile-pic");

    changeProfileBtn.addEventListener("click", function () {
        fileInput.click();
    });

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

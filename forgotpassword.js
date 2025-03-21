document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    
    if (email) {
        alert("A password reset link has been sent to: " + email);
        // Simulate sending request to backend
    } else {
        alert("Please enter a valid email address.");
    }
});

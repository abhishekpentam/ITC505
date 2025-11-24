// Lab 8 - Input Validation and Basic XSS Prevention

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const errorsDiv = document.getElementById("errors");
    const successDiv = document.getElementById("success");

    // Helper: basic HTML-escaping to prevent XSS in any client-side display
    function sanitize(input) {
        return input
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;");
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // prevent default submission for demo

        errorsDiv.textContent = "";
        successDiv.textContent = "";

        const firstName = form.firstName.value.trim();
        const lastName = form.lastName.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        const errors = [];

        // 1. Empty field checks
        if (!firstName) {
            errors.push("First name cannot be empty.");
        }
        if (!lastName) {
            errors.push("Last name cannot be empty.");
        }
        if (!email) {
            errors.push("Email cannot be empty.");
        }
        if (!password) {
            errors.push("Password cannot be empty.");
        }
        if (!confirmPassword) {
            errors.push("Confirm password cannot be empty.");
        }

        // 2. Email validity (basic regex + browser's built-in validation)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        // 3. Password match check
        if (password && confirmPassword && password !== confirmPassword) {
            errors.push("Password and Confirm Password do not match.");
        }

        // 4. Optional: simple password strength check
        if (password && password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }

        if (errors.length > 0) {
            // Use textContent, not innerHTML, to avoid XSS
            errorsDiv.textContent = errors.join(" ");
            return;
        }

        // If everything is valid, show a success message.
        // We sanitize user-derived strings before any display.
        const safeFirstName = sanitize(firstName);
        const safeLastName = sanitize(lastName);

        successDiv.textContent =
            "Registration successful for " + safeFirstName + " " + safeLastName + ".";

        // In a real application, here we would send the data securely to the server
        // using HTTPS, and the server would perform its OWN validation, escaping,
        // parameterized SQL, etc., to prevent XSS and SQL injection.
    });
});

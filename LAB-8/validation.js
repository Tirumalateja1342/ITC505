document.getElementById('secureForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission for validation

    // Clear previous error messages
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');

    // Form field values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    // Validate first name
    if (!firstName) {
        document.getElementById('firstNameError').textContent = 'First name is required.';
        isValid = false;
    }

    // Validate last name
    if (!lastName) {
        document.getElementById('lastNameError').textContent = 'Last name is required.';
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Enter a valid email address.';
        isValid = false;
    }

    // Validate password
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required.';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Please confirm your password.';
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        isValid = false;
    }

    // Simulate form submission if valid
    if (isValid) {
        alert('Form submitted successfully!');
        console.log("Form data:", { firstName, lastName, email, password });
    }
});

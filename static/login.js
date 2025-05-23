document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                loginMessage.textContent = 'Please enter both username and password.';
                loginMessage.style.color = 'red';
                return;
            }

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    loginMessage.textContent = 'Login successful!';
                    loginMessage.style.color = 'green';
                    // Redirect to a welcome page or update UI
                    window.location.href = 'welcome.html'; 
                } else {
                    loginMessage.textContent = result.message || 'Login failed. Please try again.';
                    loginMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Login error:', error);
                loginMessage.textContent = 'An error occurred during login. Please try again.';
                loginMessage.style.color = 'red';
            }
        });
    }

    // Optional: Prevent default form submission if the form tag is used with a submit button
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent traditional form submission
        });
    }
});

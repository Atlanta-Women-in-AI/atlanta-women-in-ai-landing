// Footer Email Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('footerEmailForm');
    const formMessage = document.getElementById('formMessage');

    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('emailAddress').value.trim();
            const submitButton = e.target.querySelector('button[type="submit"]');

            // Validation
            if (!email || !email.includes('@') || !firstName || !lastName) {
                e.preventDefault();
                formMessage.textContent = 'Please fill in all fields with a valid email';
                formMessage.style.color = '#ef4444';
                return;
            }

            // Show loading state
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;

            // Show success message after short delay (form submits to hidden iframe)
            setTimeout(() => {
                formMessage.textContent = 'Thank you for subscribing!';
                formMessage.style.color = 'var(--primary-teal)';
                emailForm.reset();
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;

                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            }, 1000);
        });
    }
});

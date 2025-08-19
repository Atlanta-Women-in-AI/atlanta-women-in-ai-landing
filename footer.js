// Footer Component
document.addEventListener('DOMContentLoaded', function() {
    // Find all elements with class 'footer-container'
    const footerContainers = document.querySelectorAll('.footer-container');
    
    // Footer HTML template
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-main">
                    <!-- Email Signup Section -->
                    <div class="footer-signup">
                        <h4>Sign Up for Our Newsletter</h4>
                        <p>Insights delivered to your inbox</p>
                        <form class="email-form" id="footerEmailForm">
                            <input type="email" placeholder="Enter your email" required class="email-input">
                            <button type="submit" class="email-submit">Subscribe</button>
                        </form>
                        <span class="form-message" id="formMessage"></span>
                    </div>
                    
                    <!-- Social Links Section -->
                    <div class="footer-socials">
                        <h3>Atlanta Women in AI</h3>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/company/atlanta-women-in-ai/" target="_blank" aria-label="LinkedIn Page">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                            <a href="https://chat.whatsapp.com/L1mKOvGOpjdCDaNP8WdmkV" target="_blank" aria-label="WhatsApp">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                </svg>
                            </a>
                            <a href="https://www.eventbrite.com/e/atlanta-women-in-ai-stop-prompting-and-start-building-custom-gpts-tickets-1537924496569?aff=erelexpmlt" target="_blank" aria-label="Eventbrite">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 Atlanta Women in AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
    
    // Insert footer into each container
    footerContainers.forEach(container => {
        container.innerHTML = footerHTML;
    });
    
    // Initialize email form functionality with EmailJS
    const emailForm = document.getElementById('footerEmailForm');
    const formMessage = document.getElementById('formMessage');
    
    if (emailForm) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            const submitButton = e.target.querySelector('button[type="submit"]');
            
            // Simple email validation
            if (email && email.includes('@')) {
                // Show loading state
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;
                
                try {
                    // When EmailJS is configured, this will send the email
                    // For now, just show success message
                    formMessage.textContent = 'Thank you for subscribing!';
                    formMessage.style.color = 'var(--primary-teal)';
                    emailForm.reset();
                    
                    // Clear message after 3 seconds
                    setTimeout(() => {
                        formMessage.textContent = '';
                    }, 3000);
                } catch (error) {
                    console.error('Newsletter signup error:', error);
                    formMessage.textContent = 'An error occurred. Please try again.';
                    formMessage.style.color = '#ef4444';
                } finally {
                    // Reset button state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }
            } else {
                formMessage.textContent = 'Please enter a valid email address';
                formMessage.style.color = '#ef4444';
            }
        });
    }
});
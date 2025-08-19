// Newsletter Handler with EmailJS Integration
import { sendNewsletterSignupEmail } from './emailjs-config.js';

// Newsletter Popup Handler
export function initNewsletterPopup() {
    const emailForm = document.getElementById('popupEmailForm');
    const formMessage = document.getElementById('popupFormMessage');
    
    if (emailForm) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = e.target.querySelector('input[type="email"]');
            const email = emailInput.value;
            const submitButton = e.target.querySelector('button[type="submit"]');
            
            // Simple email validation
            if (email && email.includes('@')) {
                // Show loading state
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;
                
                try {
                    // Send email using EmailJS
                    const result = await sendNewsletterSignupEmail(email);
                    
                    if (result.success) {
                        formMessage.textContent = 'Thank you for subscribing!';
                        formMessage.style.color = 'var(--primary-teal)';
                        emailForm.reset();
                        
                        // Close popup after successful subscription
                        setTimeout(() => {
                            const overlay = document.getElementById('newsletter-popup-overlay');
                            if (overlay) {
                                overlay.classList.remove('show');
                                localStorage.setItem('newsletterPopupSeen', 'true');
                            }
                        }, 2000);
                    } else {
                        formMessage.textContent = result.message || 'Subscription failed. Please try again.';
                        formMessage.style.color = '#ef4444';
                    }
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
}

// Footer Newsletter Handler
export function initFooterNewsletter() {
    const emailForm = document.getElementById('footerEmailForm');
    const formMessage = document.getElementById('formMessage');
    
    if (emailForm) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = e.target.querySelector('input[type="email"]');
            const email = emailInput.value;
            const submitButton = e.target.querySelector('button[type="submit"]');
            
            // Simple email validation
            if (email && email.includes('@')) {
                // Show loading state
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;
                
                try {
                    // Send email using EmailJS
                    const result = await sendNewsletterSignupEmail(email);
                    
                    if (result.success) {
                        formMessage.textContent = 'Thank you for subscribing!';
                        formMessage.style.color = 'var(--primary-teal)';
                        emailForm.reset();
                        
                        // Clear message after 3 seconds
                        setTimeout(() => {
                            formMessage.textContent = '';
                        }, 3000);
                    } else {
                        formMessage.textContent = result.message || 'Subscription failed. Please try again.';
                        formMessage.style.color = '#ef4444';
                    }
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
}
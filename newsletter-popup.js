// Newsletter Popup Component
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already seen the popup (using localStorage)
    const hasSeenPopup = localStorage.getItem('newsletterPopupSeen');
    
    // Only show popup if user hasn't seen it before
    if (!hasSeenPopup) {
        // Create popup HTML
        const popupHTML = `
            <div id="newsletter-popup-overlay" class="newsletter-popup-overlay">
                <div class="newsletter-popup">
                    <button class="popup-close" id="popup-close">&times;</button>
                    <div class="popup-content">
                        <h2>Welcome to Atlanta Women in AI!</h2>
                        <h3>Sign Up for Our Newsletter</h3>
                        <p>Get AI insights and updates delivered straight to your inbox</p>
                        <form class="popup-email-form" id="popupEmailForm">
                            <input type="email" placeholder="Enter your email" required class="popup-email-input">
                            <button type="submit" class="popup-email-submit">Subscribe</button>
                        </form>
                        <span class="popup-form-message" id="popupFormMessage"></span>
                        <button class="popup-skip" id="popup-skip">Maybe Later</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add popup styles
        const popupStyles = `
            <style>
                .newsletter-popup-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }
                
                .newsletter-popup-overlay.show {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .newsletter-popup {
                    background: white;
                    border-radius: 12px;
                    padding: 40px;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.3s ease;
                }
                
                .popup-close {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 30px;
                    background: none;
                    border: none;
                    color: #999;
                    cursor: pointer;
                    transition: color 0.2s;
                }
                
                .popup-close:hover {
                    color: #333;
                }
                
                .popup-content {
                    text-align: center;
                }
                
                .popup-content h2 {
                    color: var(--primary-teal, #28a99e);
                    margin-bottom: 10px;
                    font-size: 24px;
                }
                
                .popup-content h3 {
                    color: #333;
                    margin-bottom: 15px;
                    font-size: 20px;
                }
                
                .popup-content p {
                    color: #666;
                    margin-bottom: 25px;
                    font-size: 16px;
                }
                
                .popup-email-form {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 15px;
                }
                
                .popup-email-input {
                    flex: 1;
                    padding: 12px 15px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 14px;
                    transition: border-color 0.2s;
                }
                
                .popup-email-input:focus {
                    outline: none;
                    border-color: var(--primary-teal, #28a99e);
                }
                
                .popup-email-submit {
                    padding: 12px 30px;
                    background: var(--primary-teal, #28a99e);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                
                .popup-email-submit:hover {
                    background: var(--primary-teal-dark, #1e7f76);
                }
                
                .popup-skip {
                    background: none;
                    border: none;
                    color: #999;
                    text-decoration: underline;
                    cursor: pointer;
                    font-size: 14px;
                    margin-top: 10px;
                    transition: color 0.2s;
                }
                
                .popup-skip:hover {
                    color: #666;
                }
                
                .popup-form-message {
                    display: block;
                    margin-bottom: 10px;
                    font-size: 14px;
                    min-height: 20px;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @media (max-width: 600px) {
                    .newsletter-popup {
                        padding: 30px 20px;
                    }
                    
                    .popup-email-form {
                        flex-direction: column;
                    }
                    
                    .popup-email-submit {
                        width: 100%;
                    }
                }
            </style>
        `;
        
        // Insert styles and HTML into page
        document.head.insertAdjacentHTML('beforeend', popupStyles);
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        // Get popup elements
        const overlay = document.getElementById('newsletter-popup-overlay');
        const closeBtn = document.getElementById('popup-close');
        const skipBtn = document.getElementById('popup-skip');
        
        // Show popup after 5 seconds
        setTimeout(() => {
            overlay.classList.add('show');
        }, 5000);
        
        // Close popup function
        function closePopup() {
            overlay.classList.remove('show');
            // Set flag so popup doesn't show again
            localStorage.setItem('newsletterPopupSeen', 'true');
        }
        
        // Close button click
        closeBtn.addEventListener('click', closePopup);
        
        // Skip button click
        skipBtn.addEventListener('click', closePopup);
        
        // Close on overlay click (outside popup)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closePopup();
            }
        });
        
        // Handle form submission with EmailJS
        const emailForm = document.getElementById('popupEmailForm');
        const formMessage = document.getElementById('popupFormMessage');
        
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
                        
                        // Close popup after successful subscription
                        setTimeout(() => {
                            closePopup();
                        }, 2000);
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
});
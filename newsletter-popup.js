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
                            <div class="popup-name-row">
                                <input type="text" name="firstName" placeholder="First Name" required class="popup-name-input">
                                <input type="text" name="lastName" placeholder="Last Name" required class="popup-name-input">
                            </div>
                            <input type="email" name="email" placeholder="Email Address" required class="popup-email-input">
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
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                    overflow: auto;
                    -webkit-overflow-scrolling: touch;
                }
                
                .newsletter-popup-overlay.show {
                    display: block;
                }
                
                .newsletter-popup {
                    background: white;
                    border-radius: 12px;
                    padding: 40px;
                    max-width: 500px;
                    width: 90%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    -webkit-transform: translate(-50%, -50%);
                    -ms-transform: translate(-50%, -50%);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.3s ease;
                    margin: 20px auto;
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
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .popup-name-row {
                    display: flex;
                    gap: 10px;
                }

                .popup-name-input,
                .popup-email-input {
                    width: 100%;
                    padding: 12px 15px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 14px;
                    transition: border-color 0.2s;
                }

                .popup-name-input:focus,
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
                        transform: translate(-50%, calc(-50% + 20px));
                        -webkit-transform: translate(-50%, calc(-50% + 20px));
                        opacity: 0;
                    }
                    to {
                        transform: translate(-50%, -50%);
                        -webkit-transform: translate(-50%, -50%);
                        opacity: 1;
                    }
                }
                
                @media (max-width: 600px) {
                    .newsletter-popup {
                        padding: 50px 20px 30px 20px;
                        width: 95%;
                        max-width: calc(100% - 20px);
                        transform: translate(-50%, -50%);
                        -webkit-transform: translate(-50%, -50%);
                    }
                    
                    .popup-close {
                        top: 10px;
                        right: 10px;
                        font-size: 24px;
                        z-index: 10;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .popup-content h2 {
                        font-size: 20px;
                        margin-top: 10px;
                    }
                    
                    .popup-content h3 {
                        font-size: 18px;
                    }

                    .popup-name-row {
                        flex-direction: column;
                    }

                    .popup-email-submit {
                        width: 100%;
                    }
                }
                
                /* Android-specific fixes */
                @supports (-webkit-overflow-scrolling: touch) {
                    .newsletter-popup {
                        position: fixed;
                        transform: translate(-50%, -50%);
                        -webkit-transform: translate(-50%, -50%);
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
                const firstName = e.target.querySelector('input[name="firstName"]').value;
                const lastName = e.target.querySelector('input[name="lastName"]').value;
                const email = e.target.querySelector('input[name="email"]').value;
                const submitButton = e.target.querySelector('button[type="submit"]');

                // Validation
                if (!firstName.trim() || !lastName.trim()) {
                    formMessage.textContent = 'Please enter your first and last name';
                    formMessage.style.color = '#ef4444';
                    return;
                }

                if (!email || !email.includes('@')) {
                    formMessage.textContent = 'Please enter a valid email address';
                    formMessage.style.color = '#ef4444';
                    return;
                }

                // Show loading state
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;

                try {
                    // Send email using EmailJS
                    const templateParams = {
                        first_name: firstName,
                        last_name: lastName,
                        subscriber_email: email,
                        signup_date: new Date().toLocaleString(),
                        signup_source: window.location.pathname
                    };

                    await emailjs.send(
                        'service_z3s1i63',
                        'newsletter_template',
                        templateParams
                    );

                    formMessage.textContent = `Thank you for subscribing, ${firstName}!`;
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
            });
        }
    }
});
// Contact Form Handler with EmailJS Integration
import { sendContactFormEmail } from './emailjs-config.js';

document.addEventListener('DOMContentLoaded', function() {
    // Handle inquiry type selection
    const inquiryOptions = document.querySelectorAll('.inquiry-type-option');
    const inquiryTypeInput = document.getElementById('inquiryType');
    const masterclassFields = document.getElementById('masterclassFields');
    const thinktankFields = document.getElementById('thinktankFields');
    const collaborateFields = document.getElementById('collaborateFields');

    inquiryOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            inquiryOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Set hidden input value
            const type = this.dataset.type;
            inquiryTypeInput.value = type;
            
            // Hide all conditional fields
            masterclassFields.classList.remove('active');
            thinktankFields.classList.remove('active');
            collaborateFields.classList.remove('active');
            
            // Show relevant fields
            if (type === 'masterclass') {
                masterclassFields.classList.add('active');
            } else if (type === 'thinktank') {
                thinktankFields.classList.add('active');
            } else if (type === 'collaborate') {
                collaborateFields.classList.add('active');
            }
        });
    });

    // Handle form submission with EmailJS
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate inquiry type is selected
        if (!inquiryTypeInput.value) {
            alert('Please select what you would like to do.');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Send email using EmailJS
            const result = await sendContactFormEmail(data);
            
            if (result.success) {
                // Show success message
                alert('Thank you for your submission! We will get back to you within 2-3 business days.');
                
                // Reset form
                this.reset();
                inquiryOptions.forEach(opt => opt.classList.remove('selected'));
                masterclassFields.classList.remove('active');
                thinktankFields.classList.remove('active');
                collaborateFields.classList.remove('active');
            } else {
                // Show error message
                alert(result.message || 'There was an error sending your submission. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your submission. Please try again or contact us directly.');
        } finally {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
});
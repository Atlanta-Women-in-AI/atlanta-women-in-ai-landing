// Contact Form Handler with EmailJS Integration

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
            // Prepare template parameters
            const templateParams = {
                from_name: `${data.first_name} ${data.last_name}`,
                from_email: data.email,
                phone: data.phone || 'Not provided',
                company: data.company || 'Not provided',
                job_title: data.job_title || 'Not provided',
                inquiry_type: data.inquiry_type,
                message: data.additional_info || 'No additional information',
                referral_source: data.referral_source || 'Not specified',
                date: new Date().toLocaleString(),
                page_url: window.location.href
            };
            
            // Add conditional fields based on inquiry type
            if (data.inquiry_type === 'masterclass') {
                templateParams.class_title = data.class_title || '';
                templateParams.class_description = data.class_description || '';
                templateParams.class_duration = data.class_duration || 'Not specified';
                templateParams.class_format = data.class_format || 'Not specified';
                templateParams.expertise = data.expertise || 'Not provided';
            } else if (data.inquiry_type === 'thinktank') {
                templateParams.project_name = data.project_name || '';
                templateParams.project_description = data.project_description || '';
                templateParams.project_stage = data.project_stage || 'Not specified';
                templateParams.feedback_areas = data.feedback_areas || 'Not specified';
            } else if (data.inquiry_type === 'collaborate') {
                templateParams.event_type = data.event_type || '';
                templateParams.event_description = data.event_description || '';
                templateParams.proposed_date = data.proposed_date || 'Not specified';
                templateParams.expected_attendees = data.expected_attendees || 'Not specified';
                templateParams.sponsorship = data.sponsorship || 'Not specified';
            }
            
            // Send email using EmailJS
            await emailjs.send(
                'service_z3s1i63',
                'contact_form_template',
                templateParams
            );
            
            // Show success message
            alert('Thank you for your submission! We will get back to you within 2-3 business days.');
            
            // Reset form
            this.reset();
            inquiryOptions.forEach(opt => opt.classList.remove('selected'));
            masterclassFields.classList.remove('active');
            thinktankFields.classList.remove('active');
            collaborateFields.classList.remove('active');
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
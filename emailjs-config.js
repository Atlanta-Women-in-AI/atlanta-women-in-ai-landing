// EmailJS Configuration
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('CH1VCzeSQiH7E-p7A');

// EmailJS Service Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_z3s1i63',
    contactTemplateId: 'contact_form_template', // Template for contact form
    newsletterTemplateId: 'newsletter_template' // Template for newsletter signup
};

// Function to send contact form email
export async function sendContactFormEmail(formData) {
    try {
        const templateParams = {
            to_email: 'contactawiai@gmail.com',
            from_name: `${formData.first_name} ${formData.last_name}`,
            from_email: formData.email,
            phone: formData.phone || 'Not provided',
            company: formData.company || 'Not provided',
            job_title: formData.job_title || 'Not provided',
            inquiry_type: formData.inquiry_type,
            message: formData.additional_info || 'No additional information',
            
            // Conditional fields based on inquiry type
            ...(formData.inquiry_type === 'masterclass' && {
                class_title: formData.class_title,
                class_description: formData.class_description,
                class_duration: formData.class_duration || 'Not specified',
                class_format: formData.class_format || 'Not specified',
                expertise: formData.expertise || 'Not provided'
            }),
            
            ...(formData.inquiry_type === 'thinktank' && {
                project_name: formData.project_name,
                project_description: formData.project_description,
                project_stage: formData.project_stage || 'Not specified',
                feedback_areas: formData.feedback_areas || 'Not specified'
            }),
            
            ...(formData.inquiry_type === 'collaborate' && {
                event_type: formData.event_type,
                event_description: formData.event_description,
                proposed_date: formData.proposed_date || 'Not specified',
                expected_attendees: formData.expected_attendees || 'Not specified',
                sponsorship: formData.sponsorship || 'Not specified'
            }),
            
            referral_source: formData.referral_source || 'Not specified'
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.contactTemplateId,
            templateParams
        );

        console.log('Email sent successfully:', response);
        return { success: true, message: 'Your submission has been sent successfully!' };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, message: 'Failed to send your submission. Please try again.' };
    }
}

// Function to send newsletter signup email
export async function sendNewsletterSignupEmail(email) {
    try {
        const templateParams = {
            to_email: 'contactawiai@gmail.com',
            subscriber_email: email,
            signup_date: new Date().toLocaleString(),
            signup_source: window.location.pathname
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.newsletterTemplateId,
            templateParams
        );

        console.log('Newsletter signup email sent:', response);
        return { success: true, message: 'Successfully subscribed to newsletter!' };
    } catch (error) {
        console.error('Failed to send newsletter signup:', error);
        return { success: false, message: 'Failed to subscribe. Please try again.' };
    }
}

// Instructions for setup:
// 1. Sign up for EmailJS at https://www.emailjs.com/
// 2. Create a new service (Gmail, Outlook, etc.)
// 3. Create email templates for contact form and newsletter
// 4. Replace YOUR_PUBLIC_KEY with your EmailJS public key
// 5. Replace YOUR_SERVICE_ID with your EmailJS service ID
// 6. Update template IDs if different from defaults
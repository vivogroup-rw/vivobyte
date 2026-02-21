// Custom Cursor Effect
const initCursor = () => {
    const cursor = document.querySelector('.cursor-glow');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }
};

// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Project Discovery Form Handling
    const discoveryForm = document.querySelector('.discovery-form');
    const successModal = document.getElementById('successModal');

    if (discoveryForm) {
        discoveryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Constructing email body
            const emailBody = `
Business Name: ${data.business_name || 'N/A'}
Contact Email: ${data.email || 'N/A'}
Phone Number: ${data.country_code || ''} ${data.phone || 'N/A'}
Project Type: ${data.project_type || 'N/A'}
Goals: ${data.goals || 'N/A'}
Timeline: ${data.timeline || 'N/A'}
Budget: ${data.budget || 'N/A'}
            `.trim();

            const mailtoLink = `mailto:vivogroup.rw@gmail.com?subject=New Order Inquiry - ${data.business_name || 'Project'}&body=${encodeURIComponent(emailBody)}`;

            // Set a flag that we're waiting for the user to return from email client
            sessionStorage.setItem('formSubmissionPending', 'true');

            // Trigger the email client
            window.location.href = mailtoLink;
        });
    }

    // Detect return to page to show success modal
    window.addEventListener('focus', () => {
        if (sessionStorage.getItem('formSubmissionPending') === 'true') {
            if (successModal) {
                successModal.classList.add('active');
            }
            if (discoveryForm) {
                discoveryForm.reset();
            }
            sessionStorage.removeItem('formSubmissionPending');
        }
    });
});

// Modal Control
function closeModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.remove('active');
    }
}

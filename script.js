// Custom Cursor Effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

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
    if (discoveryForm) {
        discoveryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const businessName = this.querySelector('input[placeholder="Your Brand Name"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const projectType = this.querySelector('select').value;
            const goals = this.querySelector('textarea').value;
            const timeline = this.querySelectorAll('select')[1].value;
            const budget = this.querySelectorAll('select')[2].value;

            const subject = encodeURIComponent(`Project Discovery: ${businessName}`);
            const body = encodeURIComponent(
                `Brand: ${businessName}\n` +
                `Contact: ${email}\n` +
                `Type: ${projectType}\n` +
                `Timeline: ${timeline}\n` +
                `Budget: ${budget}\n\n` +
                `Goals:\n${goals}`
            );

            window.location.href = `mailto:vivogroup.rw@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});

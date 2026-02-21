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

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            // UI Feedback
            submitBtn.innerText = 'Processing...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Using Formspree - Direct Email Endpoint
            fetch('https://formspree.io/vivogroup.rw@gmail.com', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    showSuccessModal();
                    discoveryForm.reset();
                } else {
                    return response.json().then(errorData => {
                        console.error('Submission Error:', errorData);
                        alert("Submission failed. This usually happens if the form endpoint isn't activated. Please try again later or use WhatsApp.");
                    });
                }
            }).catch(error => {
                console.error('Fetch Error:', error);
                alert("Connection error. Please check your internet or reach out via WhatsApp.");
            }).finally(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}

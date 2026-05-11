// Isaiah Okuna - Global Scripts

document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Year for Footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('show');
            menuToggle.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('show') && !navMenu.contains(e.target) && e.target !== menuToggle) {
                navMenu.classList.remove('show');
                menuToggle.textContent = '☰';
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                menuToggle.textContent = '☰';
            });
        });
    }

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Form Submission Status & URL Params
    const contactForm = document.querySelector('form');
    const subjectSelect = document.getElementById('subject');
    
    // Check for subject in URL
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    if (subjectSelect && subjectParam) {
        // Try to match the param with an option
        for (let i = 0; i < subjectSelect.options.length; i++) {
            if (subjectSelect.options[i].value === subjectParam || subjectSelect.options[i].text === subjectParam) {
                subjectSelect.selectedIndex = i;
                break;
            }
        }
        // If not found in dropdown, we could add it, but for now just match existing
    }

    if (contactForm && document.getElementById('form-status')) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusEl = document.getElementById('form-status');
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = subjectSelect ? subjectSelect.value : 'General Inquiry';
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                statusEl.textContent = "Please fill in all fields.";
                statusEl.style.color = "#ef4444"; // Error red
                return;
            }

            const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:nyawuorisaiah@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Try to open in a new tab/window to avoid navigating away
            window.location.href = mailtoLink;

            statusEl.textContent = "Opening your email client...";
            statusEl.style.color = "var(--primary)";
            
            // Optional: Redirect to thanks page after a delay
            setTimeout(() => {
                window.location.href = 'contacts-thanks.html';
            }, 2000);
        });
    }

    // 5. Header Scroll Effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = "0.5rem 0";
            header.style.background = "rgba(10, 15, 24, 0.95)";
        } else {
            header.style.padding = "0";
            header.style.background = "rgba(10, 15, 24, 0.8)";
        }
    });
});

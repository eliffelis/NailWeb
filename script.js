// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    function toggleMenu() {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Hamburger menü tıklama olayı
    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;

        const spinnerSvg = `
            <svg class="spinner" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        `;

        function showLoadingState() {
            submitButton.disabled = true;
            submitButton.innerHTML = `${spinnerSvg}Gönderiliyor...`;
        }

        function showSuccessMessage() {
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
            contactForm.insertBefore(successMessage, contactForm.firstChild);
        }

        function resetForm() {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            contactForm.reset();

            // Remove success message after 5 seconds
            setTimeout(() => {
                const successMessage = document.querySelector('.form-success');
                if (successMessage) {
                    successMessage.remove();
                }
            }, 5000);
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Remove any existing success message
            const existingSuccess = document.querySelector('.form-success');
            if (existingSuccess) {
                existingSuccess.remove();
            }

            showLoadingState();

            // Simulate form submission delay
            setTimeout(() => {
                showSuccessMessage();
                resetForm();
            }, 1500);
        });
    }

    // Dropdown handling
    dropdowns.forEach(dropdown => {
        const dropdownBtn = dropdown.querySelector('.dropbtn');
        
        dropdownBtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const wasActive = dropdown.classList.contains('active');
                
                dropdowns.forEach(d => d.classList.remove('active'));
                
                if (!wasActive) {
                    dropdown.classList.add('active');
                }
            }
        });
    });
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});
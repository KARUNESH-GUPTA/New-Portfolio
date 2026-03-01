// JavaScript for Karunesh's Portfolio - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initNavigationHighlight();
    initMobileNavigation();
    initScrollRevealAnimations();
    initContactForm();
    initScrollEffects();
    initStatsAnimation();
    initProfileCardEffects();
    initKeyboardNavigation();
});

// Smooth scrolling for navigation links - FIXED
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.hero-actions a');
    
    [...navLinks, ...heroButtons].forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = 80;
                    const elementTop = targetElement.offsetTop;
                    const targetPosition = elementTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    closeMobileNav();
                    
                    // Update active nav link
                    updateActiveNavLink(href);
                }
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(href) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

// Navigation highlight based on scroll position - IMPROVED
function initNavigationHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        const navHeight = 80;
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                activeSection = sectionId;
            }
        });
        
        // Special case for top of page
        if (scrollY < 100) {
            activeSection = 'home';
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (activeSection && link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(highlightNavigation, 10);
    });
    
    highlightNavigation(); // Run once on load
}

// Mobile navigation functionality - IMPROVED
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileNav();
        });
        
        // Close menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(closeMobileNav, 100);
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileNav();
            }
        });
    }
}

function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const isOpen = navMenu.classList.contains('mobile-open');
    
    if (isOpen) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
}

function openMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.add('mobile-open');
    navMenu.style.display = 'flex';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.right = '0';
    navMenu.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    navMenu.style.backdropFilter = 'blur(10px)';
    navMenu.style.flexDirection = 'column';
    navMenu.style.padding = '20px';
    navMenu.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
    navMenu.style.gap = '16px';
    navMenu.style.zIndex = '1001';
    
    // Animate toggle button
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
}

function closeMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu) {
        navMenu.classList.remove('mobile-open');
        navMenu.style.display = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.backgroundColor = '';
        navMenu.style.backdropFilter = '';
        navMenu.style.flexDirection = '';
        navMenu.style.padding = '';
        navMenu.style.borderTop = '';
        navMenu.style.gap = '';
        navMenu.style.zIndex = '';
    }
    
    // Reset toggle button
    if (navToggle) {
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Scroll reveal animations
function initScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add scroll reveal to elements
    const revealElements = document.querySelectorAll(
        '.section-header, .about-content, .interest-category, .profile-card, .contact-content'
    );
    
    revealElements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Contact form handling - FIXED
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Remove any existing success messages
    const existingMessages = form.querySelectorAll('.form-success-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.style.opacity = '0.7';
    
    // Get form data for validation
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        showFormError('Please fill in all fields.');
        resetSubmitButton(submitButton, originalText);
        return;
    }
    
    // Simulate form submission with success
    setTimeout(() => {
        showFormSuccess(form);
        form.reset();
        resetSubmitButton(submitButton, originalText);
    }, 1500);
}

function resetSubmitButton(button, originalText) {
    button.disabled = false;
    button.textContent = originalText;
    button.style.opacity = '1';
}

function showFormSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <div style="
            background: linear-gradient(135deg, rgba(255, 51, 102, 0.1), rgba(255, 51, 102, 0.05));
            border: 1px solid rgba(255, 51, 102, 0.3);
            border-radius: 8px;
            padding: 16px;
            margin-top: 16px;
            color: #ffffff;
            text-align: center;
            animation: slideDown 0.3s ease-out;
        ">
            <strong>✓ Message sent successfully!</strong><br>
            Thank you for reaching out. I'll get back to you soon.
        </div>
    `;
    
    form.appendChild(successMessage);
    
    // Add slide down animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 5000);
}

function showFormError(message) {
    const form = document.querySelector('.contact-form');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-error-message';
    errorMessage.innerHTML = `
        <div style="
            background: linear-gradient(135deg, rgba(255, 84, 89, 0.1), rgba(255, 84, 89, 0.05));
            border: 1px solid rgba(255, 84, 89, 0.3);
            border-radius: 8px;
            padding: 16px;
            margin-top: 16px;
            color: #ff5459;
            text-align: center;
        ">
            <strong>⚠ ${message}</strong>
        </div>
    `;
    
    form.appendChild(errorMessage);
    
    setTimeout(() => {
        errorMessage.remove();
    }, 3000);
}

// Additional scroll effects
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const nav = document.querySelector('.nav-fixed');
        
        // Navigation background opacity based on scroll
        if (scrolled > 50) {
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Enhanced hover effects for profile cards
function initProfileCardEffects() {
    const profileCards = document.querySelectorAll('.profile-card');
    
    profileCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-6px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
    });
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileNav();
        }
        
        // Add keyboard navigation for nav links
        if (e.key === 'Tab') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.classList.contains('nav-link')) {
                activeElement.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        activeElement.click();
                    }
                });
            }
        }
    });
}

// Add intersection observer for statistics counter animation
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateStatNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateStatNumber(element) {
    const text = element.textContent;
    
    element.style.transform = 'scale(1.1)';
    element.style.color = '#ff3366';
    element.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// Add smooth loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active nav link
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Add loading complete class to body for any CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});
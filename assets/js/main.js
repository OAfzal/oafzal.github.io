// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle?.contains(e.target) && !navMenu?.contains(e.target)) {
        navMenu?.classList.remove('active');
        const spans = navToggle?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
if (currentTheme === 'dark') {
    themeToggle?.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle?.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Set last updated date
const lastUpdated = document.getElementById('lastUpdated');
if (lastUpdated) {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    lastUpdated.textContent = date.toLocaleDateString('en-US', options);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current navigation item
const currentLocation = location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentLocation) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections (excluding publications)
document.querySelectorAll('section:not(.publications-section)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add loading state for external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function() {
        if (!this.href.includes(window.location.hostname)) {
            this.target = '_blank';
            this.rel = 'noopener noreferrer';
        }
    });
});

// Print function for CV
window.printCV = function() {
    window.print();
};

// Email protection (simple obfuscation)
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const email = this.href.replace('mailto:', '');
        window.location.href = 'mailto:' + email;
    });
});

// Publications filter functionality
function filterYear(year) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Show/hide year sections
    document.querySelectorAll('.year-section').forEach(section => {
        if (year === 'all' || section.dataset.year === year) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

// Initialize publications on page load - show all by default
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.year-section').forEach(section => {
        section.classList.remove('hidden');
    });
});
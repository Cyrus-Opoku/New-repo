// ============================================
// DOM Element References
// ============================================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const navLinks = document.querySelectorAll('.nav-link');
const projectLinks = document.querySelectorAll('.project-link');
const scrollTopBtn = document.createElement('button');

// ============================================
// Mobile Menu Toggle
// ============================================
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Add animation class
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('animate-slide-up');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ============================================
// Navigation Active State
// ============================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'font-semibold');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-blue-600', 'font-semibold');
        }
    });
});

// ============================================
// Scroll to Top Button
// ============================================
scrollTopBtn.textContent = '↑';
scrollTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition z-40 hidden font-bold text-lg';
scrollTopBtn.id = 'scrollTopBtn';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.remove('hidden');
    } else {
        scrollTopBtn.classList.add('hidden');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Form Validation
// ============================================
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateName = (name) => {
    return name.trim().length >= 2;
};

const validateMessage = (message) => {
    return message.trim().length >= 10;
};

// ============================================
// Contact Form Submission
// ============================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const subscribe = document.getElementById('subscribe').checked;
    
    // Reset error messages
    document.getElementById('nameError').classList.add('hidden');
    document.getElementById('emailError').classList.add('hidden');
    document.getElementById('subjectError').classList.add('hidden');
    document.getElementById('messageError').classList.add('hidden');
    
    // Clear previous input styles
    document.getElementById('name').classList.remove('input-error', 'input-success');
    document.getElementById('email').classList.remove('input-error', 'input-success');
    document.getElementById('subject').classList.remove('input-error', 'input-success');
    document.getElementById('message').classList.remove('input-error', 'input-success');
    
    let isValid = true;
    
    // Validate Name
    if (!validateName(name)) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters long';
        document.getElementById('nameError').classList.remove('hidden');
        document.getElementById('name').classList.add('input-error');
        isValid = false;
    } else {
        document.getElementById('name').classList.add('input-success');
    }
    
    // Validate Email
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('emailError').classList.remove('hidden');
        document.getElementById('email').classList.add('input-error');
        isValid = false;
    } else {
        document.getElementById('email').classList.add('input-success');
    }
    
    // Validate Subject
    if (subject.trim().length === 0) {
        document.getElementById('subjectError').textContent = 'Subject is required';
        document.getElementById('subjectError').classList.remove('hidden');
        document.getElementById('subject').classList.add('input-error');
        isValid = false;
    } else {
        document.getElementById('subject').classList.add('input-success');
    }
    
    // Validate Message
    if (!validateMessage(message)) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters long';
        document.getElementById('messageError').classList.remove('hidden');
        document.getElementById('message').classList.add('input-error');
        isValid = false;
    } else {
        document.getElementById('message').classList.add('input-success');
    }
    
    // If all validations pass, show success message
    if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('btn-loading');
        
        // Simulate API call (300ms delay)
        setTimeout(() => {
            // Show success message
            formMessage.innerHTML = `
                <div class="success-message">
                    <strong>✓ Success!</strong> Your message has been sent successfully. I'll get back to you soon!
                </div>
            `;
            formMessage.classList.remove('hidden');
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('btn-loading');
            
            // Clear inputs styling
            document.getElementById('name').classList.remove('input-success');
            document.getElementById('email').classList.remove('input-success');
            document.getElementById('subject').classList.remove('input-success');
            document.getElementById('message').classList.remove('input-success');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }, 1500);
    }
});

// ============================================
// Real-time Form Validation
// ============================================
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length > 0) {
        if (validateName(nameInput.value)) {
            nameInput.classList.remove('input-error');
            nameInput.classList.add('input-success');
        } else {
            nameInput.classList.remove('input-success');
            nameInput.classList.add('input-error');
        }
    }
});

emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim().length > 0) {
        if (validateEmail(emailInput.value)) {
            emailInput.classList.remove('input-error');
            emailInput.classList.add('input-success');
        } else {
            emailInput.classList.remove('input-success');
            emailInput.classList.add('input-error');
        }
    }
});

subjectInput.addEventListener('blur', () => {
    if (subjectInput.value.trim().length > 0) {
        subjectInput.classList.remove('input-error');
        subjectInput.classList.add('input-success');
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim().length > 0) {
        if (validateMessage(messageInput.value)) {
            messageInput.classList.remove('input-error');
            messageInput.classList.add('input-success');
        } else {
            messageInput.classList.remove('input-success');
            messageInput.classList.add('input-error');
        }
    }
});

// ============================================
// Project Link Click Handlers
// ============================================
projectLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const projects = [
            {
                name: 'E-Commerce Platform',
                description: 'A full-stack e-commerce solution built with React and Laravel. Features include product management, shopping cart, order tracking, and secure payment integration with Stripe.',
                year: '2024',
                team: 'Team of 3 developers'
            },
            {
                name: 'Task Management App',
                description: 'Responsive web application for managing tasks and projects. Features include drag-and-drop functionality, real-time updates using Firebase, user authentication, and project collaboration tools.',
                year: '2024',
                team: 'Solo project'
            },
            {
                name: 'Creative Portfolio',
                description: 'Modern portfolio website for a creative designer featuring smooth animations, interactive image galleries, contact form with email integration, and responsive design.',
                year: '2023',
                team: 'Client project'
            }
        ];
        
        const project = projects[index];
        alert(
            `📌 ${project.name}\n\n` +
            `📝 ${project.description}\n\n` +
            `📅 Year: ${project.year}\n` +
            `👥 ${project.team}\n\n` +
            `(In a real application, this would navigate to a detailed project page)`
        );
    });
});

// ============================================
// Smooth Scroll Spy Enhancement
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hashes
        if (href !== '#') {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        }
    });
});

// ============================================
// Scroll Animation for Elements
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// ============================================
// Newsletter Subscription Handler
// ============================================
const subscribeCheckbox = document.getElementById('subscribe');

subscribeCheckbox.addEventListener('change', () => {
    if (subscribeCheckbox.checked) {
        console.log('User subscribed to newsletter');
        // In a real app, this would be handled with the form submission
    }
});

// ============================================
// Keyboard Navigation Enhancements
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
    
    // Skip to main content (Accessibility)
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const mainContent = document.querySelector('section');
        mainContent?.focus();
    }
});

// ============================================
// Contact Form with Local Storage
// ============================================
// Auto-save form data to prevent loss
const formInputs = [nameInput, emailInput, subjectInput, messageInput];

formInputs.forEach(input => {
    // Load saved data on page load
    const savedValue = localStorage.getItem(`form_${input.id}`);
    if (savedValue) {
        input.value = savedValue;
    }
    
    // Save data on input
    input.addEventListener('input', () => {
        localStorage.setItem(`form_${input.id}`, input.value);
    });
});

// Clear saved form data after successful submission
function clearFormStorage() {
    formInputs.forEach(input => {
        localStorage.removeItem(`form_${input.id}`);
    });
}

// ============================================
// Dark Mode Toggle (Optional Enhancement)
// ============================================
// Detect system preference and set initial theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // User prefers dark mode (optional for future enhancement)
    console.log('Dark mode preferred');
}

// ============================================
// Page Load Event
// ============================================
window.addEventListener('load', () => {
    console.log('Portfolio website loaded successfully');
    // Add any animations or additional logic on page load here
});

// ============================================
// Error Handling
// ============================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // In production, send error to logging service
});

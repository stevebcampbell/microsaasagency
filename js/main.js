// Main JavaScript for MicroSaaS Agency

// Global variables
let particleSystem = null;
let currentSection = 'hero';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeParticleSystem();
    initializeNavigation();
    initializeScrollEffects();
    initializeInteractiveEffects();
    initializeQuickReference();
});

// Particle System
function initializeParticleSystem() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;
    
    const particleCount = window.innerWidth > 768 ? 30 : 15;
    
    // Clear existing particles
    particleContainer.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const randomX = Math.random() * window.innerWidth;
    const randomDelay = Math.random() * 20;
    const randomDuration = 20 + Math.random() * 15;
    
    particle.style.left = randomX + 'px';
    particle.style.animationDelay = randomDelay + 's';
    particle.style.animationDuration = randomDuration + 's';
    
    // Random particle color and opacity
    const colors = [
        'rgba(10, 132, 255, 0.6)',
        'rgba(94, 92, 230, 0.6)',
        'rgba(50, 215, 75, 0.4)',
        'rgba(255, 159, 10, 0.4)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = `radial-gradient(circle, ${randomColor}, transparent)`;
    
    container.appendChild(particle);
}

// Navigation System
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                updateActiveNavDot(targetId);
            }
        });
    });
    
    // Navigation dots functionality
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            scrollToSection(section);
        });
    });
}

function scrollToSection(sectionName) {
    let targetElement;
    
    switch(sectionName) {
        case 'hero':
            targetElement = document.querySelector('.hero-section');
            break;
        case 'services':
            targetElement = document.getElementById('services');
            break;
        case 'portfolio':
            targetElement = document.getElementById('portfolio');
            break;
        case 'team':
            targetElement = document.getElementById('team');
            break;
        case 'contact':
            targetElement = document.getElementById('contact');
            break;
        default:
            targetElement = document.querySelector('.hero-section');
    }
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        updateActiveNavDot(sectionName);
    }
}

function updateActiveNavDot(sectionName) {
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.classList.remove('active');
    });
    
    const activeDot = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeDot) {
        activeDot.classList.add('active');
    }
    
    currentSection = sectionName;
}

// Scroll Effects
function initializeScrollEffects() {
    // Intersection Observer for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id || 'hero';
                updateActiveNavDot(sectionId);
                
                // Add animation classes
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px'
    });
    
    // Observe all main sections
    document.querySelectorAll('section, .hero-section').forEach(section => {
        observer.observe(section);
    });
    
    // Parallax effects on scroll
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Parallax for cards
        document.querySelectorAll('.value-card, .feature-card').forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            
            if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight) {
                const progress = (scrollY + windowHeight - elementTop) / (windowHeight + elementHeight);
                const translateY = Math.sin(progress * Math.PI) * 10;
                const scale = 0.98 + (progress * 0.04);
                
                card.style.transform = `translateY(${translateY}px) scale(${scale})`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Interactive Effects
function initializeInteractiveEffects() {
    // Enhanced button hover effects
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'buttonFloat 0.3s ease-out, primaryPulse 1s ease-in-out infinite';
            createButtonRipple(this);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = 'buttonFloat 6s ease-in-out infinite alternate, primaryPulse 8s ease-in-out infinite';
        });
        
        button.addEventListener('click', function(e) {
            createClickExplosion(e.clientX, e.clientY);
        });
    });
    
    // Card hover effects with mouse tracking
    document.querySelectorAll('.value-card, .feature-card, .access-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
            
            // Add subtle glow effect
            const intensity = Math.min(Math.abs(x - 50) + Math.abs(y - 50), 50) / 50;
            card.style.boxShadow = `0 ${8 + intensity * 12}px ${24 + intensity * 16}px rgba(10, 132, 255, ${0.1 + intensity * 0.1})`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
    
    // Hero title interactive effects
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.filter = 'drop-shadow(0 0 30px rgba(10, 132, 255, 0.5))';
        });
        
        heroTitle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))';
        });
    }
    
    // Logo interactive effects
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            scrollToSection('hero');
        });
    }
}

// Create button ripple effect
function createButtonRipple(button) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    ripple.style.pointerEvents = 'none';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Create click explosion effect
function createClickExplosion(x, y) {
    const particles = 8;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = 'radial-gradient(circle, rgba(10, 132, 255, 0.8), rgba(94, 92, 230, 0.6))';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        particle.style.boxShadow = '0 0 10px rgba(10, 132, 255, 0.8)';
        
        const angle = (i / particles) * Math.PI * 2;
        const distance = 30 + Math.random() * 30;
        const duration = 0.6 + Math.random() * 0.3;
        
        particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

// Quick Reference Modal
function initializeQuickReference() {
    // Close modal on outside click
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('quickRefModal');
        if (modal && e.target === modal) {
            toggleQuickRef();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('quickRefModal');
            if (modal && modal.style.display === 'flex') {
                toggleQuickRef();
            }
        }
    });
}

function toggleQuickRef() {
    const modal = document.getElementById('quickRefModal');
    if (!modal) return;
    
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    } else {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function scrollToContact() {
    scrollToSection('contact');
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Resize handler
window.addEventListener('resize', debounce(() => {
    initializeParticleSystem();
}, 250));

// Add CSS animations dynamically if needed
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .section-visible {
            animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .card-hover-glow {
            transition: box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData.loadEventEnd - perfData.loadEventStart > 3000) {
                console.log('Page load time is slow, consider optimizing');
            }
        }, 0);
    });
}

// Export functions for global access
window.MicroSaaSAgency = {
    toggleQuickRef,
    scrollToContact,
    scrollToSection,
    initializeParticleSystem
};

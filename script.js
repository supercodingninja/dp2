/* ============================================
   DALILAH PEREZ — PREMIUM EDITORIAL PORTFOLIO
   script.js | Family First Life
   ============================================ */

// ============================================
// LOADING SEQUENCE
// ============================================
const loader = document.getElementById('loader');
const loaderBrand = document.getElementById('loaderBrand');

// Animate brand text character by character
const brandText = loaderBrand.textContent;
loaderBrand.innerHTML = '';
brandText.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? ' ' : char;
    span.style.animationDelay = `${i * 0.06}s`;
    loaderBrand.appendChild(span);
});

// Hide loader after delay
setTimeout(() => {
    loader.classList.add('hidden');
    initAnimations();
}, 2200);

// ============================================
// NAV SCROLL EFFECT
// ============================================
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ============================================
// INTERSECTION OBSERVER — REVEAL ANIMATIONS
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate counters
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.count);
                    if (!counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter, target);
                    }
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Hero title animation
    const heroLines = document.querySelectorAll('.hero-title .word');
    heroLines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(40px)';
        setTimeout(() => {
            line.style.transition = 'all 0.9s cubic-bezier(0.65, 0, 0.35, 1)';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 400 + i * 150);
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const suffix = element.dataset.suffix || '';

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// ============================================
// PARALLAX HERO IMAGE
// ============================================
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.15;
        heroImage.style.transform = `translateY(${rate}px) scale(1.05)`;
    });
}

// ============================================
// FORM HANDLING
// ============================================
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
        btn.textContent = 'Message Sent';
        btn.style.background = 'var(--success)';
        btn.style.opacity = '1';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            e.target.reset();
        }, 2500);
    }, 1800);
});

// ============================================
// MARQUEE SPEED CONTROL
// ============================================
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        scrollVelocity = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;

        const speed = Math.max(15, 25 - scrollVelocity * 0.3);
        marqueeTrack.style.animationDuration = `${speed}s`;
    });
}

// ============================================
// CARRIER ITEM STAGGER
// ============================================
document.querySelectorAll('.carrier-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `all 0.6s cubic-bezier(0.65, 0, 0.35, 1) ${i * 0.05}s`;
});

const carrierObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.carrier-item').forEach(item => {
    carrierObserver.observe(item);
});

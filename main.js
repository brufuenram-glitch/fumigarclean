/* ================================================
   FUMIGAR CLEAN — MAIN.JS
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Navbar scroll effect ── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    }, { passive: true });

    /* ── Mobile nav toggle ── */
    const navToggle = document.getElementById('navToggle');
    const navMenu   = document.getElementById('navMenu');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    /* ── Active nav link on scroll ── */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks  = document.querySelectorAll('.nav-link');
    function updateActiveNavLink() {
        let currentId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 100;
            if (window.scrollY >= top) currentId = sec.id;
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
            }
        });
    }

    /* ── Scroll-reveal cards ── */
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger delay based on index within parent
                const siblings = [...entry.target.parentElement.children];
                const idx = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.card-animate').forEach(el => {
        cardObserver.observe(el);
    });

    /* ── Floating WhatsApp pulse toggle (pause on hover) ── */
    const floatingWA = document.getElementById('floatingWA');
    if (floatingWA) {
        // Show after 2s delay
        floatingWA.style.opacity = '0';
        floatingWA.style.transform = 'scale(0.8)';
        floatingWA.style.transition = 'opacity .5s ease, transform .5s ease';
        setTimeout(() => {
            floatingWA.style.opacity = '1';
            floatingWA.style.transform = 'scale(1)';
        }, 2000);
    }

    /* ── Smooth scroll polyfill for older browsers ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = parseInt(getComputedStyle(document.documentElement)
                    .getPropertyValue('--nav-h')) || 78;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ── Trust banner scroll ticker (optional micro-animation) ── */
    // Adds a subtle entrance animation to trust items
    const trustItems = document.querySelectorAll('.trust-item');
    const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(10px)';
                entry.target.style.transition = `opacity .4s ease ${i * 0.1}s, transform .4s ease ${i * 0.1}s`;
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                });
                trustObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    trustItems.forEach(item => trustObserver.observe(item));

    /* ── Stats counter animation ── */
    function animateCounter(el, target, suffix) {
        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = '+' + Math.floor(eased * target).toLocaleString('es-MX') + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    const statsEl = document.querySelector('.hero-stats');
    if (statsEl) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const stats = statsEl.querySelectorAll('strong');
                // stat 0: businesses, stat 1: families
                if (stats[0]) animateCounter(stats[0], 150, '');
                if (stats[1]) animateCounter(stats[1], 3000, '');
                statsObserver.unobserve(statsEl);
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsEl);
    }

    console.log('%c🌿 Fumigar Clean — Site loaded v1.0', 'color:#2E7D32;font-weight:bold;font-size:13px;');
});

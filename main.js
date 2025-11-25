/* =============================================================
             FreshTuff front-end script
             - Navigation & dropdowns
             - Smooth scroll
             - Form UX & submission
             - Header effects
             - Reveal animations & counters
             - Back-to-top
             - Hero sliders (desktop & mobile)
             ============================================================= */

        (function() {
            'use strict';

            /* ========================
                 NAVIGATION & DROPDOWNS
                 ======================== */
            function initNavigation() {
                const hamburger = document.querySelector('.hamburger');
                const navList = document.querySelector('.nav-list');

                if (hamburger && navList) {
                    hamburger.addEventListener('click', () => {
                        navList.classList.toggle('active');
                        hamburger.classList.toggle('active');
                    });

                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.addEventListener('click', () => {
                            navList.classList.remove('active');
                            hamburger.classList.remove('active');
                        });
                    });

                    document.addEventListener('click', (e) => {
                        if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
                            navList.classList.remove('active');
                            hamburger.classList.remove('active');
                        }
                    });
                }

                // Mega menu toggle (optional button)
                const menuBtn = document.getElementById('menuToggle');
                const megaMenu = document.getElementById('megaMenu');
                if (menuBtn && megaMenu) {
                    menuBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        megaMenu.classList.toggle('active');
                    });
                    document.addEventListener('click', (e) => {
                        if (!megaMenu.contains(e.target) && e.target !== menuBtn) {
                            megaMenu.classList.remove('active');
                        }
                    });
                }

                // Dropdowns
                const dropdowns = document.querySelectorAll('.nav-dropdown');
                dropdowns.forEach(dropdown => {
                    const menu = dropdown.querySelector('.dropdown-menu');
                    dropdown.addEventListener('click', e => {
                        e.stopPropagation();

                        // close others
                        document.querySelectorAll('.nav-dropdown.open').forEach(open => {
                            if (open !== dropdown) {
                                open.classList.remove('open');
                                const om = open.querySelector('.dropdown-menu');
                                if (om) om.style.maxHeight = null;
                            }
                        });

                        dropdown.classList.toggle('open');
                        if (menu) {
                            menu.style.maxHeight = dropdown.classList.contains('open')
                                ? menu.scrollHeight + 'px'
                                : null;
                        }
                    });
                });

                document.addEventListener('click', () => {
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('open');
                        const menu = dropdown.querySelector('.dropdown-menu');
                        if (menu) menu.style.maxHeight = null;
                    });
                });
                window.addEventListener('scroll', () => {
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('open');
                        const menu = dropdown.querySelector('.dropdown-menu');
                        if (menu) menu.style.maxHeight = null;
                    });
                });
            }

            /* ===============
                 SMOOTH SCROLL
                 =============== */
            function initSmoothScroll() {
                document.querySelectorAll('a[href^="#"]').forEach(link => {
                    link.addEventListener('click', (e) => {
                        const targetId = link.getAttribute('href').substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (!targetElement) return;
                        e.preventDefault();
                        const header = document.querySelector('.header');
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    });
                });
            }

            /* =======================
                 FORM UX & SUBMISSION
                 ======================= */
            function initForms() {
                document.querySelectorAll('.form-group').forEach(group => {
                    const input = group.querySelector('input, textarea, select');
                    const label = group.querySelector('label');
                    if (!input || !label || group.classList.contains('checkbox-group')) return;

                    if (input.value !== '') label.classList.add('active');
                    input.addEventListener('focus', () => label.classList.add('active'));
                    input.addEventListener('blur', () => {
                        if (!input.value) label.classList.remove('active');
                    });
                    input.addEventListener('input', () => {
                        label.classList.toggle('active', !!input.value);
                    });
                });

                document.querySelectorAll('form').forEach(form => {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const requiredFields = form.querySelectorAll('[required]');
                        let isValid = true;
                        requiredFields.forEach(field => {
                            if (!field.value.trim()) {
                                isValid = false;
                                field.style.borderColor = '#ff4444';
                                setTimeout(() => { field.style.borderColor = ''; }, 3000);
                            }
                        });
                        if (!isValid) {
                            alert('Proszę wypełnić wszystkie wymagane pola');
                            return;
                        }
                        const btn = form.querySelector('button[type="submit"]');
                        if (!btn) { form.reset(); return; }
                        const originalText = btn.textContent;
                        btn.textContent = 'Wysłano!';
                        btn.style.backgroundColor = '#4CAF50';
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.style.backgroundColor = '';
                            form.reset();
                            form.querySelectorAll('label').forEach(l => l.classList.remove('active'));
                        }, 3000);
                    });
                });
            }

            /* ===============
                 HEADER EFFECTS
                 =============== */
            function initHeaderEffects() {
                const header = document.querySelector('.header');
                if (!header) return;
                const onScroll = () => {
                    header.style.backgroundColor = window.scrollY > 100
                        ? 'rgba(205, 183, 150, 0.7)'
                        : '#cdb796';
                };
                window.addEventListener('scroll', onScroll);
                onScroll();
            }

            /* ==============================
                 REVEAL ANIMATIONS & COUNTERS
                 ============================== */
            function initRevealAndCounters() {
                const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, observerOptions);

                document.querySelectorAll('.service-card, .package-card, .testimonial-card, .gallery-item, .faq-item')
                    .forEach(el => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(30px)';
                        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        observer.observe(el);
                    });

                // Counters
                const statsNumbers = document.querySelectorAll('.stat-number');
                const statsObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const el = entry.target;
                            const finalNumber = el.textContent.replace(/\D/g, '') || '0';
                            const suffix = el.textContent.replace(/[0-9]/g, '');
                            animateCounter(el, 0, parseInt(finalNumber, 10), suffix, 2000);
                            statsObserver.unobserve(el);
                        }
                    });
                }, observerOptions);
                statsNumbers.forEach(el => statsObserver.observe(el));

                function animateCounter(element, start, end, suffix, duration) {
                    const startTime = performance.now();
                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const current = Math.floor(start + (end - start) * progress);
                        element.textContent = current + suffix;
                        if (progress < 1) requestAnimationFrame(updateCounter);
                    }
                    requestAnimationFrame(updateCounter);
                }
            }

            /* ===============
                 BACK TO TOP
                 =============== */
            function initBackToTop() {
                const btn = document.createElement('button');
                btn.innerHTML = '↑';
                btn.style.cssText = `
                    position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
                    border-radius: 50%; background: linear-gradient(45deg, #ffd700, #ffed4e);
                    color: #1f1f1f; border: none; font-size: 1.2rem; font-weight: bold;
                    cursor: pointer; opacity: 0; visibility: hidden; transition: all 0.3s ease;
                    z-index: 1000;`;
                document.body.appendChild(btn);
                btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
                const onScroll = () => {
                    if (window.scrollY > 500) { btn.style.opacity = '1'; btn.style.visibility = 'visible'; }
                    else { btn.style.opacity = '0'; btn.style.visibility = 'hidden'; }
                };
                window.addEventListener('scroll', onScroll);
                onScroll();
            }

            /* ==============
                 HERO SLIDERS
                 ============== */
            function initHeroSlider(containerId, intervalMs) {
                const container = document.getElementById(containerId);
                if (!container) return;
                const slides = Array.from(container.querySelectorAll('.hero-slide'));
                if (!slides.length) return;
                container.style.background = container.style.background || '#181818';
                slides.forEach(s => s.classList.remove('active'));
                slides[0].classList.add('active');
                const imgs = slides.map(s => s.querySelector('img')).filter(Boolean);
                const loadPromises = imgs.map(img => new Promise(resolve => {
                    if (img.complete && img.naturalWidth) return resolve();
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                }));
                Promise.all(loadPromises).then(() => {
                    let index = 0;
                    if (container._timer) clearInterval(container._timer);
                    container._timer = setInterval(() => {
                        slides[index].classList.remove('active');
                        index = (index + 1) % slides.length;
                        slides[index].classList.add('active');
                    }, intervalMs);
                });
            }

            /* =============
                 ON LOAD/INIT
                 ============= */
            window.addEventListener('load', () => {
                // subtle page fade-in
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.5s ease';
                setTimeout(() => { document.body.style.opacity = '1'; }, 100);
            });

            document.addEventListener('DOMContentLoaded', () => {
                initNavigation();
                initSmoothScroll();
                initForms();
                initHeaderEffects();
                initRevealAndCounters();
                initBackToTop();
                // sliders
                initHeroSlider('heroSlider', 4000);
                initHeroSlider('heroSliderMobile', 3800);
                console.log('FreshTuff website initialized');
            });
        })();

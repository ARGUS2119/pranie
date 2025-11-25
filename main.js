// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form animations and validation
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea, select');
    const label = group.querySelector('label');
    
    if (input && label && !group.classList.contains('checkbox-group')) {
        // Handle initial state
        if (input.value !== '') {
            label.classList.add('active');
        }
        
        // Handle focus and blur events
        input.addEventListener('focus', () => {
            label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                label.classList.remove('active');
            }
        });
        
        // Handle input events
        input.addEventListener('input', () => {
            if (input.value !== '') {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    }
});

// Form submission handling
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff4444';
                
                // Reset border color after 3 seconds
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 3000);
            }
        });
        
        if (isValid) {
            // Show success message
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Wysłano!';
            submitButton.style.backgroundColor = '#4CAF50';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                form.reset();
                
                // Reset active labels
                const labels = form.querySelectorAll('label');
                labels.forEach(label => {
                    label.classList.remove('active');
                });
            }, 3000);
        } else {
            // Show error message
            alert('Proszę wypełnić wszystkie wymagane pola');
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(205, 183, 150, 0.7)'; // #cdb796 z przezroczystością
    } else {
        header.style.backgroundColor = '#cdb796'; // pełny kolor
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

// Apply fade-in animation to cards and sections
const animatedElements = document.querySelectorAll('.service-card, .package-card, .testimonial-card, .gallery-item, .faq-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const statsNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalNumber = target.textContent.replace(/\D/g, '');
            const suffix = target.textContent.replace(/[0-9]/g, '');
            
            animateCounter(target, 0, parseInt(finalNumber), suffix, 2000);
            statsObserver.unobserve(target);
        }
    });
}, observerOptions);

statsNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

function animateCounter(element, start, end, suffix, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Back to top button (optional)
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ffd700, #ffed4e);
    color: #1f1f1f;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

console.log('FreshTuff website loaded successfully!');

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');
    hamburger.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', e => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
    });

    document.addEventListener('click', () => {
        dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        dropdown.addEventListener('click', e => {
            e.stopPropagation();

            // Zamknij inne otwarte
            document.querySelectorAll('.nav-dropdown.open').forEach(openDropdown => {
                if (openDropdown !== dropdown) {
                    openDropdown.classList.remove('open');
                    const openMenu = openDropdown.querySelector('.dropdown-menu');
                    if (openMenu) openMenu.style.maxHeight = null;
                }
            });

            dropdown.classList.toggle('open');
            if (menu) {
                if (dropdown.classList.contains('open')) {
                    menu.style.maxHeight = menu.scrollHeight + "px";
                } else {
                    menu.style.maxHeight = null;
                }
            }
        });
    });

    // Kliknięcie poza menu
    document.addEventListener('click', () => {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) menu.style.maxHeight = null;
        });
    });

    // Scrollowanie strony
    window.addEventListener('scroll', () => {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) menu.style.maxHeight = null;
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuToggle');
    const megaMenu = document.getElementById('megaMenu');

    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        megaMenu.classList.toggle('active');
    });

    // Zamknij menu po kliknięciu poza nim
    document.addEventListener('click', function(e) {
        if (!megaMenu.contains(e.target) && e.target !== menuBtn) {
            megaMenu.classList.remove('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('heroSlider');
    if (!container) return;

    const slides = Array.from(container.querySelectorAll('.hero-slide'));
    if (!slides.length) return;

    // zapewnij tło kontenera (unika czarnych przejść gdy obrazki ładują się wolno)
    container.style.background = container.style.background || '#181818';

    // ustaw pierwszy slajd jako aktywny natychmiast
    slides.forEach(s => s.classList.remove('active'));
    slides[0].classList.add('active');

    // preload obrazków slajdów, start slidera dopiero po załadowaniu/wystąpieniu błędu
    const imgs = slides.map(s => s.querySelector('img')).filter(Boolean);
    const loadPromises = imgs.map(img => new Promise(resolve => {
        if (img.complete && img.naturalWidth) return resolve();
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
    }));

    Promise.all(loadPromises).then(() => {
        let index = 0;
        const intervalMs = 4000; // dostosuj czas wyświetlania

        // usuń wcześniejsze timery jeśli jakieś istnieją (bezpiecznik)
        if (container._heroTimer) clearInterval(container._heroTimer);

        container._heroTimer = setInterval(() => {
            slides[index].classList.remove('active');
            index = (index + 1) % slides.length;
            slides[index].classList.add('active');
        }, intervalMs);
    });
});





document.addEventListener('DOMContentLoaded', function () {
    const mobileContainer = document.getElementById('heroSliderMobile');
    if (!mobileContainer) return;

    const slides = Array.from(mobileContainer.querySelectorAll('.hero-slide'));
    if (!slides.length) return;

    mobileContainer.style.background = mobileContainer.style.background || '#181818';
    slides.forEach(s => s.classList.remove('active'));
    slides[0].classList.add('active');

    const imgs = slides.map(s => s.querySelector('img')).filter(Boolean);
    const loadPromises = imgs.map(img => new Promise(resolve => {
        if (img.complete && img.naturalWidth) return resolve();
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
    }));

    Promise.all(loadPromises).then(() => {
        let idx = 0;
        const intervalMs = 3800; // dopasuj jeśli chcesz dłużej/krócej
        if (mobileContainer._timer) clearInterval(mobileContainer._timer);

        mobileContainer._timer = setInterval(() => {
            slides[idx].classList.remove('active');
            idx = (idx + 1) % slides.length;
            slides[idx].classList.add('active');
        }, intervalMs);
    });
});







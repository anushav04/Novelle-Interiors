// Header scroll effect
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});
// Mobile dropdown toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // For mobile view - handle dropdown toggles
    const menuItems = document.querySelectorAll('.nav-menu .menu-item-has-children > a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parentLi = this.parentElement;
                parentLi.classList.toggle('active-dropdown');
            }
        });
    });
    // Collections Mobile Dropdown
// Collections Mobile Dropdown
const collectionsDropdown = document.querySelector('.collections-dropdown');

if (collectionsDropdown) {
    const dropdownLink = collectionsDropdown.querySelector('> a');
    dropdownLink.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
            // DON'T close the menu here
        }
    });
}
    // Close dropdowns when clicking outside (optional)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            if (!e.target.closest('.nav-menu .menu-item-has-children')) {
                document.querySelectorAll('.nav-menu .menu-item-has-children.active-dropdown').forEach(item => {
                    item.classList.remove('active-dropdown');
                });
            }
        }
    });
});

// Optional: Add smooth scrolling for anchor links
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
// Mobile menu toggle
const toggleBtn = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function openMobileMenu() {
    navMenu.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
    navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) closeMobileMenu();
        else openMobileMenu();
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
}

// Close menu only for REAL navigation links, NOT for dropdown toggles
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            // Check if this is a dropdown parent link
            const parentLi = link.closest('.menu-item-has-children');
            const isDropdownToggle = parentLi !== null;
            
            // If it's NOT a dropdown toggle, close the menu
            if (!isDropdownToggle) {
                closeMobileMenu();
            }
            // For dropdown toggles, let the dropdown handler work
            // Don't close the menu
        }
    });
});
// Marquee Carousel (infinite scroll)
const marqueeSwiper = new Swiper('.swiper-marquee', {
    slidesPerView: 3,
    spaceBetween: 15,
    loop: true,
    autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false },
    speed: 4000,
    allowTouchMove: false,
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});

// USP Carousel
const uspSwiper = new Swiper('.usp-carousel', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    autoplay: { delay: 4000, disableOnInteraction: false },
    breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});

// Quote button alert
const quoteBtn = document.getElementById('openQuoteBtn');
if (quoteBtn) {
    quoteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Get a quote: Please contact us at +91 90004 77756 or email sales@lhinteriors.in");
    });
}

// WhatsApp button
const waBtn = document.getElementById('whatsappBtn');
if (waBtn) {
    waBtn.addEventListener('click', () => {
        window.open('https://wa.me/919000477756', '_blank');
    });
}

// Animated dynamic text (optional rotation effect)
const dynamicTextEl = document.getElementById('dynamicText');
if (dynamicTextEl) {
    const texts = ['Modern · Luxury · Functional', 'Elegant · Stylish · Comfort', 'Creative · Unique · Timeless'];
    let index = 0;
    setInterval(() => {
        index = (index + 1) % texts.length;
        dynamicTextEl.style.opacity = '0';
        setTimeout(() => {
            dynamicTextEl.textContent = texts[index];
            dynamicTextEl.style.opacity = '1';
        }, 200);
    }, 3000);
}
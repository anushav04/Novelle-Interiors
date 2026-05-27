// livingroom.js

// ===== SCROLL REVEAL =====

const revealElements = document.querySelectorAll('.reveal');

window.addEventListener('scroll', revealSections);

function revealSections() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}

revealSections();

// ===== FALL COLLECTIONS TABS =====

const fallTabs = document.querySelectorAll('.fall-tab');
const fallGrids = document.querySelectorAll('.fall-grid');

fallTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    fallTabs.forEach(t => t.classList.remove('active'));
    fallGrids.forEach(g => g.classList.remove('active'));

    tab.classList.add('active');

    const target = tab.getAttribute('data-tab');
    const targetGrid = document.getElementById('tab-' + target);
    if (targetGrid) {
      targetGrid.classList.add('active');
    }
  });
});

// ===== ROOMS CAROUSEL =====

const carousel = document.querySelector('.rooms-carousel');
const prevBtn = document.querySelector('.rooms-prev');
const nextBtn = document.querySelector('.rooms-next');
const cards = document.querySelectorAll('.room-card');

let currentIndex = 0;

function getVisibleCards() {
  if (window.innerWidth <= 768) return 1;
  else if (window.innerWidth <= 1000) return 2;
  else return 3;
}

function updateCarousel() {
  const visibleCards = getVisibleCards();
  const gap = 24;
  const wrapperWidth = document.querySelector('.rooms-carousel-wrapper').offsetWidth;
  const cardWidth = (wrapperWidth - (gap * (visibleCards - 1))) / visibleCards;

  cards.forEach(card => {
    card.style.minWidth = `${cardWidth}px`;
  });

  const moveAmount = currentIndex * (cardWidth + gap);
  carousel.style.transform = `translateX(-${moveAmount}px)`;

  const maxIndex = cards.length - visibleCards;
  prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
  nextBtn.style.opacity = currentIndex >= maxIndex ? '0.4' : '1';
  prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
  nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
}

nextBtn.addEventListener('click', () => {
  const maxIndex = cards.length - getVisibleCards();
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

window.addEventListener('resize', () => {
  currentIndex = 0;
  updateCarousel();
});

updateCarousel();

// ===== HEADER: STICKY SHADOW =====

const header = document.getElementById('mainHeader');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// ===== HEADER: MOBILE MENU TOGGLE =====

(function () {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
      } else {
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });
  }

  function isMobileView() {
    return window.innerWidth <= 991;
  }

  const dropdownParents = document.querySelectorAll('.nav-menu .menu-item-has-children');

  function handleMobileDropdowns() {
    if (isMobileView()) {
      dropdownParents.forEach(parent => {
        parent.removeEventListener('click', parent._clickHandler);
        const handler = function (e) {
          const isLink = e.target.closest('a') && e.target.closest('a').parentElement === parent;
          if (isLink) {
            e.preventDefault();
            if (!parent.classList.contains('active-dropdown')) {
              dropdownParents.forEach(p => {
                if (p !== parent) p.classList.remove('active-dropdown');
              });
            }
            parent.classList.toggle('active-dropdown');
          }
        };
        parent._clickHandler = handler;
        parent.addEventListener('click', handler);
      });
    } else {
      dropdownParents.forEach(parent => {
        if (parent._clickHandler) {
          parent.removeEventListener('click', parent._clickHandler);
          parent._clickHandler = null;
        }
        parent.classList.remove('active-dropdown');
      });
    }
  }

  window.addEventListener('resize', function () {
    handleMobileDropdowns();
    if (!isMobileView() && navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  handleMobileDropdowns();

  // Close menu on leaf-link click
  const allNavLinks = document.querySelectorAll('.nav-menu a');
  allNavLinks.forEach(link => {
    link.addEventListener('click', function () {
      const isLeaf = !link.parentElement.classList.contains('menu-item-has-children');
      if (isMobileView() && isLeaf && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-times', 'fa-bars');
      }
    });
  });

  // Prevent body scroll when mobile menu open
  if (navMenu) {
    new MutationObserver(() => {
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }).observe(navMenu, { attributes: true });
  }
})();
// ===== NAV OVERLAY (close menu on overlay click) =====
(function() {
  var overlay = document.getElementById('navOverlay');
  var navMenu = document.getElementById('navMenu');
  var menuToggle = document.getElementById('menuToggle');
  if (overlay && navMenu) {
    overlay.addEventListener('click', function() {
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      var icon = menuToggle && menuToggle.querySelector('i');
      if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
    });
    // Show/hide overlay when menu opens/closes
    new MutationObserver(function() {
      overlay.classList.toggle('active', navMenu.classList.contains('active'));
    }).observe(navMenu, { attributes: true, attributeFilter: ['class'] });
  }
})();


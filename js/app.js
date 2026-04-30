/* ========================================================
   Click Art — App Orchestration
   Initializes all interaction systems
   ======================================================== */

/* Dependencies loaded as separate scripts before this file:
   - spotlight.js  → initSpotlight()
   - scroll.js     → initScrollReveal(), initParallax(), initNavScroll()
   - magnetic.js   → initMagneticButtons()
   - gallery.js    → initGallery()
*/


// --- Mobile Navigation ---
function initMobileNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay = document.querySelector('.nav__mobile-overlay');
  const mobileLinks = overlay?.querySelectorAll('.nav__link');

  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks?.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


// --- Smooth Scroll for Anchor Links ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}


// --- Hero Staggered Text Animation ---
function initHeroAnimation() {
  const heroContent = document.querySelector('.hero__content');
  if (!heroContent) return;

  const animatedElements = heroContent.querySelectorAll('[data-hero-animate]');

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)`;
    el.style.transitionDelay = `${0.3 + index * 0.15}s`;
  });

  // Trigger after a short delay for page load
  requestAnimationFrame(() => {
    setTimeout(() => {
      animatedElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 100);
  });
}


// --- Contact Form Handling ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `<span>Message Sent!</span> <span>✓</span>`;
    submitBtn.style.background = 'var(--copper)';
    submitBtn.style.color = 'var(--charcoal)';
    submitBtn.style.borderColor = 'var(--copper)';

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.style.color = '';
      submitBtn.style.borderColor = '';
      form.reset();
    }, 3000);
  });
}


// --- Counter Animation for Stats ---
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 2000;
          const startTime = performance.now();

          function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            el.textContent = current + suffix;

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}


// --- 3D Marquee ---
function initMarquee3D() {
  const marqueeItems = document.querySelectorAll('.marquee__item');
  if (!marqueeItems.length) return;

  function update3D() {
    const windowCenter = window.innerWidth / 2;
    marqueeItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distanceFromCenter = itemCenter - windowCenter;
      
      const maxRotation = 35; // degrees
      let rotation = (distanceFromCenter / windowCenter) * maxRotation;
      
      if (rotation > 45) rotation = 45;
      if (rotation < -45) rotation = -45;
      
      const absDistance = Math.abs(distanceFromCenter);
      const scale = Math.max(0.75, 1 - (absDistance / window.innerWidth) * 0.4);

      item.style.transform = `perspective(1000px) rotateY(${rotation}deg) scale(${scale})`;
    });
    requestAnimationFrame(update3D);
  }
  requestAnimationFrame(update3D);
}


// --- Init All ---
function init() {
  initMarquee3D();
  initSpotlight();
  initScrollReveal();
  initParallax();
  initNavScroll();
  initMagneticButtons();
  initGallery();
  initMobileNav();
  initSmoothScroll();
  initHeroAnimation();
  initContactForm();
  initCounterAnimation();
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

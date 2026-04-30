/* ======================================================
   Click Art — Reviews Carousel
   Auto-rotates every 5s with fade+slide transition.
   Pauses on hover.
   ====================================================== */

(function () {
  'use strict';

  const INTERVAL = 5000; // ms between rotations

  const carousel = document.getElementById('reviews-carousel');
  const dotsContainer = document.getElementById('reviews-dots');

  if (!carousel || !dotsContainer) return;

  const slides = Array.from(carousel.querySelectorAll('.review-slide'));
  if (slides.length === 0) return;

  let current = 0;
  let timer = null;
  let isPaused = false;

  // ── Build dot indicators ──────────────────────────────
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'reviews__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('.reviews__dot'));

  // ── Show a specific slide ─────────────────────────────
  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  // ── Auto advance ──────────────────────────────────────
  function next() {
    if (!isPaused) goTo(current + 1);
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  // ── Pause on hover ────────────────────────────────────
  carousel.addEventListener('mouseenter', () => { isPaused = true; });
  carousel.addEventListener('mouseleave', () => { isPaused = false; });

  // ── Swipe support (touch) ─────────────────────────────
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
  }, { passive: true });

  // ── Kick off ──────────────────────────────────────────
  startTimer();

})();

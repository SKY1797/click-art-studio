/* ========================================================
   Click Art — Cursor Spotlight
   "It's all about light" — the UX literally reflects the tagline
   ======================================================== */

function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  // Check for touch device — disable on mobile
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    // Apply a static ambient glow for touch devices
    spotlight.style.background = `radial-gradient(800px circle at 50% 30%, rgba(229,161,122,0.04), transparent 70%)`;
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  const lerpFactor = 0.08; // Smooth trailing factor

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Linear interpolation for buttery smooth follow
    currentX += (mouseX - currentX) * lerpFactor;
    currentY += (mouseY - currentY) * lerpFactor;

    spotlight.style.background = `radial-gradient(600px circle at ${currentX}px ${currentY}px, rgba(229,161,122,0.07), transparent 70%)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

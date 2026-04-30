/* ========================================================
   Click Art — Magnetic Button Effect
   Buttons pull toward the cursor with elastic snap-back
   ======================================================== */

function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('.magnetic');

  if (!magneticElements.length) return;

  // Only enable on desktop
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  magneticElements.forEach((el) => {
    const strength = parseFloat(el.dataset.magneticStrength) || 15;
    const radius = parseFloat(el.dataset.magneticRadius) || 100;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength;
        const moveX = (deltaX / distance) * pull || 0;
        const moveY = (deltaY / distance) * pull || 0;

        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        el.style.transition = 'transform 0.15s ease-out';
      }
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    // Also handle the parent area for the magnetic pull-in effect
    const wrapper = el.closest('.magnetic-wrap') || el.parentElement;
    if (wrapper && wrapper !== el) {
      wrapper.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < radius && distance > 0) {
          const pull = (1 - distance / radius) * strength * 0.5;
          const moveX = (deltaX / distance) * pull;
          const moveY = (deltaY / distance) * pull;

          el.style.transform = `translate(${moveX}px, ${moveY}px)`;
          el.style.transition = 'transform 0.15s ease-out';
        }
      });

      wrapper.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    }
  });
}

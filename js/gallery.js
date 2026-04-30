/* ========================================================
   Click Art — Gallery / Portfolio Interactions
   Masonry filter & hover effects
   ======================================================== */

function initGallery() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const portfolioItems = document.querySelectorAll('.portfolio__item');

  if (!filterPills.length || !portfolioItems.length) return;

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      // Update active state
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.dataset.filter;

      portfolioItems.forEach((item, index) => {
        const category = item.dataset.category;

        if (filterValue === 'all' || category === filterValue) {
          item.classList.remove('hidden');
          // Staggered reveal
          item.style.transitionDelay = `${index * 0.05}s`;
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px) scale(0.95)';
          item.style.transitionDelay = '0s';

          // Hide after animation
          setTimeout(() => {
            item.classList.add('hidden');
          }, 400);
        }
      });
    });
  });
}

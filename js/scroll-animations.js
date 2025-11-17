document.addEventListener('DOMContentLoaded', function () {
  // ==========================
  // 1) REVEAL FROM RIGHT
  // ==========================
  const items = document.querySelectorAll('.reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.8
  });

  items.forEach(el => observer.observe(el));

  // ==========================
  // 2) PARALLAX HERO (solo sfondo)
  // ==========================
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let latestScrollY = window.scrollY;
  let ticking = false;
  let isParallaxActive = false;

  // QUI controlli la "forza" dell'effetto
  const BG_SPEED = 0.35; // prova 0.15, 0.3, ecc.

  function applyOffset() {
    if (!isParallaxActive) {
      hero.style.setProperty('--hero-bg-offset', '0px');
      ticking = false;
      return;
    }

    const bgOffset = latestScrollY * BG_SPEED;
    hero.style.setProperty('--hero-bg-offset', `${bgOffset}px`);

    ticking = false;
  }

  function onScroll() {
    latestScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(applyOffset);
      ticking = true;
    }
  }

  function updateParallaxActive() {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    // niente parallasse sotto i 768px di larghezza
    isParallaxActive = viewportWidth > 768;

    if (!isParallaxActive) {
      hero.style.setProperty('--hero-bg-offset', '0px');
    }

    latestScrollY = window.scrollY;
    applyOffset();
  }

  updateParallaxActive();
  window.addEventListener('resize', updateParallaxActive);
  window.addEventListener('scroll', onScroll, { passive: true });
});

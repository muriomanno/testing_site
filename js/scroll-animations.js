// scroll-animations.js

document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // l'elemento entra in viewport → fallo apparire
        entry.target.classList.add('is-visible');
      } else {
        // l'elemento esce dalla viewport → fallo sparire di nuovo
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.2 // ~20% dell'elemento visibile = considerato "in view"
  });

  items.forEach(el => observer.observe(el));
});

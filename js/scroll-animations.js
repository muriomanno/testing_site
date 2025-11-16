// scroll-animations.js

document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.reveal-right');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // anima solo la prima volta
      }
    });
  }, {
    threshold: 0.2 // 20% dell'elemento visibile = parte l'animazione
  });

  items.forEach(el => observer.observe(el));
});

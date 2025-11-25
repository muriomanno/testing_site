document.addEventListener('DOMContentLoaded', function () {

  // ==========================
  // MENU MOBILE (hamburger)
  // ==========================
  const nav = document.getElementById('main-nav');
  const navToggle = document.querySelector('.nav-toggle');

  if (nav && navToggle) {

    // Funzione per chiudere il menu
    const closeMenu = () => {
      // 1. Rimuove la classe di apertura dal NAV (nasconde il menu)
      nav.classList.remove('is-open');
      // 2. Aggiorna l'attributo per l'accessibilità (attiva la X)
      navToggle.setAttribute('aria-expanded', 'false');
      // 3. Sblocca lo scroll del body
      // Usiamo un breve ritardo per permettere all'animazione di chiusura di finire fluidamente
      setTimeout(() => {
        document.body.classList.remove('menu-open');
      }, 300); // 300ms è la durata della transizione CSS
    };

    // Funzione per aprire il menu
    const openMenu = () => {
      // 1. Blocca subito lo scroll del body
      document.body.classList.add('menu-open');
      // 2. Aggiunge la classe di apertura al NAV (mostra il menu)
      nav.classList.add('is-open');
      // 3. Aggiorna l'attributo per l'accessibilità (attiva la X)
      navToggle.setAttribute('aria-expanded', 'true');
    };

    // Gestore principale: apre/chiude il menu quando si clicca il bottone
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (nav.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // 1. Chiude il menu quando si clicca un link interno
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // 2. CHIUSURA MENU AL CLICK FUORI DALLA NAV E DAL BUTTON
    document.addEventListener('click', (e) => {
      const isMenuOpen = nav.classList.contains('is-open');

      // Controlla se il click NON è all'interno della nav E NON è il toggle button
      const isClickOutside = !nav.contains(e.target) && !navToggle.contains(e.target);

      if (isMenuOpen && isClickOutside) {
        closeMenu();
      }
    });
  }

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

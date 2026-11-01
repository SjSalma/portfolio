/* SALMA SAJID — reveal + disparition glissée contrôlée par le scroll. */
'use strict';

(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Conserver les éléments déjà intégrés aux animations précédentes.
  document.querySelectorAll('.projects-carousel, .skills-subsection-title')
    .forEach(element => element.setAttribute('data-reveal', ''));

  const items = [...document.querySelectorAll('main > section:not(#home) [data-reveal]')];
  const states = new WeakMap();
  for (const item of items) {
    states.set(item, {
      seen: false,
      passed: false,
      scrubEnabled: false,
      slide: 0,
      // Un parent animé entraîne déjà ses enfants : ne pas doubler le glissement.
      nested: !!item.parentElement.closest('[data-reveal]')
    });
  }

  let frame = 0;

  const clamp = (number, min, max) => Math.max(min, Math.min(max, number));

  function updateScrollReveal() {
    frame = 0;
    if (reducedMotion.matches) return;

    const height = window.innerHeight;
    const enterLine = height - Math.min(60, height * 0.08);
    // Même seuil validé auparavant : les 10 % inférieurs, au maximum 75px.
    const exitLine = height - Math.min(75, height * 0.10);

    for (const item of items) {
      const state = states.get(item);
      // Les fiches d'expérience sont des accordéons <details> : leur hauteur
      // varie à chaque ouverture. Mesurer le <summary> (hauteur stable) évite
      // qu'une description ouverte fasse soudain glisser TOUTE la fiche.
      // Le déplacement est toujours appliqué au parent, donc le résumé et son
      // contenu continuent à bouger ensemble pendant la remontée.
      const anchor = item.matches('details.experience-item')
        ? item.querySelector('summary') || item
        : item;
      const rect = anchor.getBoundingClientRect();
      // Annuler la translation pilotée par ce script pour une position stable.
      const naturalTop = rect.top - state.slide;
      const naturalBottom = rect.bottom - state.slide;

      // Apparition initiale en descendant : fondu / montée habituels conservés.
      // Un accès direct par ancre rend aussi visibles les sections déjà dépassées.
      if (!state.seen && naturalTop < enterLine) {
        state.seen = true;
        item.classList.add('is-visible');
      }
      if (!state.seen) continue;

      // Ne déclencher le retour vers le bas qu'une fois l'élément réellement
      // dépassé : il ne faut PAS le pousser pendant sa première apparition.
      if (naturalBottom <= exitLine) state.passed = true;
      if (!state.passed || state.nested) continue;

      // Le défilement pilote la position image par image (pas une transition
      // temporisée). Si l'utilisateur arrête à mi-chemin, le bloc s'arrête aussi.
      const distance = naturalBottom - exitLine;
      const travel = Math.max(125, rect.height * 0.86 + 75);
      const progress = clamp(distance / travel, 0, 1);
      const maxSlide = clamp(rect.height * 0.36, 55, 175);
      const slide = progress * maxSlide;

      // Dès qu'on commence une remontée, conserver ce mode même quand
      // progress revient à zéro : cela évite une transition retardée ou
      // un saut lorsque l'on change brusquement le sens du scroll.
      if (slide > 0.01) state.scrubEnabled = true;
      if (state.scrubEnabled) {
        state.slide = slide;
        item.classList.add('is-scroll-sliding');
        item.style.setProperty('--reveal-slide-y', `${slide.toFixed(2)}px`);
      }
    }
  }

  function scheduleUpdate() {
    if (!frame) frame = requestAnimationFrame(updateScrollReveal);
  }

  function updateMotionPreference() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;

    if (reducedMotion.matches) {
      root.classList.remove('motion-ready');
      for (const item of items) {
        item.classList.remove('is-scroll-sliding');
        item.style.removeProperty('--reveal-slide-y');
        states.get(item).slide = 0;
        states.get(item).scrubEnabled = false;
      }
      return;
    }
    // Restaurer les états, notamment lors d'un changement de préférence.
    updateScrollReveal();
    root.classList.add('motion-ready');
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  document.addEventListener('toggle', scheduleUpdate, true);
  if (reducedMotion.addEventListener) {
    reducedMotion.addEventListener('change', updateMotionPreference);
  } else if (reducedMotion.addListener) {
    reducedMotion.addListener(updateMotionPreference);
  }

  updateMotionPreference();
})();

/* Portfolio Velvet Cherry — scripts organisés par composant, comme ton premier portfolio. */
'use strict';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Scroll progress + lightweight portrait movement, updated in one frame.
let scrollTicking = false;
function updateScrollEffects() {
  const scrollTop = window.scrollY || root.scrollTop || 0;
  const scrollRange = Math.max(1, root.scrollHeight - window.innerHeight);
  progress.style.width = `${Math.min(100,Math.max(0,(scrollTop / scrollRange) * 100))}%`;
  header.classList.toggle('is-scrolled', scrollTop > 0);
  if (!reduceMotion.matches && window.innerWidth > 700) {
    const drift = Math.max(-60,Math.min(110,scrollTop * .12));
    document.getElementById('hero-media-drift').style.setProperty('--portrait-shift', `${drift}px`);
  }
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollEffects);
    scrollTicking = true;
  }
}, { passive: true });
window.addEventListener('resize', updateScrollEffects, { passive: true });

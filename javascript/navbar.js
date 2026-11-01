/* Portfolio Velvet Cherry — scripts organisés par composant, comme ton premier portfolio. */
'use strict';

const header = document.getElementById('site-header');
const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('site-nav');
const progress = document.getElementById('scroll-progress');

function updateMenuLabel() {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-label', expanded ? TRANSLATIONS[language].menuClose : TRANSLATIONS[language].menuOpen);
}
function closeMenu({ restoreFocus = false } = {}) {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  updateMenuLabel();
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const willOpen = !nav.classList.contains('is-open');
  nav.classList.toggle('is-open', willOpen);
  menuButton.setAttribute('aria-expanded', String(willOpen));
  updateMenuLabel();
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
document.addEventListener('click', (event) => {
  if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu({ restoreFocus: true });
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 1050) closeMenu();
}, { passive: true });

// Active navigation: mark the section currently visible.
if ('IntersectionObserver' in window) {
  const sectionLinks = new Map([...nav.querySelectorAll('a[href^="#"]')].map((el) => [el.getAttribute('href').slice(1), el]));
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link, id) => {
        const active = id === entry.target.id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -62% 0px' });
  document.querySelectorAll('main > section[id]').forEach((section) => {
    navObserver.observe(section);
  });
}


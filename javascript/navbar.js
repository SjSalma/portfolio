const header = document.querySelector('header');
const nav = document.querySelector('nav');
const checkbox = document.getElementById('nav_toggle');

function updateNavBlur() {
  const scrollY = window.scrollY;
  const isDesktop = window.innerWidth >= 700;
  const isMenuOpen = checkbox.checked;
  const blurAmount = Math.min(scrollY / 15, 5);

  if (isDesktop) {
    header.classList.toggle('scrolled', scrollY > 0);
    header.style.backdropFilter = scrollY > 0 ? `blur(${blurAmount}px)` : 'none';
    header.style.webkitBackdropFilter = scrollY > 0 ? `blur(${blurAmount}px)` : 'none';

    nav.classList.remove('scrolled', 'nav-scrolled');
    nav.style.backdropFilter = 'none';
    nav.style.webkitBackdropFilter = 'none';
  } else {
    header.classList.remove('scrolled');
    header.style.backdropFilter = 'none';
    header.style.webkitBackdropFilter = 'none';

    if (isMenuOpen) {
      nav.classList.add('scrolled');
      nav.style.backdropFilter = 'blur(10px)';
      nav.style.webkitBackdropFilter = 'blur(10px)';

      // ✅ Ajoute classe spéciale uniquement si scroll
      if (scrollY > 0) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }

    } else {
      nav.classList.remove('scrolled', 'nav-scrolled');
      nav.style.backdropFilter = 'none';
      nav.style.webkitBackdropFilter = 'none';
    }
  }
}

window.addEventListener('scroll', updateNavBlur);
checkbox.addEventListener('change', updateNavBlur);

/* Portfolio Salma Sajid — navigation du carrousel de projets. */
'use strict';

/* =============================================================
   PROJECT CAROUSEL — one project at a time, mouse/touch/keyboard
   ============================================================= */
(() => {
  const viewport = document.getElementById('projects-carousel-viewport');
  const track = document.getElementById('projects-grid');
  const carousel = document.getElementById('projects-carousel');
  if (!viewport || !track || !carousel) return;

  const slides = [...track.querySelectorAll(':scope > .project-card')];
  const dots = [...carousel.querySelectorAll('.projects-carousel-dot')];
  const prev = document.getElementById('projects-carousel-prev');
  const next = document.getElementById('projects-carousel-next');
  const counter = document.getElementById('projects-carousel-current');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!slides.length) return;

  let activeIndex = 0;
  let raf = 0;
  let drag = null;

  function positionOf(index) {
    return slides[index].offsetLeft - slides[0].offsetLeft;
  }

  function closestSlide() {
    const x = viewport.scrollLeft;
    let best = 0;
    let distance = Infinity;
    for (let i = 0; i < slides.length; i++) {
      const d = Math.abs(positionOf(i) - x);
      if (d < distance) { distance = d; best = i; }
    }
    return best;
  }

  function setActive(index) {
    activeIndex = index;
    counter.textContent = String(index + 1).padStart(2, '0');
    dots.forEach((dot, i) => {
      const isCurrent = i === index;
      dot.classList.toggle('is-current', isCurrent);
      if (isCurrent) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function goTo(index, smooth = true) {
    const targetIndex = (index + slides.length) % slides.length;
    setActive(targetIndex);
    viewport.scrollTo({
      left: positionOf(targetIndex),
      behavior: smooth && !reduceMotion.matches ? 'smooth' : 'auto'
    });
  }

  function isArabic() {
    return document.documentElement.lang === 'ar';
  }

  // The project sequence is always SIG -> Nails -> Maison -> Tray.
  // Only the ARROW artwork/position changes for Arabic; the logical order never does.
  prev?.addEventListener('click', () => goTo(activeIndex - 1));
  next?.addEventListener('click', () => goTo(activeIndex + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + (isArabic() ? -1 : 1));
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex + (isArabic() ? 1 : -1));
    } else if (event.key === 'Home' && event.target === viewport) {
      event.preventDefault();
      goTo(0);
    } else if (event.key === 'End' && event.target === viewport) {
      event.preventDefault();
      goTo(slides.length - 1);
    }
  });

  // Native touch swipe uses scroll-snap; no custom handling on touch.
  viewport.addEventListener('scroll', () => {
    if (drag) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setActive(closestSlide()));
  }, { passive: true });

  // Desktop mouse drag (links and buttons remain clickable).
  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('a, button')) return;
    drag = { pointerId: event.pointerId, x: event.clientX, left: viewport.scrollLeft };
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    viewport.scrollLeft = drag.left + drag.x - event.clientX;
  });
  function finishDrag() {
    if (!drag) return;
    drag = null;
    viewport.classList.remove('is-dragging');
    goTo(closestSlide());
  }
  viewport.addEventListener('pointerup', finishDrag);
  viewport.addEventListener('pointercancel', finishDrag);
  viewport.addEventListener('lostpointercapture', finishDrag);

  // Preserve the selected slide when font size / viewport changes.
  let resizeFrame = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => goTo(activeIndex, false));
  }, { passive: true });

  setActive(0);
})();

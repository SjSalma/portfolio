document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('show');

        el.style.animation = 'neon-border-flicker 1s 1 forwards';
        el.style.animationDelay = '0.4s';

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.steps-div-left, .steps-div-right')
    .forEach(el => observer.observe(el));
});

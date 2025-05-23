document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.footer-div');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const ratio = entry.intersectionRatio;

      footer.style.opacity = ratio;
    });
  }, {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 0.00 → 1.00
  });

  if (footer) observer.observe(footer);
});

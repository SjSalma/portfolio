document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        el.classList.add("visible");

        if (el.classList.contains("titre-presentation")) {
          el.style.animation = "neon-flicker 2.5s 2 forwards";
          el.style.animationDelay = "0.5s"; // par exemple 0.5 seconde de délai
          el.style.textShadow = `
            0 0 0.4vw #ff4ec4,
            0 0 0.8vw #ff4ec4,
            0 0 1.2vw #ff4ec4,
            0 0 1.6vw #b20164,
            0 0 2vw #b20164
          `;
        }

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1
  });

  const blocs = [
    document.querySelector(".a-propos-de-moi"),
    document.querySelector(".comment-je-travaille"),
    document.querySelector(".titre-presentation") // inclut le titre ici
  ];

  blocs.forEach(bloc => {
    if (bloc) observer.observe(bloc);
  });
});

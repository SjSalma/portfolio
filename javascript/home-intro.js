document.addEventListener("DOMContentLoaded", function () {
  const bgLayer = document.createElement("div");
  bgLayer.style.position = "fixed";
  bgLayer.style.top = "0";
  bgLayer.style.left = "0";
  bgLayer.style.width = "100vw";
  bgLayer.style.height = "100vh";
  bgLayer.style.backgroundColor = "whitesmoke";
  bgLayer.style.zIndex = "-1";
  document.body.appendChild(bgLayer);

  const intro = document.querySelector(".intro");
  if (!intro) return;

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const fadeStart = 0;
    const fadeEnd = 400;

    const opacity = Math.max(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart), 0);
    intro.style.opacity = opacity;
  });
});

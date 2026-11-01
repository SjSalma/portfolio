/* Portfolio Velvet Cherry — scripts organisés par composant, comme ton premier portfolio. */
'use strict';

const pageBody = document.body;
const themeButton = document.getElementById('theme-toggle');
const visionButton = document.getElementById('vision-toggle');

let theme = readPreference('salma-portfolio-theme') === 'light' ? 'light' : 'dark';
let vision = readPreference('salma-portfolio-vision') === 'safe' ? 'safe' : 'default';

function updateThemeLabel() {
  const label = theme === 'dark' ? TRANSLATIONS[language].themeToLight : TRANSLATIONS[language].themeToDark;
  themeButton.setAttribute('aria-label', label);
  themeButton.setAttribute('title', label);
}

function applyTheme() {
  pageBody.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#3f1116' : '#fff1e9');
  updateThemeLabel();
  savePreference('salma-portfolio-theme', theme);
}


function updateVisionLabel() {
  const t = TRANSLATIONS[language];
  visionButton.setAttribute('aria-label', vision === 'safe' ? t.visionToggleOff : t.visionToggleOn);
}

function applyVision() {
  const active = vision === 'safe';

  if (active) {
    pageBody.dataset.vision = 'safe';
  } else {
    delete pageBody.dataset.vision;
  }

  visionButton.setAttribute('aria-pressed', String(active));
  updateVisionLabel();
  savePreference('salma-portfolio-vision', vision);
}


themeButton.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  applyTheme();
});

visionButton.addEventListener('click', () => {
  vision = vision === 'safe' ? 'default' : 'safe';
  applyVision();
});
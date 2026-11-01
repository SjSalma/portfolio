# Style guide — Velvet Cherry

## Direction artistique

Style éditorial et professionnel, titres élégants et lecture accessible. Préserver le contraste, les proportions et l'espacement des sections.

## Couleurs principales

- Bordeaux profond : `#3F1116`
- Cerise sombre : `#561C24`
- Crème : `#FFF1E9`
- Rose poudré : `#D98684`
- Un mode clair et sombre, avec une palette couleurs adaptées (bleu/ambre) pilotée par `data-vision="safe"`.

## Polices

- **Titres et textes éditoriaux :** Literata, avec secours Georgia.
- **Interface et textes courants :** Atkinson Hyperlegible Next, avec secours Arial.
- **Arabe :** Noto Naskh Arabic et Noto Sans Arabic ; voir `css/arabic-rtl.css`.
- Sources et variables : `index.html` (Google Fonts) et `css/font.css`.

## Responsive et RTL

- Les blocs photo/texte sont organisés par grilles CSS et doivent rester distincts sur toutes les largeurs.
- La section d'accueil se compacte sur petits écrans ; éviter les positions fixes qui coupent les textes au zoom.
- L'arabe doit respecter l'orientation RTL sans inverser les photographies ni l'ordre logique des quatre projets.
- Contrôler les trois langues, y compris les dates, les flèches et les liens.

## Accessibilité et mouvement

- Garder les focus visibles, les alternatives textuelles et la navigation clavier.
- Privilégier la lisibilité des textes longs, les contrastes et la prise en charge du zoom navigateur.
- Réduire les animations si `prefers-reduced-motion: reduce`.

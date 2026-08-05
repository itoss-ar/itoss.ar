# ITOSS — Docusaurus site

Versión del rediseño de ITOSS portada a **[Docusaurus 3.10](https://docusaurus.io/)** (3.10.1 — la última release de la línea v3.x). Sitio comercial (home, plataforma, pricing, contacto) + documentación técnica, con el sistema de diseño dark de ITOSS aplicado sobre Infima.

## Requisitos

- Node.js **18+**
- npm (o yarn / pnpm)

## Correr en local

```bash
cd itoss-docusaurus
npm install
npm start
```

Abre `http://localhost:3000`. El servidor recarga al guardar.

## Build de producción

```bash
npm run build      # genera /build (HTML estático)
npm run serve      # sirve el build localmente para verificar
```

## Estructura

```
itoss-docusaurus/
├── docusaurus.config.js     # Config: navbar, footer, dark-mode forzado, prism
├── sidebars.js              # Orden del sidebar de docs
├── src/
│   ├── css/custom.css        # 🎨 Sistema de diseño ITOSS + overrides de Infima
│   ├── pages/                # Páginas custom (React, fuera de /docs)
│   │   ├── index.js           #   Home — hero (3 variantes) + secciones
│   │   ├── modules.js         #   Plataforma — 5 módulos con previews
│   │   ├── pricing.js         #   Pricing — 3 tiers + FAQ
│   │   └── contact.js         #   Solicitar demo — formulario
│   └── components/site/       # Componentes reutilizables
│       ├── Dashboard.js       #   Dashboard animado (métricas en vivo)
│       ├── LogStream.js       #   Terminal con logs en streaming
│       ├── Sections.js        #   Hero, Modules, Comparison, etc.
│       └── data.js            #   Datos compartidos (módulos, integraciones…)
├── docs/                     # Documentación (Markdown)
└── static/img/               # Logo + favicon (SVG)
```

## Personalización

- **Colores / tipografía / tokens** → `src/css/custom.css` (bloque `:root`). Las variables `--cyan`, `--lime`, `--brand-grad`, etc. controlan toda la marca; los overrides `--ifm-*` adaptan los componentes nativos de Docusaurus.
- **Navbar / footer** → `docusaurus.config.js` (`themeConfig.navbar` / `themeConfig.footer`).
- **Variante de hero** → la home tiene un switcher flotante (abajo a la derecha) para previsualizar las 3 estructuras (Split / Centered / Live logs). Para fijar una por defecto, cambiá el estado inicial en `src/pages/index.js` (`useState('A')`).
- **Modo oscuro** → forzado en `colorMode` (sin toggle). Es la única variante, igual que la marca ITOSS.

## Notas técnicas

- Los componentes animados (Dashboard, LogStream) inicializan con valores **deterministas** y sólo introducen aleatoriedad dentro de `useEffect`, para evitar mismatches de hidratación SSR/CSR.
- Las imágenes de logos de integraciones son glifos genéricos (placeholders) — reemplazá `GenericIcon` en `Sections.js` por logos reales cuando los tengas.
- Los datos (hosts, métricas, SLAs) son sintéticos para la demo de marketing.

// @ts-check
// ITOSS — Docusaurus configuration
// Docs: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ITOSS',
  tagline: 'Operate IT products with ease',
  favicon: 'img/favicon.png',

  url: 'https://www.itoss.ar',
  baseUrl: '/',

  organizationName: 'itoss-ar',
  projectName: 'itoss.ar',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/itoss-ar/itoss/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/itoss-social-card.png',

      // Full dark mode only — matches the ITOSS brand
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },

      navbar: {
        logo: {
          alt: 'ITOSS',
          src: 'img/ITOSS-01-bl+Aqua.png',
          srcDark: 'img/ITOSS-01-bl+Aqua.png',
        },
        items: [
          {to: '/services', label: 'Services', position: 'left'},
          {to: '/docs/start-with-itoss', label: 'Try ITOSS', position: 'left'},    
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documents',
          },
          {to: '/contact', label: 'Contact', position: 'left'},          
          {
            to: '/contact',
            label: 'Request a guided demo',
            position: 'right',
            className: 'navbar-cta',
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [          
          {
            title: 'Docs',
            items: [
              {label: 'Concepts', to: '/docs/concepts'},
              {label: 'Get started with ITOSS', to: '/docs/start-with-itoss'},
            ],
          },
          {
            title: 'Explore',
            items: [
              {label: 'Services', to: '/services'},
              {label: 'Contact us', to: '/contact'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} ITOSS Project. All rights reserved.`,
      },

      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['bash', 'yaml', 'json', 'docker', 'sql'],
      },

      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    }),
};

export default config;

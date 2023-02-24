// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ITOSS: Operate IT products with ease',
  tagline: 'La solución de monitoreo remoto para cualquier tecnología',
  url: 'https://fmalaspina.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  deploymentBranch: 'main',


  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fmalaspina', // Usually your GitHub org/user name.
  projectName: 'itoss.ar', // Usually your repo name.
  trailingSlash: false,
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      es: {
        label: 'Spanish',
      },
      pt: {
        label: 'Portuguese',
      }
    }
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/global.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({

      navbar: {
        title: '',
        logo: {
          alt: 'Itoss Site Logo',
          src: 'img/ITOSS-01-bl.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'documents/concepts',
            position: 'left',
            label: 'Documents',

          },
          /*{to: '/blog', label: 'Blog', position: 'left'},*/
          { to: '/services', label: 'Services', position: 'left' },
          { to: '/resources', label: 'Resources', position: 'left' },
          { to: '/contact', label: 'Contact', position: 'left' },
          /*{ to: '/try', label: 'Try', position: 'left' },*/

          /* {
             type: 'localeDropdown',
             position: 'left',
           },*/
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Concepts',
                to: '/docs/documents/concepts',
              },

              {
                label: 'Installation on Ubuntu',
                to: '/docs/documents/Install/Ubuntu/ubuntu-installation',
              },
            ],
          },
          {
            title: 'Explore',
            items: [
              /* {
                 label: 'Blog',
                 to: '/blog',
               },*/
              {
                  label: 'Services',
                  to: '/services',
              },
              /*{
                label: 'Support',
                to: '/support',
              },*/
              {
                label: 'Contact us',
                to: '/contact',
              },
            ],
          },

        ],
        copyright: `© ${new Date().getFullYear()} ITOSS Project. All rights reserved.`,
      },
      prism: {
        //theme: require('prism-react-renderer/themes/vsDark'),
        theme: require('prism-react-renderer/themes/oceanicNext'),
        //theme: lightCodeTheme,
        //darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {

        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        indexDocs: true,
        indexPages: true,
        language: ["en", "es"],

        // ```
      },
    ],
  ],


};

module.exports = config;
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Mantle',
  tagline: 'Roblox infra-as-code and deployment tool',
  url: 'https://mantle-docs.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/blake-mealey/mantle-docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      gtag: {
        trackingID: 'G-Q4VEG3S3WF',
        anonymizeIP: true,
      },
      navbar: {
        title: 'Mantle',
        // logo: {
        //   alt: 'Mantle Logo',
        //   src: 'img/mantle-logo.png',
        // },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/blake-mealey/mantle-examples/tree/main/examples',
            label: 'Examples',
            position: 'left',
          },
          {
            href: 'https://github.com/blake-mealey/mantle',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'Mantle Logo',
          src: 'img/mantle-logo.png',
          href: 'https://mantle-docs.vercel.app',
          width: 60,
          height: 60,
        },
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'Configuration',
                to: '/docs/configuration',
              },
            ],
          },
          {
            title: 'Repos',
            items: [
              {
                label: 'Mantle',
                href: 'https://github.com/blake-mealey/mantle',
              },
              {
                label: 'Examples',
                href: 'https://github.com/blake-mealey/mantle-examples',
              },
              {
                label: 'Docs',
                href: 'https://github.com/blake-mealey/mantle-docs',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Feature requests',
                href: 'https://github.com/blake-mealey/mantle/issues/new',
              },
              {
                label: 'Bug reports',
                href: 'https://github.com/blake-mealey/mantle/issues/new',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

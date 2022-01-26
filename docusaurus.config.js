// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/nightOwlLight');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Mantle',
  tagline: 'Roblox infra-as-code and deployment tool',
  url: 'https://mantle-docs.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',
  clientModules: [require.resolve('./load-github-buttons.js')],

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
          /* <a class="github-button" href="https://github.com/blake-mealey/mantle" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star blake-mealey/mantle on GitHub">Star</a> */
          {
            href: 'https://github.com/blake-mealey/mantle',
            label: 'GitHub',
            position: 'right',
            className: 'github-button',
            'data-color-scheme':
              'no-preference: light; light: light; dark: dark;',
            'data-icon': 'octicon-star',
            'data-size': 'large',
            'data-show-count': 'true',
            'aria-label': 'Star blake-mealey/mantle on GitHub',
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
            title: 'GitHub',
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
              {
                html: `<a id="github-stargazers"
                          class="github-button"
                          href="https://github.com/blake-mealey/mantle"
                          data-color-scheme="dark"
                          data-icon="octicon-star"
                          data-size="large"
                          data-show-count="true"
                          aria-label="Star blake-mealey/mantle on GitHub"
                        >
                          Star
                        </a>`,
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Roblox OSS Community',
                href: 'https://discord.gg/wH5ncNS',
              },
              {
                label: 'Feature requests',
                href: 'https://github.com/blake-mealey/mantle/issues/new?labels=enhancement&template=feature_request.md',
              },
              {
                label: 'Bug reports',
                href: 'https://github.com/blake-mealey/mantle/issues/new?labels=bug&template=bug_report.md',
              },
            ],
          },
          {
            title: 'Built with',
            items: [
              {
                label: 'Docusaurus',
                href: 'https://docusaurus.io/',
              },
              {
                html: `
                <a href="https://vercel.com">
                <img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" style="margin-top: 0.5em" />
                </a>
                `,
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

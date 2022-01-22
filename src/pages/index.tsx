import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="Features" description="Mantle features">
      <HomepageHeader />
      <main>
        {/* TODO: extract this into data-driven components */}

        <section className={styles.divider}>
          <div>
            <a href="#feature-declarative">
              <h3>
                <span className={styles.featureNum}>1</span>Declarative
              </h3>
            </a>
            <a href="#feature-integrated">
              <h3>
                <span className={styles.featureNum}>2</span>Integrated
              </h3>
            </a>
            <a href="#feature-automated">
              <h3>
                <span className={styles.featureNum}>3</span>Automated
              </h3>
            </a>
          </div>
        </section>

        <section id="feature-declarative" className={styles.feature}>
          <aside>
            <div className={styles.codeBlock}>
              <div className={styles.codeBlockTitle}>mantle.yml</div>
              <SyntaxHighlighter language="yaml" style={codeTheme}>
                {`environments:
  - name: dev
    targetNamePrefix: environmentName
  - name: prod
    targetAccess: public

target:
  experience:
    configuration:
      genre: building
    places:
      start:
        file: game.rbxlx
        configuration:
          name: Getting Started with Mantle
          description: |-
            Made with Mantle`}
              </SyntaxHighlighter>
            </div>
          </aside>
          <div className={styles.content}>
            <h3>
              <span className={styles.featureNum}>1</span>Declarative
              configuration
            </h3>
            <p>
              Describe the Roblox infrastructure you want and Mantle will take
              care of the rest.
            </p>
            <div>
              <Link
                className="button button--secondary button--lg"
                to="/docs/configuration"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section id="feature-integrated" className={styles.feature}>
          <aside>
            <div className={styles.codeBlock}>
              <div className={styles.codeBlockTitle}>foreman.toml</div>
              <SyntaxHighlighter language="toml" style={codeTheme}>
                {`[tools]
mantle = { source = "blake-mealey/mantle", version = "0.10" }`}
              </SyntaxHighlighter>
            </div>
          </aside>
          <div className={styles.content}>
            <h3>
              <span className={styles.featureNum}>2</span>Integrated with the
              Roblox OSS community
            </h3>
            <p>
              Mantle integrates with the best of the Roblox OSS community.
              Install with{' '}
              <a href="https://github.com/roblox/foreman">Foreman</a> and build
              with <a href="https://rojo.space">Rojo</a>.
            </p>
            <div>
              <Link
                className="button button--secondary button--lg"
                to="/docs/installation"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section id="feature-automated" className={styles.feature}>
          <aside>
            <div className={styles.codeBlock}>
              <div className={styles.codeBlockTitle}>
                .github/workflows/deploy.yml
              </div>
              <SyntaxHighlighter language="yaml" style={codeTheme}>
                {`name: Deploy
on: push
jobs:
  build-and-deploy:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v2
      - uses: Roblox/setup-foreman@v1
        with:
          token: $\{\{ secrets.GITHUB_TOKEN }}
      - name: Build project
        run: rojo build --output game.rbxlx
      - name: Deploy project
        run: mantle deploy
        env:
          ROBLOSECURITY: $\{\{ secrets.ROBLOSECURITY }}
          AWS_ACCESS_KEY_ID: $\{\{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: $\{\{ secrets.AWS_SECRET_ACCESS_KEY }}`}
              </SyntaxHighlighter>
            </div>
          </aside>
          <div className={styles.content}>
            <h3>
              <span className={styles.featureNum}>3</span>Automate with
              continuous deployments
            </h3>
            <p>
              Mantle is designed for continuous deployment environments like
              GitHub Actions.
            </p>
            <div>
              <Link
                className="button button--secondary button--lg"
                to="/docs/continuous-deployment"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

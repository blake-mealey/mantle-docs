import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

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
          <a href="#feature-declarative">
            <h3>
              <span className={styles.featureNum}>1</span> Declarative
            </h3>
          </a>
          <a href="#feature-integrated">
            <h3>
              <span className={styles.featureNum}>2</span> Integrated
            </h3>
          </a>
          <a href="#feature-automated">
            <h3>
              <span className={styles.featureNum}>3</span> Automated
            </h3>
          </a>
        </section>

        <section id="feature-declarative" className={styles.feature}>
          <aside>
            <img src="/img/feature_declarative.svg" />
          </aside>
          <div className={styles.content}>
            <h3>
              <span className={styles.featureNum}>1</span> Declarative
              configuration
            </h3>
            <p>
              Describe the Roblox infrastructure you want and Mantle will take
              care of the rest.
            </p>
          </div>
        </section>

        <section id="feature-integrated" className={styles.feature}>
          <aside>
            <img src="/img/feature_integrated.svg" />
          </aside>
          <div className={styles.content}>
            <h3>
              <span className={styles.featureNum}>2</span> Integrated with the
              Roblox OSS community
            </h3>
            <p>
              Mantle integrates with the best of the Roblox OSS community.
              Install with{' '}
              <a href="https://github.com/roblox/foreman">Foreman</a> and build
              with <a href="https://rojo.space">Rojo</a>.
            </p>
          </div>
        </section>

        <section id="feature-automated" className={styles.feature}>
          <aside>
            <img src="/img/feature_cd.svg" />
          </aside>
          <div className={styles.content}>
            <h3>
              <span className={styles.featureNum}>3</span> Automate with
              continuous deployments
            </h3>
            <p>
              Mantle is designed for continuous deployment environments like
              GitHub Actions.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

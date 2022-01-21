/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  image: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Declarative',
    description: (
      <>
        Declaratively define the Roblox infrastructure you want and Mantle will
        handle the rest.
      </>
    ),
    image: '/img/feature_declarative.svg',
  },
  {
    title: 'Integrated with the Community',
    description: (
      <>
        Install with <a href="https://github.com/roblox/foreman">Foreman</a> and
        build with <a href="https://rojo.space">Rojo</a>
        <br />
      </>
    ),
    image: '/img/feature_integrated.svg',
  },
  {
    title: 'Continuous Deployment',
    description: <>Designed for CD environments like GitHub Actions.</>,
    image: '/img/feature_cd.svg',
  },
];

function Feature({ title, description, image }: FeatureItem) {
  return (
    <div className="col col--4">
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <img src={image} />
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

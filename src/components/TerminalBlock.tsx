import React, { Fragment } from 'react';
import Ansi from 'ansi-to-react';
import styles from './TerminalBlock.module.css';

type Props = {
  title?: string;
  children: string;
};

export default function TerminalBlock({ title, children }: Props) {
  const lines = children.split('\n');
  return (
    <div className={styles.block}>
      {title ? (
        <div className={styles.title}>
          <span className={styles.prompt}>$</span>
          {title}
        </div>
      ) : null}
      <pre>
        {lines.map((line, i) => (
          <Fragment key={i}>
            <Ansi linkify useClasses>
              {line}
            </Ansi>
            <br />
          </Fragment>
        ))}
      </pre>
    </div>
  );
}

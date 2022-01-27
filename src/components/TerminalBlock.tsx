import React from 'react';
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
          <>
            <Ansi key={i} linkify useClasses>
              {line}
            </Ansi>
            <br />
          </>
        ))}
      </pre>
    </div>
  );
}

import React, { Fragment, Children, FC } from 'react';
import Ansi from 'ansi-to-react';
import styles from './TerminalBlock.module.css';

type Props = {
  title?: string;
};

const TerminalBlock: FC<Props> = ({ title, children }) => {
  let lines: string[] = [];
  if (typeof children === 'string') {
    lines = children.split('\n');
  } else {
    const mdx: any = Children.only(children);
    const pre: any = Children.only(mdx.props.children);
    const code: string = pre.props.children;
    lines = code.trimEnd().split('\n');
  }

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
};

export default TerminalBlock;

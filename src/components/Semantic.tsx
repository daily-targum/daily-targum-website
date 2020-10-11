import * as React from 'react';
import { ReactChildren } from '../types';
import styles from './Semantic.module.scss';
import cn from 'classnames';
import Logo from './Logo';
import { ID } from './SkipNav';

export function Semantic({
  children,
  role,
  pritable,
  skipNavContent = false,
  ariaLabel,
  className
}: {
  children: ReactChildren;
  role: 'main' | 'article' | 'aside' | 'section' | 'header';
  pritable?: boolean;
  skipNavContent?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  const props = {
    id: skipNavContent ? ID : undefined,
    tabIndex: skipNavContent ? -1 : undefined,
    className: cn(styles.semantic, className, {
      [styles.printable]: pritable
    }),
    'area-label': ariaLabel
  };

  function PrintLogo() {
    return pritable ? (
      <Logo 
        className={cn(styles.hide, {
          [styles.printLogo]: pritable
        })}
      />
    ) : null;
  }

  function SkipNavOutlineFix() {
    return skipNavContent ? (
      <div 
        className={cn(styles.hide, {
          [styles.printLogo]: pritable
        })}
      />
    ) : null;
  }

  switch (role) {
    case 'main':
      return (
        <main {...props}>
          <PrintLogo/>
          <SkipNavOutlineFix/>
          {children}
        </main>
      );
    case 'article':
      return (
        <article {...props}>
          <PrintLogo/>
          {children}
        </article>
      );
    case 'aside':
      return (
        <aside {...props}>
          {children}
        </aside>
      );
    case 'section':
      return (
        <section {...props}>
          {children}
        </section>
      );
    case 'header':
      return (
        <header {...props}>
          {children}
        </header>
      );
    default:
      return (
        <div {...props}>
          {children}
        </div>
      );
  };
}
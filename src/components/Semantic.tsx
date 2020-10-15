import * as React from 'react';
import { ReactChildren } from '../types';
import cn from 'classnames';
import Logo from './Logo';
import { ID } from './SkipNav';
import Styles from './Semantic.styles';
const { classNames, StyleSheet } = Styles;

export function Semantic({
  children,
  role,
  pritable,
  skipNavContent = false,
  ariaLabel,
  className,
  style
}: {
  children: ReactChildren;
  role: 'main' | 'article' | 'aside' | 'section' | 'header';
  pritable?: boolean;
  skipNavContent?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const props = {
    id: skipNavContent ? ID : undefined,
    tabIndex: skipNavContent ? -1 : undefined,
    className: cn(className, {
      ['printable']: pritable
    }),
    style,
    'area-label': ariaLabel
  };

  function Print() {
    return pritable ? (
      <>
        <Logo 
          className={cn({
            [classNames.printLogo]: pritable
          })}
        />
        <style jsx global>
          {`
            @media print {
              body * {
                visibility: hidden;
                height: 0;
              }
            }

            @media print {
              .printable {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                padding: 0;
                margin: 0;
                flex: 1;
              }

              .printable * {
                visibility: visible;
                height: auto;
              }
            }
          `}
        </style>
      </>
    ) : null;
  }

  switch (role) {
    case 'main':
      return (
        <main {...props}>
          <Print/>
          {StyleSheet}
          {children}
        </main>
      );
    case 'article':
      return (
        <article {...props}>
          <Print/>
          {StyleSheet}
          {children}
        </article>
      );
    case 'aside':
      return (
        <aside {...props}>
          <Print/>
          {StyleSheet}
          {children}
        </aside>
      );
    case 'section':
      return (
        <section {...props}>
          <Print/>
          {StyleSheet}
          {children}
        </section>
      );
    case 'header':
      return (
        <header {...props}>
          <Print/>
          {StyleSheet}
          {children}
        </header>
      );
    default:
      return (
        <div {...props}>
          <Print/>
          {StyleSheet}
          {children}
        </div>
      );
  };
}
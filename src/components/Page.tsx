import React from 'react';
import { useSelector } from '../store';
// @ts-ignore
import Div100vh from 'react-div-100vh';
import styles from './Page.module.scss';
import cn from 'classnames';
import { ReactChildren } from '../types';

export function Page({
  children
}: {
  children: ReactChildren
}) {
  const darkNavbar = useSelector(s => s.navigation.darkNavbar);

  return (
    <Div100vh>
      <div
        className={cn(
          styles.page,
          {
            'dark-mode': darkNavbar
          }
        )}
      >
        {children}
      </div>
    </Div100vh>
  )
}

Page.Role = Role;
function Role({
  children,
  role,
  pritable = role === 'article'
}: {
  children: ReactChildren;
  role: 'main' | 'article' | 'aside';
  pritable?: boolean;
}) {
  const props = {
    className: cn({
      [styles.printable]: pritable
    })
  };

  switch (role) {
    case 'main':
      return (
        <main {...props}>
          {children}
        </main>
      );
    case 'article':
      return (
        <article {...props}>
          {children}
        </article>
      );
    case 'aside':
      return (
        <aside {...props}>
          {children}
        </aside>
      );
  };
}
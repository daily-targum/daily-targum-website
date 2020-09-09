import React from 'react';
import { useSelector } from '../store';
// @ts-ignore
import Div100vh from 'react-div-100vh';
import styles from './Page.module.scss';
import cn from 'classnames';

export function Page({
  children
}: {
  children: React.ReactNode
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
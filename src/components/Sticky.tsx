import { ReactChildren } from '../types';
import { styleHelpers, buildStyleSheet } from '../utils'
import css from 'styled-jsx/css';
import { NAVBAR_HEIGHT } from './Navbar'

const stickyBox = css.resolve`
  * {
    ${styleHelpers.stickySidebar(NAVBAR_HEIGHT)}
  }
`;


const { classNames, StyleSheet } = buildStyleSheet({
  stickyBox
});

export function Sticky({
  children
}: {
  children: ReactChildren
}) {
  return (
    <>
      <div className={classNames.stickyBox}>
        {children}
      </div>
      {StyleSheet}
    </>
  );
}
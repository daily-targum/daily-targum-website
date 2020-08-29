import React from 'react';
import Theme from './Theme';
import { styleHelpers } from '../utils';
import { IoMdClose } from 'react-icons/io';
import { ReactChildren } from '../types';
import Div100vh from 'react-div-100vh';

export function Modal({
  open = false,
  handleClose,
  children
}: {
  open: boolean
  handleClose: () => any
  children: ReactChildren
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();

  return (
    <div
      style={open ? undefined : styles.hide}
      className={cng(styles.backdrop)}
      onClick={handleClose}
    >
      <IoMdClose
        style={styles.closeIcon}
        size={30}
        onClick={handleClose}
      />
      <Div100vh className={cng(styles.div100)}>
        <div
          style={styles.modal}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </Div100vh>
    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  backdrop: {
    ...styleHelpers.absoluteFill(),
    position: 'fixed',
    zIndex: 2000,
    backgroundColor: 'rgba(0,0,0,0.75)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(40px) contrast(20%)',
    '-webkit-backdrop-filter': 'blur(40px) contrast(20%)'
  },
  div100: {
    ...styleHelpers.flex('column'),
    justifyContent: 'center',
    overflow: 'auto',
    width: 'calc(200px + 70vw)',
    maxWidth: '100%'
  },
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    cursor: 'pointer',
    color: '#fff',
    zIndex: 2001
  },
  modal: {
    backgroundColor: theme.colors.surface,
    boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)'
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  }
}));
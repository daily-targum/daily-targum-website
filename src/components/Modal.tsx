import React from 'react';
import Theme from './Theme';
import { styleHelpers } from '../utils';
import { IoMdClose } from 'react-icons/io';
import { ReactChildren } from '../types';

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
      <div
        style={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
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
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    cursor: 'pointer',
    color: '#fff'
  },
  modal: {
    width: 'calc(200px + 70vw)',
    maxWidth: '100%',
    backgroundColor: theme.colors.surface,
    boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)'
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  }
}));
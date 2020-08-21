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

  return (
    <div
      style={{
        ...styles.backdrop,
        ...(open ? null : styles.hide)
      }}
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
    backgroundColor: 'rgba(0,0,0,.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    cursor: 'pointer',
    color: '#fff'
  },
  modal: {
    width: 'calc(500px + 15vw)',
    maxWidth: '100%',
    backgroundColor: theme.colors.surface
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  }
}));
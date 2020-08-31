import React from 'react';
import Theme from './Theme';
import { styleHelpers } from '../utils';
import { IoMdClose } from 'react-icons/io';
import { ReactChildren } from '../types';
import scrollLock from 'scroll-lock';

export function Modal({
  open = false,
  handleClose,
  children,
  overflow = 'hidden'
}: {
  open: boolean
  handleClose: () => any
  children: ReactChildren
  overflow?: string
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();

  React.useEffect(() => {
    if (open) {
      scrollLock.disablePageScroll();
    } else {
      scrollLock.enablePageScroll();
    }

    return () => {
      scrollLock.enablePageScroll();
    }
  }, [open]);

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
      <div style={styles.div100}>
        <div
          style={{
            ...styles.modal,
            overflow
          }}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
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
  div100: {
    ...styleHelpers.flex('column'),
    justifyContent: 'center',
    maxHeight: '90vh',
    width: 'calc(750px + 30vw)',
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
    boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
    maxHeight: '100%',
    minHeight: 0
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  }
}));
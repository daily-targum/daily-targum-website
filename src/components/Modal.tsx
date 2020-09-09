import React from 'react';
import { useScrollock } from '../utils';
import { IoMdClose } from 'react-icons/io';
import { ReactChildren } from '../types';
import styles from './Modal.module.scss';
import cn from 'classnames';

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
  const { toggleScrollock } = useScrollock();

  React.useEffect(() => {
    toggleScrollock(open)
  }, [open]);

  return (
    <div
      className={cn(
        styles.backdrop,
        {
          [styles.hide]: !open
        }
      )}
      onClick={handleClose}
    >
      <IoMdClose
        className={styles.closeIcon}
        size={30}
        onClick={handleClose}
      />
      <div
        className={styles.modal}
        style={{
          overflow
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
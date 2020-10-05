import React from 'react';
import { useScrollock } from '../utils';
import { IoMdClose } from 'react-icons/io';
import { ReactChildren } from '../types';
import styles from './Modal.module.scss';
import cn from 'classnames';
import FocusTrap from 'focus-trap-react';
import ReactDiv100 from 'react-div-100vh';

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

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.keyCode === 27 && open) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open]);


  return (
    <FocusTrap active={open}>
      <div>
      <ReactDiv100>
        <div
          className={cn(
            styles.backdrop,
            {
              [styles.hide]: !open
            }
          )}
          onClick={handleClose}
        >
          <button
            aria-label='Close modal'
            data-tooltip-position='left'
            onClick={handleClose}
            className={styles.closeIcon}
          >
            <IoMdClose size={30}/>
          </button>

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
      </ReactDiv100>
      </div>
    </FocusTrap>
  );
}
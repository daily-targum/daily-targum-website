import * as React from 'react';
import { IoMdClose } from 'react-icons/io';
import { ReactChildren } from '../types';
import styles from './Modal.module.scss';
import cn from 'classnames';
import FocusTrap from 'focus-trap-react';
import dynamic from 'next/dynamic';

export const ScrollLock = dynamic(() => import("./ScrollLock"), {
  ssr: false,
});

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
  const ref = React.useRef<HTMLDivElement>(null);

  // reset scroll within modal
  React.useEffect(() => {
    if (ref.current && !open) {
      ref.current.scrollTop = 0;
    }
  }, [open]);

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === "Escape" && open) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  return (
    <>
      <ScrollLock active={open}/>
      <FocusTrap active={open}>
        <div 
          className={cn(
            styles.backdrop,
            {
              [styles.hide]: !open
            }
          )}
          onClick={handleClose}
        >
          {open ? (
            <button
              aria-label='Close modal'
              data-tooltip-position='left'
              onClick={handleClose}
              className={styles.closeIcon}
            >
              <IoMdClose size={30}/>
            </button>
          ) : null}

          <div
            ref={ref}
            className={styles.modal}
            style={{
              overflow
            }}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </FocusTrap>
    </>
  );
}
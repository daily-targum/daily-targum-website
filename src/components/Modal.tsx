import * as React from 'react';
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
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    toggleScrollock(open);
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
    <FocusTrap active={open}>
      <div>
        <ReactDiv100 
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
        </ReactDiv100>
      </div>
    </FocusTrap>
  );
}
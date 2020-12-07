import * as React from 'react';
import DefaultLink from 'next/link';
import { useRouter } from 'next/router';


function openPopup(url: string) {
  const HEIGHT = 627;
  const WIDTH = 555;

  if (typeof window !== 'undefined') {
    const newwindow = window.open(url, 'fbShareWindow', `height=${HEIGHT}, width=${WIDTH}, top=` + (window.innerHeight / 2 - HEIGHT) + ', left=' + (window.innerWidth / 2 - WIDTH) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    newwindow?.focus();
    return newwindow;
  }

  return null;
}

export function Link({
  href,
  children,
  style,
  className,
  tabIndex,
  label,
  ariaHidden,
  rel,
  role,
  tooltipPosition,
  onClickSideEffect,
  popup
}: {
  href?: string
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  tabIndex?: number
  label?: string
  ariaHidden?: boolean
  rel?: string
  role?: string
  tooltipPosition?: string
  onClickSideEffect?: () => any
  popup?: boolean
}) {
  const router = useRouter();

  const hrefHost = href?.match(/(https{0,1}:\/\/|^)([^/]+)/)?.[2] ?? '';
  
  let isInternal = false;

  if (hrefHost && /^(staging\.|)dailytargum.com$/i.test(hrefHost)) {
    isInternal = true;
  } 
  
  else if(href) {
    isInternal = /^(\/|#)/.test(href);
  }

  return (isInternal && href) ? (
    <DefaultLink
      href={href}
    >
      <a
        style={style}
        className={className}
        tabIndex={tabIndex}
        aria-label={label}
        aria-hidden={ariaHidden}
        role={role}
        rel={rel}
        data-tooltip-position={tooltipPosition}
        onClick={onClickSideEffect ? (
          (e) => {
            if (e.defaultPrevented) {
              router.push(href);
            }
            onClickSideEffect();
          }
        ) : undefined}
      >
        {children}
      </a>
    </DefaultLink>
  ) : (
    <a
      href={href}
      rel={`noopener nofollow${rel ? ' '+rel : ''}`}
      target={'_blank'}
      style={style}
      className={className}
      tabIndex={tabIndex}
      aria-label={label}
      aria-hidden={ariaHidden}
      role={role}
      data-tooltip-position={tooltipPosition}
      onClick={(onClickSideEffect || popup) ? (
        (e) => {
          if (onClickSideEffect) {
            onClickSideEffect();
          }

          if (popup && href) {
            const newWindow = openPopup(href);
            if(!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
              // Popup blocked
              return true;
            } else {
              return false;
            }
          }

          if (e.defaultPrevented && href) {
            router.push(href);
          }
        }
      ) : undefined}
    >
      {children}
    </a>
  );
}

export default Link;
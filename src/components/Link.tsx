import * as React from 'react';
import DefaultLink from 'next/link';
import { useRouter } from 'next/router';

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
  onClickSideEffect
}: {
  href: string
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
}) {
  const router = useRouter();

  const hrefHost = href.match(/(https{0,1}:\/\/|^)([^/]+)/)?.[2];
  
  let isInternal = false;

  if (hrefHost && /^(staging\.|)dailytargum.com$/i.test(hrefHost)) {
    isInternal = true;
  } 
  
  else {
    isInternal = /^\//.test(href);
  }

  return isInternal ? (
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
      target='_blank'
      style={style}
      className={className}
      tabIndex={tabIndex}
      aria-label={label}
      aria-hidden={ariaHidden}
      role={role}
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
  );
}

export default Link;
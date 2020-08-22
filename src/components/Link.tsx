import React from 'react';
import DefaultLink from 'next/link';

const internalPages = [
  '/article/[year]/[month]/[slug]',
  '/page/[slug]',
  '/staff/[slug]'
].map(href => ({
  href,
  regex: urlWithParamsToRegex(href)
}));

function urlWithParamsToRegex(url: string) {
  const reg = url
  .split(/\//)
  .map(part => (
    /^\[.+\]$/.test(part) ? '[^/]+' : part
  ))
  .join('/')
  .replace(/\/$/, '');

  return new RegExp(`^${reg}$`, 'i');
}

export function Link({
  href,
  children,
  style,
  className
}: {
  href: string
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}) {
  let linkAs: string | undefined = undefined;
  const hrefHost = href.match(/(https{0,1}:\/\/|^)([^/]+)/)?.[2];
  
  let isInternal = false;

  if (hrefHost && /dailytargum.com$/i.test(hrefHost)) {
    isInternal = true;
  } 
  
  else {
    isInternal = /^\//.test(href);
  }

  if (isInternal) {
    const strippedHref = href.replace(/(https{0,1}:\/\/|^)([^/]+)/, '');

    for(const internal of internalPages) {
      if (internal.regex.test(strippedHref)) {
        linkAs = strippedHref;
        href = internal.href;
        break;
      }
    }
  }

  return isInternal ? (
    <DefaultLink
      href={href}
      as={linkAs}
    >
      <a
        style={style}
        className={className}
      >
        {children}
      </a>
    </DefaultLink>
  ) : (
    <a
      href={href}
      rel='noopener nofollow'
      target='_blank'
      style={style}
      className={className}
    >
      {children}
    </a>
  );
}

export default Link;
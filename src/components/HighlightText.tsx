import * as React from 'react';
import escapeStringRegexp from 'escape-string-regexp';

export function HighlightText({
  children,
  search,
  Highlighter = ({children}) => <mark>{children}</mark>
}: {
  children: string;
  search: string,
  Highlighter?: ({ children }: { children: string }) => JSX.Element
}) {
  const matcher = new RegExp(escapeStringRegexp(search), 'ig');
  const split = children.split(matcher);
  const matches = children.match(matcher);

  return (
    <>
      {split.map((text, i) => (
        <React.Fragment key={children+search+i}>
          {i > 0 ? (
            <Highlighter>{matches?.[i-1] ?? search}</Highlighter>
          ) : null}
          {text}
        </React.Fragment>
      ))}
    </>
  )
}

export default HighlightText;
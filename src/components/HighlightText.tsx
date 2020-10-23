import * as React from 'react';
import escapeStringRegexp from 'escape-string-regexp';

export function HighlightText({
  children,
  search,
  Highlighter
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
            Highlighter ? (
              <Highlighter>{matches?.[i-1] ?? search}</Highlighter>
            ) : (
              <mark>
                {matches?.[i-1] ?? search}
              </mark>
            )
          ) : null}
          {text}
        </React.Fragment>
      ))}
      <style jsx>
        {`
          mark,
          mark * {
            color: #000;
          }
        `}
      </style>
    </>
  )
}

export default HighlightText;
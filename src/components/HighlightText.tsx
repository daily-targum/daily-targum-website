import * as React from 'react';

export function HighlightText({
  children,
  search
}: {
  children: string;
  search: string
}) {
  const matcher = new RegExp(search, 'i');
  const split = children.split(matcher);

  return (
    <>
      {split.map((text, i) => (
        <React.Fragment key={children+search+i}>
          {i > 0 ? (
            <b>{search}</b>
          ) : null}
          {text}
        </React.Fragment>
      ))}
    </>
  )
}

export default HighlightText;
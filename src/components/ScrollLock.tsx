import * as React from 'react';

export function ScrollLock({
  active = true
}: {
  active?: boolean
}) {
  const [scrollTop, setScrollTop] = React.useState<number | null>(null);
  const [loadStyles, setLoadStyles] = React.useState(false);
  const [scrollBarWidth, setScrollBarWidth] = React.useState(0);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (active) {
        setScrollBarWidth(window.innerWidth - document.body.offsetWidth);
        setScrollTop(window.scrollY);
        setLoadStyles(true);
      } else {
        setLoadStyles(false);
      }
    }
  }, [active]);

  React.useLayoutEffect(() => {
    if (typeof window !== 'undefined' && scrollTop !== null && !loadStyles) {
      window.scrollTo({top: scrollTop});
    }
  }, [loadStyles]);

  return loadStyles ? (
    <>
      {scrollTop !== null ? (
        <style jsx global>
          {`
            body {
              margin-top: -${scrollTop}px;
              position: fixed;
              width: 100%;
              padding-right: ${scrollBarWidth}px;
            }

            .fixed-element {
              padding-right: ${scrollBarWidth}px;
            }
          `}
        </style>
      ) : (
        <style jsx global>
          {`
            :root,
            html,
            body {
              overflow: hidden;
              padding-right: ${scrollBarWidth}px;
            }

            .fixed-element {
              padding-right: ${scrollBarWidth}px;
            }
          `}
        </style>
      )}
    </>
  ) : null;
}

export default ScrollLock;
import * as React from 'react';
import NProgress from 'nprogress';
import { useRouter } from "next/router";

export function NextNProgress({
  startPosition = 0.3,
  stopDelayMs = 200,
  options
}: {
  startPosition?: number
  stopDelayMs?: number
  options: Partial<NProgress.NProgressOptions>
}) {
  const router = useRouter();
  const path = React.useRef('');
  const isChanging = React.useRef(false);

  React.useEffect(() => {
    path.current = location.pathname;

    NProgress.configure(options);

    function routeChangeStart(newUrl: string) {
      newUrl = newUrl.replace(/\?.+/,'');
      // change
      if (path.current !== newUrl) {
        isChanging.current = true;
        path.current = newUrl;
        NProgress.set(startPosition);
        NProgress.start();
      }
    };
  
    let timeout: number;
    function routeChangeEnd() {
      window.clearTimeout(timeout);
      if (!isChanging.current) {
        return;
      }
      timeout = window.setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
      isChanging.current = false;
    };

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeEnd);
    router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      clearTimeout(timeout);
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeEnd);
      router.events.off('routeChangeError', routeChangeEnd);
    }
  }, []);

  return (
    <style jsx global>
      {`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: theme.color('accent_main');
          position: fixed;
          z-index: 9999;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          opacity: 1;
          transform: rotate(3deg) translate(0px, -4px);
        }
        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }
      `}
    </style>
  );
}

export default NextNProgress;
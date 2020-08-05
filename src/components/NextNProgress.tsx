import React from 'react';
import NProgress from 'nprogress';
import { useRouter } from "next/router";

export function NextNProgress({
  color = '#29D',
  startPosition = 0.3,
  stopDelayMs = 200,
  height = 3,
  options
}: {
  color?: string
  startPosition?: number
  stopDelayMs?: number
  height?: number
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
      clearTimeout(timeout);
      if (!isChanging.current) {
        return;
      }
      timeout = setTimeout(() => {
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
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: ${height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }
    `}</style>);
}

export default NextNProgress;
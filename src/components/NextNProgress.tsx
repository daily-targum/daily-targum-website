import React from 'react';
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

  return null;
}

export default NextNProgress;
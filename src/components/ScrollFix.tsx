import * as React from 'react';
import { useRouter } from 'next/router';

export function ScrollFix() {
  const router = useRouter();
  const path = router.asPath.replace(/\?.*/, '');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0
      });
    }
  }, [path])

  return null;
}
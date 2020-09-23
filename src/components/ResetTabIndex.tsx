import React from 'react';

export function ResetTabIndex({
  key, 
  bool = true
}: {
  key?: string;
  bool?: boolean;
}) {
  const ref = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (bool) {
      ref.current?.focus();
      ref.current?.blur();
    }
  }, [bool, key]);

  return (
    <a ref={ref} href='#focus-reset' tabIndex={-1}/>
  );
}

export default ResetTabIndex;
import React from 'react';

export function ResetTabIndex({
  id, 
  bool = true
}: {
  id?: string;
  bool?: boolean;
}) {
  const ref = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (bool) {
      ref.current?.focus();
      ref.current?.blur();
    }
  }, [bool, id]);

  return (
    <a ref={ref} href='#focus-reset' tabIndex={-1}/>
  );
}

export default ResetTabIndex;
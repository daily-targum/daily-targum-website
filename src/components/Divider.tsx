import React from 'react';
import Theme from './Theme';

export function Divider({
  className,
  style
}: {
  className?: string
  style?: React.CSSProperties
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div 
      style={{
        ...styles.divider,
        ...style
      }}
      className={className}
    />
  );
}

function Vertical({
  className,
  style
}: {
  className?: string,
  style?: React.CSSProperties
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div 
      style={{
        ...styles.dividerVertical,
        ...style
      }}
      className={className}
    />
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.divider
  },
  dividerVertical: {
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.divider
  }
}));

Divider.Vertical = Vertical;
export default Divider;
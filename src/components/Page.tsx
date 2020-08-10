import React from 'react';
import { useSelector } from '../store';
import Theme from './Theme';

export function Page({
  children
}: {
  children: React.ReactNode
}) {
  const theme = Theme.useTheme();
  const darkNavbar = useSelector(s => s.navigation.darkNavbar);

  return (
    <div 
      style={{
        backgroundColor: darkNavbar ? theme.colors.primary.main : theme.colors.surface
      }}
    >
      {children}
    </div>
  )
}
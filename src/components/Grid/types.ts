import * as React from 'react';

export interface BreakPoints<T> {
  xs: T
  sm: T
  md: T
  lg: T
  xl: T
  xxl: T
}

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ConsumerProps {
  children: React.ReactElement
}

export type Context = {
  breakPoint: BreakPoint
  cols: string[]
  spacing: number
}
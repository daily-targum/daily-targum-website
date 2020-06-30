import React from 'react';

// type definitions
export interface GlobalBreakPoints {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number
}

export interface BreakPoints {
  xs?: number | string,
  sm?: number | string,
  md?: number | string,
  lg?: number | string,
  xl?: number | string,
  xxl?: number | string
}

export interface ComputedBreakPoints {
  xs: number | string,
  sm: number | string,
  md: number | string,
  lg: number | string,
  xl: number | string,
  xxl: number | string
}

export interface ComputedStyles {
  xs?: React.CSSProperties,
  sm?: React.CSSProperties,
  md?: React.CSSProperties,
  lg?: React.CSSProperties,
  xl?: React.CSSProperties,
  xxl?: React.CSSProperties
}

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ColProps extends React.CSSProperties, BreakPoints {
  style?: React.CSSProperties,
  children?: React.ReactNode,
  className?: string
}

export interface RowProps extends React.CSSProperties, BreakPoints {
  style?: React.CSSProperties,
  children?: React.ReactNode,
  spacing?: number,
  className?: string,
  wrap?: boolean
}

export interface ConsumerProps {
  children: React.ReactElement
}
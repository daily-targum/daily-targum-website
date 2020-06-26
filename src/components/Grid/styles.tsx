import styled from 'styled-components';
import { GlobalBreakPoints, ComputedBreakPoints } from './types';

export const Col = styled.div<{
  spacing: number,
  computedBreakPoints: ComputedBreakPoints,
  breakPoints: GlobalBreakPoints
}>`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 ${({spacing}) => spacing/2}px;

  @media (max-width: ${({breakPoints}) => breakPoints.sm-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.xs === '0%' ? 'none' : null};
    min-width: ${({computedBreakPoints}) => computedBreakPoints.xs};
    width: ${({computedBreakPoints}) => computedBreakPoints.xs};
    max-width: ${({computedBreakPoints}) => computedBreakPoints.xs};
  }

  @media (min-width: ${({breakPoints}) => breakPoints.sm+'px'}) and (max-width: ${({breakPoints}) => breakPoints.md-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.sm === '0%' ? 'none' : null};
    min-width: ${({computedBreakPoints}) => computedBreakPoints.sm};
    width: ${({computedBreakPoints}) => computedBreakPoints.sm};
    max-width: ${({computedBreakPoints}) => computedBreakPoints.sm};
  }

  @media (min-width: ${({breakPoints}) => breakPoints.md+'px'}) and (max-width: ${({breakPoints}) => breakPoints.lg-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.md === '0%' ? 'none' : null};
    min-width: ${({computedBreakPoints}) => computedBreakPoints.md};
    width: ${({computedBreakPoints}) => computedBreakPoints.md};
    max-width: ${({computedBreakPoints}) => computedBreakPoints.md};
  }

  @media (min-width: ${({breakPoints}) => breakPoints.lg+'px'}) and (max-width: ${({breakPoints}) => breakPoints.xl-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.lg === '0%' ? 'none' : null};
    min-width: ${({computedBreakPoints}) => computedBreakPoints.lg};
    width: ${({computedBreakPoints}) => computedBreakPoints.lg};
    max-width: ${({computedBreakPoints}) => computedBreakPoints.lg};
  }

  @media (min-width: ${({breakPoints}) => breakPoints.xl+'px'}) and (max-width: ${({breakPoints}) => breakPoints.xxl-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.xl === '0%' ? 'none' : null};
    min-width: ${({computedBreakPoints}) => computedBreakPoints.xl};
    width: ${({computedBreakPoints}) => computedBreakPoints.xl};
    max-width: ${({computedBreakPoints}) => computedBreakPoints.xl};
  }

  @media (min-width: ${({breakPoints}) => breakPoints.xxl+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.xxl === '0%' ? 'none' : null};
    min-width: ${({computedBreakPoints}) => computedBreakPoints.xxl};
    width: ${({computedBreakPoints}) => computedBreakPoints.xxl};
    max-width: ${({computedBreakPoints}) => computedBreakPoints.xxl};
  }
`;


export const BreakpointSwitch = styled.div<{
  computedStyles: any,
  breakPoints: GlobalBreakPoints
}>`
  @media (max-width: ${({breakPoints}) => breakPoints.sm-1+'px'}) {
    ${({ computedStyles }) => {
      return Object.keys(computedStyles.xs).map(prop => (
        `${prop}: ${computedStyles.xs[prop]};`
      )).join('\n');
    }}
  }

  @media (min-width: ${({breakPoints}) => breakPoints.sm+'px'}) and (max-width: ${({breakPoints}) => breakPoints.md-1+'px'}) {
    ${({ computedStyles }) => {
      return Object.keys(computedStyles.sm).map(prop => (
        `${prop}: ${computedStyles.sm[prop]};`
      )).join('\n');
    }}
  }

  @media (min-width: ${({breakPoints}) => breakPoints.md+'px'}) and (max-width: ${({breakPoints}) => breakPoints.lg-1+'px'}) {
    ${({ computedStyles }) => {
      return Object.keys(computedStyles.md).map(prop => (
        `${prop}: ${computedStyles.md[prop]};`
      )).join('\n');
    }}
  }

  @media (min-width: ${({breakPoints}) => breakPoints.lg+'px'}) and (max-width: ${({breakPoints}) => breakPoints.xl-1+'px'}) {
    ${({ computedStyles }) => {
      return Object.keys(computedStyles.lg).map(prop => (
        `${prop}: ${computedStyles.lg[prop]};`
      )).join('\n');
    }}
  }

  @media (min-width: ${({breakPoints}) => breakPoints.xl+'px'}) and (max-width: ${({breakPoints}) => breakPoints.xxl-1+'px'}) {
    ${({ computedStyles }) => {
      return Object.keys(computedStyles.xl).map(prop => (
        `${prop}: ${computedStyles.xl[prop]};`
      )).join('\n');
    }}
  }

  @media (min-width: ${({breakPoints}) => breakPoints.xxl+'px'}) {
    ${({ computedStyles }) => {
      return Object.keys(computedStyles.xxl).map(prop => (
        `${prop}: ${computedStyles.xxl[prop]};`
      )).join('\n');
    }}
  }
`;
import styled from 'styled-components';
import { BreakPoints } from './types';

export const Col = styled.div<{
  computedBreakPoints: BreakPoints<number>,
  breakPoints: BreakPoints<number>
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  @media (max-width: ${({breakPoints}) => breakPoints.sm-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.xs === 0 ? 'none' : null};
    grid-column-end: span ${({computedBreakPoints}) => computedBreakPoints.xs};
  }
  @media (min-width: ${({breakPoints}) => breakPoints.sm+'px'}) and (max-width: ${({breakPoints}) => breakPoints.md-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.sm === 0 ? 'none' : null};
    grid-column-end: span ${({computedBreakPoints}) => computedBreakPoints.sm};
  }
  @media (min-width: ${({breakPoints}) => breakPoints.md+'px'}) and (max-width: ${({breakPoints}) => breakPoints.lg-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.md === 0 ? 'none' : null};
    grid-column-end: span ${({computedBreakPoints}) => computedBreakPoints.md};
  }
  @media (min-width: ${({breakPoints}) => breakPoints.lg+'px'}) and (max-width: ${({breakPoints}) => breakPoints.xl-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.lg === 0 ? 'none' : null};
    grid-column-end: span ${({computedBreakPoints}) => computedBreakPoints.lg};
  }
  @media (min-width: ${({breakPoints}) => breakPoints.xl+'px'}) and (max-width: ${({breakPoints}) => breakPoints.xxl-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.xl === 0 ? 'none' : null};
    grid-column-end: span ${({computedBreakPoints}) => computedBreakPoints.xl};
  }
  @media (min-width: ${({breakPoints}) => breakPoints.xxl+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.xxl === 0 ? 'none' : null};
    grid-column-end: span ${({computedBreakPoints}) => computedBreakPoints.xxl};
  }
`;

export const Display = styled.div<{
  computedBreakPoints: BreakPoints<boolean>,
  breakPoints: BreakPoints<number>
}>`
  @media (max-width: ${({breakPoints}) => breakPoints.sm-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.xs ? null : 'none'};
  }
  @media (min-width: ${({breakPoints}) => breakPoints.sm+'px'}) and (max-width: ${({breakPoints}) => breakPoints.md-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.sm ? null : 'none'};
  }
  @media (min-width: ${({breakPoints}) => breakPoints.md+'px'}) and (max-width: ${({breakPoints}) => breakPoints.lg-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.md ? null : 'none'};
  }
  @media (min-width: ${({breakPoints}) => breakPoints.lg+'px'}) and (max-width: ${({breakPoints}) => breakPoints.xl-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.lg ? null : 'none'};
  }
  @media (min-width: ${({breakPoints}) => breakPoints.xl+'px'}) and (max-width: ${({breakPoints}) => breakPoints.xxl-1+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.xl ? null : 'none'};
  }
  @media (min-width: ${({breakPoints}) => breakPoints.xxl+'px'}) {
    display: ${({computedBreakPoints}) => computedBreakPoints.xxl ? null : 'none'};
  }
`;
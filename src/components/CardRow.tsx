import React from 'react';
import { Grid, Theme } from '../components';
import { ReactChild } from '../types';

function getColSizes(numOfCols: number): {
  xs?: number
  sm?: number
  md?: number
  lg?: number
}[] {
  const xs = 24;

  if (numOfCols === 1) {
    return ([
      { xs, sm: 12 },
      { xs, sm: 0 },
      { xs, sm: 0 },
      { xs, sm: 0 }
    ]);
  } 

  else if(numOfCols === 2) {
    return ([
      { xs, sm: 12 },
      { xs, sm: 12 },
      { xs, sm: 0 },
      { xs, sm: 0 }
    ]);
  }

  else if(numOfCols === 3) {
    return ([
      { xs, sm: 12, lg: 8 },
      { xs, sm: 12, lg: 8 },
      { xs, sm: 0, lg: 8 },
      { xs, sm: 0, lg: 0 }
    ]);
  }

  return ([
    { xs: 0, sm: 12, md: 8, lg: 6 },
    { xs: 0, sm: 12, md: 8,  lg: 6 },
    { xs: 0, sm: 0, md: 8, lg: 6 },
    { xs: 0, sm: 0, md: 0, lg: 6 }
  ]);
}

export function CardRow<I>({
  items,
  children
}: {
  items: (I | null)[],
  children: (item: I | null, index?: number) => ReactChild
}) {
  const theme = Theme.useTheme();
  const colSizes = getColSizes(items.length);
  return (
    <Grid.Row spacing={theme.spacing(2)}>
      <Grid.Col xs={colSizes[0].xs} sm={colSizes[0].sm} md={colSizes[0].md} lg={colSizes[0].lg}>
        {children(items[0], 0)}
      </Grid.Col>
      <Grid.Col xs={colSizes[1].xs} sm={colSizes[1].sm} md={colSizes[1].md} lg={colSizes[1].lg}>
        {children(items[1], 1)}
      </Grid.Col>
      <Grid.Col xs={colSizes[2].xs} sm={colSizes[2].sm} md={colSizes[2].md} lg={colSizes[2].lg}>
        {children(items[2], 2)}
      </Grid.Col>
      <Grid.Col xs={colSizes[3].xs} sm={colSizes[3].sm} md={colSizes[3].md} lg={colSizes[3].lg}>
          {children(items[3], 3)}
        </Grid.Col>
    </Grid.Row>
  )
}

export default CardRow;
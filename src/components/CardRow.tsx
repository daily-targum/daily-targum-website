import React from 'react';
import { Grid, Theme } from '../components';
import { ReactChild } from '../types';

export function CardRow<I>({
  items,
  children
}: {
  items: I[],
  children: (item: I, index?: number) => ReactChild
}) {
  const theme = Theme.useTheme();
  const isLarge = items.length > 3;
  return (
    <Grid.Row spacing={theme.spacing(2)}>
      <Grid.Col xs={24} sm={12} md={isLarge ? 8 : 12} lg={isLarge ? 6 : 8}>
        {children(items[0], 0)}
      </Grid.Col>
      <Grid.Col xs={24} sm={12} md={isLarge ? 8 : 12} lg={isLarge ? 6 : 8}>
        {children(items[1], 1)}
      </Grid.Col>
      <Grid.Col xs={24} sm={0} md={isLarge ? 8 : 0} lg={isLarge ? 6 : 8}>
        {children(items[2], 2)}
      </Grid.Col>
      {isLarge ? (
        <Grid.Col xs={24} sm={0} md={0} lg={6}>
          {children(items[3], 3)}
        </Grid.Col>
      ) : null}
    </Grid.Row>
  )
}

export default CardRow;
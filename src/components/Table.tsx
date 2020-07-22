import React from 'react';
import { ReactChildren } from '../types';
import Theme from './Theme';
import { BreakPoints } from './Grid/types';
import { Grid } from './Grid/web';

export function Table<T extends string>({
  data,
  keyExtractor,
  style,
  className,
  renderItem = item => item,
  widths = [],
  colDisplay = []
} : {
  data: T[][]
  keyExtractor: (item: T) => (string | number)
  style?: React.CSSProperties
  className?: string
  renderItem: (item: T, row: number, col: number) => (ReactChildren | string),
  widths: (undefined | string)[]
  colDisplay?: (Partial<BreakPoints<boolean>> | undefined)[]
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const clone = data.map(arr => arr.slice(0)).slice(0);
  const header = clone.shift();

  return (
    <table
      style={style}
      className={className}
    >
      {header ? (
        <thead>
          <tr>
            {header.map((col, j) => (
              <th 
                key={keyExtractor(col)}
                style={{
                  width: widths[j]
                }}
              >
                <Grid.Display
                  className={classes.cell}
                  {...(colDisplay[j] ? colDisplay[j] : {xs: true})}
                >
                  {renderItem(col, 0, j)}
                </Grid.Display>
              </th>
            ))}
          </tr>
        </thead>
      ) : null}

      {clone.map((row, i) => (
        <tbody key={keyExtractor(row[0])+'-row'}>
          <tr>
            {row.map((col, j) => (
              <td 
                key={keyExtractor(col)}
                style={{
                  width: widths[j]
                }}
              >
                <Grid.Display
                  className={classes.cell}
                  {...(colDisplay[j] ? colDisplay[j] : {xs: true})}
                >
                  {renderItem(col, i+1, j)}
                </Grid.Display>
              </td>
            ))}
          </tr>
        </tbody>
      ))}
    </table>
  )
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  cell: {
    padding: theme.spacing(2)
  }
}));
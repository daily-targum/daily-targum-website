import * as React from 'react';
import { ReactChildren } from '../types';
import { BreakPoints } from './Grid/types';
import { Grid } from './Grid/web';
import styles from './Table.module.scss';
import { styleHelpers } from '../utils';

export function Table<T extends string>({
  data,
  keyExtractor,
  style,
  renderItem = item => item,
  widths = [],
  colDisplay = []
} : {
  data: T[][]
  keyExtractor: (item: T) => (string | number)
  style?: React.CSSProperties
  renderItem: (item: T, row: number, col: number) => (ReactChildren | string),
  widths: (undefined | string)[]
  colDisplay?: (Partial<BreakPoints<boolean>> | undefined)[]
}) {
  const clone = data.map(arr => arr.slice(0)).slice(0);
  const header = clone.shift();

  return (
    <>
      <table style={style}>
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
                    className={styles.cell}
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
                    className={styles.cell}
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
      <style jsx global>
        {`
          table tr th,
          table tr td {
            text-align: left;
          }
      
          table tr th:last-child,
          table tr td:last-child {
            text-align: right;
          }
      
          table th {
            background-color: ${styleHelpers.color('divider')};
          }
      
          table th,
          table td {
            padding: 0;
          }
      
          table tr td {
            border-bottom: 1px solid ${styleHelpers.color('divider')};
          }
        `}
      </style>
    </>
  )
}
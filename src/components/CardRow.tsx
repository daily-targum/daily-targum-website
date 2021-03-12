import * as React from 'react';
import Grid from './Grid/web';
import Text from './Text';
import { ReactChild } from '../types';
import { RiArrowRightLine } from 'react-icons/ri';
import Link from './Link';
import styles from './CardRow.module.scss';
import { theme } from '../constants'

function getColSizes(numOfItems: number, numOfCols: number): {
  xs?: number
  sm?: number
  md?: number
  lg?: number
}[] {
  const fullWidth = numOfCols;
  const half = numOfCols / 2;
  const third = numOfCols / 3;
  const quarter = numOfCols / 4;

  if (Math.min(numOfItems, numOfCols) === 1) {
    return ([
      { xs: fullWidth, sm: half },
      { xs: 0 },
      { xs: 0 },
      { xs: 0 }
    ]);
  } 

  else if(Math.min(numOfItems, numOfCols) === 2) {
    return ([
      { xs: fullWidth, md: half },
      { xs: fullWidth, md: half },
      { xs: 0 },
      { xs: 0 }
    ]);
  }

  else if(Math.min(numOfItems, numOfCols) === 3) {
    return ([
      { xs: fullWidth, md: Math.floor(half), lg: third },
      { xs: fullWidth, md: Math.ceil(half), lg: third },
      { xs: fullWidth, md: 0, lg: third },
      { xs: 0 }
    ]);
  }

  return ([
    { xs: fullWidth, sm: Math.floor(half), md: third, lg: quarter },
    { xs: fullWidth, sm: Math.ceil(half), md: third,  lg: quarter },
    { xs: fullWidth, sm: 0, md: third, lg: quarter },
    { xs: fullWidth, sm: 0, md: 0, lg: quarter }
  ]);
}

export function CardCols<I>({
  items,
  children
}: {
  items: (I | null)[],
  children: (item: I | null, index: number) => ReactChild
}) {
  const context = Grid.useGrid();
  const colSizes = getColSizes(items.length, context.cols.length);
  return (
    <>
      <Grid.Col xs={colSizes[0].xs} sm={colSizes[0].sm} md={colSizes[0].md} lg={colSizes[0].lg} className={styles.col}>
        {children(items[0], 0)}
      </Grid.Col>
      <Grid.Col xs={colSizes[1].xs} sm={colSizes[1].sm} md={colSizes[1].md} lg={colSizes[1].lg} className={styles.col}>
        {children(items[1], 1)}
      </Grid.Col>
      <Grid.Col xs={colSizes[2].xs} sm={colSizes[2].sm} md={colSizes[2].md} lg={colSizes[2].lg} className={styles.col}>
        {children(items[2], 2)}
      </Grid.Col>
      <Grid.Col xs={colSizes[3].xs} sm={colSizes[3].sm} md={colSizes[3].md} lg={colSizes[3].lg} className={styles.col}>
        {children(items[3], 3)}
      </Grid.Col>
    </>
  );
}

CardCols.Header = Header;
function Header({
  title,
  href,
} : {
  title: string
  href?: string
}) {
  return (
    <div className={styles.sectionHeader}>
      <Link 
        href={href}
        className={styles.moreInLink}
        style={{ color: theme.colors.text }}
      >
        <Text 
          variant='h3' 
          noPadding
        >
          {title}
        </Text>
      </Link>
    </div>
  );
}

CardCols.Footer = Footer
function Footer({
  title,
  href,
} : {
  title: string
  href?: string
}) {
  return (
    <div className={styles.sectionFooter}>
      <Link 
        href={href}
        className={styles.moreInLink}
      >
        <Text 
          variant='h4' 
          className={styles.moreInLinkText}
          noPadding
          label={`More in ${title}`}
          tooltipPosition='left'
        >
          More in {title}
        </Text>

        <RiArrowRightLine
          size={22}
        />
      </Link>
    </div>
  )
}

export default CardCols;
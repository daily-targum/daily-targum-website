import React from 'react';
import Grid from './Grid/web';
import Theme from './Theme';
import Text from './Text';
import { ReactChild } from '../types';
import { RiArrowRightLine } from 'react-icons/ri';
import Link from './Link';

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
    </>
  );
}

CardCols.Header = Header;
function Header({
  title,
  href,
  onClick,
} : {
  title: string
  href?: string
  onClick?: () => any
}) {
  const styles = Theme.useStyleCreator(styleCreator);

  return (
    <div style={styles.sectionHeader}>
      <Text 
        variant='h3' 
        noPadding
      >{title}</Text>

      {href ? (
        <Link 
          href={href}
          style={styles.moreInLink}
        >
          <Text 
            variant='h4' 
            style={styles.moreInLinkText}
            noPadding
          >
            More in {title}
          </Text>
          <RiArrowRightLine
            size={22}
          />
        </Link>
      ): (
        <div 
          style={styles.moreInLink}
          onClick={onClick}
        >
          <Text 
            variant='h4' 
            style={styles.moreInLinkText}
            noPadding
          >
            More in {title}
          </Text>
          <RiArrowRightLine
            size={22}
          />
        </div>
      )}
      
    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: theme.spacing(2, 0)
  },
  moreInLink: {
    textDecoration: 'none',
    color: theme.colors.accent,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer'
  },
  moreInLinkText: {
    marginRight: theme.spacing(0.5),
    fontWeight: 600,
    whiteSpace: 'nowrap',
    color: theme.colors.accent
  }
}));

export default CardCols;
import React from 'react';
import Theme from './Theme';
import Grid from './Grid';
import { ReactChildren } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { styleHelpers } from '../utils';

function animateScroll(div: HTMLDivElement, x: number, callback?: () => any) {
  const diff = x - div.scrollLeft;
  const positiveDiff = diff >= 0;
  const step = 2 * (positiveDiff ? 1 : -1);
  let prev: number | null = null;
  let cancled = false;

  async function start() {
    while(!cancled && positiveDiff ? div.scrollLeft <= x : div.scrollLeft >= x) {
      let crnt = await animate(() => {
        div.scrollLeft += step;
        return div.scrollLeft;
      }, 1);
      if(prev !== null && crnt === prev) break;
      prev = crnt;
    }
    if(!cancled && callback) {
      callback();
    }
  }
  start();

  return () => {
    cancled = true;
  }
}

function animate<R>(fn: () => R, delay: number) {
  return new Promise<R>((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, delay);
  });
}

function Button({
  onClick,
  direction
}: {
  onClick: () => any
  direction: 'left' | 'right'
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Grid.Row>
      <Grid.Col xs={0} sm={24}>
        <div
          onClick={onClick}
          className={classes.buttonWrap}
          style={{[direction]: 0}}
        >
          <div className={classes.button}>
            <FontAwesomeIcon 
              icon={direction === 'left' ? faChevronLeft : faChevronRight}
              size='2x'
              color='#fff'
            />
          </div>
        </div>
      </Grid.Col>
    </Grid.Row>
  )
}

export function Carousel<T>({
  data, 
  renderItem, 
  keyExtractor,
  inverted = false,
  ItemSeparatorComponent,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  className,
  style,
  itemWidth
}: {
  data: T[]
  renderItem: (item: T, index: number) => ReactChildren
  keyExtractor: (item: T, index: number) => string | number
  inverted?: boolean
  ItemSeparatorComponent?: ReactChildren
  ListEmptyComponent?: ReactChildren
  ListHeaderComponent?: ReactChildren
  ListFooterComponent?: ReactChildren
  className?: string
  style?: React.CSSProperties
  itemWidth: number
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const animation = React.useRef<() => any>();
  const [controlled, setControlled] = React.useState(false);

  const scrollLeft = React.useRef<number | null>(null);

  React.useEffect(() => {
    if(!controlled) {
      scrollLeft.current = null;
    }
  }, [controlled]);

  function updateScroll(offset: number) {
    setControlled(true)
    if(animation.current) {
      animation.current();
    }
    if(!ref.current) return;
    if(!scrollLeft.current) {
      scrollLeft.current = ref.current.scrollLeft;
    }
    const requestedPosition = scrollLeft.current + (itemWidth * offset);
    scrollLeft.current = Math.round(requestedPosition / itemWidth) * itemWidth;
    animation.current = animateScroll(ref.current, scrollLeft.current, () => {
      setControlled(false);
    });
  }

  if(data.length === 0) {
    return ListEmptyComponent ? (
      <>
        {ListEmptyComponent}
      </>
    ) : null;
  }

  function renderItemWithExtras(item: any, i: number) {
    return <>
      {i !== 0 ? ItemSeparatorComponent : null}
      {renderItem(item, i)}
    </>;
  }

  return (
    <div className={classes.carousel}>
      <div
        className={[
          className,
          classes.scroll,
          'hide-scrollbars',
          controlled ? null : classes.snap
        ].join(' ')}
        style={style}
        ref={ref}
      >
        {ListHeaderComponent}
        {(inverted ? data.reverse() : data)
        .map((item: any, i: number) => (
          <React.Fragment key={keyExtractor(item, i)}>
            <div className={classes.item}>
              {renderItemWithExtras(item, i)}
            </div>
          </React.Fragment>
        ))}
        {ListFooterComponent}
      </div>
      <Button
        onClick={() => updateScroll(1)}
        direction='right'
      />

      <Button
        direction='left'
        onClick={() => updateScroll(-1)}
      />
    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  carousel: {
    position: 'relative'
  },
  scroll: {
    ...styleHelpers.flex('row'),
    overflow: 'auto'
  },
  snap: {
    scrollSnapType: 'x mandatory',
  },
  buttonWrap: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  button: {
    padding: theme.spacing(3, 1.5),
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(20px)'
  },
  item: {
    scrollSnapAlign: 'start'
  }
}));

export default Carousel;
import React from 'react';
import Theme from './Theme';
import Grid from './Grid/web';
import { ReactChildren } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { styleHelpers } from '../utils';
import { clamp } from '../shared/src/utils';

function Button({
  onClick,
  direction
}: {
  onClick: () => any
  direction: 'left' | 'right'
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Grid.Display
      xs={false}
      md={true}
    >
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
    </Grid.Display>
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
  style
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
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    function handleResize() {
      setWidth(ref.current?.offsetWidth ?? 0);
    }
    handleResize();
    if(process.browser) {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }
  }, [ref.current]);

  const scrollLeft = React.useRef<number | null>(null);

  function updateScroll(offset: number) {
    if(!ref.current) return;
    if(!scrollLeft.current) {
      scrollLeft.current = ref.current.scrollLeft;
    }
    const requestedPosition = scrollLeft.current + (width * offset);
    const snapPosition = Math.round(requestedPosition / width) * width;
    scrollLeft.current = clamp(0, snapPosition, ref.current.scrollWidth - width);
    ref.current.scrollLeft = scrollLeft.current;
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
    <div className={[classes.carousel, className].join(' ')}>
      <div
        className={[
          classes.scroll,
          'hide-scrollbars',
          classes.snap
        ].join(' ')}
        style={style}
        ref={ref}
      >
        {ListHeaderComponent}
        {(inverted ? data.reverse() : data)
        .map((item: any, i: number) => (
          <React.Fragment key={keyExtractor(item, i)}>
            <div 
              className={classes.item}
              style={{
                width,
                minWidth: width,
                maxWidth: width
              }}
            >
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
    overflow: 'auto',
    flex: 1,
    ...styleHelpers.lockHeight('100%')
  },
  snap: {
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth'
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

Carousel.Button = Button;
export default Carousel;
import React from 'react';
import Theme from './Theme';
import { ReactChildren } from '../types';
import { styleHelpers } from '../utils';
import { clamp } from '../shared/src/utils';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

function Button({
  onClick,
  direction
}: {
  onClick: () => any
  direction: 'left' | 'right'
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div
      onClick={onClick}
      style={{
        ...styles.buttonWrap,
        [direction]: 0
      }}
    >
      {direction === 'left' ? (
        <IoIosArrowDropleftCircle
          size={32}
          color='#fff'
        />
      ) : (
        <IoIosArrowDroprightCircle
          size={32}
          color='#fff'
        />
      )}
    </div>
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
  initialIndex,
  onChange
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
  style?: React.CSSProperties,
  initialIndex: number,
  onChange: (index: number) => any
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const styles = Theme.useStyleCreator(styleCreator);
  const [ width, setWidth ] = React.useState(0);
  const index = React.useRef(initialIndex ?? 0);
  const [ loading, setLoading ] = React.useState(true);
  const scrollTimeout = React.useRef<number | undefined>();

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

  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollLeft = index.current * width;
  }, [width]);

  React.useEffect(() => {
    if (!ref.current) return;

    const newIndex = clamp(
      0, 
      initialIndex, 
      data.length - 1
    );
    ref.current.scrollLeft = newIndex * width;

    // timeout prevents scroll animation on load
    let timeout = setTimeout(() => {
      setLoading(false);
    }, 50); 
    
    return () => {
      clearTimeout(timeout);
    }
  }, [ref.current]);

  function updateScroll(offset: number) {
    if (!ref.current) return;
    const newIndex = clamp(0, index.current + offset, data.length - 1);
    ref.current.scrollLeft = newIndex * width;
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
    <div 
      style={{
        ...styles.carousel,
        ...(loading ? styles.hide : null)
      }}
      className={className}
    >
      <div
        className={[
          styles.scroll,
          'hide-scrollbars',
        ].join(' ')}
        style={{
          ...(loading ? null : styles.smoothScroll),
          ...style
        }}
        ref={ref}
        onScroll={() => {
          if (!ref.current) return;
          clearTimeout(scrollTimeout.current);

          const crntIndex = Math.round(ref.current.scrollLeft / width);

          scrollTimeout.current = setTimeout(() => {
            if (crntIndex !== index.current) {
              index.current = crntIndex;
              onChange(index.current);
            }
          }, 50);
        }}
      >
        {ListHeaderComponent}
        {(inverted ? data.reverse() : data)
        .map((item: any, i: number) => (
          <React.Fragment key={keyExtractor(item, i)}>
            <div 
              style={{
                ...styles.item,
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
    position: 'relative',
    height: '100%'
  },
  scroll: {
    ...styleHelpers.flex('row'),
    overflow: 'auto',
    flex: 1,
    ...styleHelpers.lockHeight('100%'),
    scrollSnapType: 'x mandatory',
    '-webkit-scroll-snap-type': 'x mandatory',
    '-webkit-overflow-scrolling': 'touch'
  },
  smoothScroll: {
    scrollBehavior: 'smooth'
  },
  buttonWrap: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    padding: theme.spacing(0, 1.5)
  },
  item: {
    scrollSnapAlign: 'center'
  },
  hide: {
    opacity: 0
  }
}));

Carousel.Button = Button;
export default Carousel;
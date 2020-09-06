import React from 'react';
import Theme from './Theme';
import { ReactChildren } from '../types';
import { styleHelpers } from '../utils';
import { clamp } from '../shared/src/utils';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

function useHookWithRefCallback<T>(init: T) {
  const [rect, setRect] = React.useState(init);
  const ref = React.useCallback((node: T) => {
    setRect(node);
  }, []);
  return [rect, ref] as const;
}

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
        [direction]: 0,
        justifyContent: direction === 'left' ? 'flex-start' : 'flex-end'
      }}
    >
      {direction === 'left' ? (
        <IoIosArrowDropleftCircle
          size={32}
          color='#fff'
          style={styles.icon}
        />
      ) : (
        <IoIosArrowDroprightCircle
          size={32}
          color='#fff'
          style={styles.icon}
        />
      )}
    </div>
  )
}

interface CarouselBase<T> {
  id?: string
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
  initialIndex?: number,
  onChange?: (index: number) => any,
  width?: number
}

interface CarouselProps<T> extends CarouselBase<T> {
  forwardRef?: ((instance: HTMLDivElement | null) => void) | null
}

export function Carousel<T>({
  id,
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
  initialIndex = 0,
  onChange = () => {},
  width = 200,
  forwardRef
}: CarouselProps<T>) {
  const [ div, internalRef ] = useHookWithRefCallback<HTMLDivElement | null>(null);
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();
  const [index, setIndex] = React.useState(initialIndex ?? 0);
  const [ loading, setLoading ] = React.useState(true);
  const scrollTimeout = React.useRef<number | undefined>();

  React.useEffect(() => {
    if (!div) return;
    div.scrollLeft = index * width;
  }, [width]);

  React.useEffect(() => {
    setLoading(true);
    if (forwardRef) {
      forwardRef(div);
    }

    if (!div) return;

    setIndex(initialIndex);
    const newIndex = clamp(
      0, 
      initialIndex, 
      data.length - 1
    );
    div.scrollLeft = newIndex * width;

    // timeout prevents scroll animation on load
    let timeout = setTimeout(() => {
      setLoading(false);
    }, 50); 
    
    return () => {
      clearTimeout(timeout);
    }
  }, [div, id]);

  function updateScroll(offset: number) {
    if (!div) return;
    const newIndex = clamp(0, index + offset, data.length - 1);
    div.scrollLeft = newIndex * width;
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
        ...(loading ? styles.hide : null),
        ...style
      }}
      className={className}
    >
      <div
        className={`hide-scrollbars ${cng(styles.scroll)}`}
        style={loading ? undefined : styles.smoothScroll}
        ref={internalRef}
        onScroll={() => {
          if (!div) return;
          clearTimeout(scrollTimeout.current);

          const crntIndex = Math.round(div.scrollLeft / width);

          scrollTimeout.current = setTimeout(() => {
            if (crntIndex !== index) {
              setIndex(crntIndex);
              onChange(crntIndex);
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

      {index > 0 ? (
        <Button
          direction='left'
          onClick={() => updateScroll(-1)}
        />
      ) : null}

      {data[index + 1] ? (
        <Button
          direction='right'
          onClick={() => updateScroll(1)}
        />
      ) : null}
    </div>
  );
}

Carousel.Responsive = CarouselResponsive;
function CarouselResponsive<T>({
  ...props
}: CarouselBase<T>) {
  const [ width, setWidth ] = React.useState(0);
  const [ div, ref ] = useHookWithRefCallback<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleResize() {
      const newWidth = div?.offsetWidth ?? 0;
      if (newWidth !== width) {
        setWidth(div?.offsetWidth ?? 0);
      }
    }
    handleResize();
    if(process.browser && div) {
      window.addEventListener('resize', handleResize, { passive: true });
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }
  }, [div, width]);

  return (
    <Carousel
      width={width}
      forwardRef={ref}
      {...props}
    />
  )
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
    '-webkit-overflow-scrolling': 'touch',
    minHeight: '100%'
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
    padding: theme.spacing(0, 1.5),
    height: '100%',
    width: '25%'
  },
  item: {
    scrollSnapAlign: 'start'
  },
  hide: {
    opacity: 0
  },
  icon: {
    filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))'
  }
}));

Carousel.Button = Button;
export default Carousel;
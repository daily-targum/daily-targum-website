import React from 'react';
import { ReactChildren } from '../types';
import { clamp } from '../shared/src/utils';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';
import styles from './Carousel.module.scss';
import cn from 'classnames';

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
  return (
    <button
      onClick={onClick}
      className={styles.buttonWrap}
      style={{
        [direction]: 0,
        justifyContent: direction === 'left' ? 'flex-start' : 'flex-end'
      }}
    >
      {direction === 'left' ? (
        <IoIosArrowDropleftCircle
          size={32}
          color='#fff'
          className={styles.icon}
        />
      ) : (
        <IoIosArrowDroprightCircle
          size={32}
          color='#fff'
          className={styles.icon}
        />
      )}
    </button>
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
      className={cn(
        className,
        styles.carousel,
        {
          [styles.hide]: loading
        }
      )}
      style={style}
    >
      <div
        className={cn(
          'hide-scrollbars',
          styles.scroll,
          {
            [styles.smoothScroll]: !loading
          }
        )}
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
              className={styles.item}
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

  const handleResize = React.useCallback(
    () => {
      const newWidth = div?.offsetWidth ?? 0;
      if (newWidth !== width) {
        setWidth(div?.offsetWidth ?? 0);
      }
    }, 
    [width, div]
  );

  React.useEffect(() => {
    handleResize();
  }, [div]);

  React.useEffect(() => {
    if(process.browser && div) {
      window.addEventListener('resize', handleResize, { passive: true });
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }
  }, [div, handleResize]);

  return (
    <Carousel
      width={width}
      forwardRef={ref}
      {...props}
    />
  )
}

Carousel.Button = Button;
export default Carousel;
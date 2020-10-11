import React from 'react';
import Text from './Text';
import Link from './Link';
import { FocusControl } from './ResetTabIndex';
import HighlightText from './HighlightText';
import Divider from './Divider';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import styles from './Search.module.scss';
import cn from 'classnames';
import { useSelector, useDispatch } from '../store';
import { searchActions } from '../store/ducks/search';
import FocusTrap from 'focus-trap-react';
import { useRouter } from 'next/router';
import { CgSpinnerTwo } from 'react-icons/cg';

import { useCallback, useState, useEffect } from "react";

function useRoveFocus(size: number) {
  const [currentFocus, setCurrentFocus] = useState(0);

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 40) {
        // Down arrow
        e.preventDefault();
        setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
      } else if (e.keyCode === 38) {
        // Up arrow
        e.preventDefault();
        setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
      }
    },
    [size, currentFocus, setCurrentFocus]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus] as const;
}

function Input({
  width = '100%',
  enabled,
  className,
  size = 2,
  onSubmit = () => {},
  maxItems = 15
}: {
  width?: number | string;
  enabled: boolean;
  className?: string;
  size?: number;
  onSubmit?: () => any;
  maxItems?: number
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  const query = useSelector(s => s.search.query);
  const focused = useSelector(s => s.search.focused) && enabled;
  
  const loading = useSelector(s => s.search.loading);
  const hijacked = useSelector(s => s.search.hijacked);
  const dispatch = useDispatch();
  const router = useRouter();

  let numberOfItems = useSelector(s => s.search.hits?.total.value) ?? 0;
  if (numberOfItems > maxItems) {
    numberOfItems = maxItems;
  }
  const hasResults = (numberOfItems > 0) && !hijacked;

  const trapFocus = focused && !!hasResults;

  const [focusIndex, setFocusIndex] = useRoveFocus(numberOfItems + 2);

  const height = `${size}rem`;

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        if (hasResults) {
          dispatch(searchActions.clearSearchResults());
        } else {
          dispatch(searchActions.setFocused(false));
        }
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [focused, hasResults]);

  React.useEffect(() => {
    if (query !== '' && enabled) {
      const id = setTimeout(() => {
        dispatch(searchActions.search());
      }, 300);

      return () => {
        clearTimeout(id);
      }
    }
  }, [query, enabled]);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    if (focused && focusIndex === 0 && ref.current) {
      ref.current.focus();
    }

    if (!focused && ref.current) {
      ref.current.blur();
    }
  }, [focusIndex, focused, enabled]);

  React.useEffect(() => {
    if (focused) {
      function routeChangeEnd() {
        dispatch(searchActions.setFocused(false));
      }

      router.events.on('routeChangeStart', routeChangeEnd);
      return () => {
        router.events.off('routeChangeStart', routeChangeEnd);
      }
    }
  }, [focused]);

  return (
    <FocusTrap 
      active={trapFocus && enabled}
      focusTrapOptions={{
        allowOutsideClick: true
      }}
    >
      <div 
        className={cn(styles.searchWrap, className)} 
        style={{
          minWidth: width,
          width,
          maxWidth: width,
          minHeight: height,
          height,
          maxHeight: height,
          opacity: enabled ? 1 : 0.4
        }}
      >
        <div 
          className={cn(
            styles.search,
            {
              'accessibility-outline': focused
            }
          )}
        >

          <form 
            className={cn(
              styles.searchRow,
              {
                [styles.hide]: !focused
              }
            )}
            onSubmit={e => {
              e.preventDefault();
              onSubmit();
            }}
            role="search"
          >
            {loading ? (
              <CgSpinnerTwo
                className={cn(styles.searchIcon, styles.spin)}
                size={7 * size}
              />
            ) : (
              <FiSearch
                className={styles.searchIcon}
                size={7 * size}
              />
            )}
            <input 
              disabled={!enabled}
              ref={ref}
              onFocus={() => {
                dispatch(searchActions.setFocused(true));
                setFocusIndex(0);
              }}
              onBlur={() => {
                setTimeout(() => {
                  if (focused && !trapFocus) {
                    dispatch(searchActions.setFocused(false));
                  }
                }, 10);
              }}
              onChange={e => dispatch(searchActions.setQuery(e.target.value))}
              value={query}
              className={cn(
                styles.searchInput,
                {
                  [styles.hide]: !focused
                }
              )}
              style={{fontSize: `${size / 2}rem`}}
              placeholder='Search'
              aria-label='Enter search text'
            />
            <button
              type="button"
              tabIndex={focused ? undefined : -1}
              aria-label='Clear search'
              data-tooltip-position='left'
              className={styles.clickable}
              onClick={() => {
                dispatch(searchActions.setQuery(''));
                dispatch(searchActions.setFocused(false));
              }}
            >
              <IoMdClose
                className={styles.searchIcon}
                size={11 * size}
              />
            </button>
          </form>

          <div 
            className={cn(
              styles.touchTransparent,
              styles.searchRow,
              {
                [styles.hide]: focused
              }
            )}
          >
            <FiSearch
              className={styles.searchIcon}
              size={7 * size}
            />
            <Text 
              className={styles.searchPlaceholder}
              style={{fontSize: `${size / 2}rem`}}
            >
              {enabled ? query || 'Search articles' : 'Search articles'}
            </Text>
          </div>

        </div>

        {(enabled && !hijacked) ? (
          <Preview 
            focusedIndex={focusIndex-1}
            updateFocus={i => setFocusIndex(i+1)}
            maxItems={maxItems}
          />
        ) : null}
      </div>
    </FocusTrap>
  )
}

function Preview({
  focusedIndex,
  updateFocus,
  maxItems
}: {
  focusedIndex: number;
  updateFocus: (index: number) => any;
  maxItems: number;
}) {
  const hits = useSelector(s => s.search.hits?.hits);
  const focused = useSelector(s => s.search.focused);
  const query = useSelector(s => s.search.hitsQuery);
  const hasResults = useSelector(s => s.search.hits?.total.value);
  let numberOfItems = useSelector(s => s.search.hits?.total.value) ?? 0;
  if (numberOfItems > maxItems) {
    numberOfItems = maxItems;
  }

  return (focused && hasResults) ? (
    <div className={styles.preview}>
      {hits?.slice(0, numberOfItems).map((hit, i) => (
        <FocusControl 
          key={hit._id}
          focus={i === focusedIndex}
          onFocus={() => updateFocus(i)}
          onMouseOver={() => updateFocus(i)}
        >
          <Link 
            href={`/${hit._source.slug}`} 
            className={styles.previewLink}
          >
            <Text.Truncate numberOfLines={1}>
              <HighlightText 
                search={query}
                Highlighter={({children}) => <b>{children}</b>}
              >
                {hit._source.title}
              </HighlightText>
            </Text.Truncate>
          </Link>
        </FocusControl>
      ))}
      <Divider/>
      <FocusControl 
        focus={numberOfItems === focusedIndex}
        onFocus={() => updateFocus(numberOfItems)}
        onMouseOver={() => updateFocus(numberOfItems)}
      >
        <Link href='/search' className={styles.previewLink}>
          More search results
        </Link>
      </FocusControl>
    </div>
  ) : null;
}

function PreviewBackdrop({
  style
}: {
  style?: React.CSSProperties
}) {
  const focused = useSelector(s => s.search.focused);
  const hijacked = useSelector(s => s.search.hijacked);
  const hasResults = useSelector(s => s.search.hits?.total.value);
  const dispatch = useDispatch();

  return (focused && hasResults && !hijacked) ? (
    <div 
      className={styles.backdrop}
      onClick={() => {
        dispatch(searchActions.setFocused(false))
      }}
      style={style}
    />
  ) : null;
}

export const Search = {
  Input,
  PreviewBackdrop
};
export default Search;
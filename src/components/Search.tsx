import React from 'react';
import Text from './Text';
import Link from './Link';
import { FocusControl } from './ResetTabIndex';
import HighlightText from './HighlightText';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import styles from './Search.module.scss';
import cn from 'classnames';
import { useSelector, useDispatch } from '../store';
import { searchActions } from '../store/ducks/search';
import FocusTrap from 'focus-trap-react';
import { useRouter } from 'next/router';

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

function Input() {
  const ref = React.useRef<HTMLInputElement>(null);
  const query = useSelector(s => s.search.query);
  const focused = useSelector(s => s.search.focused);
  const dispatch = useDispatch();
  const router = useRouter();

  const [focusIndex, setFocusIndex] = useRoveFocus(16);

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.keyCode === 27 && focused) {
        dispatch(searchActions.setFocused(false));
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [focused]);

  React.useEffect(() => {
    if (query !== '') {
      const id = setTimeout(() => {
        dispatch(searchActions.search());
      }, 300);

      return () => {
        clearTimeout(id);
      }
    }
  }, [query]);

  React.useEffect(() => {
    if (focused && focusIndex === 0 && ref.current) {
      ref.current.focus();
    }
  }, [focusIndex, focused]);

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
      active={focused}
      focusTrapOptions={{
        allowOutsideClick: true
      }}
    >
      <div className={styles.searchWrap}>
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
            onSubmit={e => e.preventDefault()}
          >
            <FiSearch
              className={styles.searchIcon}
              size={14}
            />
            <input 
              ref={ref}
              onFocus={() => {
                dispatch(searchActions.setFocused(true));
                setFocusIndex(0);
              }}
              // onBlur={() => dispatch(searchActions.setFocused(false))}
              onChange={e => dispatch(searchActions.setQuery(e.target.value))}
              value={query}
              className={cn(
                styles.searchInput,
                {
                  [styles.hide]: !focused
                }
              )}
              placeholder='Search'
              aria-label='Enter search text'
            />
            <IoMdClose
              className={cn(
                styles.clickable,
                styles.searchIcon
              )}
              size={22}
              onClick={() => {
                if(focused) {
                  dispatch(searchActions.setQuery(''));
                }
              }}
            />
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
              size={14}
            />
            <Text className={styles.searchPlaceholder}>{query || 'Search'}</Text>
          </div>

        </div>

        <Preview 
          focusedIndex={focusIndex-1}
          updateFocus={i => setFocusIndex(i+1)}
        />
      </div>
    </FocusTrap>
  )
}

function Preview({
  focusedIndex,
  updateFocus
}: {
  focusedIndex: number;
  updateFocus: (index: number) => any
}) {
  const hits = useSelector(s => s.search.hits?.hits);
  const focused = useSelector(s => s.search.focused);
  const query = useSelector(s => s.search.hitsQuery);
  const hasResults = useSelector(s => s.search.hits?.total.value);

  return (focused && hasResults) ? (
    <div className={styles.preview}>
      {hits?.slice(0, 15).map((hit, i) => (
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
            <Text.Truncate 
              numberOfLines={1} 
              className={styles.previewItem}
            >
              <HighlightText search={query}>
                {hit._source.title}
              </HighlightText>
            </Text.Truncate>
          </Link>
        </FocusControl>
      ))}
    </div>
  ) : null;
}

function PreviewBackdrop() {
  const focused = useSelector(s => s.search.focused);
  const hasResults = useSelector(s => s.search.hits?.total.value);
  const dispatch = useDispatch();

  return (focused && hasResults) ? (
    <div 
      className={styles.backdrop}
      onClick={() => {
        dispatch(searchActions.setFocused(false))
      }}
    />
  ) : null;
}

export const Search = {
  Input,
  PreviewBackdrop
};
export default Search;
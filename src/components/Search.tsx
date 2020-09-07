import React from 'react';
import Text from './Text';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import styles from './Search.module.scss';
import cn from 'classnames';

function Input() {
  const [ focused, setFocused ] = React.useState(false);
  const [ value, setValue ] = React.useState('');

  return (
    <div className={styles.searchWrap}>

      <form 
        className={cn(
          'animate-all-fast',
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={e => setValue(e.target.value)}
          value={value}
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
            ...styles.clickable,
            ...styles.searchIcon
          )}
          size={22}
          onClick={() => {
            if(focused) {
              setValue('')
            }
          }}
        />
      </form>

      <div 
        className={cn(
          'animate-all-fast',
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
        <Text className={styles.searchPlaceholder}>{value || 'Search'}</Text>
      </div>

    </div>
  )
}

export const Search = {
  Input
};
export default Search;
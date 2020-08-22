import React from 'react';
import Theme from './Theme';
import Text from './Text';
import { styleHelpers } from '../utils';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

function Input({
  dark = false
}: {
  dark: boolean
}) {
  const styles = Theme.useStyleCreator(styleCreator, dark);
  const [ focused, setFocused ] = React.useState(false);
  const [ value, setValue ] = React.useState('');

  return (
    <div style={styles.searchWrap}>

      <form 
        style={{
          ...styles.searchRow,
          ...(focused ? '' : styles.hide)
        }}
        className='animate-all-fast'
        onSubmit={e => e.preventDefault()}
      >
        <FiSearch
          style={styles.searchIcon}
          size={14}
        />
        <input 
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={e => setValue(e.target.value)}
          value={value}
          style={{
            ...styles.searchInput,
            ...(focused ? null : styles.hide)
          }}
          placeholder='Search'
          aria-label='Enter search text'
        />
        <IoMdClose
          style={{
            ...styles.clickable,
            ...styles.searchIcon
          }}
          size={22}
          onClick={() => {
            if(focused) {
              setValue('')
            }
          }}
        />
      </form>

      <div 
        style={{
          ...styles.touchTransparent,
          ...styles.searchRow,
          ...(focused ? styles.hide : '')
        }}
        className='animate-all-fast'
      >
        <FiSearch
          style={styles.searchIcon}
          size={14}
        />
        <Text style={styles.searchPlaceholder}>{value || 'Search'}</Text>
      </div>

    </div>
  )
}

const styleCreator = Theme.makeStyleCreator((theme, dark: boolean) => ({
  searchWrap: {
    position: 'relative',
    height: '2rem',
    ...styleHelpers.lockWidth(175),
    ...styleHelpers.card(theme),
    marginLeft: theme.spacing(2.5),
    border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.08)'}`,
    backgroundColor: dark ? 'transparent' : theme.colors.surface,
    // TODO: Remove this once search is working
    visibility: 'hidden'
  },
  searchInput: {
    ...styleHelpers.unstyle(),
    margin: theme.spacing(0, 0.5),
    height: '100%',
    minWidth: 0,
    width: 'auto',
    flex: 1,
    fontSize: '1rem',
    lineHeight: '1rem',
    color: dark ? theme.colors.primary.contrastText : theme.colors.text,
  },
  searchPlaceholder: {
    fontSize: '1rem',
    lineHeight: '1rem',
    color: dark ? theme.colors.primary.contrastText : theme.colors.text,
    margin: theme.spacing(0, 0.5),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    opacity: 0.7
  },
  searchIcon: {
    ...styleHelpers.lockWidth('18px'),
    color: dark ? theme.colors.primary.contrastText : theme.colors.text,
    opacity: 0.7
  },
  searchRow: {
    ...styleHelpers.absoluteFill(),
    ...styleHelpers.flex('row'),
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
  },
  hide: {
    opacity: 0
  },
  touchTransparent: {
    pointerEvents: 'none'
  },
  clickable: {
    cursor: 'pointer'
  }
}));

export const Search = {
  Input
};
export default Search;
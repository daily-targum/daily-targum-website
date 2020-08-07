import React from 'react';
import Theme from './Theme';
import Text from './Text';
import { styleHelpers } from '../utils';
import { FiSearch } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

function Input() {
  const styles = Theme.useStyleCreator(styleCreator);
  const [ focused, setFocused ] = React.useState(false);
  const [ value, setValue ] = React.useState('');

  return (
    <div style={styles.searchWrap}>

      <div 
        style={{
          ...styles.searchRow,
          ...(focused ? '' : styles.hide)
        }}
        className='animate-all-fast'
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
        />
        <GrClose
          style={{
            ...styles.clickable,
            ...styles.searchIcon
          }}
          size={13}
          onClick={() => {
            if(focused) {
              setValue('')
            }
          }}
        />
      </div>

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

const styleCreator = Theme.makeStyleCreator(theme => ({
  searchWrap: {
    position: 'relative',
    height: '2rem',
    ...styleHelpers.lockWidth(175),
    ...styleHelpers.card(theme),
    marginLeft: theme.spacing(2.5),
    // backgroundColor: theme.colors.surface,
    border: '1px solid rgba(0, 0, 0, 0.07)'
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
  },
  searchPlaceholder: {
    fontSize: '1rem',
    lineHeight: '1rem',
    color: '#444',
    margin: theme.spacing(0, 0.5),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  searchIcon: {
    ...styleHelpers.lockWidth('18px'),
    color: '#444'
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
import React from 'react';
import Theme from './Theme';
import Text from './Text';
import { styleHelpers } from '../utils';
import { FiSearch } from 'react-icons/fi';
import { IoIosCloseCircle } from 'react-icons/io';

function Input() {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const [ focused, setFocused ] = React.useState(false);
  const [ value, setValue ] = React.useState('');

  return (
    <div className={classes.searchWrap}>

      <div className={[
        classes.searchRow,
        focused ? '' : classes.hide,
        'animate-all-fast'
      ].join(' ')}>
        <FiSearch
          className={classes.searchIcon}
          size={13}
        />
        <input 
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={e => setValue(e.target.value)}
          value={value}
          className={[
            classes.searchInput,
            (focused ? null : classes.hide)
          ].join(' ')}
          placeholder='Search'
        />
        <IoIosCloseCircle
          className={[
            classes.clickable,
            classes.searchIcon
          ].join(' ')}
          size={18}
          onClick={() => {
            setValue('')
          }}
        />
      </div>

      <div 
        className={[
          classes.touchTransparent,
          classes.searchRow,
          focused ? classes.hide : '',
          'animate-all-fast'
        ].join(' ')}
      >
        <FiSearch
          className={classes.searchIcon}
          size={13}
        />
        <Text className={classes.searchPlaceholder}>{value || 'Search'}</Text>
      </div>

    </div>
  )
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  searchWrap: {
    position: 'relative',
    height: '2rem',
    ...styleHelpers.lockWidth(180),
    ...styleHelpers.card(theme),
    marginLeft: theme.spacing(2.5),
    backgroundColor: theme.colors.background,
  },
  searchInput: {
    ...styleHelpers.unstyle(),
    margin: theme.spacing(0, 0.5),
    height: '100%',
    minWidth: 0,
    width: 'auto',
    flex: 1,
    fontSize: '0.9rem',
    lineHeight: '0.9rem',
  },
  searchPlaceholder: {
    fontSize: '0.9rem',
    lineHeight: '0.9rem',
    color: theme.colors.textMuted,
    margin: theme.spacing(0, 0.5),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  searchIcon: {
    ...styleHelpers.lockWidth('18px'),
    color: '#aaa'
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
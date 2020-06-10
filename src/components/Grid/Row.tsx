import React, { useContext } from 'react';
import { Context } from './context';
import * as types from './types'

function Row({
  spacing = 0, 
  children, 
  style, 
  className,
  ...cssProperties
}: types.RowProps) {
  const context = useContext(Context);

  const computedStyle = Object.assign({}, {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -spacing / 2 + 'px',
    marginRight: -spacing / 2 + 'px'
  }, cssProperties, style);

  return (
    <Context.Provider value={{...context, spacing }}>
      <div className={className} style={computedStyle}>
        {children}
      </div>
    </Context.Provider>
  );
}

export default Row;
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import { ReactChildren } from '../types';

export function Provider({
  children
}: {
  children: ReactChildren
}) {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  )
}

export default Provider;
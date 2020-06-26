import { combineReducers } from 'redux'
import { CombinedReducers } from './types'

import navigation from './navigation';

const rootReducer = combineReducers<CombinedReducers>({
  navigation,
});

export default rootReducer;
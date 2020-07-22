import { combineReducers } from 'redux'
import { CombinedReducers } from './types'

import navigation from './navigation';
import podcast from './podcast';

const rootReducer = combineReducers<CombinedReducers>({
  navigation,
  podcast
});

export default rootReducer;
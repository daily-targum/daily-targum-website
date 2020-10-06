import { combineReducers } from 'redux';
import { CombinedReducers } from './types';

import navigation from './navigation';
import podcast from './podcast';
import video from './video';
import search from './search';

const rootReducer = combineReducers<CombinedReducers>({
  navigation,
  podcast,
  video,
  search
});

export default rootReducer;
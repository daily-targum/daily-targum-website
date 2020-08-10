import { combineReducers } from 'redux';
import { CombinedReducers } from './types';

import navigation from './navigation';
import podcast from './podcast';
import video from './video';

const rootReducer = combineReducers<CombinedReducers>({
  navigation,
  podcast,
  video
});

export default rootReducer;
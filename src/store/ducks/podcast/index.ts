import reducer from './reducer';
import { State } from './types'
import podcastTypes from './types'

import * as podcastActions from "./actions";

export { podcastActions, podcastTypes };
export default reducer;
export type PodcastState = State;
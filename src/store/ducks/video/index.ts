import reducer from './reducer';
import { State } from './types'
import videoTypes from './types'

import * as videoActions from "./actions";

export { videoActions, videoTypes };
export default reducer;
export type VideoState = State;
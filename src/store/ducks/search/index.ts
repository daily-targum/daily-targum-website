import reducer from './reducer';
import { State } from './types'
import searchTypes from './types'

import * as searchActions from "./actions";

export { searchActions, searchTypes };
export default reducer;
export type SearchState = State;
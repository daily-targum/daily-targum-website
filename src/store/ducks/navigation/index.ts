import reducer from './reducer';
import { State } from './types'
import navigationTypes from './types'

import * as navigationActions from "./actions";

export { navigationActions, navigationTypes };
export default reducer;
export type NavigationState = State;
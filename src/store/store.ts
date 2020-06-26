import { createStore } from 'redux';
import rootReducer from "./ducks";

export const store = createStore(rootReducer, {});

export default store
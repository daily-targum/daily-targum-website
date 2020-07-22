import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./ducks";
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));

export default store
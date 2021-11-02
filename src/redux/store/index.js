import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const rootMiddleware = applyMiddleware(logger, thunk);

const store = createStore(rootReducer, rootMiddleware);

export default store;


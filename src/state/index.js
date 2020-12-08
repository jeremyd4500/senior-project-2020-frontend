import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from 'state/reducers';
import { APP_ACTIONS } from 'state/actions';

const middleWares = [thunk];
const loggerMiddleware = createLogger({
	predicate: (getState, action) => action.type !== APP_ACTIONS.WINDOW_RESIZE
});
middleWares.push(loggerMiddleware);

const store = createStore(reducers, applyMiddleware(...middleWares));

export default store;

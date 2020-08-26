//index.js
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import promiseMiddleware from 'redux-promise';
// import thunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = [promiseMiddleware];

const reducer = combineReducers({
  ...reducers,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(...middlewares),
));

export default store;
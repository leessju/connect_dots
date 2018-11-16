import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import roootReducer from './reducers';


const initialState = {};
const middleware = [thunk];

const store = createStore(
  roootReducer, 
  initialState, 
  compose(
    applyMiddleware(...middleware),
    window.navigator.userAgent.includes('Chrome') ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
  ) 
);

export default store;
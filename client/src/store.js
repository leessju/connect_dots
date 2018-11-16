import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import roootReducer from './reducers';


const initialState = {};
const middleware = [thunk];

const store = createStore(
  roootReducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

// const store = createStore(
//   roootReducer, 
//   initialState, 
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   ) 
// );

// if (window.navigator.userAgent.includes('Chrome')) {
  
// } else {
//   store = createStore(
//     roootReducer, 
//     initialState, 
//     applyMiddleware(...middleware));
// }

export default store;
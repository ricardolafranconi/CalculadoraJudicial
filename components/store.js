import { createStore, compose } from 'redux';
import rootReducer from '../reducers';



const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  compose;

const store = createStore(rootReducer, composeEnhancers);

export default store;
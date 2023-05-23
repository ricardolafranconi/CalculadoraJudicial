import { combineReducers } from 'redux';
import calculatorReducer from './calculatorReducer';

const rootReducer = combineReducers({
  results: calculatorReducer,
});

export default rootReducer;
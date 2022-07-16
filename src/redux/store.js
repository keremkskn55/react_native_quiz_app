import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {loginReducer, registerReducer, currentUserIdReducer, questionReducer, correctAnswerCounterReducer} from './reducers/reducers';

const rootReducer = combineReducers({loginReducer, registerReducer, currentUserIdReducer, questionReducer, correctAnswerCounterReducer});
export const Store = createStore(rootReducer, applyMiddleware(thunk)); 
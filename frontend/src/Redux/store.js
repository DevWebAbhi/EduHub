import {legacy_createStore,applyMiddleware,combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import { loginReducer } from './login/loginReducer';
const reducer=combineReducers({
loginReducer
});

export const store =legacy_createStore(reducer,applyMiddleware(thunk));
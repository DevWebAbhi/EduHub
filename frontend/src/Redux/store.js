import {legacy_createStore,applyMiddleware,combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import { loginReducer } from './login/loginReducer';
import { courseUploadReducer } from './courseUpload/courseUploadReducer';
const reducer=combineReducers({
loginReducer,courseUploadReducer
});

export const store =legacy_createStore(reducer,applyMiddleware(thunk));
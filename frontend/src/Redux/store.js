import {legacy_createStore,applyMiddleware,combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import { loginReducer } from './login/loginReducer';
import { allCourcesReducer } from './AllCources/allCourcesReducer';
import { courseUploadReducer } from './courseUpload/courseUploadReducer';
import { optinCourseReducer } from './optinCource/optinCourseReducer';
const reducer=combineReducers({
loginReducer,courseUploadReducer,allCourcesReducer,optinCourseReducer
});

export const store =legacy_createStore(reducer,applyMiddleware(thunk));
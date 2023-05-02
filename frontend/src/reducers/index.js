import { combineReducers } from 'redux';

import userReducer from './userReducer';
import userDetailsReducer from './userDetails';

export default combineReducers({
    userState: userReducer,
    userDetailsState: userDetailsReducer
});

import {
    SET_USER_DETAILS,
} from '../actions/actionTypes';

const initialState = {
    userDetails: {}
};

const setUserDetails = (state, action) => {
    return { ...state, userDetails: action.userDetails };
};

const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS: return setUserDetails(state, action);
        default: return state;
    }
};

export default userDetailsReducer;

import {
    SET_USER,
    SET_USER_DETAILS
} from './actionTypes';

export const setUser = user => {
    return {
        type: SET_USER,
        user,
    };
};

export const setUserDetails = userDetails => {
    return {
        type: SET_USER_DETAILS,
        userDetails,
    };
}

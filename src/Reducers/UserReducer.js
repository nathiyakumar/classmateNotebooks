import {
   LOGGEDIN_USER, LOGGEDOUT_USER
} from './../Actions/non_customiser_action';

const initialState = {
    user_details: {},
    logged_in:false
};

const UserReducer =  (state = initialState,action) => {
    switch (action.type) {

        case LOGGEDIN_USER:
            return {
                ...state,
                user_details:action.payload.user_details,
                logged_in:action.payload.logged_in
            };
        case LOGGEDOUT_USER:
            return {
                ...state,
                user_details:action.payload.user_details,
                logged_in:action.payload.logged_in
            };
        default:
            return state
    }

};

export default UserReducer;


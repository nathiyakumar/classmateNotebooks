export const LOGGEDIN_USER = 'LOGGEDIN_USER';

export const LOGGEDOUT_USER = 'LOGGEDOUT_USER';

export const ADD_TO_CART = 'ADD_TO_CART';

export const ADD_ORDER_DATA = 'ADD_ORDER_DATA';

export const SAVE_SELECTED_LDP_PRODUCTS = 'SAVE_SELECTED_LDP_PRODUCTS';



export const UserLoggedin = data => ({
    type: LOGGEDIN_USER,
    payload: {
        user_details:data,
        logged_in: true
    }
});

export const UserLoggedout = data => ({
    type: LOGGEDOUT_USER,
    payload: {
        user_details:{},
        logged_in: false
    }
});

export const AddToCart = (cart_data) => ({
    type: ADD_TO_CART,
    payload: {
        cart_data:cart_data
    }
});


export const AddOrderData = data => ({
    type: ADD_ORDER_DATA,
    payload: {
        order_data:data,
    }
});

export const saveSelectedLDPProducts = data => ({
    type: SAVE_SELECTED_LDP_PRODUCTS,
    payload:{
        selected_ldp_products:data
    }
});


import {
  ADD_TO_CART,
    SAVE_SELECTED_LDP_PRODUCTS
} from './../Actions/non_customiser_action';



const initialState = {
    cart_data:{
        lines:[],
        checkout_id:'',
        subtotalPrice:'',
        totalPrice:'',
        checkoutQuantity:''
    },
    selected_ldp_products:[]
}


const CartReducer =  (state = initialState,action) => {
    switch (action.type) {

        case ADD_TO_CART:
            return {
                ...state,
                cart_data: action.payload.cart_data
            }
        case SAVE_SELECTED_LDP_PRODUCTS:
            return {
                ...state,
                selected_ldp_products: action.payload.selected_ldp_products
            }

        default:
            return state
    }

}

export default CartReducer;

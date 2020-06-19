import {
   ADD_ORDER_DATA
} from './../Actions/non_customiser_action';

const initialState = {
    order_data: {},
}

const OrderReducer =  (state = initialState,action) => {
    switch (action.type) {

        case ADD_ORDER_DATA:
            return {
                ...state,
                order_data:action.payload.order_data,

            }
        default:
            return state
    }

}

export default OrderReducer;


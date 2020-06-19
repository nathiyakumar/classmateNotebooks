import { combineReducers } from 'redux'
import specifications from './specification'
import imageReducer from "./ImageReducer";
import CartReducer from "./CartReducer";
import UserReducer from "./UserReducer";
import OrderReducer from "./OrderReducer";

export default combineReducers({
    specifications,
    imageReducer,
    CartReducer,
    UserReducer,
    OrderReducer
})

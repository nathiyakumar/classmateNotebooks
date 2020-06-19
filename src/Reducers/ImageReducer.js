import {
    ADD_NOTEBOOK_IMAGES,
    SET_ALL_CANVAS,
    CLEAR_ALL_DESIGNS,
    GET_NOTEBOOK_IMAGES
} from './../Actions/index';

const initialState = {
    notebook_images: [],
    designed_canvas:[]
}


const imageReducer =  (state = initialState,action) => {

    switch (action.type) {

        case GET_NOTEBOOK_IMAGES:

            // let files = [...state.notebook_images];
            action.payload = state;

            return {
                ...state,
                action
            };

        case ADD_NOTEBOOK_IMAGES:
            return {
                ...state,
                notebook_images:action.payload.notebook_images
            }
        case CLEAR_ALL_DESIGNS:
            return {
                ...state,
                notebook_images: [],
                designed_canvas:[]
            }
        case SET_ALL_CANVAS:
            return {
                ...state,
                designed_canvas: action.payload
            }
        default:
            return state
    }

}

export default imageReducer;

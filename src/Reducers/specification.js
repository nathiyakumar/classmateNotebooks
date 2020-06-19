import {
    ADD_NOTEBOOK_PAGE,
    ADD_NOTEBOOK_SIZE,
    ADD_NOTEBOOK_RULING,
    ADD_NOTEBOOK_BINDING,
    ADD_NOTEBOOK_QUANTITY,
    ADD_NOTEBOOK_MRP,
    ADD_NOTEBOOK_SKU,
    CLEAR_NOTEBOOK_SPECIFICATIONS
} from './../Actions/index';

const initialState = {
    notebook_page: '',
    notebook_size: '',
    notebook_ruling:'',
    notebook_binding:'',
    notebook_quantity:'',
    notebook_images: [],
    designed_canvas:[],
    notebook_mrp: '',
    notebook_sku: ''
}


const specifications =  (state = initialState,action) => {
    switch (action.type) {
        case ADD_NOTEBOOK_PAGE:
            return {
                ...state,
                notebook_page:action.payload.notebook_page
            }
        case ADD_NOTEBOOK_SIZE:
            return {
                ...state,
                notebook_size:action.payload.notebook_size
            }
        case ADD_NOTEBOOK_RULING:
            return {
                ...state,
                notebook_ruling:action.payload.notebook_ruling
            }
        case ADD_NOTEBOOK_BINDING:
            return {
                ...state,
                notebook_binding:action.payload.notebook_binding
            }
        case ADD_NOTEBOOK_QUANTITY:
            return {
                ...state,
                notebook_quantity:action.payload.notebook_quantity,

            }
        case ADD_NOTEBOOK_MRP:
            return {
                ...state,
                notebook_mrp:action.payload.notebook_mrp,

            }
        case ADD_NOTEBOOK_SKU:
            return {
                ...state,
                notebook_sku:action.payload.notebook_sku,

            }
        case CLEAR_NOTEBOOK_SPECIFICATIONS:
            return {
                ...state,
                notebook_page: '',
                notebook_size: '',
                notebook_ruling:'',
                notebook_binding:'',
                notebook_quantity:'',
                notebook_images: [],
                designed_canvas:[],
                notebook_mrp: '',
                notebook_sku: ''

            }
        default:
            return state
    }

}

export default specifications;

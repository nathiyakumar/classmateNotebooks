export const ADD_NOTEBOOK_PAGE = 'ADD_NOTEBOOK_PAGE';
export const ADD_NOTEBOOK_SIZE = 'ADD_NOTEBOOK_SIZE';
export const ADD_NOTEBOOK_RULING = 'ADD_NOTEBOOK_RULING';
export const ADD_NOTEBOOK_BINDING = 'ADD_NOTEBOOK_BINDING';
export const ADD_NOTEBOOK_QUANTITY = 'ADD_NOTEBOOK_QUANTITY';
export const ADD_NOTEBOOK_MRP = 'ADD_NOTEBOOK_MRP';
export const ADD_NOTEBOOK_SKU = 'ADD_NOTEBOOK_SKU';
export const CLEAR_NOTEBOOK_SPECIFICATIONS = 'CLEAR_NOTEBOOK_SPECIFICATIONS';



export const ADD_NOTEBOOK_IMAGES = 'ADD_NOTEBOOK_IMAGES';
export const CLEAR_ALL_DESIGNS = 'CLEAR_ALL_DESIGNS';
export const GET_NOTEBOOK_IMAGES = 'GET_NOTEBOOK_IMAGES';
export const SET_ALL_CANVAS = 'SET_ALL_CANVAS';
export const ADD_TO_CART = 'ADD_TO_CART';

export const addNotebookPage = data => ({
    type: ADD_NOTEBOOK_PAGE,
    payload: {
        notebook_page:data
    }
})

export const addNotebookSize = data => ({
    type: ADD_NOTEBOOK_SIZE,
    payload: {
        notebook_size:data
    }
})

export const addNotebookRuling = data => ({
    type: ADD_NOTEBOOK_RULING,
    payload: {
        notebook_ruling:data
    }
})
export const addNotebookBinding = data => ({
    type: ADD_NOTEBOOK_BINDING,
    payload: {
        notebook_binding:data
    }
})
export const addNotebookQuantity = data => ({
    type: ADD_NOTEBOOK_QUANTITY,
    payload: {
        notebook_quantity:data
    }
})
export const addNotebookMrp = data => ({
    type: ADD_NOTEBOOK_MRP,
    payload: {
        notebook_mrp:data
    }
})
export const addNotebookSku = data => ({
    type: ADD_NOTEBOOK_SKU,
    payload: {
        notebook_sku:data
    }
})

export const addNotebookImages = data => ({
    type: ADD_NOTEBOOK_IMAGES,
    payload: {
        notebook_images:data
    }
})
export const getNotebookImages = data => ({
    type: GET_NOTEBOOK_IMAGES,
    payload:data
})

export const clearNotebookSpecifications = data => ({
    type: CLEAR_NOTEBOOK_SPECIFICATIONS,
    payload:data
})

export const ClearAllDesigns = data => ({
    type: CLEAR_ALL_DESIGNS,
    payload:data
})


export const SetAllCanvas = data => ({
    type: SET_ALL_CANVAS,
    payload:data
})



export const addToCart = data => ({
    type: ADD_TO_CART,
    payload:data
})




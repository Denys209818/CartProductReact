import { CREATE_LIST } from "../../constants/reduxConstants";

var initialState = {
    products: []
}

const productReducer = (state = initialState, action) => 
{
    switch(action.type) 
    {
        case CREATE_LIST: {
            return {
                products: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default productReducer;
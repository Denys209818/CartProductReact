import { ADD_TO_EDIT, EDIT_CLOSE_PRODUCT, EDIT_PRODUCT } from "../../constants/reduxConstants";

var initialState = 
{
    id: 0,
    name: '',
    price: '',
    description: '',
    image: null,
    isEdit: false,
    code: ''
}

const editReducer = (state=initialState, action) => 
{
    switch(action.type) 
    {
        case ADD_TO_EDIT: 
        {
            var product = action.payload;
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
                isEdit: true,
                code: product.code
            }
        }
        case EDIT_CLOSE_PRODUCT: 
        {
            return {
                id: 0,
                name: '',
                price: '',
                description: '',
                image: '',
                isEdit: false,
                code:''
            }
        }
        
    }
    return state;
}

export default editReducer;
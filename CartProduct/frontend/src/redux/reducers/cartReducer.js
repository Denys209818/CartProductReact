import { ADD_TO_CART, CLEAR_CART } from "../../constants/reduxConstants";

var initialValues = {
    count: 0,
    products: []
};

const cartReducer = (state = initialValues, action) => 
{
    switch(action.type) 
    {
        case ADD_TO_CART: 
        {
            var product = {...action.payload.product, count: action.payload.count};
            if(state.products.filter(pr => pr.code == product.code).length > 0) 
            {
                var count = state.products.filter(pr => pr.code == product.code)[0].count;
                state.products.filter(pr => pr.code == product.code)[0].count = count+1
                return {
                    products:[ ...state.products],
                    count: state.count+1
                }
            }
            return {
                products: [
                    ...state.products,
                    product 
                ],
                count: (state.count+action.payload.count)
            }
                
        }
        case CLEAR_CART: 
        {
                return {
                    products: [],
                    count: 0
                }
        }
        default:{
            return state;
        }
    }
}

export default cartReducer;
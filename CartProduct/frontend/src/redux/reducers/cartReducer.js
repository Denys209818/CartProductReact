import { ADD_ITEM_TO_CART, ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, REMOVE_ITEM_FROM_CART } from "../../constants/reduxConstants";
import sortingService from "../../services/sortingService";

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
                
                var count = parseInt(state.products.filter(pr => pr.code == product.code)[0].count);
                state.products.filter(pr => pr.code == product.code)[0].count = count+1
                return {
                    products:[ ...state.products],
                    count: state.count+1
                }
            }
            state.products.push(product);
            

            return {
                products: [
                    ...sortingService.sortById(state.products)
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
        case REMOVE_FROM_CART: 
        {
            var product = action.payload.products;
            var count = action.payload.count;
            state.count -= count;
            var newStateProducts = state.products.filter(pr => pr.code != product.code);
            console.log(newStateProducts);
            return {
                products: newStateProducts,
                count: state.count
            }
        }
        case ADD_ITEM_TO_CART: 
        {
            const {count, id} = action.payload;
            var product = state.products.filter(pr => pr.id == id)[0];

            var oldCount = product.count;
            product.count = count;
            
            var products = state.products.filter(pr => pr.id != id);
            products.push(product);

            
                    
            return {    
                ...state,
                    products: [...sortingService.sortById(products)],
                count: (parseInt(state.count)-parseInt(oldCount))
                 + parseInt(count)
            };
        }
        case REMOVE_ITEM_FROM_CART:
            {
                const { count, id } = action.payload;
                if (parseInt(count) > 0) {

                    var product = state.products.filter(pr => pr.id == id)[0];
                    var oldCount = product.count;
                    product.count = count;

                    var products = state.products.filter(pr => pr.id != id);
                    products.push(product);
                    
                    return {
                        ...state,
                        products: [...sortingService.sortById(products)],
                        count: parseInt((state.count - oldCount)) + parseInt(count)
                    };
                }
                return state;
            }
        default:{
            return state;
        }
    }
}

export default cartReducer;
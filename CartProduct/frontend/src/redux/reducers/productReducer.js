import { CREATE_LIST, REMOVE_ITEM_FROM_PRODUCTS,EDIT_PRODUCT, ADD_PRODUCT } from "../../constants/reduxConstants";
import productService from "../../services/productService";

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
        case REMOVE_ITEM_FROM_PRODUCTS: 
        {
            productService.delete(action.payload);
            var products = state.products.filter(x => x.code != action.payload);
            return {
                products: products
            }
        }
        case EDIT_PRODUCT: {
            var product = action.payload;
            var products = state.products.filter(x => x.id != product.id);
            var oldProduct = state.products.filter(x => x.id == product.id)[0];

            oldProduct.name = product.name;
            oldProduct.price = product.price;
            oldProduct.image = product.image;
            oldProduct.description = product.description;
            oldProduct.id = product.id;

            return {
                products: [...products, oldProduct]
            }
        }
        case ADD_PRODUCT:
        {
            var product = action.payload;
            //product.id = state.products[state.products.length - 1].id + 1;
            return {
                products: [...state.products, product]
            };         
            
        }
        default: {
            return state;
        }
    }
}

export default productReducer;
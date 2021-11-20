import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../../constants/reduxConstants";
import axiosService from "../../services/axiosService";


export const addToCartItem = (newCount, id) => async (dispatch) => 
{
    try 
    {
        var obj = {
            count: newCount,
            id: id
        };
        dispatch({type: ADD_ITEM_TO_CART, payload: obj});

        const {data} = await axiosService.addItemToCart(obj);

        return Promise.resolve(data);
    }
    catch(ex) 
    {
        return Promise.reject(ex);
    }
}

export const removeItemFromCart = (newCount, id) => async (dispatch) => {
    try {
        var obj = {
            count: newCount,
            id: id
        };
        dispatch({ type: REMOVE_ITEM_FROM_CART, payload: obj });

        const { data } = await axiosService.removeItemToCart(obj);

        return Promise.resolve(data);
    }
    catch (ex) {
        return Promise.reject(ex);
    }
}
import { ADD_TO_CART, CREATE_LIST } from "../../constants/reduxConstants";
import axiosService from "../../services/axiosService";


const productAction = () => (dispatch) => 
{
    try
    {
        return axiosService.get()
        .then(result => {
        dispatch({type: CREATE_LIST, payload: result.data.products});
        return Promise.resolve(result.data.products);
    })
    .catch(error => {
        return Promise.reject(error);
    });
    }catch(ex) 
    {
        Promise.reject(ex);
    }
}

export const productAddItem = (model) => (dispatch) => 
{
    try 
    {
        return axiosService.getItem(model)
        .then(result => {
            dispatch({type: ADD_TO_CART, payload: {product: result.data.product, count:1}});
            return Promise.resolve(result.data.product);
        })
        .catch(error => {
            console.log(error.response);
            Promise.reject(error);
        });
    } catch(ex) 
    {
        Promise.reject(ex);
    }

    }

export default productAction;
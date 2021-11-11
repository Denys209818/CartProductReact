import { ADD_TO_CART, CLEAR_CART, LOGIN_USER } from "../../constants/reduxConstants";
import axiosService from "../../services/axiosService";


const loginAction = (data) => (dispatch) => 
{
    try {
        return axiosService.login(data)
            .then(result => {
                dispatch({type:CLEAR_CART});
                dispatch({ type: LOGIN_USER, payload: result.data });
                localStorage.setItem('token', result.data.token);

                dispatch(getCartProducts(data));
                return Promise.resolve(result.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    } catch (ex) {
        Promise.reject(ex);
    }
}

export const getCartProducts = (data) => (dispatch) => {
    axiosService.getCart(data.email)
                .then(result => {
                    console.log("resut: ", result.data);
                    result.data.products.map((product, index) => {
                    dispatch({type: ADD_TO_CART, payload: {product: product.product, count: product.count}});
                    });
                })
                .catch(error => 
                    {
                        console.log(error);
                    });
}

export default loginAction;
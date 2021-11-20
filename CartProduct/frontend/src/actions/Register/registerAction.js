import { CLEAR_CART, REGISTER_USER } from "../../constants/reduxConstants";
import axiosService from "../../services/axiosService";
import { loginUser } from "../Login/loginAction";

const registerAction = (data) => async (dispatch) => 
{
    try {

        return axiosService.register(data)
            .then(result => 
                {
                    dispatch({type: CLEAR_CART, payload: result.data});
                    dispatch({type: REGISTER_USER, payload: result.data});
                    localStorage.setItem('token', result.data.token);
                    loginUser(result.data.token);
                    return Promise.resolve(result);
                })
            .catch(error => 
                {
                    console.log(error);
                    return Promise.reject(error);
                });

    }
    catch (ex) {
        return Promise.reject(ex)
    }
}

export default registerAction;
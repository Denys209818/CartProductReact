import { LOGIN_USER, LOGOUT, REGISTER_USER } from "../../constants/reduxConstants";

var initialValues = {
    token:'',
    user: null
};

const userReducer = (state = initialValues, action) => 
{
    switch(action.type) 
    {
        case REGISTER_USER: 
        {
            return {
                token: action.payload.token,
                user: action.payload.user
            }
        }
        case LOGIN_USER: 
        {
            return {
                token: action.payload.token,
                user: action.payload.user
            }
        }
        case LOGOUT: 
        {
            return {
                token:'',
                user: null
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer;
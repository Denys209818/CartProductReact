import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import jwt from "jsonwebtoken";
import { CLEAR_CART, LOGIN_USER } from "./constants/reduxConstants";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { getCartProducts, loginUser } from "./actions/Login/loginAction";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import productAction from "./actions/Product";


const App = () => {
  
  var dispatch = useDispatch();
  dispatch(productAction())
        .then(data => {
          
        })
        .catch(error => {
            console.log(error);
        });

  var token = localStorage.getItem('token');
  if(token) 
  {
    loginUser(token);
    dispatch({type: CLEAR_CART});
    var userData = jwt.decode(token);
    dispatch({type: LOGIN_USER, payload: {
      token: token,
      user: {
        email: userData.email,
        firstname: userData.name,
        secondname: userData.secondname,
        phone: userData.phone
      }
    }});
    dispatch(getCartProducts(userData));

  }

  return (<>
       <Switch>
       <Route name="Admin" path="/admin" render={(props) => <AdminLayout {...props} />}/>
       <Route name="Default" path="/" render={(props) => <DefaultLayout {...props} />}/>
     </Switch>
  </>);
}

export default App;

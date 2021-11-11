import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";



var historyPath = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createBrowserHistory(historyPath);

var middleware = [thunk,
routerMiddleware(history)];

var rootReducer = combineReducers({
    user: userReducer,
    router: connectRouter(history),
    product: productReducer,
    cart: cartReducer
});

var store = createStore(rootReducer, 
    {}, 
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;
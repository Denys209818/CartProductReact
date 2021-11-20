import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CLEAR_CART, LOGOUT } from "../../../constants/reduxConstants";

const Navbar = () => {

    var dispatch = useDispatch();
    var user = useSelector(redux => redux.user);
    const onLogoutHandler = (e) => 
    {
        e.preventDefault();
        dispatch({type: LOGOUT});
        dispatch({type: CLEAR_CART});
        localStorage.removeItem('token');
    }

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">Головна сторінка</Link>
                <button className="navbar-toggler" data-bs-target="#mainmenu" data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Головна</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products" className="nav-link">Продукти</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
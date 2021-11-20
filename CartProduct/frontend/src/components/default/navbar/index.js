import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_ITEM_TO_CART, CLEAR_CART, LOGOUT, REMOVE_ITEM_FROM_CART } from "../../../constants/reduxConstants";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useEffect, useState } from "react";
import groupBy from 'group-by';
import axiosService from "../../../services/axiosService";
import { removeFromCart } from "../../../actions/Product";
import { addToCartItem, removeItemFromCart } from "../../../actions/CartItems/cartItems";


const Navbar = () => 
{
    var dispatch = useDispatch();
    var user = useSelector(redux => redux.user);
    var cart = useSelector(redux => redux.cart);
    const [position, setPosition] = useState('center');
    
    
    

    //Header
    const header = (
        <img alt="Card" src="showcase/demo/images/usercard.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );

    const onFooterCardClick =(e, id) => 
    {
        e.preventDefault();
        dispatch(removeFromCart(id));
    }

    const onChangeCount = (e, id, count) => 
    {
        var newCount = e.target.value;
        if(e.target.value != 0) 
        {
            if(count < newCount) 
            {
                dispatch(addToCartItem(newCount, id));
                return;
            }
        else if(count > newCount)
        {
            dispatch(removeItemFromCart(newCount, id));
                return;
            }
        }
        }

    const footer = (id, count) => {
        return(
        <span>
            <div className="d-block d-flex justify-content-center">
                <Button label="Оформити замовлення" icon="pi pi-check" />
            </div>
            <div className="d-block d-flex justify-content-center my-3">
                <input type="number" value={count} onChange={(e) => onChangeCount(e, id, count)}/>
            </div>
            <div className="d-block mt-2 d-flex justify-content-center">
            <Button label="Скасувати" onClick={(e) => onFooterCardClick(e, id)} icon="pi pi-times" className="p-button-secondary p-ml-2" />
            </div>
        </span>
        )};
    
    const onLogoutHandler = (e) => 
    {
        e.preventDefault();
        dispatch({type: LOGOUT});
        dispatch({type: CLEAR_CART});
        localStorage.removeItem('token');
    }
    //DataView
    const [displayMaximizable, setDisplayMaximizable] = useState(false);

    const dialogFuncMap = {
        'displayMaximizable': setDisplayMaximizable
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }

    

    return (
    <>
            <Dialog header="Кошик" visible={displayMaximizable} maximizable modal style={{ width: '50vw' }} footer={renderFooter('displayMaximizable')} onHide={() => onHide('displayMaximizable')}>
                {/* <p className="p-m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                    <div className="container-fluid">
                        <div className="row">
                        { cart.count > 0 ? cart.products.map((product, index) => {
                            return <div key={index} className="col-md-12 mt-3">
                            <div className="container d-flex justify-content-center">
                                <Card title={product.name} 
                                subTitle={(parseInt(product.price)*parseInt(product.count)) + " грн\n"}
                                style={{ width: '25em' }} footer={() => footer(product.id, product.count)} header={<img alt="Card" 
                                src={`images/` + product.image} onError={(e) => 
                                e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />}>
                                    <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                                        {product.description}</p>
                                </Card>
                            </div>
                        </div>
                        }): <span>Ваш кошик пустий!</span>}
                        </div>
                    </div>
            </Dialog>
    <div className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                {user.user == null && <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/cart" onClick={(e) =>{e.preventDefault(); onClick('displayMaximizable')}} 
                        className="nav-link"><i style={{ fontSize: '25px' }} className="pi pi-shopping-cart"></i>
                            {cart.count > 0 &&
                                <span className="p-1" style={{
                                    fontSize: '10px', backgroundColor: '#D75F46',
                                    color: 'black', fontWeight: 'bold', borderRadius: '15px'
                                }}>{cart.count}</span>}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Вхід</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Реєстрація</Link>
                    </li>
                </ul>}
                {user.user != null && <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/cart" onClick={(e) =>{e.preventDefault(); onClick('displayMaximizable')}} className="nav-link"><i style={{fontSize: '25px'}} className="pi pi-shopping-cart"></i>
                        {cart.count > 0 &&
                        <span className="p-1" style={{fontSize:'10px', backgroundColor:'#D75F46',
                         color:'black', fontWeight:'bold', borderRadius: '15px'}}>{cart.count}</span>}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">{user.user.email}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/logout" onClick={onLogoutHandler} className="nav-link">Вихід</Link>
                    </li>
                </ul>}
            </div>
        </div>
    </div></>);
}

export default Navbar;
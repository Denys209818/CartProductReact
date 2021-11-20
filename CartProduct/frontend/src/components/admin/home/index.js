import { push } from 'connected-react-router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { ADD_TO_EDIT, EDIT_CLOSE_PRODUCT, REMOVE_ITEM_FROM_PRODUCTS } from '../../../constants/reduxConstants';
import MyForm from '../form';

const Home = () => 
{
    var dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: EDIT_CLOSE_PRODUCT});
    }, [])

    const onDeleteHandler =  (e, code) => 
    {
        e.preventDefault();
     dispatch({type: REMOVE_ITEM_FROM_PRODUCTS, payload: code});
        
    }

    const onEditHandler = (e, product) => 
    {
        e.preventDefault();
        dispatch({type: ADD_TO_EDIT, payload: product});
        dispatch(push("admin/edit"));
    }
    
    var product = useSelector(redux => redux.product);
    return (<div className="row">
        <div className="offset-1 col-md-10 mt-3">

        <Link className="btn btn-success my-2" to="admin/add">Додати товар</Link>
        <table className="table">
            <thead className="table-dark">
                <tr>
                    <th scope="col">Номер</th>
                    <th scope="col">Назва</th>
                    <th scope="col">Ціна</th>
                    <th scope="col">Опис</th>
                    <th scope="col">Фотографія</th>
                    <th scope="col">Інструменти</th>
                </tr>
            </thead>
            <tbody>
                {product.products.map((product, index)=> {
                    return (<tr key={index}>
                        <td className="nav-item" scope="row">{product.id}</td>
                        <td className="nav-item">{product.name}</td>
                        <td className="nav-item">{product.price}</td>
                        <td className="nav-item">{product.description}</td>
                        <td className="nav-item">
                            <img width="90" height="60" src={"images/" + product.image}/>
                        </td>
                        <td className="nav-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <Link to="admin/edit">
                                    <span className="pi pi-user-edit" style={{fontSize: '25px', color: 'aqua'}}
                                    onClick={(e) => onEditHandler(e, product)} 
                                    ></span>
                                    </Link>
                                </div>
                                <div className="col-md-4">
                                    <span className="pi pi-trash" style={{fontSize: '25px', color: 'red'}} onClick={(e) => 
                                        onDeleteHandler(e, product.code)}></span>
                                </div>
                            </div>
                        </td>
                    </tr>);
                })}
            </tbody>
        </table>
        </div>
    </div>);
}

export default Home;
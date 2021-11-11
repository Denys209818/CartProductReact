import { push } from "connected-react-router";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import loginAction from "../../../actions/Login/loginAction";
import TextField from "../common/TextField";
import yupValidation from "./yupValidation";


const Login = () => 
{
    var dispatch = useDispatch();
    var refFormik = useRef();
    const [invalid, setInvalid]= useState([]);

    var initialValues = {
        email:'',
        password:''
    };

    const onSubmitHandler = (values) => 
    {
        dispatch(loginAction(values))
        .then(result => {
            console.log(result);
            dispatch(push("/"));
        })
        .catch(error => {
            if(error.response.data.errors) 
            {
                Object.entries(error.response.data.errors).forEach(([key, value])=> {
                    refFormik.current.setFieldError(key, value);
                });

                return;
            }
            console.log(error.response.data.invalid);
            setInvalid(error.response.data.invalid);
        });
    }

    return (<div className="row mt-4">
        <div className="offset-3 col-md-6">
            <h1 className="text-center">Авторизація</h1>
            {invalid && invalid.length>0 && 
            <div className="alert alert-danger" role="alert">
                <ul>
                   {invalid.map((element, index)=> {
                       return <li key={index}>{element.description}</li>
                   })}
                </ul>
            </div>}
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmitHandler}
                validationSchema={yupValidation}
                innerRef={refFormik}
            >
                <Form>
                    <TextField label="Електронна пошта" 
                    name="email" 
                    id="email"
                    type="text"/>
                    <TextField label="Пароль" 
                    name="password" 
                    id="password"
                    type="password"/>

                    <input className="btn btn-success mt-3" type="submit" value="Увійти"/>
                </Form>
            </Formik>
        </div>
    </div>);
}

export default Login;
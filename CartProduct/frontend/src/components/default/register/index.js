import { push } from "connected-react-router";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Condition from "yup/lib/Condition";
import registerAction from "../../../actions/Register/registerAction";
import FormikImageTextInput from "../common/ImageTextField";
import TextField from "../common/TextField";
import yupValidation from "./yupValidation";


const Register = () => 
{
    var dispatch = useDispatch();

    var refFormik = useRef();

    const [invalid, setInvalid]= useState([]);

    var initialValues = {
        firstname: '',
        secondname:'',
        phone: '',
        email:'',
        password:'',
        confirmPassword:'',
        image: null
    };

    const onSubmitHandler = (values) => 
    {
        setInvalid([]);
        var data = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            data.append(key, value);
        });
        dispatch(registerAction(data))
        .then(result => {
            dispatch(push("/"));
        }).catch(error => {
            if(error.response.data.errors) 
            {
                Object.entries(error.response.data.errors).forEach(([key, value])=> {
                    refFormik.current.setFieldError(key, value);
                });

                return;
            }
            setInvalid(error.response.data.invalid);
        });
    }

    return (<div className="row mt-4">
        <div className="offset-3 col-md-6">
            <h1 className="text-center">Реєстрація</h1>
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
                    <TextField label="Ім'я" 
                    name="firstname" 
                    id="firstname"
                    type="text"/>
                    <TextField label="Прізвище" 
                    name="secondname" 
                    id="secondname"
                    type="text"/>
                    <TextField label="Телефон" 
                    name="phone" 
                    id="phone"
                    type="text"/>
                    <TextField label="Електронна пошта" 
                    name="email" 
                    id="email"
                    type="email"/>
                    <TextField label="Пароль" 
                    name="password" 
                    id="password"
                    type="password"/>
                    <TextField label="Підтвердження паролю" 
                    name="confirmPassword" 
                    id="confirmPassword"
                    type="password"/>
                    <FormikImageTextInput
                    refFormik={refFormik}
                    id="image"
                    name="image"
                    />

                    <input className="btn btn-success mt-3" type="submit" value="Зареєструватися"/>
                </Form>
            </Formik>
        </div>
    </div>);
}

export default Register;
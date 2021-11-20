import { push } from "connected-react-router";
import { Form, Formik } from "formik";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import add from "../../../actions/Products/add";
import edit from "../../../actions/Products/edit";
import { ADD_PRODUCT, EDIT_CLOSE_PRODUCT, EDIT_PRODUCT } from "../../../constants/reduxConstants";
import ImageTextInput from "../common/ImageTextBox";
import TextBox from "../common/TextBox";
import yupValidation from "./yupValidation";


const MyForm = ({label, buttonLab}) => 
{
    var dispatch = useDispatch();
    var product = useSelector(redux => redux.edit);
    var initialValues = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        code: product.code
    };

    const refFormik = useRef();
    const onSubmitHandler = (values) => 
    {
        try 
        {
            
            if(product.isEdit) 
            {
                dispatch(edit(values));
                dispatch(push("/admin"));
                return;
            }
            
            dispatch(add(values));
            dispatch(push("/admin"));
        }catch(ex) 
        {
            console.log(ex.error);
        }

    }

    return (
        <>
            <h3 className="text-center">{label}</h3>
            <Formik 
                initialValues={initialValues}
                onSubmit={onSubmitHandler}
                innerRef={refFormik}
                validationSchema={yupValidation}
            >
                <Form>
                    <input type="hidden" className="d-none" name="id" id="id"/>
                    <input type="hidden" className="d-none" name="code" id="code"/>
                    <TextBox
                        name="name"
                        id="name"
                        type="text"
                        label="Назва"
                    />
                    <TextBox
                        name="price"
                        id="price"
                        type="text"
                        label="Ціна"
                    />
                    <TextBox
                        name="description"
                        id="description"
                        type="text"
                        label="Опис"
                    />
                    <ImageTextInput
                    name="image"
                    id="image"
                    refFormik={refFormik}
                    src={product.image}
                    />
                    <input type="submit" className="btn btn-success mt-3" value={buttonLab}/>
                </Form>
            </Formik>
        </>
    );
}

export default MyForm;
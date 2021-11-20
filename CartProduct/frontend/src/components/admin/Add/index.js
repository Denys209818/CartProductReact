import MyForm from "../form";


const Add = () => 
{
    return (<div className="row">
        <div className="offset-3 col-md-6 mt-3">
            <MyForm label="Додати продукт" buttonLab="Додати"/>
        </div>
    </div>)
}

export default Add;
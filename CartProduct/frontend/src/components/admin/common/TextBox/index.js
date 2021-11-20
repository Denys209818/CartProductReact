import { useField } from "formik";
import classNames from 'classnames';

const TextBox = ({label, ...props}) => 
{
    const [field, meta]= useField(props);
    return (<div className="form-group">
        <label htmlFor={props.name || props.id} className="form-label">{label}</label>
        <input {...props} {...field} className={classNames("form-control", {"is-valid":meta.touched && !meta.error}, 
        {"is-invalid": meta.touched && meta.error})}/>
        {meta.touched && meta.error && 
        <div className="invalid-feedback">
        {meta.error}
    </div>}
        
    </div>);
}

export default TextBox;
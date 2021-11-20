import { EDIT_CLOSE_PRODUCT, EDIT_PRODUCT } from "../../constants/reduxConstants";
import productService from "../../services/productService";


const edit = (data) => async (dispatch) => 
{
    if(typeof data.image === 'string')
        data.image = null;

    var formData = new FormData();
    Object.entries(data).forEach(([key,value]) => {
        formData.append(key, value);
    });

    var result = await productService.update(formData);
    data.image = result.data.fileName;
    dispatch({type: EDIT_PRODUCT, payload: data});
    dispatch({type: EDIT_CLOSE_PRODUCT});
}

export default edit;
import { ADD_PRODUCT } from "../../constants/reduxConstants";
import productService from "../../services/productService";


const add = (data) => async (dispatch) => 
{
    var newProduct = data;
    var product = {
        name: newProduct.name,
        description: newProduct.description,
        image: newProduct.image,
        id: 1, 
        price: newProduct.price,
        inventoryStatus: 'OUTSTOCK',
        rating: 3,
        category: 'category',
        code: ''
    };
    var dataEl = new FormData();
    Object.entries(product).forEach(([key, value]) => {
        dataEl.append(key, value);
    });

    var result = await productService.add(dataEl);
    console.log(result.data);
    product.image = result.data.fileName;
    product.code = result.data.code;
    product.id = result.data.id;
    dispatch({type: ADD_PRODUCT, payload: product});
}

export default add;
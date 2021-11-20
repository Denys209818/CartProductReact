import axiosCreate from "./axiosCreate";


class AxiosService 
{
    register = (data) => 
    {
        return axiosCreate.post('api/account/create', data, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
    }

    login = (data) => 
    {
        return axiosCreate.post('api/account/login', data);
    }

    get = () => 
    {
        return axiosCreate.get('api/product/get');
    }

    getItem = (id) => 
    {
        return axiosCreate.post('api/product/getitem', id);
    }

    getCart = (email) => 
    {
        return axiosCreate.post('api/product/getcart', email);
    }

    deleteItem = (id) => 
    {
        return axiosCreate.post('api/product/remcart', id);
    }

    addItemToCart = (data) => 
    {
        return axiosCreate.post('api/product/addtocart', data);
    }

    removeItemToCart = (data) => 
    {
        return axiosCreate.post('api/product/removetocart', data);
    }
}

export default new AxiosService();
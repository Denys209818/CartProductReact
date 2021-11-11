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
}

export default new AxiosService();